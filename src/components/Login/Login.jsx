import { useState } from "react";
import { Link } from "react-router-dom";
import background from "@images/back-black.png";
import "../Login/Login.css";

export const Login = ({ handleRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password);
  };

  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center px-4">
      <img
        src={background}
        alt="Fondo"
        className="absolute inset-0 w-full h-screen object-cover opacity-30 z-0"
      />
      <div className="relative z-20 bg-black/90 rounded-2xl p-8 max-w-[550px] w-full">
        <h1 className="text-3xl md:text-4xl text-center mb-6 py-5 login__title">
          PuntoEncuentro te espera!
        </h1>
        <form onSubmit={handleSubmit} className="pb-10">
          <fieldset className="flex flex-col gap-4 mb-6">
            <label className="text-sm font-medium login__label">
              Correo electrónico:
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-black mt-1 px-4 py-2 border rounded-full w-full bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-cyan-100 login__input"
              />
            </label>
            <label className="text-sm font-medium login__label">
              Contraseña:
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-black mt-1 px-4 py-2 border rounded-full w-full bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-cyan-100 login__input"
              />
            </label>
          </fieldset>
          <button
            type="submit"
            className="w-3/4 block mx-auto bg-[#9e0059] py-2 px-4 rounded-full hover:bg-[#9e0059]/30 transition duration-300 text-xl cursor-pointer"
          >
            Inicia sesión
          </button>
        </form>
        <p className="text-center text-xs md:text-sm text-white mt-4 login__link">
          ¿Aun no eres miembro?{" "}
          <Link
            to="/signup"
            className="text-[#ff5400] hover:underline login__link-signin"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
