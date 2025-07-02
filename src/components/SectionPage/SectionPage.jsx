import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { BookContext } from "../../contexts/BookContext";
import { GenderContext } from "../../contexts/GenderContext";
import BookGrid from "../Book/BookGrid/BookGrid";
import arrow from "@icons/arrow-back.svg";
import { Link } from "react-router-dom";
import "../SectionPage/SectionPage.css";

function SectionPage() {
  const { seccionId, genreId } = useParams();
  const { books } = useContext(BookContext);
  const [visible, setVisible] = useState(12);
  const { selectedGender } = useContext(GenderContext);

  const genderActive = genreId || selectedGender;

  const criteria = {
    Titulos: (book) => book.title.toLowerCase().includes(""),
    "Los mas leidos": (book) => book.publisher.toLowerCase().includes(""),
    Novedades: (book) => book.title.toLowerCase().includes(""),
  };

  const labels = {
    Titulos: "Títulos",
    "Los mas leidos": "Los más leídos",
    Novedades: "Novedades",
  };

  const booksByGenre = genderActive
    ? books.filter((book) => book.genre === genderActive)
    : books;

  const sectionsToRender = seccionId
    ? [{ name: seccionId, books: booksByGenre.filter(criteria[seccionId]) }]
    : Object.entries(criteria).map(([name, filter]) => ({
        name,
        books: booksByGenre.filter(filter),
      }));

  const handleSeeMore = () => {
    setVisible((prev) => prev + 12);
  };

  return (
    <section className="mt-[80px] max-w-[1680px] mx-auto px-5 md:px-10">
      <div className="flex justify-between items-end mb-4">
        <h2 className="md:text-[50px] text-[30px] ml-2 section-page__title">
          {labels[seccionId]}
        </h2>
        <Link to={"/"}>
          <img
            src={arrow}
            alt="flecha blanca para regresar al menu principal"
            className="cursor-pointer mr-2 text-sm md:text-xl"
          />
        </Link>
      </div>
      {sectionsToRender.map(({ name, books }) => (
        <div key={name} className="mb-12">
          {!seccionId && <h3 className="text-2xl">{name}</h3>}

          {books.length === 0 ? (
            <p className="text-gray-500 ml-6">
              No hay libros de {genderActive} en la sección "{name}".
            </p>
          ) : (
            <>
              <BookGrid books={books.slice(0, visible)} />
              {visible < books.length && (
                <div className="text-center mt-10">
                  <button
                    onClick={handleSeeMore}
                    className="px-4 py-2 bg-[#390099] mr-2 rounded hover:bg-indigo-950 cursor-pointer"
                  >
                    Ver más
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </section>
  );
}

export default SectionPage;
