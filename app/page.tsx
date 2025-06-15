import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col w-11/12 justify-center m-auto gap-4">
      <h1 className="text-3xl font-bold underline">Popular Companions</h1>
      <section className="home-section">
        <CompanionCard
          id="123"
          name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          subject="science"
          duration={100}
          color="#66D9EF"
        />
        <CompanionCard
          id="456"
          name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          subject="Account"
          duration={45}
          color="#ffff00"
        />
        <CompanionCard
          id="789"
          name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          subject="LifeStyle"
          duration={45}
          color="#E5D0FF"
        />
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </div>
  );
};

export default Page;
