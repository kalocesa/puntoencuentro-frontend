import { useContext, useState } from "react";
import { BookContext } from "../../../contexts/BookContext";
import { GenderContext } from "../../../contexts/GenderContext";
import BookGrid from "../BookGrid/BookGrid";
import "../BookSection/BookSection.css";

function BookSection() {
  const { books, showMoreBooks } = useContext(BookContext);
  const [visibleCount, setVisibleCount] = useState(24);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedGender } = useContext(GenderContext);

  const showMore = async () => {
    setIsLoading(true);
    const nextBlock = visibleCount + 12;

    if (nextBlock > books.length) {
      await showMoreBooks();
    }

    setVisibleCount(nextBlock);
    setIsLoading(false);
  };

  const visibleBooks = books.slice(0, visibleCount);

  const genreQuotes = {
    Fantasy: {
      quote:
        "Incluso la persona más pequeña puede cambiar el curso del futuro.",
      author: "J.R.R. Tolkien",
    },
    Fiction: {
      quote:
        "El mundo rompe a todos, y después, muchos son fuertes en los lugares rotos.",
      author: "Ernest Hemingway",
    },
    Nonfiction: {
      quote:
        "La verdad es más extraña que la ficción, porque la ficción debe limitarse a las posibilidades.",
      author: "Mark Twain",
    },
    Horror: {
      quote: "Inventamos horrores para poder sobrellevar los reales.",
      author: "Stephen King",
    },
    Romance: {
      quote:
        "El amor no mira con los ojos, sino con la mente, y por eso Cupido es pintado como ciego.",
      author: "William Shakespeare",
    },
    Mystery: {
      quote:
        "El mundo está lleno de cosas obvias que nadie por casualidad observa.",
      author: "Arthur Conan Doyle",
    },
    "Science Fiction": {
      quote:
        "Toda tecnología lo suficientemente avanzada es indistinguible de la magia.",
      author: "Arthur C. Clarke",
    },
    Drama: {
      quote:
        "El mundo entero es un escenario, y todos los hombres y mujeres, meros actores.",
      author: "William Shakespeare",
    },
  };

  return (
    <section className="max-w-[1536px] mx-auto my-10 px-5 md:px-10">
      <div className="mb-6">
        <h2 className="text-lg md:text-3xl mb-2 text-center font-medium italic">
          “{genreQuotes[selectedGender]?.quote || genreQuotes["Fantasy"].quote}”
        </h2>
        <h3 className="text-sm md:text-xl text-center text-gray-600">
          —{" "}
          {genreQuotes[selectedGender]?.author || genreQuotes["Fantasy"].author}
        </h3>
      </div>
      <BookGrid books={visibleBooks} />

      {visibleBooks.length < books.length + 24 && (
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
