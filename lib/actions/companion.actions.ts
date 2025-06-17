"use server";

import { CreateCompanion, GetAllCompanions } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({
      ...formData,
      author,
    })
    .select();

  if (error || !data) throw new Error(error?.message || "Something went wrong");

  return data[0];
};

export const getCompanionById = async (id: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id)
    .single();
  if (error || !data) throw new Error(error?.message || "Something went wrong");
  return data;
};

export const getCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions = {}) => {
  const supabase = createSupabaseClient();
  let query = supabase.from("companions").select();

  // If both subject and topic are provided, we use the `or` method to
  // search for either the subject or the topic in the name or topic
  // fields. This allows us to search for companions that have the
  // subject in their name or topic, or vice versa.
  // If only subject is provided, we search for the subject in the
  // subject field.
  // If only topic is provided, we search for the topic in the name
  // or topic fields.
  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike('%${topic}%,name.ilike.%${topic}%')`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.ilike("topic", `%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;
  if (error || !companions)
    throw new Error(error?.message || "Something went wrong");
  return companions;
};
