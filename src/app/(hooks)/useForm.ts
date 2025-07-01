import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../(services)/firebaseConfig";

export default function useForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  function handleSubmitLogIn({
    email,
    password,
    event,
  }: {
    email: string;
    password: string;
    event: React.FormEvent<HTMLFormElement>;
  }) {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        if (!user.emailVerified) {
          await signOut(auth);
          alert(
            "Please verify your email before logging in. Check your inbox."
          );
          return;
        }
        if (document.referrer.includes("/signup")) {
          router.push("/");
        } else {
          router.back();
        }
      })
      .catch((error) => {
        alert("Error during sign in: " + error.message);
      });
  }

  function handleSumbitSignUp({
    username,
    email,
    password,
    event,
  }: {
    username: string;
    email: string;
    password: string;
    event: React.FormEvent<HTMLFormElement>;
  }) {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await updateProfile(user, { displayName: username });

        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          username,
          email,
        });

        try {
          await sendEmailVerification(user);
          alert(
            "Verification email sent. Please check your inbox before logging in."
          );
        } catch (error: any) {
          console.error("Error sending email verification:", error);
          alert("Error sending email verification: " + error.message);
        }

        try {
          await signOut(auth);
          router.push("/login");
        } catch (error: any) {
          console.error("Error signing out:", error);
          alert("Error signing out: " + error.message);
        }
      })
      .catch((error) => {
        console.error("Error during sign up:", error);
        alert("Error during sign up: " + error.message);
      });
  }

  return {
    username,
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleUsernameChange,
    showPassword,
    setShowPassword,
    handleSumbitSignUp,
    handleSubmitLogIn,
  };
}
