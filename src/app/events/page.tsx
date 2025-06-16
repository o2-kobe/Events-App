"use client";

import UpcomingEvents from "../components/UpcomingEvents";
import PastEvents from "../components/PastEvents";

export default function Events() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Events
      </h1>

      {/* Upcoming Events */}
      <h2 className="text-3xl font-semibold mb-5 ml-9 text-primary-blue">
        Upcoming Events
      </h2>
      <UpcomingEvents />

      {/* Past Events */}
      <h2 className="text-3xl font-semibold mb-5 ml-9 text-gray-500">
        Past Events
      </h2>
      <PastEvents />
    </div>
  );
}
