"use client";

import Link from "next/link";
import useForm from "../(hooks)/useForm";

type FormProps = {
  type: "Log In" | "Sign Up";
};

export default function Form({ type }: FormProps) {
  const {
    username,
    email,
    password,
    showPassword,
    setShowPassword,
    handleEmailChange,
    handlePasswordChange,
    handleUsernameChange,
    handleSubmitLogIn,
    handleSumbitSignUp,
  } = useForm();
  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-50">
      <div className="w-full max-w-md p-7 rounded-md shadow-2xl bg-white">
        <h3 className="mb-2 text-2xl font-semibold">{type}</h3>
        <form
          className="flex flex-col gap-3 items-center w-full mx-auto"
          onSubmit={
            type === "Log In"
              ? (e) => handleSubmitLogIn({ email, password, event: e })
              : (e) =>
                  handleSumbitSignUp({
                    username,
                    email,
                    password,
                    event: e,
                  })
          }
        >
          {type === "Sign Up" ? (
            <div className="bg-gray-100 rounded-md w-full">
              <input
                type="text"
                required
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Enter username"
                className="p-3 text-sm outline-none bg-transparent w-full"
              />
            </div>
          ) : null}

          <div className="bg-gray-100 rounded-md w-full">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Enter email"
              className="p-3 text-sm outline-none bg-transparent w-full"
            />
          </div>

          <div className="bg-gray-100 rounded-md w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder="Enter password"
              className="p-3 text-sm outline-none bg-transparent w-full"
            />
          </div>

          <div className="flex mr-auto gap-1">
            <input
              type="checkbox"
              id="showPassword"
              onChange={() => setShowPassword((c) => !c)}
              checked={showPassword}
            />
            <label htmlFor="showPassword" className="text-xs text-gray-600">
              Show Password
            </label>
          </div>

          <button className="bg-violet-950 hover:bg-violet-900 cursor-pointer text-white p-2 rounded-md w-full text-center">
            {type?.toUpperCase()}
          </button>

          <p className="text-sm text-gray-600">
            {type === "Log In"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <Link
              href={type === "Log In" ? "/signup" : "/login"}
              className="text-violet-950 underline"
            >
              {type === "Log In" ? "Sign up" : "Log In"}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
