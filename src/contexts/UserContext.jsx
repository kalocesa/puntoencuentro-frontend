import { createContext, useState, useEffect } from "react";
import avatar from "@images/avatar1.png";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Aquí va tu nombre",
    email: "example@example.com",
    avatar: avatar,
    about: "Agrega una pequeñe descripcion sobre ti, queremos conocerte!",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("userData", JSON.stringify(user));
    }
  }, [user, loading]);

  if (loading) return null; //Aquí va el loader de carga en el user

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
