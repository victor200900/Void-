import React, { useState, useEffect } from "react";

const MovieCard = () => {
  // State to hold the movie data
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(""); // State for the search query
  const [loading, setLoading] = useState(false); // Loading state

  // Fallback image URL (you can replace this with your own image)
  const fallbackImage =
    "src/assets/not-available-img.webp";

  // Fetch data from TMDb API based on search query
  const fetchMovies = async (searchQuery = "") => {
    setLoading(true); // Start loading
    const apiUrl = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=5a6c3a826b253bb9ac28a7823a40b89e&query=${searchQuery}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=5a6c3a826b253bb9ac28a7823a40b89e`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setMovies(data.results); // Set the movie data
    } catch (error) {
      console.error("Error fetching the movies:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch all movies when the component mounts
  useEffect(() => {
    fetchMovies();
  }, []); // Empty array to run the fetch only once on component mount

  // Handle search input change
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle form submission to trigger the search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMovies(query); // Fetch movies based on the search query
  };

  // Function to create a download link (this should ideally point to a real download link)
  const getDownloadLink = (movie) => {
    // Link to a fictional NetNaija download page using the movie title
    return `https://www.netnaija.com/download/${movie.title.replace(/\s+/g, "-")}`;
  };

  return (
    <div className="container">
      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="my-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a movie..."
            value={query}
            onChange={handleSearchChange}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </div>
      </form>

      {/* Loading State */}
      {loading && <div>Loading...</div>}

      <div className="row" style={{ marginTop: "20px" }}>
        {/* Grid layout with 4 columns */}
        {movies.slice(0, 16).map((movie) => (
          <div
            key={movie.id}
            className="col-md-3" // 4 columns (12 / 3 = 4)
            style={{
              marginBottom: "20px",
            }}
          >
            <div
              className="card"
              style={{
                width: "100%",
                cursor: "pointer",
                borderRadius: "10px",
                overflow: "hidden",
                transition: "transform 0.3s ease",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Check if poster_path is available, else use fallback image */}
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : fallbackImage
                }
                className="card-img-top"
                alt={movie.title}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  transition: "transform 0.3s ease",
                }}
              />
              <div
                className="card-body"
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  background: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                <h5
                  className="card-title"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {movie.title}
                </h5>
                <p
                  className="card-text"
                  style={{
                    fontSize: "14px",
                    marginBottom: "10px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {movie.overview.length > 100
                    ? `${movie.overview.substring(0, 100)}...`
                    : movie.overview}
                </p>
                <a
                  href={`https://www.themoviedb.org/movie/${movie.id}`}
                  className="btn btn-danger"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "12px",
                    padding: "5px 15px",
                    borderRadius: "20px",
                  }}
                >
                  View Details
                </a>
                {/* Download Button with Netflix-style positioning and design */}
                <a
                  href={getDownloadLink(movie)} // Generate the download link
                  className="btn download-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "10px",
                    padding: "13px 5px",
                    borderRadius: "100px",
                    marginTop: "10px",
                    backgroundColor: "black", // Netflix red color
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                    textAlign: "center",
                    display: "block",
                    transition: "background-color 0.3s ease, transform 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "blue";
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#e50914";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
