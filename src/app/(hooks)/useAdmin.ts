import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../(services)/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Event from "../Types/Event";
import {
  addEvent,
  fetchAllEvents,
  editEvent,
  deleteEvent,
} from "../(services)/eventService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function useAdmin() {
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

  return {
    isAdmin,
    loading,
    setShowAddModal,
    showAddModal,
    showEditModal,
    events,
    setEventToEdit,
    setShowEditModal,
    handleDeleteEvent,
    handleAddEvent,
    handleEditEvent,
    eventToEdit,
    showDeleteModal,
    setShowDeleteModal,
    confirmDeleteEvent,
  };
}
