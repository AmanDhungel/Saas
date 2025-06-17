import Image from "next/image";
import React from "react";
import noBgBookMark from "../public/icons/bookmark.svg";
import clock from "../public/icons/clock.svg";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import filledBookMark from "../public/icons/bookmark-filled.svg";

interface CompanionProps {
  id?: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: CompanionProps) => {
  return (
    <article
      style={{ background: color }}
      className={
        // "companion-card"
        cn(`rounded-xl p-4 gap-6 space-y-2 border-2  w-full`)
      }>
      <div className="flex justify-between">
        <h3 className="text-sm rounded-md bg-black text-white px-2 py-1 h-fit">
          {subject}
        </h3>
        <span className="bg-black h-fit p-1 rounded-sm">
          <Image src={noBgBookMark} alt="bookmark" width={10} height={10} />
        </span>
      </div>
      <h2 className="text-xl">{name}</h2>
      <p className="text-sm">Topic : {topic}</p>
      <h3 className="flex gap-2">
        <Image src={clock} alt="clock" width={14} height={14} />
        {duration < 60
          ? `${duration} min`
          : `${Math.floor(duration / 60)} hr ${duration % 60} min`}{" "}
        duration
      </h3>
      <Link href={`/companions/${id}`}>
        <Button className="items-center text-center w-full">
          Launch Lesson
        </Button>
      </Link>
    </article>
  );
};

export default CompanionCard;
