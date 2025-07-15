import Footer from "@components/Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Home from "../Home/Home.jsx";
import Profile from "../Profile/Profile.jsx";
import { Register } from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import BookSearch from "../Book/BookSearch/BookSearch.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import InitialRedirect from "../InitialRedirect/InitialRedirect.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import { GenderProvider } from "../../providers/GenderProvider.jsx";
import BookProvider from "../../providers/BookProvider.jsx";
import { UserProvider } from "../../providers/UserProvider.jsx";
import { registerUser, loginUser } from "../../utils/auth.js";
import {
  saveUserData,
  getUserData,
  updateUserData,
} from "../../utils/localStorageUser.js";
import avatar from "@images/avatar1.png";

function App() {
  const navigate = useNavigate();

  const handleRegister = async (email, password, name) => {
    try {
      const userCredential = await registerUser(email, password, name);
      const user = userCredential.user;

      saveUserData(user.uid, {
        name,
        avatar,
        about: "Add a short description 📝",
      });
      navigate("/signin");
    } catch (error) {
      console.error("Error al registrar:", error.message);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await loginUser(email, password);
      const user = userCredential.user;
      const localData = getUserData(user.uid);

      if (
        !localData.name?.trim() ||
        !localData.about?.trim() ||
        !localData.avatar
      ) {
        updateUserData(user.uid, {
          name: "Aquí va tu nombre",
          about: "Add a short description 📝",
          avatar: localData.avatar || avatar,
        });
      }
      navigate("/profile");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  return (
    <UserProvider>
      <GenderProvider>
        <BookProvider>
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
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <BookSearch />
                </PrivateRoute>
              }
            />
          </Routes>
          <Footer />
        </BookProvider>
      </GenderProvider>
    </UserProvider>
  );
}

export default App;
