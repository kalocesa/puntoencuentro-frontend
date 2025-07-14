import { useState, useEffect } from "react";
import { getUserData } from "../utils/localStorageUser";
import useAuthStatus from "../utils/useAuthStatus";
import { UserContext } from "../contexts/UserContext";

export function UserProvider({ children }) {
  const { currentUser, cargando } = useAuthStatus();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cargando) {
      if (currentUser) {
        const localData = getUserData(currentUser.uid);
        setUser({
          ...localData,
          email: currentUser.email,
          uid: currentUser.uid,
        });
      } else {
        setUser(null);
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
