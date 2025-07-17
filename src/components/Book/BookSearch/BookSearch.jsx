import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { BookContext } from "../../../contexts/BookContext";
import BookGrid from "../BookGrid/BookGrid";
import { LoaderContext } from "../../../providers/LoaderProvider";
import Loader from "../../Loader/Loader.jsx";

function BookSearch() {
  const { books, resetBooksToGenre } = useContext(BookContext);
  const { isLoading } = useContext(LoaderContext);
  const location = useLocation();

  useEffect(() => {
    return () => {
      if (location.pathname === "/search") {
        resetBooksToGenre();
      }
    };
  }, [location.pathname]);

  return (
    <div className="mt-25">
      {isLoading ? (
        <Loader />
      ) : books.length > 0 ? (
        <BookGrid books={books} />
      ) : (
        <p className="text-gray-500 text-center mt-10">
          No hay resultados. Intenta otra búsqueda.
        </p>
      )}
    </div>
  );
}

export default BookSearch;
