import Link from "next/link";

export default function EventNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Event not found</h1>
      <Link
        href="/events"
        className="text-primary-blue hover:text-primary-blue/80"
      >
        Back to Events
      </Link>
    </div>
  );
}
