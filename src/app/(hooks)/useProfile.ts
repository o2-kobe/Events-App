import { useEffect, useState } from "react";
import { auth } from "../(services)/firebaseConfig";
import { getUserData, isUserAdmin } from "../(services)/userService";
import { deleteUser, signOut } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../(services)/firebaseConfig";
import User from "../Types/User";
import { useRouter } from "next/navigation";

export default function useProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userData = await getUserData(currentUser.uid);
          setUser(userData);
          // Check admin status
          const adminStatus = await isUserAdmin(currentUser.uid);
          setIsAdmin(adminStatus);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteAccount = async () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = async () => {
    setDeleting(true);
    try {
      if (auth.currentUser) {
        // Delete user data from Firestore
        await deleteDoc(doc(db, "users", auth.currentUser.uid));
        // Delete from admins collection if user is an admin
        const adminDoc = await isUserAdmin(auth.currentUser.uid);
        if (adminDoc) {
          await deleteDoc(doc(db, "admins", auth.currentUser.uid));
        }
        // Delete the auth user
        await deleteUser(auth.currentUser);
      }
      router.push("/");
    } catch (error) {
      alert("Error deleting account: " + error);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return {
    user,
    handleLogout,
    handleDeleteAccount,
    isAdmin,
    showDeleteModal,
    setShowDeleteModal,
    deleting,
    confirmDeleteAccount,
    loading,
  };
}
