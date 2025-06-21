import BookCard from "../BookCard/BookCard";
import BookModal from "../BookCard/BookModal/BookModal";
import books from "../../../data/book.json";
import { useState } from "react";

function BookGrid() {
  const [selectedBook, setSelectedBook] = useState(null);
  const handleDiscover = (book) => {
    setSelectedBook(book);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-5 p-5">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onDiscover={handleDiscover} />
        ))}
      </div>
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </>
  );
}

export default BookGrid;
