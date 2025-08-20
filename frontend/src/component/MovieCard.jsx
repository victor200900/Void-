import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// ====== AUTH CONTEXT ======


// ====== LOGIN PAGE ======


// ====== MOVIE PAGE ======
const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState({});
  const fallbackImage = "https://via.placeholder.com/500x750?text=No+Image";
  const navigate = useNavigate();

  const apiKey = "5a6c3a826b253bb9ac28a7823a40b89e";

  const fetchGenres = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
      const data = await res.json();
      const genreMap = {};
      data.genres.forEach((g) => {
        genreMap[g.id] = g.name;
      });
      setGenres(genreMap);
    } catch (err) {
      console.error("Genre fetch failed", err);
    }
  };

  const fetchMovies = async (searchQuery = "") => {
    setLoading(true);
    const url = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Movie fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMovies(query);
  };

  const getDownloadLink = (movie) =>
    `https://yts.mx/browse-movies/${movie.title.replace(/\s+/g, "-").toLowerCase()}`;
  
  useEffect(() => {
  fetchGenres();   // load genres
  fetchMovies();   // load default latest movies
}, []);


  return (
    <div className="run text-white min-vh-100">
      {/* GLOWING ANIME-STYLE NAVBAR */}
      <nav className="navbar navbar-expand-lg px-4" style={{ background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)" }}>
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-danger" to="/">
            Netvoid
          </Link>
          <button className="navbar-toggler text-white bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav mx-auto text-center gap-4">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/contact">Contact</Link>
              </li>
            </ul>
            <br />
            
        
          </div>
        </div>
      </nav>

      {/* CAROUSEL */}
      <div id="movieCarousel" className="carousel slide mt-4 container" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-inner rounded shadow">
          {[
            {
              img: "https://www.trendspotinsider.com/wp-content/uploads/2024/01/titlecard-1024x574.png",
              title: "Demon Slayer: Mugen Train",
            },
            {
              img: "https://deadline.com/wp-content/uploads/2022/01/JJK_Movie_16x9_Twitter-Post.jpg",
              title: "Jujutsu Kaisen 0",
            },
            {
              img: "https://bucket-image.inkmaginecms.com/cabinet/2023/05/59626dd6-4207-4167-b4f8-49723771215b.jpg",
              title: "Weathering With You",
            },
          ].map((item, i) => (
            <div key={i} className={`carousel-item${i === 0 ? " active" : ""}`}>
              <img
                src={item.img}
                className="d-block w-100"
                alt={item.title}
                style={{ height: "450px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-2 rounded">
                <h5>{item.title}</h5>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#movieCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#movieCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* MOVIE LIST */}
      <div className="container mt-5 text-center">
        <h2 className="mb-3">Get the latest Movies here</h2>
        <form onSubmit={handleSearchSubmit} className="my-3">
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-danger" type="submit">Search</button>
          </div>
        </form>

        {loading && <div className="text-danger mb-3">Loading...</div>}

        <div className="row">
          {movies.slice(0, 16).map((m) => (
            <div key={m.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100">
                <div style={{ height: "300px", overflow: "hidden" }}>
                  <img
                    src={m.poster_path ? `https://image.tmdb.org/t/p/w500/${m.poster_path}` : fallbackImage}
                    className="card-img-top"
                    alt={m.title}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </div>
                <div className="card-body bg-dark text-white text-center">
                  <h5 className="card-title">{m.title}</h5>
                  <p className="text-secondary small">
                    {m.genre_ids?.map((id) => genres[id]).filter(Boolean).join(", ") || "Unknown"}
                  </p>
                  <div className="d-grid gap-2">
                    <a
                      href={`https://www.themoviedb.org/movie/${m.id}`}
                      className="btn btn-danger btn-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Details
                    </a>
                    <a
                      href={getDownloadLink(m)}
                      className="btn btn-primary btn-sm"
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
  );
};

export default MovieCard;
