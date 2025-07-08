import { createContext, useState, useEffect, useContext } from "react";
import { getBooksByGenre } from "../utils/api/googleBooks";
import { mapGoogleBook } from "../utils/mapGoogleBook";
import { GenderContext } from "./GenderContext";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState({});
  const [bookStatus, setBookStatus] = useState({});
  const { selectedGender } = useContext(GenderContext);

  // 🔄 Cargar libros desde Google Books al cambiar de género
  useEffect(() => {
    const fetchBooks = async () => {
      const genre = selectedGender || "Fantasía"; // valor por defecto
      const rawBooks = await getBooksByGenre(genre);
      const mapped = rawBooks.map(mapGoogleBook);
      setBooks(mapped);
    };
    fetchBooks();
  }, [selectedGender]);

  // 🧠 Cargar likes y status desde localStorage
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedBooks")) || {};
    const storedStatus = JSON.parse(localStorage.getItem("bookStatus")) || {};
    setLikedBooks(storedLikes);
    setBookStatus(storedStatus);
  }, []);

  // ❤️ Toggle de "me gusta"
  const toggleLike = (bookId) => {
    const updated = { ...likedBooks, [bookId]: !likedBooks[bookId] };
    setLikedBooks(updated);
    localStorage.setItem("likedBooks", JSON.stringify(updated));
  };

  // 📚 Actualizar estado: "read", "toRead", etc.
  const updateStatus = (bookId, newStatus) => {
    const updated = { ...bookStatus, [bookId]: newStatus };
    setBookStatus(updated);
    localStorage.setItem("bookStatus", JSON.stringify(updated));
  };

  // 📊 Utilidades
  const likedBooksList = books.filter((book) => likedBooks[book.id]);
  const getBooksByStatus = (status) =>
    books.filter((book) => bookStatus[book.id] === status);
  const countBooksByStatus = (status) => getBooksByStatus(status).length;
  const countLikedBooks = () => likedBooksList.length;

  return (
    <BookContext.Provider
      value={{
        books,
        likedBooks,
        bookStatus,
        toggleLike,
        updateStatus,
        likedBooksList,
        getBooksByStatus,
        countBooksByStatus,
        countLikedBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
