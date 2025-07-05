"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../(services)/firebaseConfig";
import Comment from "../Types/Comment";
import { AiOutlineComment } from "react-icons/ai";
import CommentList from "./CommentList";

interface CommentSectionProps {
  eventID: string;
  isVisible: boolean;
}

export default function CommentSection({
  eventID,
  isVisible,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch comments for this event
  useEffect(() => {
    if (!isVisible) return;

    const q = query(
      collection(db, "comments"),
      where("eventID", "==", eventID),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const commentPromises = snapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();
        return {
          id: docSnapshot.id,
          eventID: data.eventID,
          userID: data.userID,
          content: data.content,
          timestamp: data.timestamp,
          userName: data.userName,
        } as Comment;
      });

      const comments = await Promise.all(commentPromises);
      setComments(comments);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [eventID, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="border border-gray-200 bg-white shadow-2xl rounded-3xl p-6 mt-4">
      <div className="flex items-center gap-2 mb-4">
        <AiOutlineComment size={20} className="text-gray-600" />
        <h3 className="text-xl font-semibold text-gray-800">
          Comments ({comments.length})
        </h3>
      </div>
      {loading ? (
        <p className="text-gray-500 italic animate-pulse text-center py-4">
          Loading comments...
        </p>
      ) : (
        <CommentList comments={comments} />
      )}
    </div>
  );
}
