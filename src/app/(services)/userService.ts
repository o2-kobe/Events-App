import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import User from "../Types/User";

export const getUserData = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as User;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const isUserAdmin = async (userId: string): Promise<boolean> => {
  try {
    const adminDoc = await getDoc(doc(db, "admins", userId));
    return adminDoc.exists();
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};
