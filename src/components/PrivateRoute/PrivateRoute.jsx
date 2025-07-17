import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthStatus from "../../utils/useAuthStatus";

export default function PrivateRoute({ children }) {
  const { currentUser, cargando } = useAuthStatus();
  const [loaderDelay, setLoaderDelay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaderDelay(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (cargando || loaderDelay) {
    return (
      <section className="h-screen w-full flex justify-center items-center">
        <div className="flex flex-col items-center gap-y-5 md:gap-y-5 animate-fadeIn">
          <div className="flex gap-x-5 md:gap-x-10">
            <div className="w-5 h-5 md:w-10 md:h-10 bg-[#390099] rounded-full animate-pulse" />
            <div className="w-5 h-5 md:w-10 md:h-10 bg-[#9e0059] rounded-full animate-pulse" />
            <div className="w-5 h-5 md:w-10 md:h-10 bg-[#ff0054] rounded-full animate-pulse" />
            <div className="w-5 h-5 md:w-10 md:h-10 bg-[#ff5400] rounded-full animate-pulse" />
            <div className="w-5 h-5 md:w-10 md:h-10 bg-[#ffbd00] rounded-full animate-pulse" />
          </div>
          <span className="text-3xl font-medium tracking-wide">Cargando</span>
        </div>
      </section>
    );
  }

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
