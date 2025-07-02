"use client";

import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../(services)/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  fetchAllEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  uploadImage,
} from "../(services)/eventService";
import Event from "../Types/Event";
import Modal from "../(components)/Modal";
import LoadingIcon from "../(components)/LoadingIcon";

const PREDEFINED_CATEGORIES = [
  "Health",
  "Talk/Seminar",
  "Religious",
  "Entertainment",
  "Club",
  "Sports",
];

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);

  // form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState(PREDEFINED_CATEGORIES[0]);
  const [customCategory, setCustomCategory] = useState("");
  const [startDateTime, setStartDateTime] = useState<Date | null>(null);
  const [endDateTime, setEndDateTime] = useState<Date | null>(null);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // check admin
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/");
        return;
      }
      const adminDoc = await getDoc(doc(db, "admins", user.uid));
      if (adminDoc.exists()) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        router.push("/");
      }
    });
    return () => unsub();
  }, [router]);

  // fetch events when admin verified
  useEffect(() => {
    if (isAdmin) {
      (async () => {
        try {
          const data = await fetchAllEvents();
          setEvents(data);
        } catch (err) {
          if (err instanceof Error) setError("Failed to fetch events");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isAdmin]);

  const openAddModal = () => {
    resetForm();
    setEditingEvent(null);
    setShowModal(true);
  };

  const openEditModal = (ev: Event) => {
    setEditingEvent(ev);
    setName(ev.name || "");
    setDescription(ev.description || "");
    setLocation(ev.location || "");
    if (ev.category && PREDEFINED_CATEGORIES.includes(ev.category)) {
      setCategory(ev.category);
      setCustomCategory("");
    } else {
      setCategory(PREDEFINED_CATEGORIES[0]);
      setCustomCategory(ev.category || "");
    }
    setStartDateTime(ev.startDateTime ? new Date(ev.startDateTime) : null);
    setEndDateTime(ev.endDateTime ? new Date(ev.endDateTime) : null);
    setShowModal(true);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setLocation("");
    setCategory(PREDEFINED_CATEGORIES[0]);
    setCustomCategory("");
    setStartDateTime(null);
    setEndDateTime(null);
    setMainImage(null);
    setFormError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (additionalFileInputRef.current)
      additionalFileInputRef.current.value = "";
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!name || !description || !location || !startDateTime || !endDateTime) {
      setFormError("Please fill in required fields");
      return;
    }
    setSaving(true);
    try {
      let imgURL = editingEvent?.imgURL || "";
      if (!editingEvent && !mainImage) {
        setFormError("Main image required");
        setSaving(false);
        return;
      }
      if (mainImage) imgURL = await uploadImage(mainImage);
      const finalCategory = customCategory.trim() || category;
      const payload: Omit<Event, "id"> = {
        name,
        description,
        location,
        category: finalCategory,
        startDateTime,
        endDateTime,
        imgURL,
      };
      if (editingEvent) {
        await updateEvent(editingEvent.id, payload);
      } else {
        await addEvent(payload);
      }
      const data = await fetchAllEvents();
      setEvents(data);
      setShowModal(false);
    } catch (err) {
      if (err instanceof Error) {
        setFormError("Save failed");
      }
    } finally {
      setSaving(false);
    }
  };

  if (isAdmin === null || loading) return <LoadingIcon />;

  return (
    <div className="max-w-5xl mx-auto py-8 mt-13">
      <h1 className="text-3xl font-bold mb-6">Admin - Manage Events</h1>
      <button
        className="mb-4 px-4 py-2 bg-primary-blue text-white rounded hover:bg-primary-blue-700"
        onClick={openAddModal}
      >
        Add Event
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
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
              <tr key={ev.id} className="border-b">
                <td className="p-2 border">{ev.name}</td>
                <td className="p-2 border">{ev.category}</td>
                <td className="p-2 border">
                  {ev.startDateTime
                    ? new Date(ev.startDateTime).toLocaleString()
                    : ""}
                </td>
                <td className="p-2 border">
                  {ev.endDateTime
                    ? new Date(ev.endDateTime).toLocaleString()
                    : ""}
                </td>
                <td className="p-2 border flex gap-2">
                  <button
                    className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500 text-white"
                    onClick={() => openEditModal(ev)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 rounded hover:bg-red-600 text-white"
                    onClick={() => handleDelete(ev.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingEvent ? "Edit Event" : "Add Event"}
      >
        <form
          onSubmit={handleSave}
          className="flex flex-col gap-3 max-h-[80vh] overflow-y-auto pr-2"
        >
          <input
            className="border p-2 rounded"
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="border p-2 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div>
            <select
              className="border p-2 rounded w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={!!customCategory.trim()}
            >
              {PREDEFINED_CATEGORIES.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <input
              className="border p-2 rounded mt-2 w-full"
              placeholder="Custom category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <input
              type="datetime-local"
              className="border p-2 rounded w-full"
              value={startDateTime?.toLocaleString()}
              onChange={(e) => setStartDateTime(new Date(e.target.value))}
            />
            <input
              type="datetime-local"
              className="border p-2 rounded w-full"
              value={endDateTime?.toLocaleString()}
              onChange={(e) => setEndDateTime(new Date(e.target.value))}
            />
          </div>
          <div>
            <label className="block mb-1">
              Main Image {editingEvent ? "(leave blank to keep)" : ""}
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => setMainImage(e.target.files?.[0] || null)}
            />
          </div>
          <div></div>
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          <button
            disabled={saving}
            className="bg-primary-blue text-white rounded py-2 hover:bg-primary-blue-700"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
