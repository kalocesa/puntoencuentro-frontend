import { useContext } from "react";
import { BookContext } from "../../../contexts/BookContext";
import BookGrid from "../BookGrid/BookGrid";
import "../BookSection/BookSection.css";
import { Link } from "react-router-dom";

function BookSection({ title, filter, linkTo }) {
  const { books } = useContext(BookContext);
  const filteredBooks = books.filter(filter).slice(0, 6);

  return (
    <section className="my-10">
      <div className="flex justify-between text-center my-4 px-4 items-end">
        <h2 className="text-2xl md:text-3xl ml-5 bookSection__title">
          {title}
        </h2>
        <Link to={linkTo}>
          <button className="mr-5 hover:underline cursor-pointer">
            Ver más
          </button>
        </Link>
      </div>
      <BookGrid books={filteredBooks} />
    </section>
  );
}

export default BookSection;
