"use server";

import { CreateCompanion } from "@/types";
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

export const getCompanions = async () => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select()
    .order("created_at", { ascending: false });
  if (error || !data) throw new Error(error?.message || "Something went wrong");
  return data;
};
