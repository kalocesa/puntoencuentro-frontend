import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx"; // ajusta si es necesario

export default function InitialRedirect() {
  const { user, loading } = useContext(UserContext);

  if (loading) return null;

  return <Navigate to={user ? "/profile" : "/signin"} replace />;
}
