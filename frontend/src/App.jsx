import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/login";
import Register from "./component/register";
import MovieCard from "./component/MovieCard";
import About from "./component/about";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("user") ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movie" element={<MovieCard />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
