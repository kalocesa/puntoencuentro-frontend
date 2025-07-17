import whiteLogo from "@icons/logoBlanco.png";
import blackLogo from "@icons/logoNegro.svg";
import blackMenu from "@icons/menu-black.svg";
import whiteMenu from "@icons/menu-white.svg";
import Menu from "./Menu/Menu.jsx";
import SearchBar from "./SearchBar/SearchBar.jsx";
import { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside.js";
import { GenderContext } from "../../contexts/GenderContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../config/firebaseConfig.js";

const auth = getAuth(app);

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  useClickOutside(menuRef, () => setIsMenuOpen(false));
  const { setSelectedGender } = useContext(GenderContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let retryCount = 0;
    let scrollListener;

    const tryDetectHero = () => {
      const target = document.getElementById("hero");

      if (!target && retryCount < 3) {
        retryCount++;
        setTimeout(tryDetectHero, 150);
        return;
      }

      const handleScroll = () => {
        if (!target) {
          setScrolled(true);
          return;
        }
        const top = target.getBoundingClientRect().bottom;
        setScrolled(top <= 0);
      };

      handleScroll();
      scrollListener = handleScroll;
      window.addEventListener("scroll", scrollListener);
    };

    tryDetectHero();

    return () => {
      if (scrollListener) {
        window.removeEventListener("scroll", scrollListener);
      }
    };
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 shadow-md px-6 py-3 flex items-center justify-between transition-colors duration-500 ${
        scrolled ? "bg-stone-900" : "bg-stone-900/10"
      }`}
    >
      <div className="flex items-center gap-2 text-xl font-bold text-indigo-600">
        <Link
          to="/home"
          onClick={() => {
            setSelectedGender("");
          }}
        >
          <img
            src={scrolled ? whiteLogo : blackLogo}
            alt="Logo"
            className="w-17 transition-transform duration-300 ease-in-out hover:scale-125 hover:-translate-y-1 cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <SearchBar scrolled={scrolled} />
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
