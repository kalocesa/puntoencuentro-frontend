import Header from "./Header/Header";
import BookSection from "../Book/BookSection/BookSection";

function Home() {
  return (
    <>
      <Header />
      <BookSection
        title="Títulos"
        filter={(book) => book.title.includes("Alas")} // o cualquier criterio
        linkTo="/seccion/Títulos"
      />
      <BookSection
        title="Los más leídos"
        filter={(book) => book.publisher.includes("Alfaguara")} // o cualquier criterio
        linkTo="/seccion/Los más leídos"
      />
      <BookSection
        title="Novedades"
        filter={(book) => book.title.includes("La")} // o cualquier criterio
        linkTo="/seccion/Novedades"
      />
    </>
  );
}

export default Home;
