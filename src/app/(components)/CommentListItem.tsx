import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { FaTrash } from "react-icons/fa";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../(services)/firebaseConfig";
import toast from "react-hot-toast";
import ConfirmationModal from "./ConfirmationModal";

interface CommentListItemProps {
  username?: string;
  content: string;
  timestamp: string;
  userID?: string;
  commentID: string;
}

export default function CommentListItem({
  username,
  content,
  timestamp,
  userID,
  commentID,
}: CommentListItemProps) {
  const [user] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);

  const sendErrorToast = (error: string) =>
    toast.error("Failed to delete comment: " + error);

  const handleDelete = async (commentID: string) => {
    try {
      const commentDocRef = doc(db, "comments", commentID);
      await deleteDoc(commentDocRef);
      setShowModal(false);
    } catch (error) {
      if (error instanceof Error) {
        sendErrorToast(error.message);
      } else {
        sendErrorToast(String(error));
      }
    }
  };

  return (
    <div className="border-b border-gray-100 pb-4 last:border-b-0">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">
              {username?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {username || "Unknown User"}
            </p>
            <p className="text-xs text-gray-500">{timestamp}</p>
          </div>
        </div>
        {user && user.uid === userID && (
          <>
            <button
              title="Delete comment"
              onClick={() => setShowModal(true)}
              className="ml-2 text-red-500 hover:text-red-700 p-1 rounded-full focus:outline-none cursor-pointer"
              aria-label="Delete comment"
            >
              <FaTrash size={16} />
            </button>
            <ConfirmationModal
              showModal={showModal}
              setShowModal={setShowModal}
              title="Delete Comment"
              text="Are you sure you want to delete this comment?"
              onConfirm={() => handleDelete(commentID)}
            />
          </>
        )}
      </div>
      <p className="text-gray-700 leading-relaxed ml-10">{content}</p>
    </div>
  );
}
