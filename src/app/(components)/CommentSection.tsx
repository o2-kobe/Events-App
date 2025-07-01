"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../(services)/firebaseConfig";
import Comment from "../Types/Comment";
import { AiOutlineComment } from "react-icons/ai";

interface CommentSectionProps {
  eventId: string;
  isVisible: boolean;
}

export default function CommentSection({
  eventId,
  isVisible,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);

  // Fetch comments for this event
  useEffect(() => {
    if (!isVisible) return;

    const q = query(
      collection(db, "comments"),
      where("eventID", "==", eventId),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const commentPromises = snapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();
        try {
          const userDoc = await getDoc(doc(db, "users", data.userID));
          const userName = userDoc.exists()
            ? (userDoc.data() as any)?.username || "Unknown User"
            : "Unknown User";

          return {
            id: docSnapshot.id,
            eventID: data.eventID,
            userID: data.userID,
            content: data.content,
            timestamp: data.timestamp,
            userName,
          } as Comment;
        } catch (error) {
          console.error("Error fetching user:", error);
          return {
            id: docSnapshot.id,
            eventID: data.eventID,
            userID: data.userID,
            content: data.content,
            timestamp: data.timestamp,
            userName: "Unknown User",
          } as Comment;
        }
      });

      const comments = await Promise.all(commentPromises);
      setComments(comments);
    });

    return () => unsubscribe();
  }, [eventId, isVisible]);

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return "Just now";

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  if (!isVisible) return null;

  return (
    <div className="border border-gray-200 bg-white shadow-2xl rounded-3xl p-6 mt-4">
      <div className="flex items-center gap-2 mb-4">
        <AiOutlineComment size={20} className="text-gray-600" />
        <h3 className="text-xl font-semibold text-gray-800">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <AiOutlineComment size={48} className="mx-auto mb-2 opacity-50" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="border-b border-gray-100 pb-4 last:border-b-0"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {comment.userName?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {comment.userName || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTimestamp(comment.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed ml-10">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
