import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { SearchParams } from "@/types";
import React from "react";

const Companions = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";
  const companionsData = await getCompanions({ subject, topic });

  return (
    <main className="w-11/12 m-auto gap-4">
      {" "}
      <section className="flex justify-between gap-2">
        <h1 className="text-3xl font-bold underline">Companions Library</h1>
        <div className="flex  gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="home-section gap-3">
        {companionsData.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
    </main>
  );
};

export default Companions;
