// utils/api/googleBooks.js

const API_KEY = "AIzaSyDInwJ6G_6cH8GfjH238wlzfOfta9nnq-g"; // 🔑 Reemplaza esto con tu clave real
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

/**
 * Traduce géneros al inglés si vienen en español.
 */
const genreMap = {
  Fantasía: "Fantasy",
  Terror: "Horror",
  Romance: "Romance",
  "Ciencia ficción": "Science Fiction",
  Misterio: "Mystery",
  Drama: "Drama",
  Ficción: "Fiction",
  "No ficción": "Nonfiction",
};

/**
 * Hace una búsqueda usando un género.
 * @param {string} genre - Género en español (ej. "Fantasía").
 * @returns {Promise<Array>} Libros de la API.
 */
export const getBooksByGenre = async (genre) => {
  const query = genreMap[genre] || genre;
  const url = `${BASE_URL}?q=subject:${encodeURIComponent(
    query
  )}&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error(`Error fetching books for genre "${genre}":`, error);
    return [];
  }
};

/**
 * Hace una búsqueda libre.
 * @param {string} query - Término de búsqueda general.
 * @returns {Promise<Array>} Resultados.
 */
export const getBooksByQuery = async (query) => {
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error(`Error fetching books for query "${query}":`, error);
    return [];
  }
};
