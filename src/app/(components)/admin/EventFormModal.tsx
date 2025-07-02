"use client";
import { useRef, useState } from "react";
import Event from "../../Types/Event";
import Modal from "../Modal";
import { uploadImage } from "../../(services)/eventService";

const PREDEFINED_CATEGORIES = [
  "Health",
  "Talk/Seminar",
  "Religious",
  "Entertainment",
  "Club",
  "Sports",
];

interface Props {
  open: boolean;
  onClose: () => void;
  initial?: Event | null;
  onSave: (payload: Omit<Event, "id">, id?: string) => Promise<void>;
}

export default function EventFormModal({
  open,
  onClose,
  initial,
  onSave,
}: Props) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const addRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [location, setLocation] = useState(initial?.location || "");
  const [category, setCategory] = useState(
    initial?.category && PREDEFINED_CATEGORIES.includes(initial.category)
      ? initial.category
      : PREDEFINED_CATEGORIES[0]
  );
  const [customCategory, setCustomCategory] = useState(
    initial?.category && !PREDEFINED_CATEGORIES.includes(initial.category)
      ? initial.category
      : ""
  );
  const [startDateTime, setStartDateTime] = useState(
    initial?.startDateTime
      ? new Date(initial.startDateTime).toISOString().slice(0, 16)
      : ""
  );
  const [endDateTime, setEndDateTime] = useState(
    initial?.endDateTime
      ? new Date(initial.endDateTime).toISOString().slice(0, 16)
      : ""
  );
  const [mainImage, setMainImage] = useState<File | null>(null);

  const reset = () => {
    setName("");
    setDescription("");
    setLocation("");
    setCategory(PREDEFINED_CATEGORIES[0]);
    setCustomCategory("");
    setStartDateTime("");
    setEndDateTime("");
    setMainImage(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
    if (addRef.current) addRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !location || !startDateTime || !endDateTime) {
      setError("Fill required fields");
      return;
    }
    setSaving(true);
    try {
      let imgURL = initial?.imgURL || "";
      if (!initial && !mainImage) {
        setError("Main image required");
        setSaving(false);
        return;
      }
      if (mainImage) imgURL = await uploadImage(mainImage);
      const finalCategory = customCategory.trim() || category;
      await onSave(
        {
          name,
          description,
          location,
          category: finalCategory,
          startDateTime,
          endDateTime,
          imgURL,
        },
        initial?.id
      );
      reset();
      onClose();
    } catch {
      setError("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={initial ? "Edit Event" : "Add Event"}
    >
      <form
        onSubmit={handleSubmit}
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
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
          />
          <input
            type="datetime-local"
            className="border p-2 rounded w-full"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">
            Main Image {initial ? "(leave blank to keep)" : ""}
          </label>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={(e) => setMainImage(e.target.files?.[0] || null)}
          />
        </div>
        <div>
          <label className="block mb-1">Additional Images</label>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          disabled={saving}
          className="bg-primary-blue text-white rounded py-2 hover:bg-primary-blue-700"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </Modal>
  );
}
