function BookCard({ book, onDiscover, onLike }) {
  return (
    <>
      <article className="rounded-lg p-4 bg-white flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-lg">
        <figure className="mb-3">
          <img
            src={book.cover}
            alt={`Portada de ${book.title}`}
            className="w-28 h-40 object-cover rounded"
          />
          <figcaption className="sr-only">Portada del libro</figcaption>
        </figure>

        <header>
          <h3 className="text-md font-semibold text-stone-800">{book.title}</h3>
          <p className="text-sm text-stone-500">{book.author}</p>
        </header>

        <footer className="mt-3 flex gap-2">
          <button
            onClick={() => onDiscover(book)}
            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
          >
            Descubre
          </button>

          <button
            onClick={() => onLike(book)}
            className="px-3 py-1 text-sm border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition"
            aria-pressed={book.liked}
            aria-label="Marcar como favorito"
          >
            ❤️
          </button>
        </footer>
      </article>
    </>
  );
}

export default BookCard;
