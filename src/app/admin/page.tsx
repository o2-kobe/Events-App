"use client";

import { useEffect, useState, useRef } from "react";
import {
  fetchAllEvents,
  deleteEvent,
  addEvent,
  updateEvent,
  uploadImage,
  uploadMultipleImages,
} from "../(services)/eventService";
import Event from "../Types/Event";
import Image from "next/image";

const PREDEFINED_CATEGORIES = [
  "Health",
  "Talk/Seminar",
  "Religious",
  "Entertainment",
  "Club",
  "Sports",
];

function getImagePreview(file: File | null) {
  return file ? URL.createObjectURL(file) : null;
}

function getMultipleImagePreviews(files: FileList | null) {
  return files
    ? Array.from(files).map((file) => URL.createObjectURL(file))
    : [];
}

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [updating, setUpdating] = useState(false);

  // Add Event form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState(PREDEFINED_CATEGORIES[0]);
  const [customCategory, setCustomCategory] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<FileList | null>(
    null
  );
  const [additionalImagesPreview, setAdditionalImagesPreview] = useState<
    string[]
  >([]);
  const [formError, setFormError] = useState<string | null>(null);

  // Edit Event form state
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editCategory, setEditCategory] = useState(PREDEFINED_CATEGORIES[0]);
  const [editCustomCategory, setEditCustomCategory] = useState("");
  const [editStartDateTime, setEditStartDateTime] = useState("");
  const [editEndDateTime, setEditEndDateTime] = useState("");
  const [editIsRecurring, setEditIsRecurring] = useState(false);
  const [editRecurrencePattern, setEditRecurrencePattern] = useState("");
  const [editMainImage, setEditMainImage] = useState<File | null>(null);
  const [editMainImagePreview, setEditMainImagePreview] = useState<
    string | null
  >(null);
  const [editImgURL, setEditImgURL] = useState<string | null>(null);
  const [editAdditionalImages, setEditAdditionalImages] =
    useState<FileList | null>(null);
  const [editAdditionalImagesPreview, setEditAdditionalImagesPreview] =
    useState<string[]>([]);
  const [editAdditionalImgURLs, setEditAdditionalImgURLs] = useState<string[]>(
    []
  );
  const [editFormError, setEditFormError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const editAdditionalFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await fetchAllEvents();
        setEvents(data);
      } catch (err) {
        if (err instanceof Error) setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  // Image preview handlers for add modal
  useEffect(() => {
    setMainImagePreview(getImagePreview(mainImage));
  }, [mainImage]);
  useEffect(() => {
    setAdditionalImagesPreview(getMultipleImagePreviews(additionalImages));
  }, [additionalImages]);

  // Image preview handlers for edit modal
  useEffect(() => {
    setEditMainImagePreview(getImagePreview(editMainImage));
  }, [editMainImage]);
  useEffect(() => {
    setEditAdditionalImagesPreview(
      getMultipleImagePreviews(editAdditionalImages)
    );
  }, [editAdditionalImages]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    setDeletingId(id);
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      if (err instanceof Error) setError("Failed to delete event");
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setAdding(true);
    try {
      if (
        !name ||
        !description ||
        !location ||
        !startDateTime ||
        !endDateTime
      ) {
        setFormError("Please fill in all required fields.");
        setAdding(false);
        return;
      }
      if (!mainImage) {
        setFormError("Main event image is required.");
        setAdding(false);
        return;
      }
      // Upload main image
      const imgURL = await uploadImage(mainImage);
      // Upload additional images
      let additionalImgURLs: string[] = [];
      if (additionalImages && additionalImages.length > 0) {
        additionalImgURLs = await uploadMultipleImages(additionalImages);
      }
      // Use custom category if provided
      const finalCategory = customCategory.trim() ? customCategory : category;
      // Add event
      await addEvent({
        name,
        description,
        location,
        category: finalCategory,
        startDateTime,
        endDateTime,
        isRecurring,
        recurrencePattern,
        imgURL,
        additionalImgURLs,
      });
      // Refresh event list
      const data = await fetchAllEvents();
      setEvents(data);
      setShowAddModal(false);
      // Reset form
      setName("");
      setDescription("");
      setLocation("");
      setCategory(PREDEFINED_CATEGORIES[0]);
      setCustomCategory("");
      setStartDateTime("");
      setEndDateTime("");
      setIsRecurring(false);
      setRecurrencePattern("");
      setMainImage(null);
      setAdditionalImages(null);
      setMainImagePreview(null);
      setAdditionalImagesPreview([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (additionalFileInputRef.current)
        additionalFileInputRef.current.value = "";
    } catch (err) {
      if (err instanceof Error) setFormError("Failed to add event");
    } finally {
      setAdding(false);
    }
  };

  // Open edit modal and populate fields
  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setEditName(event.name || "");
    setEditDescription(event.description || "");
    setEditLocation(event.location || "");
    setEditCategory(
      event.category && PREDEFINED_CATEGORIES.includes(event.category)
        ? event.category
        : PREDEFINED_CATEGORIES[0]
    );
    setEditCustomCategory(
      event.category && !PREDEFINED_CATEGORIES.includes(event.category)
        ? event.category
        : ""
    );
    setEditStartDateTime(
      event.startDateTime
        ? typeof event.startDateTime === "string"
          ? event.startDateTime.slice(0, 16)
          : new Date(event.startDateTime).toISOString().slice(0, 16)
        : ""
    );
    setEditEndDateTime(
      event.endDateTime
        ? typeof event.endDateTime === "string"
          ? event.endDateTime.slice(0, 16)
          : new Date(event.endDateTime).toISOString().slice(0, 16)
        : ""
    );
    setEditIsRecurring(!!event.isRecurring);
    setEditRecurrencePattern(event.recurrencePattern || "");
    setEditImgURL(event.imgURL || null);
    setEditMainImage(null);
    setEditMainImagePreview(null);
    setEditAdditionalImgURLs(event.additionalImgURLs || []);
    setEditAdditionalImages(null);
    setEditAdditionalImagesPreview([]);
    setEditFormError(null);
    setShowEditModal(true);
  };

  // Remove an additional image URL from edit modal
  const removeEditAdditionalImgURL = (url: string) => {
    setEditAdditionalImgURLs((prev) => prev.filter((u) => u !== url));
  };

  const handleEditEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditFormError(null);
    setUpdating(true);
    try {
      if (!editingEvent) return;
      if (
        !editName ||
        !editDescription ||
        !editLocation ||
        !editStartDateTime ||
        !editEndDateTime
      ) {
        setEditFormError("Please fill in all required fields.");
        setUpdating(false);
        return;
      }
      // Upload new main image if selected
      let imgURL = editImgURL;
      if (editMainImage) {
        imgURL = await uploadImage(editMainImage);
      }
      // Upload new additional images if selected
      let additionalImgURLs = [...editAdditionalImgURLs];
      if (editAdditionalImages && editAdditionalImages.length > 0) {
        const newUrls = await uploadMultipleImages(editAdditionalImages);
        additionalImgURLs = additionalImgURLs.concat(newUrls);
      }
      // Use custom category if provided
      const finalCategory = editCustomCategory.trim()
        ? editCustomCategory
        : editCategory;
      // Update event
      await updateEvent(editingEvent.id, {
        name: editName,
        description: editDescription,
        location: editLocation,
        category: finalCategory,
        startDateTime: editStartDateTime,
        endDateTime: editEndDateTime,
        isRecurring: editIsRecurring,
        recurrencePattern: editRecurrencePattern,
        imgURL: imgURL || "",
        additionalImgURLs,
      });
      // Refresh event list
      const data = await fetchAllEvents();
      setEvents(data);
      setShowEditModal(false);
      setEditingEvent(null);
    } catch (err) {
      if (err instanceof Error) setEditFormError("Failed to update event");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 mt-5">
      <h1 className="text-3xl font-bold mb-6">Admin Event Management</h1>
      <button
        className="mb-4 px-4 py-2 bg-primary-blue text-white rounded hover:bg-primary-blue-700"
        onClick={() => setShowAddModal(true)}
      >
        Add Event
      </button>
      {loading ? (
        <div>Loading events...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Start</th>
                <th className="py-2 px-4 border">End</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b">
                  <td className="py-2 px-4 border">{event.name}</td>
                  <td className="py-2 px-4 border">{event.category}</td>
                  <td className="py-2 px-4 border">
                    {event.startDateTime
                      ? new Date(event.startDateTime).toLocaleString()
                      : ""}
                  </td>
                  <td className="py-2 px-4 border">
                    {event.endDateTime
                      ? new Date(event.endDateTime).toLocaleString()
                      : ""}
                  </td>
                  <td className="py-2 px-4 border flex gap-2">
                    <button
                      className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500 text-white"
                      onClick={() => openEditModal(event)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 rounded hover:bg-red-600 text-white"
                      onClick={() => handleDelete(event.id)}
                      disabled={deletingId === event.id}
                    >
                      {deletingId === event.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowAddModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Add Event</h2>
            <form onSubmit={handleAddEvent} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Event Name"
                className="border p-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                className="border p-2 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Location"
                className="border p-2 rounded"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <div>
                <label className="block mb-1">Category</label>
                <select
                  className="border p-2 rounded w-full"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={!!customCategory}
                >
                  {PREDEFINED_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Or enter custom category"
                  className="border p-2 rounded mt-2 w-full"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block mb-1">Start Date & Time</label>
                  <input
                    type="datetime-local"
                    className="border p-2 rounded w-full"
                    value={startDateTime}
                    onChange={(e) => setStartDateTime(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1">End Date & Time</label>
                  <input
                    type="datetime-local"
                    className="border p-2 rounded w-full"
                    value={endDateTime}
                    onChange={(e) => setEndDateTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  id="isRecurring"
                />
                <label htmlFor="isRecurring">Does the event repeat?</label>
              </div>
              {isRecurring && (
                <input
                  type="text"
                  placeholder="Recurrence Pattern (e.g. weekly, monthly, yearly)"
                  className="border p-2 rounded"
                  value={recurrencePattern}
                  onChange={(e) => setRecurrencePattern(e.target.value)}
                />
              )}
              <div>
                <label className="block mb-1">Main Event Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="border p-2 rounded w-full"
                  onChange={(e) => setMainImage(e.target.files?.[0] || null)}
                  ref={fileInputRef}
                  required
                />
                {mainImagePreview && (
                  <Image
                    src={mainImagePreview}
                    alt="Main Preview"
                    className="mt-2 h-24 object-contain rounded"
                  />
                )}
              </div>
              <div>
                <label className="block mb-1">Additional Images</label>
                <input
                  type="file"
                  accept="image/*"
                  className="border p-2 rounded w-full"
                  multiple
                  onChange={(e) => setAdditionalImages(e.target.files)}
                  ref={additionalFileInputRef}
                />
                {additionalImagesPreview.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {additionalImagesPreview.map((src, idx) => (
                      <Image
                        key={idx}
                        src={src}
                        alt={`Preview ${idx + 1}`}
                        className="h-16 object-contain rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
              {formError && <div className="text-red-500">{formError}</div>}
              <button
                type="submit"
                className="bg-primary-blue text-white rounded py-2 mt-2 hover:bg-primary-blue-700"
                disabled={adding}
              >
                {adding ? "Adding..." : "Add Event"}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Edit Event Modal */}
      {showEditModal && editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowEditModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Event</h2>
            <form onSubmit={handleEditEvent} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Event Name"
                className="border p-2 rounded"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                className="border p-2 rounded"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Location"
                className="border p-2 rounded"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                required
              />
              <div>
                <label className="block mb-1">Category</label>
                <select
                  className="border p-2 rounded w-full"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  disabled={!!editCustomCategory}
                >
                  {PREDEFINED_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Or enter custom category"
                  className="border p-2 rounded mt-2 w-full"
                  value={editCustomCategory}
                  onChange={(e) => setEditCustomCategory(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block mb-1">Start Date & Time</label>
                  <input
                    type="datetime-local"
                    className="border p-2 rounded w-full"
                    value={editStartDateTime}
                    onChange={(e) => setEditStartDateTime(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1">End Date & Time</label>
                  <input
                    type="datetime-local"
                    className="border p-2 rounded w-full"
                    value={editEndDateTime}
                    onChange={(e) => setEditEndDateTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editIsRecurring}
                  onChange={(e) => setEditIsRecurring(e.target.checked)}
                  id="editIsRecurring"
                />
                <label htmlFor="editIsRecurring">Does the event repeat?</label>
              </div>
              {editIsRecurring && (
                <input
                  type="text"
                  placeholder="Recurrence Pattern (e.g. weekly, monthly, yearly)"
                  className="border p-2 rounded"
                  value={editRecurrencePattern}
                  onChange={(e) => setEditRecurrencePattern(e.target.value)}
                />
              )}
              <div>
                <label className="block mb-1">Main Event Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="border p-2 rounded w-full"
                  onChange={(e) =>
                    setEditMainImage(e.target.files?.[0] || null)
                  }
                  ref={editFileInputRef}
                />
                {/* Show preview of new image if selected, else show current */}
                {editMainImagePreview ? (
                  <Image
                    src={editMainImagePreview}
                    alt="Main Preview"
                    className="mt-2 h-24 object-contain rounded"
                  />
                ) : editImgURL ? (
                  <Image
                    src={editImgURL}
                    alt="Current Main"
                    className="mt-2 h-24 object-contain rounded"
                  />
                ) : null}
              </div>
              <div>
                <label className="block mb-1">Additional Images</label>
                <input
                  type="file"
                  accept="image/*"
                  className="border p-2 rounded w-full"
                  multiple
                  onChange={(e) => setEditAdditionalImages(e.target.files)}
                  ref={editAdditionalFileInputRef}
                />
                {/* Show previews of new images if selected */}
                {editAdditionalImagesPreview.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {editAdditionalImagesPreview.map((src, idx) => (
                      <Image
                        key={idx}
                        src={src}
                        alt={`Preview ${idx + 1}`}
                        className="h-16 object-contain rounded"
                      />
                    ))}
                  </div>
                )}
                {/* Show existing additional image URLs with remove option */}
                {editAdditionalImgURLs.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {editAdditionalImgURLs.map((url, idx) => (
                      <div key={idx} className="relative inline-block">
                        <Image
                          src={url}
                          alt={`Current ${idx + 1}`}
                          className="h-16 object-contain rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                          onClick={() => removeEditAdditionalImgURL(url)}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {editFormError && (
                <div className="text-red-500">{editFormError}</div>
              )}
              <button
                type="submit"
                className="bg-primary-blue text-white rounded py-2 mt-2 hover:bg-primary-blue-700"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update Event"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
