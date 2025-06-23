import BookCard from "../BookCard/BookCard";
import BookModal from "../BookCard/BookModal/BookModal";
import books from "../../../data/book.json";
import { useState, useEffect } from "react";

function BookGrid() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [likedBooks, setLikedBooks] = useState({});
  const [bookStatus, setBookStatus] = useState({});

  const handleDiscover = (book) => {
    setSelectedBook(book);
  };

  const toggleLike = (bookId) => {
    const updated = {
      ...likedBooks,
      [bookId]: !likedBooks[bookId],
    };
    setLikedBooks(updated);
    localStorage.setItem("likedBooks", JSON.stringify(updated));
  };

  const handleStatusChange = (bookId, newStatus) => {
    const updated = {
      ...bookStatus,
      [bookId]: newStatus,
    };
    setBookStatus(updated);
    localStorage.setItem("bookStatus", JSON.stringify(updated));
  };

  useEffect(() => {
    const storedLikes = localStorage.getItem("likedBooks");
    const storedStatus = localStorage.getItem("bookStatus");

    if (storedLikes) {
      setLikedBooks(JSON.parse(storedLikes));
    }

    if (storedStatus) {
      setBookStatus(JSON.parse(storedStatus));
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-5 p-5">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onDiscover={handleDiscover}
            liked={likedBooks[book.id]}
            onToggleLike={() => toggleLike(book.id)}
            currentStatus={bookStatus[book.id]}
          />
        ))}
      </div>
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          liked={likedBooks[selectedBook.id]}
          onToggleLike={() => toggleLike(selectedBook.id)}
          currentStatus={bookStatus[selectedBook.id]}
          onSelectStatus={(status) =>
            handleStatusChange(selectedBook.id, status)
          }
        />
      )}
    </>
  );
}

export default BookGrid;
