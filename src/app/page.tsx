"use client";

import "./globals.css";
import Navbar from "./components/Navbar";
import UpcomingButton from "./components/UpcomingButton";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentBg, setCurrentBg] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev % 2) + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="landing relative"
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
        minHeight: "100dvh",
        transition: "background-image ease-in-out",
      }}
    >
      <div className="w-[30%] mx-auto mt-4 h-12 absolute top-4 left-[35%]">
        <Navbar />
      </div>
      <div className="absolute top-96 left-5">
        <h2 className="text-gray-200 text-left text-5xl">Never miss any</h2>
        <h2 className="text-gray-200 text-8xl">Campus event</h2>
        <UpcomingButton />
      </div>
    </div>
  );
}
