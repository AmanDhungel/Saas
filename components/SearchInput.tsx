"use client";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { Input } from "./ui/input";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("topic");

  const [searchQuery, setSearchQuery] = React.useState(query || "");
  return (
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Image src={"/icons/search.svg"} alt="search" width={15} height={15} />
      <Input
        placeholder="Search companions..."
        className="outline-none border-none"
        style={{ outline: "none", boxShadow: "none" }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(`${pathname}?topic=${searchQuery}`);
          }
        }}
      />
    </div>
  );
};

export default SearchInput;
