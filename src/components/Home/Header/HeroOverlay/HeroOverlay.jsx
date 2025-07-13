import { useContext } from "react";
import { GenderContext } from "../../../../contexts/GenderContext";
import "../HeroOverlay/HeroOverlay.css";
//import BookFavorite from "../../../Book/BookFavorite/BookFavorite";

function HeroOverlay() {
  const { selectedGender } = useContext(GenderContext);
  const labelMap = {
    Fiction: "Ficción",
    Nonfiction: "No ficción",
    Horror: "Terror",
    Fantasy: "Fantasía",
    Romance: "Romance",
    Mystery: "Misterio",
    "Science Fiction": "Ciencia ficción",
    Drama: "Drama",
  };

  return (
    <section className="max-w-[1280px]">
      <h1 className="md:text-6xl text-2xl pt-40 pl-5 md:pl-20 self-center hero-overlay__title">
        {selectedGender === "" || selectedGender === null
          ? "Junio es pura fantasía"
          : `${labelMap[selectedGender] || selectedGender}`}
      </h1>
    </section>
  );
}
/*         <section
      className="grid grid-cols-1 md:grid-cols-2 gap-x-6 max-w-[1280
    px] mx-auto"
    >
      <h1 className="md:text-6xl text-2xl pt-0 pl-5 md:pl-20 self-center hero-overlay__title">
        {selectedGender === "" || selectedGender === null
          ? "Junio es pura fantasía"
          : `${labelMap[selectedGender] || selectedGender}`}
      </h1>

      <div className="flex flex-row p-5 md:p-15 justify-start md:justify-center">
        <BookFavorite />
      </div>
    </section> */
export default HeroOverlay;
