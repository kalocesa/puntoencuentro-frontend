import "../Profile/Profile.css";
import { BookContext } from "../../contexts/BookContext";
import avatar from "@images/avatar2.png";
import pencil from "@icons/pen.svg";
import user from "@icons/edit-profile.svg";
import { useState, useContext } from "react";

function Profile() {
  const [activeStat, setActiveStat] = useState("");
  const { books, countBooksByStatus, countLikedBooks, bookStatus } =
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

  const stats = [
    {
      key: "libros",
      label: "Libros:",
      color: "bg-[#390099]",
      hover: "hover:bg-[#390099]/30",
    },
    {
      key: "gustan",
      label: "Me gustan:",
      color: "bg-[#9e0059]",
      hover: "hover:bg-[#9e0059]/30",
    },
    {
      key: "leidos",
      label: "Leídos:",
      color: "bg-[#ff0054]",
      hover: "hover:bg-[#ff0054]/30",
    },
    {
      key: "leyendo",
      label: "Leyendo:",
      color: "bg-[#ff5400]",
      hover: "hover:bg-[#ff5400]/30",
    },
    {
      key: "porleer",
      label: "Por leer:",
      color: "bg-[#ffbd00]",
      hover: "hover:bg-[#ffbd00]/30",
    },
  ];

  return (
    <header className="mt-10 gap-8 p-6 profile__background-image">
      <section className="bg-black/90 rounded-3xl mt-5 max-w-[980px] grid grid-col">
        <div className="flex flex-col md:flex-row gap-5 p-3 m-auto">
          <div className="relative group m-auto mt-3">
            <img
              src={avatar}
              alt="Imagen del avatar del perfil"
              className="object-cover bg-white rounded-full p-2 max-w-[200px]"
            />
            <button className="absolute inset-0 rounded-full bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
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
              <p className="">Aquí va el nombre</p>
              <button className="ml-auto self-end cursor-pointer w-8 transition-transform duration-300 ease-in-out hover:scale-125 hover:-translate-y-1">
                <img
                  src={user}
                  alt="icono para editar el perfil del usuario"
                  className="w-full"
                />
              </button>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="profile__title">Correo eléctronico:</p>
              <p>Aquí va el correo</p>
            </div>
            <div className="flex flex-col items-baseline">
              <p className="profile__title">Acerca de mi:</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente hic sunt quibusdam voluptates maiores totam, tempore
                saepe ipsum rem dolores suscipit harum vel fuga molestiae
                voluptatum dicta voluptas officia explicabo.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row p-5">
          {stats.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveStat(item.key)}
              className={`profile__button w-full text-start p-5 rounded-full transition-all duration-300 cursor-pointer 
    ${activeStat === item.key ? item.color : "bg-transparent"} 
    ${item.hover}`}
            >
              {item.label} {countByKey[item.key]}
            </button>
          ))}
        </div>
      </section>
    </header>
  );
}

export default Profile;
