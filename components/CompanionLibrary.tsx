import React from "react";
import CompanionCard from "./CompanionCard";
import { getCompanions } from "@/lib/actions/companion.actions";

const CompanionLibrary = async () => {
  const companionsData = await getCompanions();

  return (
    <div className="w-11/12 m-auto gap-4">
      {" "}
      <h1 className="text-3xl font-bold underline">Popular Companions</h1>
      <section className="home-section gap-3">
        {companionsData.map((companion, index) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={
              index === 1 ? "#ff5733" : index % 2 === 0 ? "#E5D0FF" : "#66D9EF"
            }
          />
        ))}
      </section>
    </div>
  );
};

export default CompanionLibrary;
