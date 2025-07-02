import { useContext } from "react";
import { BookContext } from "../../../contexts/BookContext";
import { GenderContext } from "../../../contexts/GenderContext";
import BookGrid from "../BookGrid/BookGrid";
import "../BookSection/BookSection.css";
import { Link } from "react-router-dom";

function BookSection({ title, filter, linkTo }) {
  const { books } = useContext(BookContext);
  const { selectedGender } = useContext(GenderContext);

  const filteredBooks = books
    .filter((book) => !selectedGender || book.genre === selectedGender)
    .filter(filter)
    .slice(0, 6);

  return (
    <section className="my-10 px-5 md:px-10">
      <div className="flex justify-between items-baseline max-w-[1680px] mx-auto">
        <h2 className="md:text-[50px] text-[30px] bookSection__title">
          {title}
        </h2>
        <Link to={linkTo}>
          <button className="hover:underline cursor-pointer text-sm md:text-xl">
            Ver más
          </button>
        </Link>
      </div>
      <BookGrid books={filteredBooks} />
    </section>
  );
}

export default BookSection;
