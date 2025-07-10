import bookImage from "../../public/book.png";

export const mapGoogleBook = (book) => {
  const identifiers = book.volumeInfo.industryIdentifiers || [];

  const isbn =
    identifiers.find((id) => id.type === "ISBN_13")?.identifier ||
    identifiers.find((id) => id.type === "ISBN_10")?.identifier ||
    "sin-isbn";

  const title =
    book.volumeInfo.title?.replace(/\s+/g, "-").toLowerCase() || "sin-titulo";
  const author =
    book.volumeInfo.authors?.[0]?.replace(/\s+/g, "-").toLowerCase() ||
    "sin-autor";
  const publishedDate = book.volumeInfo.publishedDate || "sin-fecha";

  // Usamos el ISBN como base para un ID más confiable
  const uniqueId = `${isbn}-${title}-${author}-${publishedDate}`;

  return {
    id: uniqueId,
    isbn,
    title: book.volumeInfo.title || "Sin título",
    author: book.volumeInfo.authors?.join(", ") || "Autor desconocido",
    publisher: book.volumeInfo.publisher || "Editorial desconocida",
    genre: book.volumeInfo.categories?.[0] || "Sin género",
    image: book.volumeInfo.imageLinks?.thumbnail || bookImage,
    pageCount: book.volumeInfo.pageCount || 0,
    publishedDate,
    description: book.volumeInfo.description || "Sin sinopsis disponible",
  };
};
