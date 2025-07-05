interface CommentListItemProps {
  userName?: string;
  content: string;
  timestamp: string;
}

export default function CommentListItem({
  userName,
  content,
  timestamp,
}: CommentListItemProps) {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-b-0">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">
              {userName?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {userName || "Unknown User"}
            </p>
            <p className="text-xs text-gray-500">{timestamp}</p>
          </div>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed ml-10">{content}</p>
    </div>
  );
}
