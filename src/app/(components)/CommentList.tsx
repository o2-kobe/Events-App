import { Timestamp } from "firebase/firestore";
import Comment from "../Types/Comment";
import { AiOutlineComment } from "react-icons/ai";
import CommentListItem from "./CommentListItem";

export default function CommentList({ comments }: { comments: Comment[] }) {
  const formatTimestamp = (timestamp: Timestamp | Date | null) => {
    if (!timestamp) return "Just now";

    const date =
      timestamp instanceof Timestamp
        ? timestamp.toDate()
        : timestamp instanceof Date
        ? timestamp
        : new Date(timestamp as string | number | Date);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <AiOutlineComment size={48} className="mx-auto mb-2 opacity-50" />
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        comments.map((comment) => (
          <CommentListItem
            key={comment.id}
            userName={comment.userName}
            content={comment.content}
            timestamp={formatTimestamp(comment.timestamp)}
          />
        ))
      )}
    </div>
  );
}
