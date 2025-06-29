import { SiGoogleplay, SiAppstore } from "react-icons/si";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#0f3c4c] text-white p-4 sm:px-20 ">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold">About Us</p>
          <p>
            eventGCTU is a platform dedicated to showcasing GCTU&apos;s events,
            making it easy for students to stay informed and participate in
            activities that matter.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:gap-x-4 sm:grid-cols-4">
          <div className="flex flex-col gap-1.5">
            <p className="font-semibold">Quick Links</p>
            <ul>
              <li>Home</li>
              <li>Events</li>
              <li>About</li>
            </ul>
          </div>

          <div className="flex flex-col gap-1.5 pb-4">
            <p className="font-semibold">Contact Us</p>
            <p>
              Have questions or feedback? Reach out to us at:
              eventgctu@gmail.com
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="font-semibold">Install App</p>
            <ul className="flex gap-2">
              <Link href="#">
                <SiGoogleplay className="text-white text-3xl" />
              </Link>
              <Link href="#">
                <SiAppstore className="text-white text-3xl" />
              </Link>
            </ul>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="font-semibold">Copyright Notice</p>
            <p>© 2025 eventGCTU. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
