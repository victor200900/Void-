import React, { useState, useEffect } from "react";
import {Link } from 'react-router-dom';

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fallbackImage = "src/assets/not-available-img.webp";

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

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMovies(query);
  };

  const getDownloadLink = (movie) => {
    return `https://www.netnaija.com/download/${movie.title.replace(/\s+/g, "-")}`;
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-danger" href="#">Void</a>
          <button
            className="btn btn-outline-light ms-auto"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰ Menu
          </button>
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
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>

      <div className={`container text-center mt-4 ${sidebarOpen ? "shifted" : ""}`}>
        <h2 className="text-white">Watch Your Favorite Movies Here</h2>
      </div>
      <div className={`container ${sidebarOpen ? "shifted" : ""}`}>
        <form onSubmit={handleSearchSubmit} className="my-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a movie..."
              value={query}
              onChange={handleSearchChange}
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
              <div className="card shadow-sm">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : fallbackImage
                  }
                  className="card-img-top"
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
      </div>
      <style>
        {`
          .sidebar {
            position: fixed;
            top: 0;
            left: -250px;
            width: 250px;
            height: 100%;
            background: black;
            color: white;
            padding-top: 60px;
            transition: 0.3s;
            z-index: 1000;
          }

          .sidebar.open {
            left: 0;
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

          .shifted {
            margin-left: 250px;
            transition: margin-left 0.3s;
          }
        `}
      </style>
    </>
  );
};

export default MovieCard;
