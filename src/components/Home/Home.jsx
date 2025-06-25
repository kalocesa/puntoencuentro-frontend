import Header from "./Header/Header";
import BookSection from "../Book/BookSection/BookSection";

function Home() {
  return (
    <>
      <Header />
      <BookSection
        title="Títulos"
        filter={(book) => book.title.toLowerCase().includes("")}
        linkTo="/seccion/Titulos"
      />
      <BookSection
        title="Los más leídos"
        filter={(book) => book.publisher.toLowerCase().includes("")}
        linkTo="/seccion/Los%20mas%20leidos"
      />
      <BookSection
        title="Novedades"
        filter={(book) => book.title.toLowerCase().includes("")}
        linkTo="/seccion/Novedades"
      />
    </>
  );
}

export default Home;
