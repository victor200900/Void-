import React, { useState, useEffect, useContext, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// ====== AUTH CONTEXT ======
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem("user") || null);

  const login = (username) => {
    setUser(username);
    localStorage.setItem("user", username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ====== LOGIN PAGE ======
export const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      navigate("/");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="mx-auto" style={{ maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Enter a username"
          className="form-control mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="btn btn-danger w-100">Login</button>
      </form>
    </div>
  );
};

// ====== MOVIE CARD ======
const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const fallbackImage = "src/assets/not-available-img.webp";
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const fetchMovies = async (searchQuery = "") => {
    setLoading(true);
    const apiUrl = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=5a6c3a826b253bb9ac28a7823a40b89e&query=${searchQuery}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=5a6c3a826b253bb9ac28a7823a40b89e`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching the movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMovies(query);
  };

  const getDownloadLink = (movie) => {
    return `https://yts.mx/browse-movies/${movie.title.replace(/\s+/g, "-").toLowerCase()}`;
  };

  return (
    <>
    <div className="all">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-danger" href="#">Void</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="#">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <span className="text-white me-3">{user}</span>
              <button className="btn btn-outline-danger btn-sm" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container text-center mt-4">
        <h2 className="text-white">Watch Your Favorite Movies Here</h2>
        <form onSubmit={handleSearchSubmit} className="my-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-danger" type="submit">
              Search
            </button>
          </div>
        </form>
        {loading && <div className="text-center text-danger">Loading...</div>}
        <div className="row mt-4">
          {movies.slice(0, 16).map((movie) => (
            <div key={movie.id} className="col-md-3 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : fallbackImage
                  }
                  className="card-img-top movie-img"
                  alt={movie.title}
                />

                <div className="card-body bg-dark text-white text-center">
                  <h5 className="card-title">{movie.title}</h5>
                  <a
                    href={`https://www.themoviedb.org/movie/${movie.id}`}
                    className="btn btn-danger btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Details
                  </a>
                  <a
                    href={getDownloadLink(movie)}
                    className="btn btn-primary btn-sm mt-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div></div>

      <style>{`
  .card {
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: transform 0.3s ease;
  }
  .card:hover {
    transform: scale(1.03);
  }
  .movie-img {
    height: 350px;
    object-fit: cover;
    width: 100%;
    flex-shrink: 0;
  }
  .card-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #212529;
    color: white;
    padding: 1rem;
  }
`}</style>

    </>
  );
};

export default MovieCard;
