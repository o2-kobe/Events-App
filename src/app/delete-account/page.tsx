import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function page() {
  return (
    <div className="flex flex-col gap-4 w-[80%] mx-auto mt-[15%] sm:mt-[17%] sm:w-[60%] lg:mt-[5%] xl:w-[40%]">
      <span className="flex justify-between px-4">
        <p>Manage Account</p>
        <p>Reminders</p>
      </span>
      <div className="border border-[#d2cece] border-solid rounded-lg p-4">
        <div className="flex flex-col items-center">
          <UserCircleIcon className="h-20 w-20 text-black outline-amber-950" />
          <p className="text-2xl font-semibold">Account</p>
        </div>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-4">
            <span className="w-24">Username</span>
            <input type="text" className="px-2 py-1 focus:outline-none" />
          </label>
          <label className="flex items-center gap-4">
            <span className="w-24">Email</span>
            <input type="email" className="px-2 py-1 focus:outline-none" />
          </label>

          <Link href="#" className="text-red-400">
            Reset Password
          </Link>
          <button className="bg-[#335c85] rounded-[0.3rem] py-2 cursor-pointer">
            Log out
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 border border-[#d2cece] border-solid rounded-lg p-4">
        <p className="font-medium">Account Deletion</p>
        <p className="text-red-300">
          Deleting your account is permanent. All your data will be lost and
          cannot be recovered.
        </p>
        <button className="bg-[#e73f3f] rounded-[0.3rem] p-2 text-white w-[50%] cursor-pointer">
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default page;
