import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import Event from "../Types/Event";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const fetchAllEvents = async (): Promise<Event[]> => {
  const eventsCol = collection(db, "events");
  const eventSnapshot = await getDocs(eventsCol);
  return eventSnapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Event));
};

export const deleteEvent = async (eventId: string): Promise<void> => {
  await deleteDoc(doc(db, "events", eventId));
};

export const uploadImage = async (
  file: File,
  folder = "event-images"
): Promise<string> => {
  try {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Failed to upload image");
  }
};

export const addEvent = async (
  event: Omit<Event, "id">,
  image: File
): Promise<void> => {
  const url = await uploadImage(image);
  await addDoc(collection(db, "events"), { ...event, imgURL: url });
};

export const editEvent = async (
  eventID: string,
  event: Partial<Event>,
  image: File | null
): Promise<void> => {
  const docRef = doc(db, "events", eventID);
  if (image) {
    const url = await uploadImage(image);
    await updateDoc(docRef, { ...event, imgURL: url });
  } else {
    await updateDoc(docRef, event);
  }
};
