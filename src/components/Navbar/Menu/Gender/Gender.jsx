import { useState, useContext, useRef } from "react";
import { GenderContext } from "../../../../contexts/GenderContext";
import useOutsideClick from "../../../../hooks/useClickOutside";
import arrow from "@icons/Arrow-gender.svg";
import { useNavigate } from "react-router-dom";

function Gender({ setIsMenuOpen }) {
  const [open, setOpen] = useState(false);
  const { setSelectedGender } = useContext(GenderContext);
  const genderRef = useRef(null);
  useOutsideClick(genderRef, () => setOpen(false));
  const navigate = useNavigate();

  const genders = [
    "Ficción",
    "No ficción",
    "Terror",
    "Fantasía",
    "Romance",
    "Misterio",
    "Ciencia ficción",
    "Drama",
  ];

  const handleClick = (gender) => {
    setSelectedGender(gender);
    setOpen(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <div ref={genderRef} className="inline-block text-left mt-1">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-1 flex items-center justify-between w-55 cursor-pointer hover:bg-gray-400/10"
      >
        Géneros
        <img
          src={arrow}
          alt="flecha rosa para abrir el menú de géneros de libros"
          className=""
        />
      </button>

      {open && (
        <ul className="mt-0 w-55 z-10">
          {genders.map((gender) => (
            <li
              key={gender}
              className="px-4 py-1 hover:bg-gray-400/10 cursor-pointer text-sm "
              onClick={() => {
                handleClick(gender);
              }}
            >
              {gender}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Gender;
