import { useState } from "react";
import flecha from "@icons/Arrow-gender.svg";

function Gender() {
  const [open, setOpen] = useState(false);

  /* Tenemos un array con los géneros, pero se buscaría sacarlos de la API de Google Books */
  const generos = [
    "Ficción",
    "No ficción",
    "Terror",
    "Fantasía",
    "Romance",
    "Misterio",
    "Ciencia ficción",
    "Drama ",
  ];

  return (
    <div className="inline-block text-left mt-1">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-1 flex items-center justify-between w-55 cursor-pointer hover:bg-gray-400/10"
      >
        Géneros
        <img
          src={flecha}
          alt="flecha rosa para abrir el menú de géneros de libros"
          className=""
        />
      </button>

      {open && (
        <ul className="mt-0 w-55 z-10">
          {/* Probable tenga que hacer un boton dentro del li o quizá un anchor o un link */}
          {generos.map((genero) => (
            <li
              key={genero}
              className="px-4 py-1 hover:bg-gray-400/10 cursor-pointer text-sm "
              onClick={() => handleClick(genero)}
            >
              {genero}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Gender;
