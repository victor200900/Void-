import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/login";
import Register from "./component/register";
import MovieCard from "./component/MovieCard";
import About from "./component/about";
import Watching from "./component/watching";
import Contact from "./component/Contact";

import "./App.css";

// Protect private routes
const PrivateRoute = ({ children }) => {
  return localStorage.getItem("user") ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact/>} />



      <Route
        path="/movie"
        element={
          <PrivateRoute>
            <MovieCard />
          </PrivateRoute>
        }
      />

      <Route
        path="/watching"
        element={
          <PrivateRoute>
            <Watching />
          </PrivateRoute>
        }
      />

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
