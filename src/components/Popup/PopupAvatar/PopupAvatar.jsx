import { useState, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { updateUserData } from "../../../utils/localStorageUser";
import close from "@icons/close.svg";
import avatar1 from "@images/avatar1.png";
import avatar2 from "@images/avatar2.png";
import avatar3 from "@images/avatar3.png";
import avatar4 from "@images/avatar4.png";
import avatar5 from "@images/avatar5.png";
import avatar6 from "@images/avatar6.png";
import avatar7 from "@images/avatar7.png";
import avatar8 from "@images/avatar8.png";
import avatar9 from "@images/avatar9.png";
import "../PopupAvatar/PopupAvatar.css";
import { useRef } from "react";
import useOutsideClick from "../../../hooks/useClickOutside";

function PopupAvatar({ isOpen, onClose, currentAvatar, onSave }) {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const { user, setUser } = useContext(UserContext);

  const avatarOptions = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
  ];
  const modalRef = useRef();
  useOutsideClick(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-950/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-stone-950 rounded-3xl p-6 w-full max-w-md relative"
      >
        <h2 className="text-3xl mb-6 text-center popup__title">
          Selecciona tu avatar
        </h2>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {avatarOptions.map((src) => (
            <img
              key={src}
              src={src}
              alt="avatar"
              onClick={() => setSelectedAvatar(src)}
              className={`w-full rounded-full p-2 cursor-pointer border-4 transition-all duration-200 bg-white ${
                selectedAvatar === src
                  ? "border-cyan-400"
                  : "border-transparent"
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-sm text-gray-500 hover:text-black cursor-pointer"
          >
            <img
              src={close}
              alt="Botón de cerrar ventana emergente"
              className="w-8"
            />
          </button>
          <button
            onClick={() => {
              updateUserData(user.uid, { avatar: selectedAvatar });
              setUser((prev) => ({
                ...prev,
                avatar: selectedAvatar,
              }));
              onSave(selectedAvatar); // si lo usas para re-render externo
              onClose();
            }}
            className="w-full px-4 py-2 bg-[#9e0059] text-xl cursor-pointer rounded-full hover:bg-[#9e0059]/30"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupAvatar;
