import avatar from "@images/avatar2.png";
import Gender from "./Gender/Gender.jsx";
import { Link } from "react-router-dom";
import useClickOutside from "../../../hooks/useClickOutside.js";
import { useRef, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext.jsx";

function Menu({ isLoggedIn, setIsLoggedIn, setIsMenuOpen }) {
  /* Revisar el isLoggedIn para verificar la autenticación del inicio de sesión, cerrar sesión y registrarse */
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setIsMenuOpen(false));
  const { user } = useContext(UserContext);

  return (
    <div ref={menuRef}>
      {isLoggedIn ? (
        <>
          <div className="flex justify-evenly items-center gap-3">
            <img
              src={user.avatar}
              alt="avatar del usuario"
              className="w-10 h-10 rounded-full border-2 border-white p-1 rounded-full"
            />
            <p className="text-m">Nombre del usuario</p>
          </div>
          <div className="flex flex-col">
            {/* Probable tenga que cambiar el to por un OnClick, investigar */}
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-1 cursor-pointer hover:bg-gray-400/10"
            >
              Ver perfil
            </Link>
            <Gender setIsMenuOpen={setIsMenuOpen} />
            {/* Quisiera cambiar los botones por Link, para manejar las rutas a "/signin" y "/signup" */}
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setIsMenuOpen(false);
              }}
              className="mt-2 px-4 py-1 rounded-full bg-[#ff0054] hover:bg-[#ff0054]/30 cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <Link
            to="/signin"
            onClick={() => {
              setIsLoggedIn(true);
              setIsMenuOpen(false);
            }}
            className="mt-2 px-4 py-1 rounded-full bg-[#ff0054] hover:bg-[#ff0054]/30 cursor-pointer"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/signup"
            onClick={() => {
              setIsLoggedIn(false);
              setIsMenuOpen(false);
            }}
            className="mt-2 px-4 py-1 rounded-full bg-[#ff5400] hover:bg-[#ff5400]/30 cursor-pointer"
          >
            Registrarse
          </Link>
        </div>
      )}
    </div>
  );
}

export default Menu;
