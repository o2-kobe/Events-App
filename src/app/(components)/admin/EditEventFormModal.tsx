"use client";
import { useRef, useState } from "react";
import Event from "../../Types/Event";
import Modal from "../Modal";
import { uploadImage } from "../../(services)/eventService";
import { EVENT_CATEGORIES } from "../../(utils)/constants";
import { EVENT_LOCATIONS } from "../../(utils)/constants";

interface EditEventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initial?: Event | null;
  onSave: (payload: Omit<Event, "id">, id?: string) => Promise<void>;
}

export default function EventFormModal({
  isOpen,
  onClose,
  initial,
  onSave,
}: EditEventFormModalProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const addRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initial?.name || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [location, setLocation] = useState(
    initial?.location && EVENT_LOCATIONS.includes(initial.location)
      ? initial.location
      : EVENT_LOCATIONS[0]
  );
  const [customLocation, setCustomLocation] = useState(
    initial?.location && !EVENT_LOCATIONS.includes(initial.location)
      ? initial.location
      : ""
  );
  const [category, setCategory] = useState(
    initial?.category && EVENT_CATEGORIES.includes(initial.category)
      ? initial.category
      : EVENT_CATEGORIES[0]
  );
  const [customCategory, setCustomCategory] = useState(
    initial?.category && !EVENT_CATEGORIES.includes(initial.category)
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
    setCategory(EVENT_CATEGORIES[0]);
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
      const finalLocation = customLocation.trim() || location;
      await onSave(
        {
          name,
          description,
          location: finalLocation,
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
      isOpen={isOpen}
      onClose={onClose}
      title={initial ? "Edit Event" : "Add Event"}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-h-[80vh] overflow-y-auto pr-2"
      >
        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
          <label className="block mb-1">Category</label>
          <select
            className="border p-2 rounded w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={!!customCategory.trim()}
          >
            {EVENT_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <input
            className="border p-2 rounded mt-2 w-full"
            placeholder="Custom category (type to use custom)"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            disabled={
              !!category &&
              category !== EVENT_CATEGORIES[0] &&
              !customCategory.trim()
            }
          />
        </div>
        <div>
          <label className="block mb-1">Location</label>
          <select
            className="border p-2 rounded w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={!!customLocation.trim()}
          >
            {EVENT_LOCATIONS.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>
          <input
            className="border p-2 rounded mt-2 w-full"
            placeholder="Custom location (type to use custom)"
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
            disabled={
              !!location &&
              location !== EVENT_LOCATIONS[0] &&
              !customLocation.trim()
            }
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
            required={!initial}
            className="border p-2 rounded w-full"
            onChange={(e) => setMainImage(e.target.files?.[0] || null)}
          />
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
