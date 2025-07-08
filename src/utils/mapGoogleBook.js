export const mapGoogleBook = (book) => ({
  id: book.id,
  title: book.volumeInfo.title || "Sin título",
  author: book.volumeInfo.authors?.join(", ") || "Autor desconocido",
  publisher: book.volumeInfo.publisher || "Editorial desconocida",
  genre: book.volumeInfo.categories?.[0] || "Sin género",
  image: book.volumeInfo.imageLinks?.thumbnail || "",
  pageCount: book.volumeInfo.pageCount || 0,
  publishedDate: book.volumeInfo.publishedDate || "Fecha desconocida",
  description: book.volumeInfo.description || "Sin sinopsis disponible",
});
