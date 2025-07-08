"use client";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import LoadingIcon from "../(components)/LoadingIcon";
import Modal from "../(components)/Modal";
import useProfile from "../(hooks)/useProfile";

function Page() {
  const {
    user,
    handleLogout,
    handleDeleteAccount,
    isAdmin,
    showDeleteModal,
    setShowDeleteModal,
    deleting,
    confirmDeleteAccount,
    loading,
  } = useProfile();

  if (loading) {
    return <LoadingIcon />;
  }
  return (
    <div className="flex flex-col gap-4 w-[80%] mx-auto mt-[15%] sm:mt-[17%] sm:w-[60%] lg:mt-[5%] xl:w-[40%]">
      <div className="border border-[#d2cece] border-solid rounded-lg p-4">
        <div className="flex flex-col items-center">
          <UserCircleIcon className="h-20 w-20 text-black outline-amber-950" />
          <p className="text-2xl font-semibold">Account</p>
        </div>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-4">
            <span className="w-24">Username</span>
            <input
              type="text"
              className="px-2 py-1 focus:outline-none"
              value={user?.username || ""}
              readOnly
            />
          </label>
          <label className="flex items-center gap-4">
            <span className="w-24">Email</span>
            <input
              type="email"
              className="px-2 py-1 focus:outline-none"
              value={user?.email || ""}
              readOnly
            />
          </label>
          <button
            onClick={handleLogout}
            className="bg-violet-950 text-white rounded-[0.3rem] py-2 cursor-pointer hover:bg-primary-blue/90 transition-all duration-300"
          >
            Log out
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 border border-[#d2cece] border-solid rounded-lg p-4">
        <p className="font-medium">Account Deletion</p>
        <p className="text-red-400">
          Deleting your account is permanent. All your data will be lost and
          cannot be recovered.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-500 rounded-[0.3rem] p-2 text-white w-[50%] cursor-pointer hover:bg-red-400 transition duration-300"
        >
          Delete Account
        </button>
      </div>
      {isAdmin && (
        <Link href="/admin">
          <button className="bg-violet-950 text-white rounded-[0.3rem] py-2 px-4 cursor-pointer hover:bg-primary-blue-700">
            Admin Dashboard
          </button>
        </Link>
      )}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Account Deletion"
      >
        <p className="mb-4 text-red-400 font-medium">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <div className="flex gap-4 justify-end">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => setShowDeleteModal(false)}
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition duration-300"
            onClick={confirmDeleteAccount}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Page;
