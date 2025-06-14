"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "home",
    href: "/",
  },
  {
    label: "companions",
    href: "/companions",
  },
  {
    label: "my journey",
    href: "/my-journey",
  },
  {
    label: "sign in",
    href: "/sign-in",
  },
];
const NavItems = () => {
  const pathName = usePathname();
  return (
    <nav className="flex items-center gap-4">
      {navItems.map(({ href, label }) => (
        <Link
          href={href}
          key={label}
          className={`capitalize  ${
            href === pathName ? "text-amber-500" : "text-black"
          } `}>
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
