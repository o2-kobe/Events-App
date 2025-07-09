"use client";
import Event from "../../Types/Event";
import { formatFirestoreTimestamp, formatDate } from "../../(utils)/helpers";

interface EventTableProps {
  events: Event[];
  onEdit: (ev: Event) => void;
  onDelete: (id: string) => void;
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
          {events.map((ev) => (
            <tr key={ev.id} className="border-b flex flex-col md:table-row">
              <td className="p-2 border" data-label="Title">
                {ev.name}
              </td>
              <td className="p-2 border" data-label="Category">
                {ev.category}
              </td>
              <td className="p-2 border" data-label="Start">
                {ev.startDateTime
                  ? formatDate(formatFirestoreTimestamp(ev.startDateTime))
                  : ""}
              </td>
              <td className="p-2 border" data-label="End">
                {ev.endDateTime
                  ? formatDate(formatFirestoreTimestamp(ev.endDateTime))
                  : ""}
              </td>
              <td className="p-2 border flex gap-2" data-label="Actions">
                <button
                  className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500 text-white"
                  onClick={() => onEdit(ev)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 rounded hover:bg-red-600 text-white"
                  onClick={() => onDelete(ev.id)}
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
