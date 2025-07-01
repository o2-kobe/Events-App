"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../(services)/firebaseConfig";

type SessionContextProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

// Default value as undefined for strict typing
const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const SessionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  return (
    <SessionContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </SessionContext.Provider>
  );
};

// Optional: Custom hook for convenience
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionContextProvider");
  }
  return context;
};
