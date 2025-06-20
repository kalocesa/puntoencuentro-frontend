import book from "@images/empireo.jpeg";
import { useContext } from "react";
import { GenderContext } from "../../../../contexts/GenderContext";

function HeroOverlay() {
  const { selectedGender } = useContext(GenderContext);

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-x-6 max-w-[1440
    px] mx-auto"
    >
      <h1 className="md:text-6xl text-2xl pt-0 pl-5 md:pl-20 self-center">
        {selectedGender === "" || selectedGender === null
          ? "Junio es pura fantasía"
          : `${selectedGender}`}
      </h1>

      <div className="flex flex-row p-5 md:p-15 justify-start md:justify-center">
        <img
          src={book}
          alt="Imagen del libro"
          className="w-[100px] h-[150px] md:w-[150px] md:h-[200px] rounded-2xl shadow-xl"
        />
        <div className="flex flex-col relative">
          <h2 className="text-md md:text-2xl mt-5 ml-3 min-w-[200px]">
            Nuestro favorito <br /> del mes
          </h2>
          <button
            type="submit"
            className="w-20 md:w-32 py-1 rounded-full bg-[#ff5400] hover:bg-[#ff5400]/30 cursor-pointer mt-auto mb-6 md:mb-10 ml-3 text-sm md:text-lg"
          >
            Descubre
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroOverlay;
