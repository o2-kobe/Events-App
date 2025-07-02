import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
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
      .then(() => {
        router.back();
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
        router.push("/");
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
