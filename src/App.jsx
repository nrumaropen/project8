import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import CreateBenders from "./pages/CreateBenders";
import EditBenders from "./pages/EditBenders";
import ReadBenders from "./pages/ReadBenders";
import Quiz from "./pages/Quiz";

import lightmode from "./assets/lightmode.png";
import darkmode from "./assets/darkmode.png";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${darkMode ? darkmode : lightmode})`,
        minHeight: "100vh",
      }}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/create" element={<CreateBenders />} />

        <Route path="/posts/:id" element={<ReadBenders />} />

        <Route path="/edit/:id" element={<EditBenders />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;