"use client";

import "./globals.css";
import UpcomingButton from "./(components)/UpcomingButton";
import { useEffect, useState } from "react";
import UpcomingEvents from "./(components)/UpcomingEvents";

export default function Home() {
  const [currentBg, setCurrentBg] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev % 3) + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="h-dvh">
      <div
        className="landing h-dvh"
        style={{
          backgroundImage: `linear-gradient(
          to right,
          rgb(0, 0, 0) 0%,
          rgba(0, 0, 0, 0.5) 50%,
          rgba(0, 0, 0, 0.329) 100%
        ),
        url("/back${currentBg}.webp")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          transition: "background-image ease-in-out",
        }}
      >
        <div
          className="
    absolute
    left-0
    bottom-0
    w-full
    sm:w-auto
    px-4
    pb-6
    sm:pl-8
    sm:pb-10
    flex flex-col items-start
    z-10
    max-w-[90vw]
    sm:max-w-[60vw]
    md:max-w-[50vw]
    lg:max-w-[40vw]
  "
        >
          <h2 className="text-gray-200 text-2xl sm:text-3xl md:text-4xl leading-tight">
            Never miss any
          </h2>
          <h2 className="text-gray-200 text-4xl sm:text-5xl md:text-7xl font-semibold leading-tight whitespace-nowrap">
            Campus event
          </h2>
          <UpcomingButton />
        </div>
      </div>

      <section
        id="upcoming-events"
        className="min-h-screen bg-white p-4 scroll-mt-13"
      >
        <h2 className="text-4xl font-bold text-primary-blue ml-5">
          Upcoming Events
        </h2>
        <UpcomingEvents />
      </section>
    </main>
  );
}
