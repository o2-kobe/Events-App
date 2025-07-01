"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import EventGCTUSVG from "./eventGCTUSVG";
import { useSession } from "../(hooks)/SessionContext";
import { HiUserCircle } from "react-icons/hi";

export default function Navbar() {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/login", "/signup"];

  const { isLoggedIn } = useSession();

  if (hideNavbarRoutes.includes(pathname)) {
    return null;
  }

  return (
    <div className="flex items-center justify-between px-3 py-1 shadow">
      <Link href="/">
        <EventGCTUSVG />
      </Link>
      <div className="flex gap-5 items-center font-semibold">
        <Link href="/events">Events</Link>
        <Link href="/about">About</Link>
        <Link href={isLoggedIn ? "/profile" : "/login"}>
          <HiUserCircle size={30} />
        </Link>
      </div>
    </div>
  );
}
