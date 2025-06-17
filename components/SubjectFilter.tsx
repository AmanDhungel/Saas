"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";

const SubjectFilter = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="relative rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Select
        onValueChange={(value) => router.push(`${pathname}?subject=${value}`)}>
        <SelectTrigger className="flex gap-2 p-5.5 -mt-1 border-black">
          <SelectValue placeholder="Select a subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=" ">All</SelectItem>
          {subjects.map((subject) => (
            <SelectItem key={subject} value={subject}>
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubjectFilter;
