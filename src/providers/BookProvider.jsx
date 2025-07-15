import { useState, useEffect, useContext, useCallback } from "react";
import { fetchGoogleBooks } from "../utils/api/googleBooks";
import { fetchBookByTitle } from "../utils/api/googleBooks";
import { mapGoogleBook } from "../utils/mapGoogleBook";
import { GenderContext } from "../contexts/GenderContext";
import { UserContext } from "../contexts/UserContext";
import useAuthStatus from "../utils/useAuthStatus";
import { BookContext } from "../contexts/BookContext";

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState({});
  const [featuredBook, setFeaturedBook] = useState(null);
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
    const fetchFeaturedBook = async () => {
      const titleMap = {
        Fantasy: "El Señor de los Anillos",
        Fiction: "Dune",
        Nonfiction: "A sangre fría",
        Horror: "La niebla",
        Romance: "Orgullo y prejuicio",
        Mystery: "Diez negritos",
        "Science Fiction": "Viaje al centro de la Tierra",
        Drama: "Por trece razones",
      };

      const title = titleMap[selectedGender] || titleMap["Fantasy"];
      const rawBook = await fetchBookByTitle(title);

      if (rawBook) {
        const mapped = mapGoogleBook(rawBook);
        const enrichedBook = {
          ...mapped,
          genre: selectedGender,
        };

        setFeaturedBook(enrichedBook);

        const key = getUserScopedKey("modifiedBooks");
        const stored = JSON.parse(localStorage.getItem(key)) || {};
        const updated = { ...stored, [enrichedBook.id]: enrichedBook };
        localStorage.setItem(key, JSON.stringify(updated));
      }
    };

    fetchFeaturedBook();
  }, [selectedGender, getUserScopedKey]);

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

  const likedBooksList = books.filter((book) => likedBooks[book.id]);
  const getBooksByStatus = (status) =>
    books.filter((book) => bookStatus[book.id] === status);
  const countBooksByStatus = (status) => getBooksByStatus(status).length;
  const countLikedBooks = () => likedBooksList.length;

  return (
    <BookContext.Provider
      value={{
        books,
        featuredBook,
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
