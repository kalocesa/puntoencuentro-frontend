import { useContext } from "react";
import { BookContext } from "../../../contexts/BookContext";
import BookGrid from "../BookGrid/BookGrid";
import { Link } from "react-router-dom";

function BookSection({ title, filter, linkTo }) {
  const { books } = useContext(BookContext);
  const filteredBooks = books.filter(filter).slice(0, 6);

  return (
    <section className="my-10">
      <div className="flex justify-between text-center mt-4 px-4">
        <h2 className="text-3xl mb-3 ml-5">{title}</h2>
        <Link to={linkTo}>
          <button className="mr-5 hover:underline cursor-pointer">
            Ver {title.toLowerCase()}
          </button>
        </Link>
      </div>
      <BookGrid books={filteredBooks} />
    </section>
  );
}

export default BookSection;
