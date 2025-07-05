import Gender from "./Gender/Gender.jsx";
import { Link, useNavigate } from "react-router-dom";
import useClickOutside from "../../../hooks/useClickOutside.js";
import { useRef, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext.jsx";
import { logoutUser } from "../../../utils/auth.js";
import { clearUserData } from "../../../utils/localStorageUser.js";

function Menu({ setIsMenuOpen, isLoggedIn }) {
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setIsMenuOpen(false));
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    await clearUserData();
    setIsMenuOpen(false);
    navigate("/signin");
  };

  return (
    <div ref={menuRef}>
      {isLoggedIn ? (
        <>
          <div className="flex items-center gap-3 mb-2">
            <img
              src={user.avatar}
              alt="avatar del usuario"
              className="w-10 h-10 rounded-full border-2 border-white p-1 rounded-full"
            />
            <p className="text-m">{user.name}</p>
          </div>
          <div className="flex flex-col">
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-1 cursor-pointer hover:bg-gray-400/10"
            >
              Ver perfil
            </Link>
            <Gender setIsMenuOpen={setIsMenuOpen} />
            <button
              onClick={handleLogout}
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
              setIsMenuOpen(false);
            }}
            className="mt-2 px-4 py-1 rounded-full bg-[#ff0054] hover:bg-[#ff0054]/30 cursor-pointer"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/signup"
            onClick={() => {
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
