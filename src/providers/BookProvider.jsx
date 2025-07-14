import { useState, useEffect, useContext, useCallback } from "react";
import { fetchGoogleBooks } from "../utils/api/googleBooks";
import { GenderContext } from "../contexts/GenderContext";
import { UserContext } from "../contexts/UserContext";
import useAuthStatus from "../utils/useAuthStatus";
import { BookContext } from "../contexts/BookContext";

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState({});
  const [bookStatus, setBookStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const { selectedGender } = useContext(GenderContext);
  const { user } = useContext(UserContext);
  const { cargando } = useAuthStatus();
  const getUserScopedKey = useCallback(
    (key) => (user?.uid ? `${key}_${user.uid}` : key),
    [user?.uid]
  );

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

  useEffect(() => {
    if (!cargando && user?.uid) {
      const storedLikes =
        JSON.parse(localStorage.getItem(getUserScopedKey("likedBooks"))) || {};
      const storedStatus =
        JSON.parse(localStorage.getItem(getUserScopedKey("bookStatus"))) || {};
      setLikedBooks(storedLikes);
      setBookStatus(storedStatus);
    }
  }, [cargando, user?.uid, getUserScopedKey]);

  const saveModifiedBook = (book) => {
    const key = getUserScopedKey("modifiedBooks");
    const stored = JSON.parse(localStorage.getItem(key)) || {};
    const updated = { ...stored, [book.id]: book };
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const toggleLike = (bookId) => {
    const updated = { ...likedBooks, [bookId]: !likedBooks[bookId] };
    setLikedBooks(updated);
    localStorage.setItem(
      getUserScopedKey("likedBooks"),
      JSON.stringify(updated)
    );

    const book = books.find((b) => b.id === bookId);
    if (book) saveModifiedBook(book);
  };

  const updateStatus = (bookId, newStatus) => {
    const updated = { ...bookStatus, [bookId]: newStatus };
    setBookStatus(updated);
    localStorage.setItem(
      getUserScopedKey("bookStatus"),
      JSON.stringify(updated)
    );

    const book = books.find((b) => b.id === bookId);
    if (book) saveModifiedBook(book);
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

export default BookProvider;
