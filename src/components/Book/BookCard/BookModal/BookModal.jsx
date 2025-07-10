import close from "@icons/close.svg";
import like from "@icons/like.svg";
import dislike from "@icons/dislike.svg";
import "../BookModal/BookModal.css";
import SaveDropdown from "../SaveDropDown/SaveDropDown";
import { useRef } from "react";
import useOutsideClick from "../../../../hooks/useClickOutside";

function BookModal({
  book,
  onClose,
  liked,
  onToggleLike,
  currentStatus,
  onSelectStatus,
}) {
  const modalRef = useRef();
  useOutsideClick(modalRef, onClose);
  return (
    <div className="fixed inset-0 bg-stone-950/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-stone-950 max-w-[950px] rounded-lg shadow-2xl shadow-stone-950 w-full p-6 relative"
      >
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
        {/* Aquí empieza el grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Columna 1 */}
          <div className="bg-stone-50 rounded-lg p-2 items-center max-h-[360px] w-[150px] md:w-2/4 m-auto flex flex-col">
            <img
              src={book.image}
              alt={`Portada de ${book.title}`}
              className="w-32 md:w-50 md:min-h-[300px] md:max-h-[301px] mx-auto object-cover rounded-lg"
            />
            <div className="grid grid-cols-2 mt-2 max-w-[125px] md:max-w-[200px]">
              {/* Botones */}
              <SaveDropdown
                currentStatus={currentStatus}
                onSelectStatus={onSelectStatus}
              />
              <button
                onClick={onToggleLike}
                className="w-7 cursor-pointer ml-auto transition-transform hover:scale-115"
                aria-pressed={liked}
              >
                <img
                  src={liked ? like : dislike}
                  alt="Favorito"
                  className="w-full"
                />
              </button>
            </div>
          </div>

          {/* Columna 2 */}
          <div className="mt-4 md:mt-5 h-[350px] overflow-y-auto pr-2">
            <p className="bookmodal__property font-bold">
              Título:
              <span className="bookmodal__property-span font-light">
                {" "}
                {book.title}
              </span>
            </p>
            <p className="bookmodal__property font-bold">
              Autor:
              <span className="bookmodal__property-span font-light">
                {" "}
                {book.author}
              </span>
            </p>
            <p className="bookmodal__property font-bold">
              Páginas:
              <span className="bookmodal__property-span font-light">
                {" "}
                {book.pageCount} páginas
              </span>
            </p>
            <p className="bookmodal__property font-bold">
              Editorial:
              <span className="bookmodal__property-span font-light">
                {" "}
                {book.publisher}
              </span>
            </p>
            <p className="bookmodal__property font-bold">
              Fecha de publicación:
              <span className="bookmodal__property-span font-light">
                {" "}
                {book.publishedDate}
              </span>
            </p>
            <p className="bookmodal__property font-bold">
              Sinopsis:
              <span className="bookmodal__property-span font-light">
                {" "}
                {book.description}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookModal;
