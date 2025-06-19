import logo from "@icons/logoBlanco.png";
function Footer() {
  return (
    <>
      <div className="flex items-center justify-between w-64 ml-auto py-4 mr-10">
        <p>© 2025</p>
        <img src={logo} alt="Icono blanco de PuntoEncuentro" className="w-9" />
        <p>por Katia Sandoval</p>
      </div>
    </>
  );
}

export default Footer;
