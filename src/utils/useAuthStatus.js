import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import app from "../config/firebaseConfig.js";

const auth = getAuth(app);

const useAuthStatus = () => {
  const [currentUser, setcurrentUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setcurrentUser(currentUser);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  return { currentUser, cargando };
};

export default useAuthStatus;
