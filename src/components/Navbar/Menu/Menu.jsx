import avatar from "@images/avatar2.png";
import Gender from "./Gender/Gender.jsx";
import { Link } from "react-router-dom";

function Menu({ isLoggedIn }) {
  /* Revisar el isLoggedIn para verificar la autenticación del inicio de sesión, cerrar sesión y registrarse */
  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="flex justify-evenly items-center gap-3">
            <img
              src={avatar}
              alt="avatar del usuario"
              className="w-10 h-10 rounded-full border-2 border-white rounded-full"
            />
            <p className="text-m">Nombre del usuario</p>
          </div>
          <div className="flex flex-col">
            {/* Probable tenga que cambiar el to por un OnClick, investigar */}
            <Link
              to="/profile"
              className="px-4 py-1 cursor-pointer hover:bg-gray-400/10"
            >
              Ver perfil
            </Link>
            <Gender />
            {/* Quisiera cambiar los botones por Link, para manejar las rutas a "/signin" y "/signup" */}
            <button
              onClick={() => isLoggedIn(false)}
              className="mt-2 px-4 py-1 rounded-full bg-[#ff0054] hover:bg-[#ff0054]/30 cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <button
            onClick={() => isLoggedIn(true)}
            className="mt-2 px-4 py-1 rounded-full bg-[#ff0054] hover:bg-[#ff0054]/30 cursor-pointer"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => isLoggedIn(true)}
            className="mt-2 px-4 py-1 rounded-full bg-[#ff5400] hover:bg-[#ff5400]/30 cursor-pointer"
          >
            Registrarse
          </button>
        </div>
      )}
    </>
  );
}

export default Menu;
