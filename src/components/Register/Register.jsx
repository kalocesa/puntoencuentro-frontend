import { useState } from "react";
import { Link } from "react-router-dom";
import background from "@images/back-black.png";
import "../Register/Register.css";

export const Register = ({ handleRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password, name);
  };

  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center px-4">
      <img
        src={background}
        alt="Fondo"
        className="absolute inset-0 w-full h-screen object-cover opacity-30 z-0"
      />
      <div className="relative z-20 bg-black/90 rounded-2xl p-8 max-w-[550px] w-full">
        <h1 className="text-3xl md:text-4xl text-center mb-6 py-5 register__title">
          Únete a PuntoEncuentro!
        </h1>
        <form onSubmit={handleSubmit} className="pb-10">
          <fieldset className="flex flex-col gap-4 mb-6">
            <label className="text-sm font-medium register__label">
              Nombre:
              <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-black mt-1 px-4 py-2 border rounded-full w-full bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-cyan-100 register__input"
              />
            </label>
            <label className="text-sm font-medium register__label">
              Correo electrónico:
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-black mt-1 px-4 py-2 border rounded-full w-full bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-cyan-100 register__input"
              />
            </label>
            <label className="text-sm font-medium register__label">
              Contraseña:
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-black mt-1 px-4 py-2 border rounded-full w-full bg-white placeholder-black focus:outline-none focus:ring-2 focus:ring-cyan-100 register__input"
              />
            </label>
          </fieldset>
          <button
            type="submit"
            className="w-3/4 block mx-auto bg-[#ff5400] py-2 px-4 rounded-full hover:bg-[#ff5400]/30 transition duration-300 cursor-pointer text-xl"
          >
            Regístrate
          </button>
        </form>
        <p className="text-center text-xs md:text-sm text-white mt-4 register__link">
          ¿Ya eres miembro?{" "}
          <Link
            to="/signin"
            className="text-[#9e0059] hover:underline register__link-signin"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
