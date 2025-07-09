"use client";
import { useRef, useState } from "react";
import Event from "../../Types/Event";
import Modal from "../Modal";
import { EVENT_CATEGORIES } from "../../(utils)/constants";
import { EVENT_LOCATIONS } from "../../(utils)/constants";

interface AddEventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<Event, "id">, imageFile: File) => Promise<void>;
}

export default function AddEventFormModal({
  isOpen,
  onClose,
  onSave,
}: AddEventFormModalProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(EVENT_LOCATIONS[0]);
  const [customLocation, setCustomLocation] = useState("");
  const [category, setCategory] = useState(EVENT_CATEGORIES[0]);
  const [customCategory, setCustomCategory] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const reset = () => {
    setName("");
    setDescription("");
    setLocation(EVENT_LOCATIONS[0]);
    setCategory(EVENT_CATEGORIES[0]);
    setCustomCategory("");
    setStartDateTime("");
    setEndDateTime("");
    setImage(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalCategory = customCategory.trim() || category;
    const finalLocation = customLocation.trim() || location;

    const event = {
      name,
      description,
      location: finalLocation,
      category: finalCategory,
      startDateTime,
      endDateTime,
    };

    await onSave(event, image as File);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={"Add Event"}>
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
          <label className="block mb-1">Event Image</label>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            required
            className="border p-2 rounded w-full"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>
        <button
          type="submit"
          className="bg-primary-blue text-white rounded py-2 hover:bg-primary-blue-700"
        >
          Save
        </button>
      </form>
    </Modal>
  );
}
