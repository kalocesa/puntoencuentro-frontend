import { useEffect } from "react";

export default function useOutsideClick(ref, onClose) {
  /* ref: al elemento que vigilo y onClose: la funcion que se ejecuta cuando se hace click */
  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.addEventListener("click", handleClick);
    };
  }, [ref, onClose]);
}
