import BookCard from "../BookCard/BookCard";
import BookModal from "../BookCard/BookModal/BookModal";
import { BookContext } from "../../../contexts/BookContext";
import { useState, useContext } from "react";

function BookGrid({ books: incomingBooks, limit }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const {
    books: contextBooks,
    likedBooks,
    bookStatus,
    toggleLike,
    updateStatus,
  } = useContext(BookContext);

  const booksToUse = incomingBooks || contextBooks;
  const visibleBooks = limit ? booksToUse.slice(0, limit) : booksToUse;

  const handleDiscover = (book) => setSelectedBook(book);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-10 max-w-[1680px] mx-auto">
        {visibleBooks.map((book) => (
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
          onSelectStatus={(status) => updateStatus(selectedBook.id, status)}
        />
      )}
    </>
  );
}

export default BookGrid;
