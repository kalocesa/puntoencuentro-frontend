import BookCard from "../BookCard/BookCard";
import books from "../../../data/book.json";

function BookGrid() {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}

export default BookGrid;
