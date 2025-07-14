/* import featuredBooks from "../../../data/genrebooks.json";
import { useContext, useState, useEffect } from "react";
import { GenderContext } from "../../../contexts/GenderContext";
import { BookContext } from "../../../contexts/BookContext";
import BookModal from "../BookCard/BookModal/BookModal";
import { fetchBookByTitle } from "../../../utils/api/googleBooks";
import { mapGoogleBook } from "../../../utils/mapGoogleBook";
 */
/* function BookFavorite() {
  const [modalOpen, setModalOpen] = useState(false);
  const { selectedGender } = useContext(GenderContext);
  const genreString = (str) => str?.toLowerCase().replace(/\s/g, "");
  const { likedBooks, toggleLike, bookStatus, updateStatus } =
    useContext(BookContext);
  const genreBookMap = {
    Fantasy: "El Señor de los Anillos",
    Fiction: "Dune",
    Nonfiction: "A sangre fría",
    Horror: "La niebla",
    Romance: "Orgullo y prejuicio",
    Mystery: "Diez negritos",
    "Science Fiction": "Viaje al centro de la Tierra",
    Drama: "Por trece razones",
  };
  const [apiBook, setApiBook] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      const title = genreBookMap[selectedGender] || genreBookMap["Fantasy"];
      const bookData = await fetchBookByTitle(title);
      if (bookData) {
        const mapped = mapGoogleBook(bookData);
        setApiBook({ ...mapped, genre: selectedGender });
      }
    };
    loadBook();
  }, [selectedGender]);

  const fallbackBook =
    featuredBooks.find(
      (book) => genreString(book.genre) === genreString(selectedGender)
    ) || featuredBooks.find((book) => book.genre === "Fantasía");

  const book = apiBook || fallbackBook;

  const liked = likedBooks[book.id] || false;
  const currentStatus = bookStatus[book.id] || null;

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
} */

//export default BookFavorite;
