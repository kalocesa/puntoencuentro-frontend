import { createContext, useState, useEffect, useContext } from "react";
import { fetchGoogleBooks } from "../utils/api/googleBooks";
import { GenderContext } from "./GenderContext";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState({});
  const [bookStatus, setBookStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const { selectedGender } = useContext(GenderContext);

  const showMoreBooks = async () => {
    const queryGenre = selectedGender?.toLowerCase() || "fantasy";
    const newBooks = await fetchGoogleBooks(queryGenre, currentPage * 20, 20);

    setBooks((prevBooks) => {
      const existingIds = new Set(prevBooks.map((book) => book.id));
      const filteredBooks = newBooks.filter(
        (book) => !existingIds.has(book.id)
      );

      setCurrentPage((prevPage) => prevPage + 1);
      return [...prevBooks, ...filteredBooks];
    });
  };

  useEffect(() => {
    const resetAndFetch = async () => {
      setBooks([]);
      setCurrentPage(0);

      const initialBooks = await fetchGoogleBooks(
        selectedGender?.toLowerCase() || "fantasy",
        0,
        20
      );
      setBooks(initialBooks);
    };

    resetAndFetch();
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
        showMoreBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
