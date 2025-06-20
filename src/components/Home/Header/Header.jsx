import fictionView from "@images/back-ficcion.png";
import nonFictionView from "@images/back-noficcion.png";
import horrorView from "@images/back-terror.png";
import fantasyView from "@images/back-fantasia.png";
import romanceView from "@images/back-romance.png";
import mysteryView from "@images/back-misterio.png";
import sciFiView from "@images/back-cienciaficcion.png";
import dramaView from "@images/back-drama.png";
import { useContext } from "react";
import { GenderContext } from "../../../contexts/GenderContext";

function Header() {
  const { selectedGender } = useContext(GenderContext);
  const genreViews = {
    Ficción: fictionView,
    "No ficción": nonFictionView,
    Terror: horrorView,
    Fantasía: fantasyView,
    Romance: romanceView,
    Misterio: mysteryView,
    "Ciencia ficción": sciFiView,
    Drama: dramaView,
  };

  return (
    <header id="hero">
      <img
        src={genreViews[selectedGender] || fantasyView}
        alt={`Fondo para el género: ${selectedGender}` || "Fantasía"}
      />
    </header>
  );
}

export default Header;
