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
    { label: "Ficción", value: "Fiction" },
    { label: "No ficción", value: "Nonfiction" },
    { label: "Terror", value: "Horror" },
    { label: "Fantasía", value: "Fantasy" },
    { label: "Romance", value: "Romance" },
    { label: "Misterio", value: "Mystery" },
    { label: "Ciencia ficción", value: "Science Fiction" },
    { label: "Drama", value: "Drama" },
  ];

  const handleClick = (gender) => {
    setSelectedGender(gender);
    setOpen(false);
    setIsMenuOpen(false);
    navigate("/home");
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
          {genders.map(({ label, value }) => (
            <li
              key={value}
              className="px-4 py-1 hover:bg-gray-400/10 cursor-pointer text-sm"
              onClick={() => {
                handleClick(value);
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Gender;
