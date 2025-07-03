import { Navigate } from "react-router-dom";
import useAuthStatus from "../../utils/useAuthStatus";

export default function PrivateRoute({ children }) {
  const usuario = useAuthStatus();

  if (!usuario) {
    alert(
      "Por favor inicia sesión o regístrate para acceder a PuntoEncuentro 🦋📚"
    );
    return <Navigate to="/signin" />;
  }

  return children;
}
