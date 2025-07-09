"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../(services)/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { fetchAllEvents } from "../(services)/eventService";
import EventTable from "../(components)/admin/EventTable";
import AddEventFormModal from "../(components)/admin/AddEventFormModal";
import Event from "../Types/Event";
import LoadingIcon from "../(components)/LoadingIcon";
import { addEvent } from "../(services)/eventService";
import toast from "react-hot-toast";

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

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
        } catch {
          toast.error("Failed to fetch events");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isAdmin]);

  // Add event handler
  const handleAddEvent = async (event: Omit<Event, "id">, imageFile: File) => {
    toast.loading("Adding event...");
    try {
      // Use addEvent from eventService
      await addEvent(event, imageFile);
      toast.dismiss();
      toast.success("Event added successfully!");
      // Refresh events list
      const data = await fetchAllEvents();
      setEvents(data);
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
      <EventTable events={events} onEdit={() => {}} onDelete={() => {}} />
      <AddEventFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddEvent}
      />
    </div>
  );
}
