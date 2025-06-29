"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../(services)/firebaseConfig";
import { useParams } from "next/navigation";
import Link from "next/link";
import Event from "../../Types/Event";
import LoadingIcon from "../../(components)/LoadingIcon";
import BackArrowSVG from "../../(components)/BackArrowSVG";
import LocationSVG from "../../(components)/LocationSVG";
import CalenderSVG from "../../(components)/CalendarSVG";
import TagSVG from "../../(components)/TagSVG";
import EventNotFound from "../../(components)/EventNotFound";
import Image from "next/image";
import { FaPaperPlane } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { AiOutlineComment } from "react-icons/ai";

export default function EventDetails() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [alerted, setAlerted] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventDoc = await getDoc(doc(db, "events", params.id as string));
        if (eventDoc.exists()) {
          setEvent({ id: eventDoc.id, ...eventDoc.data() } as Event);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  if (loading) {
    return <LoadingIcon />;
  }

  if (!event) {
    return <EventNotFound />;
  }

  return (
    <div className="container mx-auto p-8 mt-9">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/events"
          className="inline-flex items-center text-primary-blue hover:text-primary-blue/80 "
        >
          <BackArrowSVG />
          Back to Events
        </Link>

        {event?.isUpcoming ? (
          <span
            onClick={() => setAlerted((alerted) => !alerted)}
            className="flex items-center gap-1 bg-gray-200 text-primary-blue hover:bg-gray-100 cursor-pointer px-2 py-1 rounded-lg shadow-2xl "
          >
            Get event alert
            {alerted ? <FaBell size={16} /> : <FiBell size={16} />}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Image */}
        <div className="flex-1 w-full max-w-lg bg-white rounded-3xl shadow-2xl">
          <img
            src={event.imgURL || "/placeholder.webp"}
            alt={event.name || ""}
            className="object-contain w-full h-full rounded-2xl"
            width={600}
            height={400}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <div className="flex-1 w-full max-w-2xl bg-white rounded-3xl shadow-2xl pt-4 px-8">
            <h1 className="text-4xl font-extrabold mb-6 text-gray-900 leading-tight">
              {event.name}
            </h1>

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center text-gray-600 text-lg">
                <LocationSVG />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-gray-600 text-lg">
                <CalenderSVG />
                <span>
                  {event.startDateTime && event.startDateTime.toDate
                    ? new Date(
                        event.startDateTime.toDate()
                      ).toLocaleDateString()
                    : event.startDateTime}
                  {event.endDateTime && event.endDateTime.toDate
                    ? " - " +
                      new Date(event.endDateTime.toDate()).toLocaleDateString()
                    : ""}
                </span>
              </div>
              <div className="flex items-center text-gray-600 text-lg">
                <TagSVG />
                <span>{event.category}</span>
              </div>
              {event.isUpcoming ? (
                <div className="inline-block bg-accent-yellow text-white px-4 py-1 rounded-full text-sm font-semibold mt-2 max-w-fit">
                  Upcoming Event
                </div>
              ) : (
                <div className="inline-block bg-gray-400 text-white px-4 py-1 rounded-full text-sm font-semibold mt-2 max-w-fit">
                  Past Event
                </div>
              )}
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-semibold mb-2">About this event</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {event.description}
              </p>
            </div>

            {event.additionalImgURLs && event.additionalImgURLs.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.additionalImgURLs.map((imgUrl, index) => (
                    <div
                      key={index}
                      className="relative h-40 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center"
                    >
                      <Image
                        src={imgUrl || "/placeholder.png"}
                        alt={`Event gallery image ${index + 1}`}
                        className="w-full h-full object-contain"
                        width={400}
                        height={200}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border border-gray-200  bg-white shadow-2xl rounded-3xl p-2">
            <textarea
              name="comment"
              id="comment"
              placeholder="💭Share your thoughts on this event!....."
              className="outline-none w-full p-4"
              rows={2}
            ></textarea>
            <div className="flex items-center justify-end gap-2">
              <button
                title="View comments"
                className="bg-violet-950 flex mb-1 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-violet-900"
              >
                <AiOutlineComment size={16} />
              </button>
              <button
                title="Send comment"
                className="bg-violet-950 flex mb-1 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-violet-900"
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
