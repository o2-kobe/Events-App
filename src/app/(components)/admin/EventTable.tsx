"use client";
import Event from "../../Types/Event";
import { formatFirestoreTimestamp, formatDate } from "../../(utils)/helpers";

interface EventTableProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (eventID: string) => void;
}

export default function EventTable({
  events,
  onEdit,
  onDelete,
}: EventTableProps) {
  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 hidden md:table-header-group">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Start</th>
            <th className="p-2 border">End</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b flex flex-col md:table-row">
              <td className="p-2 border" data-label="Title">
                {event.name}
              </td>
              <td className="p-2 border" data-label="Category">
                {event.category}
              </td>
              <td className="p-2 border" data-label="Start">
                {event.startDateTime
                  ? formatDate(formatFirestoreTimestamp(event.startDateTime))
                  : ""}
              </td>
              <td className="p-2 border" data-label="End">
                {event.endDateTime
                  ? formatDate(formatFirestoreTimestamp(event.endDateTime))
                  : ""}
              </td>
              <td className="p-2 border flex gap-2" data-label="Actions">
                <button
                  className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500 text-white"
                  onClick={() => onEdit(event)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 rounded hover:bg-red-600 text-white"
                  onClick={() => onDelete(event.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
