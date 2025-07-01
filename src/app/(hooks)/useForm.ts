import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

  // Define the submit function for log in
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
        alert("Error during sign in:" + error.message);
      });
  }

  // Define form submit for signUp using the values from useForm
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
      .then((userCredential) => {
        // Save user data to Firestore
        const userDocRef = doc(db, "users", userCredential.user.uid);
        return setDoc(userDocRef, {
          username: username,
          email: email,
        });
      })
      .then(() => {
        console.log("User created and data saved to Firestore successfully");
      })
      .catch((error) => {
        alert("Error during sign up:" + error.message);
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
