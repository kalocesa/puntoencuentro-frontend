import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { BookContext } from "../../contexts/BookContext";
import BookGrid from "../Book/BookGrid/BookGrid";
import arrow from "@icons/arrow-back.svg";
import { Link } from "react-router-dom";

function SectionPage() {
  const { seccionId } = useParams();
  const { books } = useContext(BookContext);
  const [visible, setVisible] = useState(12);

  const criterios = {
    Títulos: (book) => book.title.toLowerCase().includes("alas"),
    "Los más leídos": (book) =>
      book.publisher.toLowerCase().includes("alfaguara"),
    Novedades: (book) => book.title.toLowerCase().includes("la"),
  };

  const filtro = criterios[seccionId];
  const filteredBooks = filtro ? books.filter(filtro) : [];

  const handleVerMas = () => {
    setVisible((prev) => prev + 12);
  };

  return (
    <section className="mt-[80px]">
      <div className="flex justify-between items-end">
        <h2 className="text-3xl ml-6">{seccionId}</h2>
        <Link to={"/"}>
          <img
            src={arrow}
            alt="flecha blanca para regresar al menu principal"
            className="mr-5"
          />
        </Link>
      </div>
      {filteredBooks.length === 0 ? (
        <p className="text-gray-500">
          No hay libros disponibles en esta sección.
        </p>
      ) : (
        <>
          <BookGrid books={filteredBooks.slice(0, visible)} />
          {visible < filteredBooks.length && (
            <div className="text-center mt-4">
              <button
                onClick={handleVerMas}
                className="px-4 py-2 bg-[#390099] text-white rounded hover:bg-indigo-950 cursor-pointer"
              >
                Ver más
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default SectionPage;
