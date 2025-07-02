"use client";

import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import { auth, db } from "../../(services)/firebaseConfig";
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
import { FiBell } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import CommentForm from "../../(components)/CommentForm";
import CommentSection from "../../(components)/CommentSection";
import toast from "react-hot-toast";
import { useSession } from "@/app/(context)/SessionContext";
import { useRouter } from "next/navigation";

export default function EventDetails() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [alerted, setAlerted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { isLoggedIn } = useSession();
  const router = useRouter();

  const sendToast = () =>
    alerted
      ? toast.error("Unsubscribed from notifications")
      : toast.success("You'll receive notifications for this event");

  const addReminder = async () => {
    const reminderRef = doc(
      db,
      "reminders",
      `${auth.currentUser?.uid}_${params.id}`
    );
    await setDoc(reminderRef, {
      eventID: params.id,
      userID: auth.currentUser?.uid,
    });
    setAlerted(true);
    sendToast();
  };

  const removeReminder = async () => {
    await deleteDoc(
      doc(db, "reminders", `${auth.currentUser?.uid}_${params.id}`)
    );
    setAlerted(false);
    sendToast();
  };

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

    if (auth.currentUser) {
      const checkReminder = async () => {
        const q = query(
          collection(db, "reminders"),
          where("userID", "==", auth.currentUser?.uid),
          where("eventID", "==", params.id)
        );
        const snapshot = await getDocs(q);
        setAlerted(!snapshot.empty);
      };
      checkReminder();
    }

    fetchEvent();
  }, [params.id, isLoggedIn]);

  if (loading) {
    return <LoadingIcon />;
  }

  if (!event) {
    return <EventNotFound />;
  }

  const start =
    event?.startDateTime &&
    typeof event.startDateTime === "object" &&
    "toDate" in event.startDateTime
      ? (event.startDateTime as { toDate: () => Date }).toDate()
      : new Date(event?.startDateTime as string | Date);

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

        {start && start > new Date() ? (
          <span
            onClick={() => {
              if (isLoggedIn) {
                if (alerted) {
                  removeReminder();
                } else {
                  addReminder();
                }
              } else {
                router.push("/login");
              }
            }}
            className="flex items-center gap-1 bg-gray-200 text-primary-blue hover:bg-gray-100 cursor-pointer px-2 py-1 rounded-lg shadow-2xl "
          >
            {!alerted ? "Get event alert" : "Alert set"}
            {alerted ? <FaBell size={16} /> : <FiBell size={16} />}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Image */}
        <div className="flex-1 w-full lg:w-1/2 max-w-lg bg-white rounded-3xl shadow-2xl">
          <Image
            src={event.imgURL || "/placeholder.webp"}
            alt={event.name || ""}
            className="object-contain w-full h-full rounded-2xl"
            width={600}
            height={400}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
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
                  {event.startDateTime
                    ? typeof event.startDateTime === "string"
                      ? new Date(event.startDateTime).toLocaleDateString()
                      : event.startDateTime instanceof Date
                      ? event.startDateTime.toLocaleDateString()
                      : ""
                    : ""}
                  {event.endDateTime
                    ? " - " +
                      (typeof event.endDateTime === "string"
                        ? new Date(event.endDateTime).toLocaleDateString()
                        : event.endDateTime instanceof Date
                        ? event.endDateTime.toLocaleDateString()
                        : "")
                    : ""}
                </span>
              </div>
              <div className="flex items-center text-gray-600 text-lg">
                <TagSVG />
                <span>{event.category}</span>
              </div>
              {event.endDateTime && new Date(event.endDateTime) < new Date() ? (
                <div className="inline-block bg-gray-400 text-white px-4 py-1 rounded-full text-sm font-semibold mt-2 max-w-fit">
                  Past Event
                </div>
              ) : (
                <div className="inline-block bg-accent-yellow text-white px-4 py-1 rounded-full text-sm font-semibold mt-2 max-w-fit">
                  Upcoming Event
                </div>
              )}
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-semibold mb-2">About this event</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>

          <CommentForm
            eventId={params.id as string}
            onCommentAdded={() => setShowComments(true)}
            onToggleComments={() => setShowComments(!showComments)}
          />
        </div>
      </div>
      <CommentSection eventId={params.id as string} isVisible={showComments} />
    </div>
  );
}
