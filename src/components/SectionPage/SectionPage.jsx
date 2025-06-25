import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { BookContext } from "../../contexts/BookContext";
import { GenderContext } from "../../contexts/GenderContext";
import BookGrid from "../Book/BookGrid/BookGrid";
import arrow from "@icons/arrow-back.svg";
import { Link } from "react-router-dom";

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
    <section className="mt-[80px]">
      <div className="flex justify-between items-end">
        <h2 className="text-3xl ml-6">{labels[seccionId]}</h2>
        <Link to={"/"}>
          <img
            src={arrow}
            alt="flecha blanca para regresar al menu principal"
            className="mr-5"
          />
        </Link>
      </div>
      {sectionsToRender.map(({ name, books }) => (
        <div key={name} className="mb-12">
          {!seccionId && <h3 className="text-2xl ml-6 mb-4">{name}</h3>}

          {books.length === 0 ? (
            <p className="text-gray-500 ml-6">
              No hay libros de {genderActive} en la sección "{name}".
            </p>
          ) : (
            <>
              <BookGrid books={books.slice(0, visible)} />
              {visible < books.length && (
                <div className="text-center mt-4">
                  <button
                    onClick={handleSeeMore}
                    className="px-4 py-2 bg-[#390099] text-white rounded hover:bg-indigo-950 cursor-pointer"
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
