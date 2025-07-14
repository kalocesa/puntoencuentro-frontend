import { useState } from "react";
import { GenderContext } from "../contexts/GenderContext";
export function GenderProvider({ children }) {
  const [selectedGender, setSelectedGender] = useState("");

  return (
    <GenderContext.Provider value={{ selectedGender, setSelectedGender }}>
      {children}
    </GenderContext.Provider>
  );
}
