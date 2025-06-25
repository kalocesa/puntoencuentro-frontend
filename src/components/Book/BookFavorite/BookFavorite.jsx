import featuredBooks from "../../../data/genrebooks.json";
import { useContext, useState } from "react";
import { GenderContext } from "../../../contexts/GenderContext";
import BookModal from "../BookCard/BookModal/BookModal";

function BookFavorite() {
  const [modalOpen, setModalOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [status, setStatus] = useState(null);
  const { selectedGender } = useContext(GenderContext);

  const genreString = (str) => str?.toLowerCase().replace(/\s/g, "");

  const book =
    featuredBooks.find(
      (book) => genreString(book.genre) === genreString(selectedGender)
    ) || featuredBooks.find((book) => book.genre === "Fantasía");

  const handleDiscover = () => setModalOpen(true);

  const closeModal = () => setModalOpen(false);

  const statusColors = {
    Leer: "bg-[#FFBD00] hover:bg-yellow-600",
    Leyendo: "bg-[#FF5400] hover:bg-orange-800",
    Leídos: "bg-[#FF0054] hover:bg-pink-700",
  };

  return (
    <>
      <img
        src={book.cover}
        alt={`Portada del libro ${book.title}`}
        className="w-[100px] h-[150px] md:w-[150px] md:h-[200px] rounded-2xl shadow-xl"
      />
      <div className="flex flex-col relative">
        <h2 className="text-md md:text-2xl mt-5 ml-3 min-w-[200px] hero-overlay__subtitle">
          Nuestro favorito <br /> del mes
        </h2>
        <button
          onClick={handleDiscover}
          className={`w-20 md:w-32 py-1 rounded-full ml-3 text-sm md:text-lg mt-auto mb-6 md:mb-10 cursor-pointer ${
            statusColors[status] || "bg-[#ff5400] hover:bg-[#ff5400]/30"
          }`}
        >
          {status || "Descubre"}
        </button>
      </div>

      {modalOpen && (
        <BookModal
          book={book}
          liked={liked}
          onToggleLike={() => setLiked(!liked)}
          onClose={closeModal}
          currentStatus={status}
          onSelectStatus={(s) => setStatus(s)}
        />
      )}
    </>
  );
}

export default BookFavorite;
