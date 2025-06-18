"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useRouter } from "next/navigation";
import EventCard from "./EventCard";
import Event from "../Types/Event";
import LoadingIcon from "./LoadingIcon";

export default function UpcomingEvents() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsQuery = query(
          collection(db, "events"),
          where("isUpcoming", "==", true)
        );
        const querySnapshot = await getDocs(eventsQuery);
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];
        setEvents(eventsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId: string) => {
    router.push(`/events/${eventId}`);
  };

  if (loading) {
    return <LoadingIcon />;
  }

  if (error) {
    return (
      <p className="text-red-500 text-center">Error loading events: {error}</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mb-12">
      {events.length > 0 ? (
        events.map((event) => (
          <EventCard key={event.id} event={event} onClick={handleEventClick} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No upcoming events.
        </p>
      )}
    </div>
  );
}
