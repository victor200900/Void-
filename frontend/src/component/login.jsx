import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    // Simulate login
    localStorage.setItem("user", email);
    setError("");
    navigate("/movie");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4 text-light bg-black" style={{ width: "350px", borderRadius: "10px" }}>
        <h2 className="text-center mb-3">Sign In</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control bg-secondary text-light border-0"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control bg-secondary text-light border-0"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-danger w-100 mb-3" type="submit">
            Sign In
          </button>
        </form>
        <div className="text-center">
          <small className="text-muted">
            New to Void? <Link to="/register" className="text-light">Sign up now.</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
