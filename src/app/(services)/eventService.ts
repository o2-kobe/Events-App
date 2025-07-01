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

export const addEvent = async (event: Omit<Event, "id">): Promise<void> => {
  await addDoc(collection(db, "events"), event);
};

export const updateEvent = async (
  eventId: string,
  event: Partial<Event>
): Promise<void> => {
  await updateDoc(doc(db, "events", eventId), event);
};

export const uploadImage = async (
  file: File,
  folder = "event-images"
): Promise<string> => {
  const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export const uploadMultipleImages = async (
  files: FileList | File[],
  folder = "event-images"
): Promise<string[]> => {
  const uploadPromises = Array.from(files).map((file) =>
    uploadImage(file, folder)
  );
  return await Promise.all(uploadPromises);
};
