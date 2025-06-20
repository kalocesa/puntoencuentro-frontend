import { createContext, useState } from "react";

export const GenderContext = createContext();

export function GenderProvider({ children }) {
  const [selectedGender, setSelectedGender] = useState("");

  return (
    <GenderContext.Provider value={{ selectedGender, setSelectedGender }}>
      {children}
    </GenderContext.Provider>
  );
}
