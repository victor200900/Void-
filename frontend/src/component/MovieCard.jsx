import React, { useState, useEffect, useContext, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";

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

// ====== MOVIE CARD PAGE ======
const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
          <div className="container-fluid">
            <a className="navbar-brand fw-bold text-danger" href="#">Void</a>
            <div className="d-flex align-items-center">
              <span className="text-white me-3">{user}</span>
              <button className="btn btn-outline-light btn-sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                ☰ Menu
              </button>
              <button className="btn btn-outline-danger btn-sm ms-2" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            &times;
          </button>
          <ul>
            <li><Link to="#">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="container text-center mt-4">
          <h2 className="text-white">Watch Your Favorite Movies Here</h2>
        </div>
        <div className="container">
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

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-4">
            {movies.slice(0, 16).map((movie) => (
              <div key={movie.id} className="col">
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
                  <div className="card-body bg-dark text-white text-center d-flex flex-column justify-content-between">
                    <h5 className="card-title">{movie.title}</h5>
                    <div>
                      <a
                        href={`https://www.themoviedb.org/movie/${movie.id}`}
                        className="btn btn-danger btn-sm me-2"
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
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .movie-img {
            height: auto;
            max-height: 350px;
            object-fit: cover;
            width: 100%;
          }
          .card {
            overflow: hidden;
            transition: transform 0.3s ease;
          }
          .card:hover {
            transform: scale(1.03);
          }
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 250px;
            height: 100%;
            background: black;
            color: white;
            padding-top: 60px;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            z-index: 1000;
          }
          .sidebar.open {
            transform: translateX(0%);
          }
          .sidebar ul {
            list-style: none;
            padding: 0;
          }
          .sidebar ul li {
            padding: 10px;
            text-align: center;
          }
          .sidebar ul li a {
            color: white;
            text-decoration: none;
            font-size: 18px;
          }
          .close-btn {
            position: absolute;
            top: 10px;
            right: 20px;
            font-size: 30px;
            background: none;
            border: none;
            color: white;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default MovieCard;
