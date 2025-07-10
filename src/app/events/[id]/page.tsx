"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

import LoadingIcon from "../../(components)/LoadingIcon";
import BackArrowSVG from "../../(components)/BackArrowSVG";
import LocationSVG from "../../(components)/LocationSVG";
import CalenderSVG from "../../(components)/CalendarSVG";
import TagSVG from "../../(components)/TagSVG";
import EventNotFound from "../../(components)/EventNotFound";
import Image from "next/image";
import { FiBell } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import CommentForm from "../../(components)/CommentForm";
import CommentSection from "../../(components)/CommentSection";

import { useRouter } from "next/navigation";
import useOneEvent from "@/app/(hooks)/useOneEvent";

export default function EventDetails() {
  const params = useParams();
  const router = useRouter();

  const {
    isUpcoming,
    isLoggedIn,
    alerted,
    removeReminder,
    addReminder,
    event,
    startDate,
    endDate,
    handleShare,
    showComments,
    loading,
    setShowComments,
  } = useOneEvent();

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

        {isUpcoming ? (
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
                <span>{event.location || "N/A"}</span>
              </div>
              <div className="flex items-center text-gray-600 text-lg">
                <CalenderSVG />
                <span>
                  {(() => {
                    return (
                      <>
                        {startDate ? startDate.toLocaleDateString() : ""}
                        {endDate ? ` - ${endDate.toLocaleDateString()}` : ""}
                      </>
                    );
                  })()}
                </span>
              </div>
              <div className="flex items-center text-gray-600 text-lg">
                <TagSVG />
                <span>{event.category || "N/A"}</span>
              </div>
              {/* Share Event Button */}
              <button
                onClick={handleShare}
                className="cursor-pointer flex items-center gap-2 bg-gray-200 text-primary-blue hover:bg-gray-100 px-4 py-1 rounded-lg shadow-2xl w-fit"
                type="button"
                aria-label="Share event"
              >
                <FiShare2 size={16} />
                <span>Share</span>
              </button>
              {isUpcoming ? (
                <div className="inline-block bg-accent-yellow text-white px-4 py-1 rounded-full text-sm font-semibold mt-2 max-w-fit">
                  Upcoming Event
                </div>
              ) : (
                <div className="inline-block bg-gray-400 text-white px-4 py-1 rounded-full text-sm font-semibold mt-2 max-w-fit">
                  Past Event
                </div>
              )}
            </div>

            <div className="w-full mb-8">
              <h2 className="text-2xl font-semibold mb-2">About this event</h2>
              <p className="text-gray-700 text-lg leading-relaxed break-words">
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
      <CommentSection eventID={params.id as string} isVisible={showComments} />
    </div>
  );
}
