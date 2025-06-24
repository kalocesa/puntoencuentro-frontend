import Footer from "@components/Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Home from "../Home/Home.jsx";
import { Routes, Route } from "react-router-dom";
import { GenderProvider } from "../../contexts/GenderContext";
import { BookProvider } from "../../contexts/BookContext.jsx";
import SectionPage from "../SectionPage/SectionPage.jsx";

function App() {
  return (
    <GenderProvider>
      <BookProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seccion/:seccionId" element={<SectionPage />} />
        </Routes>
        <Footer />
      </BookProvider>
    </GenderProvider>
  );
}

export default App;
