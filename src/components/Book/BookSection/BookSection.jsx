import { useContext, useState } from "react";
import { BookContext } from "../../../contexts/BookContext";
import BookGrid from "../BookGrid/BookGrid";
import "../BookSection/BookSection.css";

function BookSection() {
  const { books, showMoreBooks } = useContext(BookContext);
  const [visibleCount, setVisibleCount] = useState(20);
  const [isLoading, setIsLoading] = useState(false); // 🆕 Estado para mostrar el loading

  const showMore = async () => {
    setIsLoading(true); // ✅ Mostrar “Cargando...”
    const nextBlock = visibleCount + 20;

    if (nextBlock > books.length) {
      await showMoreBooks(); // Si es una promesa, se espera que termine
    }

    setVisibleCount(nextBlock);
    setIsLoading(false); // ✅ Ocultar “Cargando...” al terminar
  };

  const visibleBooks = books.slice(0, visibleCount);

  return (
    <section className="my-10 px-5 md:px-10">
      <BookGrid books={visibleBooks} />

      {visibleBooks.length < books.length + 20 && (
        <div className="text-center mt-10">
          {isLoading ? (
            <p className="text-sm text-gray-500">Cargando más libros...</p>
          ) : (
            <button
              onClick={showMore}
              className="bg-[#390099] px-6 py-3 rounded hover:bg-[#390099]/50 transition cursor-pointer"
            >
              Ver más
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default BookSection;
