import whiteLogo from "@icons/logoBlanco.png";
import blackLogo from "@icons/logoNegro.svg";
import blackMenu from "@icons/menu-black.svg";
import whiteMenu from "@icons/menu-white.svg";
import blackShare from "@icons/share-black.svg";
import Menu from "./Menu/Menu.jsx";
import { useState, useEffect, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside.js";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setIsMenuOpen(false));

  /* Probable el scroll lo pase a header para que se active al ya no estar en esa sección, por el diseño responsivo */
  useEffect(() => {
    const target = document.getElementById("hero");

    const handleScroll = () => {
      if (!target) {
        setScrolled(true);
        return;
      }
      const top = target.getBoundingClientRect().bottom;
      setScrolled(top <= 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 shadow-md px-6 py-3 flex items-center justify-between transition-colors duration-500 ${
        scrolled ? "bg-stone-900" : "bg-stone-900/10"
      }`}
    >
      <div className="flex items-center gap-2 text-xl font-bold text-indigo-600">
        <img
          src={scrolled ? whiteLogo : blackLogo}
          alt="Logo"
          className="w-17 transition-transform duration-300 ease-in-out hover:scale-125 hover:-translate-y-1 cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          {/* El input debería de tener un submit en la lupa o que se active con la tecla "enter" para que busque lo que está escrito */}
          <input
            type="text"
            placeholder="Buscar"
            className={`w-[100px] lg:w-[320px] md:w-[260px] sm:w-[200px] pl-3 pr-10 py-1 rounded-full focus:outline-none text-black ${
              scrolled
                ? "bg-white placeholder-gray"
                : "bg-zinc-200 placeholder-black"
            }`}
          />
          {/* Esta imagen debería de ser un botón o un Link, investigar */}
          <img
            src={blackShare}
            alt="Buscar"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5"
          />
        </div>
        <div ref={menuRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }}
            className="p-2 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-125 hover:-translate-y-1"
          >
            <img
              src={scrolled ? whiteMenu : blackMenu}
              alt="Menú"
              className="w-6"
            />
          </button>

          {isMenuOpen && (
            <div
              className={`absolute -right-3 w-60 shadow-lg rounded-md z-10 p-4 mt-6 ${
                scrolled ? "bg-stone-900" : "bg-stone-900/10"
              } `}
            >
              <Menu
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
