import like from "@icons/like.svg";
import dislike from "@icons/dislike.svg";
import { useState } from "react";

function BookCard({ book, onDiscover }) {
  const [liked, setLiked] = useState(false);
  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <>
      <article className="w-full rounded-lg bg-white flex flex-col">
        <figure className="mb-1">
          <img
            src={book.cover}
            alt={`Portada de ${book.title}`}
            className="w-full object-cover rounded-t-lg cursor-pointer"
            onClick={() => onDiscover(book)}
          />
          <figcaption className="sr-only">Portada del libro</figcaption>
        </figure>

        <header className="px-2">
          <h3 className="text-sm md:text-lg font-semibold text-stone-950 truncate overflow-hidden whitespace-nowrap">
            {book.title}
          </h3>
          <p className="text-sm text-stone-500 truncate overflow-hidden whitespace-nowrap">
            {book.author}
          </p>
        </header>

        <footer className="py-2 grid grid-col-2">
          <button
            onClick={() => onDiscover(book)}
            className="ml-2 px-2 py-1 text-sm bg-[#ffbd00] hover:bg-yellow-700 rounded-full cursor-pointer col-1"
          >
            Descubre
          </button>

          <button
            onClick={toggleLike}
            className="w-7 cursor-pointer col-2 ml-auto mr-2 transition-transform hover:scale-115"
            aria-pressed={liked}
          >
            <img
              src={liked ? like : dislike}
              alt={
                liked
                  ? "Icono de favorito activo"
                  : "Icono de favorito inactivo"
              }
              className="w-full"
            />
          </button>
        </footer>
      </article>
    </>
  );
}

export default BookCard;
