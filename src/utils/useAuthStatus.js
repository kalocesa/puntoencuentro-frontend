import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useAuthStatus = () => {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuarioActual(user);
    });
    return () => unsubscribe();
  }, []);

  return usuarioActual;
};

export default useAuthStatus;
