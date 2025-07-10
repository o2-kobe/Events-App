import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import { auth, db } from "../(services)/firebaseConfig";
import toast from "react-hot-toast";
import { useSession } from "@/app/(context)/SessionContext";
import { useParams } from "next/navigation";
import Event from "../Types/Event";

export default function useOneEvent() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [alerted, setAlerted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { isLoggedIn } = useSession();

  const sendToast = () =>
    alerted
      ? toast.error("Unsubscribed from notifications")
      : toast.success("You'll receive notifications for this event");

  // Share event handler
  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success("Event link copied to clipboard!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(String(err));
      }
    }
  };

  const addReminder = async () => {
    const reminderRef = doc(
      db,
      "reminders",
      `${auth.currentUser?.uid}_${params.id}`
    );
    await setDoc(reminderRef, {
      eventID: params.id,
      userID: auth.currentUser?.uid,
      sent24h: false,
      sent1h: false,
      eventTime: startDate?.getTime(),
    });
    setAlerted(true);
    sendToast();
  };

  const removeReminder = async () => {
    await deleteDoc(
      doc(db, "reminders", `${auth.currentUser?.uid}_${params.id}`)
    );
    setAlerted(false);
    sendToast();
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventDoc = await getDoc(doc(db, "events", params.id as string));
        if (eventDoc.exists()) {
          setEvent({ id: eventDoc.id, ...eventDoc.data() } as Event);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    if (auth.currentUser) {
      const checkReminder = async () => {
        const q = query(
          collection(db, "reminders"),
          where("userID", "==", auth.currentUser?.uid),
          where("eventID", "==", params.id)
        );
        const snapshot = await getDocs(q);
        setAlerted(!snapshot.empty);
      };
      checkReminder();
    }

    fetchEvent();
  }, [params.id, isLoggedIn]);

  let startDate: Date | null = null;
  let endDate: Date | null = null;
  if (event?.startDateTime) {
    if (
      typeof event?.startDateTime === "object" &&
      "toDate" in event?.startDateTime
    ) {
      startDate = (event?.startDateTime as { toDate: () => Date }).toDate();
    } else {
      startDate = new Date(event?.startDateTime as string | Date);
    }
  }
  if (event?.endDateTime) {
    if (
      typeof event.endDateTime === "object" &&
      "toDate" in event?.endDateTime
    ) {
      endDate = (event?.endDateTime as { toDate: () => Date }).toDate();
    } else {
      endDate = new Date(event?.endDateTime as string | Date);
    }
  }
  // Use endDate for past/upcoming if available, otherwise startDate
  const isUpcoming = endDate
    ? endDate > new Date()
    : startDate
    ? startDate > new Date()
    : false;

  return {
    isUpcoming,
    isLoggedIn,
    alerted,
    removeReminder,
    addReminder,
    event,
    startDate,
    endDate,
    handleShare,
    showComments,
    loading,
    setShowComments,
  };
}
