import { useState } from "react";
import blackShare from "@icons/share-black.svg"; // o el que necesites

function SearchBar({ scrolled }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      console.log("Buscar:", query);
      // Aquí podrías llamar a una función o redirigir
    }
  };

  const handleSearchClick = () => {
    if (query.trim() !== "") {
      console.log("Buscar:", query);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Buscar"
        className={`w-[100px] lg:w-[320px] md:w-[260px] sm:w-[200px] pl-3 pr-10 py-1 rounded-full focus:outline-none text-black ${
          scrolled
            ? "bg-white placeholder-gray"
            : "bg-zinc-200 placeholder-black"
        }`}
      />
      <button
        onClick={handleSearchClick}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <img src={blackShare} alt="Buscar" className="w-5" />
      </button>
    </div>
  );
}

export default SearchBar;
