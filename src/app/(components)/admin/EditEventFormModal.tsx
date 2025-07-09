"use client";
import { useEffect, useRef, useState } from "react";
import Event from "../../Types/Event";
import Modal from "../Modal";
import { formatFirestoreTimestamp } from "../../(utils)/helpers";
import { EVENT_CATEGORIES } from "../../(utils)/constants";
import { EVENT_LOCATIONS } from "../../(utils)/constants";

interface EditEventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  onSave: (
    eventID: string,
    event: Omit<Event, "id">,
    imageFile: File | null
  ) => Promise<void>;
}

export default function EditEventFormModal({
  isOpen,
  onClose,
  event,
  onSave,
}: EditEventFormModalProps) {
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

  // Reset form values when modal is closed or event changes
  useEffect(() => {
    if (isOpen && event) {
      setName(event.name || "");
      setDescription(event.description || "");
      setLocation(
        event.location && EVENT_LOCATIONS.includes(event.location)
          ? event.location
          : EVENT_LOCATIONS[0]
      );
      setCustomLocation(
        event.location && !EVENT_LOCATIONS.includes(event.location)
          ? event.location
          : ""
      );
      setCategory(
        event.category && EVENT_CATEGORIES.includes(event.category)
          ? event.category
          : EVENT_CATEGORIES[0]
      );
      setCustomCategory(
        event.category && !EVENT_CATEGORIES.includes(event.category)
          ? event.category
          : ""
      );
      setStartDateTime(
        event.startDateTime
          ? formatFirestoreTimestamp(event.startDateTime)
              .toISOString()
              .slice(0, 16)
          : ""
      );
      setEndDateTime(
        event.endDateTime
          ? formatFirestoreTimestamp(event.endDateTime)
              .toISOString()
              .slice(0, 16)
          : ""
      );
      setImage(null);
      if (fileRef.current) fileRef.current.value = "";
    } else if (!isOpen) {
      setName("");
      setDescription("");
      setLocation(EVENT_LOCATIONS[0]);
      setCustomLocation("");
      setCategory(EVENT_CATEGORIES[0]);
      setCustomCategory("");
      setStartDateTime("");
      setEndDateTime("");
      setImage(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }, [isOpen, event]);

  const reset = () => {
    setName("");
    setDescription("");
    setLocation("");
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

    const updatedEvent = {
      name,
      description,
      location: finalLocation,
      category: finalCategory,
      startDateTime,
      endDateTime,
    };

    await onSave(event?.id || "", updatedEvent, image);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={"Edit Event"}>
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
            Image {event ? "(leave blank to keep previous image)" : ""}
          </label>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            required={!event}
            className="border p-2 rounded w-full"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>
        <button className="bg-primary-blue text-white rounded py-2 hover:bg-primary-blue-700">
          Save
        </button>
      </form>
    </Modal>
  );
}
