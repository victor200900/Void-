import { Routes, Route, Navigate } from "react-router-dom";
import MovieCard from "./component/MovieCard";
import About from "./component/About";
import Contact from "./component/Contact";

import "./App.css";

function App() {
  return (
    <Routes>
      {/* 🔁 Redirect root path to /movie */}
      <Route path="/" element={<Navigate to="/movie" />} />

      {/* 🟦 Movie (Home) page */}
      <Route path="/movie" element={<MovieCard />} />

      {/* 🧾 Other pages */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      
    </Routes>
  );
}

export default App;
