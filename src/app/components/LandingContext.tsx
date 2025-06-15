import { useState } from "react";

const LandingContext = createContext(null);

function LandingContextProvider({ children }) {
  const [background, setBackground] = useState<string>(url);
}
