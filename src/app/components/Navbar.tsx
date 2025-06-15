import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-white/20 backdrop-blur-sm text-white rounded-lg px-4 py-2">
      <div className="flex gap-5 items-center justify-center font-semibold text-lg ">
        <Link
          href="/about"
          className="hover:text-xl transition-all duration-[0.3s]"
        >
          About
        </Link>
        <Link
          href="/events"
          className="hover:text-xl transition-all duration-[0.3s]"
        >
          Events
        </Link>
        <Link
          href="/news"
          className="hover:text-xl transition-all duration-[0.3s]"
        >
          News
        </Link>
      </div>
    </div>
  );
}
