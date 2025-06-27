import { useState } from "react";

export default function useForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  // Define form submit for signUp using the values from useForm

  return {
    username,
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleUsernameChange,
    showPassword,
    setShowPassword,
  };
}
