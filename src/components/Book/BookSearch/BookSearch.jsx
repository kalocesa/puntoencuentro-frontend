import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { BookContext } from "../../../contexts/BookContext";
import BookGrid from "../BookGrid/BookGrid";

function BookSearch() {
  const { books, resetBooksToGenre, loadingBooks } = useContext(BookContext);
  const location = useLocation();

  useEffect(() => {
    return () => {
      const isSearchView = location.pathname === "/search";
      if (isSearchView) {
        resetBooksToGenre();
      }
    };
  }, [location.pathname]);

  return (
    <div className="mt-25">
      {loadingBooks ? (
        <p className="text-center text-gray-500">Cargando libros...</p>
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
