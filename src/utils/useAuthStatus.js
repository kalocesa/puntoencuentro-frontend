import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import app from "../config/firebaseConfig.js"; // ajusta la ruta si es necesario

const auth = getAuth(app); // ✅ usando tu instancia de Firebase

const useAuthStatus = () => {
  const [currentUser, setcurrentUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setcurrentUser(currentUser);
      setCargando(false);
    });

    return () => unsubscribe(); // 🧼 limpieza al desmontar
  }, []);

  return { currentUser, cargando };
};

export default useAuthStatus;
