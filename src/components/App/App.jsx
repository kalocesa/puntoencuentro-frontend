import Footer from "@components/Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Home from "../Home/Home.jsx";
import { Routes, Route } from "react-router-dom";
import { GenderProvider } from "../../contexts/GenderContext";

function App() {
  return (
    <GenderProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </GenderProvider>
  );
}

export default App;
