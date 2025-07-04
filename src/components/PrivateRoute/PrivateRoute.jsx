import { Navigate } from "react-router-dom";
import useAuthStatus from "../../utils/useAuthStatus";

export default function PrivateRoute({ children }) {
  const { currentUser, cargando } = useAuthStatus();

  if (cargando) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#1b1f36] to-[#000000] text-white text-xl font-semibold tracking-wide">
        Cargando punto de encuentro...
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
