import { createContext, useState } from "react";

export const LoaderContext = createContext();

export function LoaderProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}
