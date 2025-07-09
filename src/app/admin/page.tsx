"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../(services)/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import EventTable from "../(components)/admin/EventTable";
import AddEventFormModal from "../(components)/admin/AddEventFormModal";
import EditEventFormModal from "../(components)/admin/EditEventFormModal";
import Event from "../Types/Event";
import LoadingIcon from "../(components)/LoadingIcon";
import {
  addEvent,
  fetchAllEvents,
  editEvent,
  deleteEvent,
} from "../(services)/eventService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ConfirmationModal from "../(components)/ConfirmationModal";

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
  const [eventIdToDelete, setEventIdToDelete] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await fetchAllEvents();
      setEvents(data);
    } catch {
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchEvents();
    }
  }, [isAdmin]);

  // Add event handler
  const handleAddEvent = async (event: Omit<Event, "id">, imageFile: File) => {
    toast.loading("Adding event...");
    try {
      await addEvent(event, imageFile);
      toast.dismiss();
      toast.success("Event added successfully!");
      await fetchEvents();
      setShowAddModal(false);
    } catch (err) {
      toast.dismiss();
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(String(err));
      }
    }
  };

  // Edit event handler
  const handleEditEvent = async (
    eventID: string,
    event: Omit<Event, "id">,
    imageFile: File | null
  ) => {
    toast.loading("Editing event...");
    try {
      await editEvent(eventID, event, imageFile);
      toast.dismiss();
      toast.success("Event edited successfully!");
      await fetchEvents();
      setShowEditModal(false);
      setEventToEdit(null);
    } catch (err) {
      toast.dismiss();
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(String(err));
      }
    }
  };

  // Delete event handler
  const handleDeleteEvent = async (eventID: string) => {
    setEventIdToDelete(eventID);
    setShowDeleteModal(true);
  };

  const confirmDeleteEvent = async () => {
    if (!eventIdToDelete) return;
    toast.loading("Deleting event...");
    try {
      await deleteEvent(eventIdToDelete);
      toast.dismiss();
      toast.success("Event deleted successfully!");
      await fetchEvents();
    } catch (err) {
      toast.dismiss();
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(String(err));
      }
    } finally {
      setShowDeleteModal(false);
      setEventIdToDelete(null);
    }
  };

  if (isAdmin === null || loading) return <LoadingIcon />;

  return (
    <div className="max-w-5xl mx-auto py-8 mt-13">
      <h1 className="text-3xl font-bold mb-6">Admin - Manage Events</h1>
      <button
        className="mb-4 px-4 py-2 bg-primary-blue text-white rounded hover:bg-primary-blue-700"
        onClick={() => setShowAddModal(true)}
      >
        Add Event
      </button>
      <EventTable
        events={events}
        onEdit={(event) => {
          setEventToEdit(event);
          setShowEditModal(true);
        }}
        onDelete={handleDeleteEvent}
      />
      <AddEventFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddEvent}
      />
      <EditEventFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEventToEdit(null);
        }}
        event={eventToEdit}
        onSave={handleEditEvent}
      />
      <ConfirmationModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        title="Delete Event"
        text="Are you sure you want to delete this event? This action cannot be undone."
        onConfirm={confirmDeleteEvent}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
