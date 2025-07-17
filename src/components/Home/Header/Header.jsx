import fictionView from "@images/back-ficcion.png";
import nonFictionView from "@images/back-noficcion.png";
import horrorView from "@images/back-terror.png";
import fantasyView from "@images/anillos.png";
import romanceView from "@images/back-romance.png";
import mysteryView from "@images/back-misterio.png";
import sciFiView from "@images/back-cienciaficcion.png";
import dramaView from "@images/back-drama.png";
import { useContext } from "react";
import { GenderContext } from "../../../contexts/GenderContext";
import HeroOverlay from "./HeroOverlay/HeroOverlay";

function Header() {
  const { selectedGender } = useContext(GenderContext);
  const genreViews = {
    Fiction: fictionView,
    Nonfiction: nonFictionView,
    Horror: horrorView,
    Fantasy: fantasyView,
    Romance: romanceView,
    Mystery: mysteryView,
    "Science Fiction": sciFiView,
    Drama: dramaView,
  };

  return (
    <header className="relative h-[500px] md:h-[1000px] overflow-hidden">
      <img
        src={genreViews[selectedGender] || fantasyView}
        alt={`Fondo para el género: ${selectedGender}`}
        id="hero"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative top-65  md:top-170">
        <HeroOverlay />
      </div>
    </header>
  );
}

export default Header;
