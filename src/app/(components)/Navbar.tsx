import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-3 py-1 shadow">
      <Link href="/">Events GCTU</Link>
      <div className="flex gap-7 items-center font-semibold">
        <Link href="/events">Events</Link>
        <Link href="/about">About</Link>
        <Link
          href="/login"
          className="py-2 px-4 rounded-full text-sm bg-violet-950 text-white"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
