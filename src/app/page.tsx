"use client";

import "./globals.css";
import Navbar from "./components/Navbar";
import UpcomingButton from "./components/UpcomingButton";
import { useEffect, useState } from "react";
import UpcomingEvents from "./components/UpcomingEvents";

export default function Home() {
  const [currentBg, setCurrentBg] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev % 2) + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <main className="relative">
        <div
          className="landing relative min-h-screen"
          style={{
            backgroundImage: `linear-gradient(
            to right,
            rgb(0, 0, 0) 0%,
            rgba(0, 0, 0, 0.5) 50%,
            rgba(0, 0, 0, 0.329) 100%
            ),
            url("/back${currentBg}.jpg")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            transition: "background-image ease-in-out",
          }}
        >
          <div className="w-[30%] mx-auto mt-4 h-12 absolute top-4 left-[35%]">
            <Navbar />
          </div>
          <div className="absolute top-[70%]">
            <h2 className="text-gray-200 text-left text-5xl">Never miss any</h2>
            <h2 className="text-gray-200 text-8xl">Campus event</h2>
            <UpcomingButton />
          </div>
        </div>

        <section id="upcoming-events" className="min-h-screen bg-white p-4">
          <h2 className="text-4xl font-bold text-primary-blue mb-8 ml-5">
            Upcoming Events
          </h2>
          <UpcomingEvents />
        </section>
      </main>
    </div>
  );
}
