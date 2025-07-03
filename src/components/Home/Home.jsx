import Header from "./Header/Header";
import BookSection from "../Book/BookSection/BookSection";
import { useContext } from "react";
import { GenderContext } from "../../contexts/GenderContext";

function Home() {
  const { selectedGender } = useContext(GenderContext);

  return (
    <>
      <Header />
      <BookSection
        title="Títulos"
        filter={(book) =>
          (!selectedGender || book.genre === selectedGender) &&
          book.title.toLowerCase().includes("")
        }
        linkTo="/seccion/Titulos"
      />
      <BookSection
        title="Los más leídos"
        filter={(book) =>
          (!selectedGender || book.genre === selectedGender) &&
          book.publisher.toLowerCase().includes("")
        }
        linkTo="/seccion/Los%20mas%20leidos"
      />
      <BookSection
        title="Novedades"
        filter={(book) =>
          (!selectedGender || book.genre === selectedGender) &&
          book.title.toLowerCase().includes("")
        }
        linkTo="/seccion/Novedades"
      />
    </>
  );
}

export default Home;
