import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItems from "./NavItems";
import logo from "../public/images/logo.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link href={"/"} className="logo">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src={logo} alt="logo" width={46} height={44} />
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <NavItems />
      </div>
    </div>
  );
};

export default Navbar;
