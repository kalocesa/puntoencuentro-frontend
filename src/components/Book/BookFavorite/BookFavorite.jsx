import { useContext, useState } from "react";
import { BookContext } from "../../../contexts/BookContext";
import BookModal from "../BookCard/BookModal/BookModal";

function BookFavorite() {
  const [modalOpen, setModalOpen] = useState(false);
  const { featuredBook, likedBooks, toggleLike, bookStatus, updateStatus } =
    useContext(BookContext);

  const book = featuredBook;
  const liked = book ? likedBooks[book.id] || false : false;
  const currentStatus = book ? bookStatus[book.id] || null : null;

  const handleDiscover = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const statusColors = {
    Leer: "bg-[#FFBD00] hover:bg-yellow-600",
    Leyendo: "bg-[#FF5400] hover:bg-orange-800",
    Leídos: "bg-[#FF0054] hover:bg-pink-700",
  };

  if (!book) return null; // ⏳ Puedes mostrar un loader si prefieres

  return (
    <>
      <img
        onClick={(e) => {
          e.stopPropagation();
          handleDiscover();
        }}
        src={book.image}
        alt={`Portada del libro ${book.title}`}
        className="w-[100px] h-[150px] md:w-[150px] md:h-[200px] rounded-2xl shadow-xl cursor-pointer"
      />
      <div className="flex flex-col relative">
        <h2 className="text-md md:text-2xl mt-5 ml-3 min-w-[200px] hero-overlay__subtitle">
          Nuestro favorito <br /> del mes
        </h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDiscover();
          }}
          className={`w-20 md:w-32 py-1 rounded-full ml-3 text-sm md:text-lg mt-auto mb-6 md:mb-10 cursor-pointer ${
            statusColors[currentStatus] || "bg-[#9e0059] hover:bg-rose-950"
          }`}
        >
          {currentStatus || "Descubre"}
        </button>
      </div>

      {modalOpen && (
        <BookModal
          book={book}
          liked={liked}
          onToggleLike={() => toggleLike(book.id)}
          onClose={closeModal}
          currentStatus={currentStatus}
          onSelectStatus={(s) => updateStatus(book.id, s)}
        />
      )}
    </>
  );
}

export default BookFavorite;
