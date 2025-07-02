"use client";

import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../(services)/firebaseConfig";
import { AiOutlineComment } from "react-icons/ai";
import { FaPaperPlane } from "react-icons/fa";
import { useSession } from "../(context)/SessionContext";

interface CommentFormProps {
  eventId: string;
  onCommentAdded?: () => void;
  onToggleComments?: () => void;
}

export default function CommentForm({
  eventId,
  onCommentAdded,
  onToggleComments,
}: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user] = useAuthState(auth);
  const { isLoggedIn } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !comment.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "comments"), {
        eventID: eventId,
        userID: user.uid,
        content: comment.trim(),
        timestamp: serverTimestamp(),
      });

      setComment("");
      onCommentAdded?.();
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-200 bg-white shadow-2xl rounded-3xl p-2"
    >
      <textarea
        name="comment"
        id="comment"
        placeholder={
          isLoggedIn
            ? "💭Share your thoughts on this event!.."
            : "🔒Log in to comment"
        }
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="outline-none w-full p-4"
        rows={2}
        maxLength={500}
        disabled={!user || isSubmitting}
      />
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-gray-500 ml-4">
          {comment.length}/500 characters
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="View comments"
            onClick={onToggleComments}
            className="bg-violet-950 flex mb-1 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-violet-900"
          >
            <AiOutlineComment size={16} />
          </button>
          <button
            type="submit"
            title="Send comment"
            disabled={!user || !comment.trim() || isSubmitting}
            className="bg-violet-950 flex mb-1 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-violet-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FaPaperPlane size={16} />
          </button>
        </div>
      </div>
    </form>
  );
}
