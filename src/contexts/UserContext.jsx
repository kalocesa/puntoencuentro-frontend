import { createContext, useState, useEffect } from "react";
import avatar from "@images/avatar1.png";
import useAuthStatus from "../utils/useAuthStatus";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const { currentUser, cargando } = useAuthStatus();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cargando) {
      if (currentUser) {
        const storedData = JSON.parse(localStorage.getItem("userData")) || {};
        setUser({
          name: storedData.name || "Aquí va tu nombre",
          email: currentUser.email,
          avatar: storedData.avatar || avatar,
          about: storedData.about || "Agrega una pequeñe descripcion sobre ti",
          uid: currentUser.uid,
        });
      } else {
        setUser(null); // <- limpia el contexto si no hay usuario
      }
      setLoading(false);
    }
  }, [cargando, currentUser]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
