import React, { useContext } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm px-3 py-2">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Left: Logo */}
        <Link className="navbar-brand fw-bold logo-text" to="/">
          <span className="text-glow">Void</span>Movies
        </Link>

        {/* Center: Navigation Links */}
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav gap-4">
            <li className="nav-item">
              <Link className="nav-link nav-glow" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-glow" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-glow" to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Right: Auth */}
        <div className="d-flex align-items-center gap-2">
          {user ? (
            <>
              <span className="text-white small">{user}</span>
              <button className="btn btn-outline-danger btn-sm" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline-danger btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .custom-navbar {
          background: linear-gradient(90deg, #000000, #1a1a1a);
          border-bottom: 1px solid #ff0000;
        }

        .logo-text {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.6rem;
          letter-spacing: 1px;
        }

        .text-glow {
          color: #ff0033;
          text-shadow: 0 0 5px #ff0033, 0 0 10px #ff0033;
        }

        .nav-link {
          font-weight: 500;
          position: relative;
        }

        .nav-glow {
          color: #f1f1f1;
          transition: all 0.3s ease;
        }

        .nav-glow:hover {
          color: #ff0033;
          text-shadow: 0 0 5px #ff0033, 0 0 10px #ff0033;
        }

        .dropdown-menu-dark {
          background-color: #1e1e1e;
        }

        .dropdown-item:hover {
          background-color: #ff0033;
          color: #fff;
        }

        .btn-outline-danger:hover {
          background-color: #ff0033;
          color: white;
          border-color: #ff0033;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
