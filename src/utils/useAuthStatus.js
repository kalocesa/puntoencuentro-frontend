import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useAuthStatus = () => {
  const [currentUser, setcurrentUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setcurrentUser(currentUser);
      setCargando(false);
    });
  }, []);

  return { currentUser, cargando };
};

export default useAuthStatus;
