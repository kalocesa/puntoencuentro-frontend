import "../Profile/Profile.css";
import BookGrid from "../Book/BookGrid/BookGrid";
import { BookContext } from "../../contexts/BookContext";
import { UserContext } from "../../contexts/UserContext";
import PopupAvatar from "../Popup/PopupAvatar/PopupAvatar";
import PopupUser from "../Popup/PopupUser/PopupUser";
import pencil from "@icons/pen.svg";
import userIcon from "@icons/edit-profile.svg";
import { useState, useContext } from "react";

function Profile() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupUserOpen, setIsPopupUserOpen] = useState(false);
  const { user, setUser, loading } = useContext(UserContext);
  const [activeStat, setActiveStat] = useState("libros");
  const { books, likedBooks, countBooksByStatus, countLikedBooks, bookStatus } =
    useContext(BookContext);
  const countMultipleStatuses = (statuses) => {
    return books.filter((book) => statuses.includes(bookStatus[book.id]))
      .length;
  };

  const countByKey = {
    libros: countMultipleStatuses(["Leídos", "Leer", "Leyendo"]),
    gustan: countLikedBooks(),
    leidos: countBooksByStatus("Leídos"),
    leyendo: countBooksByStatus("Leyendo"),
    porleer: countBooksByStatus("Leer"),
  };

  const filters = {
    libros: (book) =>
      ["Leídos", "Leyendo", "Leer"].includes(bookStatus[book.id]),
    gustan: (book) => likedBooks[book.id],
    leidos: (book) => bookStatus[book.id] === "Leídos",
    leyendo: (book) => bookStatus[book.id] === "Leyendo",
    porleer: (book) => bookStatus[book.id] === "Leer",
  };

  const stats = [
    {
      key: "libros",
      label: "Libros",
      color: "bg-[#390099]",
      hover: "hover:bg-[#390099]/30",
    },
    {
      key: "gustan",
      label: "Me gustan",
      color: "bg-[#9e0059]",
      hover: "hover:bg-[#9e0059]/30",
    },
    {
      key: "leidos",
      label: "Leídos",
      color: "bg-[#ff0054]",
      hover: "hover:bg-[#ff0054]/30",
    },
    {
      key: "leyendo",
      label: "Leyendo",
      color: "bg-[#ff5400]",
      hover: "hover:bg-[#ff5400]/30",
    },
    {
      key: "porleer",
      label: "Por leer",
      color: "bg-[#ffbd00]",
      hover: "hover:bg-[#ffbd00]/30",
    },
  ];

  if (loading || !user) {
    return null; // o un loader lindo
  }

  return (
    <>
      <header className="mt-10 gap-8 p-6 profile__background-image">
        <section className="bg-black/90 rounded-3xl mt-5 max-w-[980px] grid grid-col">
          <div className="flex flex-col md:flex-row gap-5 p-3 m-auto">
            <div className="relative group m-auto mt-3">
              <img
                src={user.avatar}
                alt="Imagen del avatar del perfil"
                className="object-cover bg-white rounded-full p-2 max-w-[200px]"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPopupOpen(true);
                }}
                className="absolute inset-0 rounded-full bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <img
                  src={pencil}
                  alt="icono de lápiz para cambiar el avatar del perfil"
                  className="mx-auto transition-transform duration-300 ease-in-out hover:scale-125 hover:-translate-y-1"
                />
              </button>
            </div>
            <div className="my-auto">
              <div className="flex items-baseline gap-2">
                <p className="profile__title">Nombre:</p>
                <p>{user.name}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPopupUserOpen(true);
                  }}
                  className="ml-auto mr-2 self-end cursor-pointer w-8 transition-transform duration-300 ease-in-out hover:scale-125 hover:-translate-y-1"
                >
                  <img
                    src={userIcon}
                    alt="icono para editar el perfil del usuario"
                    className="w-full"
                  />
                </button>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="profile__title">Correo eléctronico:</p>
                <p>{user.email}</p>
              </div>
              <div className="flex flex-col items-baseline">
                <p className="profile__title">Acerca de mi:</p>
                <p>{user.about}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row p-5">
            {stats.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveStat(item.key)}
                className={`font-semibold text-start m-2 p-5 rounded-2xl transition-all duration-300 cursor-pointer 
    ${activeStat === item.key ? item.color : "bg-transparent"} 
    ${item.hover}`}
              >
                {item.label} {countByKey[item.key]}
              </button>
            ))}
          </div>
        </section>
      </header>
      <main>
        {activeStat && (
          <section className="mt-10 max-w-[1680px] mx-auto px-5 md:px-10">
            <h2 className="text-[30px] md:text-[50px] mb-3 md:mb-6 profile__main-title">
              {stats.find((s) => s.key === activeStat)?.label}
            </h2>
            <BookGrid books={books.filter(filters[activeStat])} />
          </section>
        )}
      </main>
      {isPopupOpen && (
        <PopupAvatar
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          currentAvatar={user.avatar}
          onSave={(newAvatar) =>
            setUser((prev) => ({ ...prev, avatar: newAvatar }))
          }
        />
      )}
      {isPopupUserOpen && (
        <PopupUser
          isOpen={isPopupUserOpen}
          onClose={() => setIsPopupUserOpen(false)}
        />
      )}
    </>
  );
}

export default Profile;
