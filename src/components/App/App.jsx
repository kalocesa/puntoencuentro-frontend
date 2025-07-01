import Footer from "@components/Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Home from "../Home/Home.jsx";
import SectionPage from "../SectionPage/SectionPage.jsx";
import Profile from "../Profile/Profile.jsx";
import { Register } from "../Register/Register.jsx";
import { Routes, Route } from "react-router-dom";
import { GenderProvider } from "../../contexts/GenderContext";
import { BookProvider } from "../../contexts/BookContext.jsx";
import { UserProvider } from "../../contexts/UserContext.jsx";
import Login from "../Login/Login.jsx";

function App() {
  return (
    <GenderProvider>
      <BookProvider>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/seccion/:seccionId" element={<SectionPage />} />
            <Route path="/genero/:genreId" element={<SectionPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </UserProvider>
      </BookProvider>
    </GenderProvider>
  );
}

export default App;
