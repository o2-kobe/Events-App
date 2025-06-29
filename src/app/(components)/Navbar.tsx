"use client";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../(services)/firebaseConfig";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const hideNavbarRoutes = ["/login", "/signup"];

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  if (hideNavbarRoutes.includes(pathname)) {
    return null;
  }

  return (
    <div className="flex items-center justify-between px-3 py-1 shadow">
      <Link href="/">Events GCTU</Link>
      <div className="flex gap-7 items-center font-semibold">
        <Link href="/events">Events</Link>
        <Link href="/about">About</Link>

        {isLoggedIn ? (
          <Link href="/profile">Profile</Link>
        ) : (
          <Link
            href="/login"
            className="py-2 px-4 rounded-full text-sm bg-violet-950 text-white"
          >
            Log In
          </Link>
        )}
      </div>
    </div>
  );
}
