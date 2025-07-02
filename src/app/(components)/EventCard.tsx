import Event from "../Types/Event";
import LocationSVG from "./LocationSVG";
import CalenderSVG from "./CalendarSVG";
import Image from "next/image";

interface EventCardProps {
  event: Event;
  onClick: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const imgURL = event?.imgURL;
  const name = event?.name || "N/A";
  const location = event.location || "N/A";

  const startDate: Date = (event.startDateTime as any)?.toDate
    ? (event.startDateTime as any).toDate()
    : new Date(event.startDateTime);
  const endDate: Date | undefined = event.endDateTime
    ? (event.endDateTime as any)?.toDate
      ? (event.endDateTime as any).toDate()
      : new Date(event.endDateTime)
    : undefined;

  const isUpcoming = startDate > new Date();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  const startDateString = formatDate(startDate);
  const endDateString = endDate ? formatDate(endDate) : null;

  return (
    <div
      key={event.id}
      onClick={() => onClick(event.id)}
      className="group relative bg-card-background rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer max-w-md w-full"
    >
      <div className="relative h-96 w-full">
        <Image
          src={imgURL || "/placeholder.webp"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={600}
          height={400}
        />
        {isUpcoming && (
          <div className="absolute top-4 right-4 bg-accent-yellow text-white px-3 py-1 rounded-full text-sm font-semibold">
            Upcoming
          </div>
        )}
        {!isUpcoming && (
          <div className="absolute top-4 right-4 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold opacity-90">
            Past Event
          </div>
        )}
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-3 text-primary-blue line-clamp-2">
          {name}
        </h2>
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <LocationSVG />
            <span className="text-gray-700">{location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CalenderSVG />
            <span className="text-gray-700">
              {startDateString}
              {endDateString && ` - ${endDateString}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
