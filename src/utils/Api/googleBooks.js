import { mapGoogleBook } from "../mapGoogleBook";
const API_KEY = "AIzaSyDInwJ6G_6cH8GfjH238wlzfOfta9nnq-g";

export const fetchGoogleBooks = async (
  genre = "fantasy",
  start = 0,
  limit = 20
) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&startIndex=${start}&maxResults=${limit}&key=${API_KEY}`
    );
    const data = await res.json();
    const mappedBooks = (data.items || []).map(mapGoogleBook);
    return mappedBooks;
  } catch (error) {
    console.error("Error al obtener libros desde API:", error);
    return [];
  }
};
