import Footer from "@components/Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Home from "../Home/Home.jsx";
import SectionPage from "../SectionPage/SectionPage.jsx";
import Profile from "../Profile/Profile.jsx";
import { Register } from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import InitialRedirect from "../InitialRedirect/InitialRedirect.jsx";
import { registrarUsuario, iniciarSesion } from "../../utils/auth.js";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { GenderProvider } from "../../contexts/GenderContext";
import { BookProvider } from "../../contexts/BookContext.jsx";
import { UserProvider } from "../../contexts/UserContext.jsx";

function App() {
  const navigate = useNavigate();

  const handleRegister = async (email, password, name) => {
    try {
      const userCredential = await registrarUsuario(email, password, name);
      const user = userCredential.user;
      console.log("Usuario registrado:", user);
      navigate("/signin");
    } catch (error) {
      console.error("Error al registrar:", error.message);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await iniciarSesion(email, password);
      const user = userCredential.user;
      console.log("Usuario inició sesión:", user);
      navigate("/profile");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  return (
    <GenderProvider>
      <BookProvider>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<InitialRedirect />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/signup"
              element={<Register handleRegister={handleRegister} />}
            />
            <Route
              path="/signin"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/seccion/:seccionId"
              element={
                <PrivateRoute>
                  <SectionPage />
                </PrivateRoute>
              }
            />{" "}
            <Route
              path="/genero/:genreId"
              element={
                <PrivateRoute>
                  <SectionPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </UserProvider>
      </BookProvider>
    </GenderProvider>
  );
}

export default App;
