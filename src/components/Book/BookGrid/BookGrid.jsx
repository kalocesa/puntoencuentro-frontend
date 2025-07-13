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
      <div className="max-w-[1800px] grid grid-flow-row gap-5 sm:gap-15 md:gap-8 lg:gap-15 grid-cols-2 md:grid-cols-3 xl:grid-cols-5 mx-auto px-0 pt-5 sm:px-20 sm:pt-10">
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
