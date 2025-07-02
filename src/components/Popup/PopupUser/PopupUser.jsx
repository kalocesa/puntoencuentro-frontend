import { useContext, useState, useRef } from "react";
import { UserContext } from "../../../contexts/UserContext";
import useOutsideClick from "../../../hooks/useClickOutside";
import close from "@icons/close.svg";
import "../PopupAvatar/PopupAvatar.css";

function PopupUser({ isOpen, onClose }) {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    about: user.about,
  });

  const modalRef = useRef();
  useOutsideClick(modalRef, onClose);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser((prev) => ({ ...prev, ...formData }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-stone-950/50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-stone-950 p-6 rounded-3xl w-full max-w-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <img
            src={close}
            alt="Cerrar edición de perfil"
            className="w-8 cursor-pointer"
          />
        </button>

        <h2 className="text-3xl mb-4 text-center popup__title">
          Editar perfil
        </h2>

        <form className="flex flex-col gap-4">
          <label className="flex flex-col">
            <p className="popup__subtitle text-sm font-medium mb-2">Nombre:</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-stone-300 rounded-xl p-2"
            />
          </label>

          <label className="flex flex-col">
            <p className="popup__subtitle text-sm font-medium mb-2">
              Correo electrónico:
            </p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-stone-300 rounded-xl p-2"
            />
          </label>

          <label className="flex flex-col">
            <p className="popup__subtitle text-sm font-medium mb-2">
              Acerca de mí:
            </p>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows="4"
              className="border border-stone-300 rounded-xl p-2 resize-none"
            />
          </label>
        </form>

        <button
          onClick={handleSave}
          className="mt-6 w-full bg-[#390099] hover:bg-[#390099]/30 text-xl py-2 cursor-pointer rounded-full"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}

export default PopupUser;
