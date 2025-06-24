import { createContext, useState, useEffect } from "react";
import books from "../data/book.json";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [likedBooks, setLikedBooks] = useState({});
  const [bookStatus, setBookStatus] = useState({});

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedBooks")) || {};
    const storedStatus = JSON.parse(localStorage.getItem("bookStatus")) || {};
    setLikedBooks(storedLikes);
    setBookStatus(storedStatus);
  }, []);

  const toggleLike = (bookId) => {
    const updated = { ...likedBooks, [bookId]: !likedBooks[bookId] };
    setLikedBooks(updated);
    localStorage.setItem("likedBooks", JSON.stringify(updated));
  };

  const updateStatus = (bookId, newStatus) => {
    const updated = { ...bookStatus, [bookId]: newStatus };
    setBookStatus(updated);
    localStorage.setItem("bookStatus", JSON.stringify(updated));
  };

  const likedBooksList = books.filter((book) => likedBooks[book.id]);
  const getBooksByStatus = (status) =>
    books.filter((book) => bookStatus[book.id] === status);

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
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
