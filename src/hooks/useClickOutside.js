import { useEffect } from "react";

export default function useOutsideClick(ref, onClose) {
  /* ref: al elemento que vigilo y onClose: la funcion que se ejecuta cuando se hace click */
  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleClick);
    };
  }, [ref, onClose]);
}
