import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // New state for full name
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !fullName) { // Check if all fields are filled
      setError("All fields are required");
      return;
    }

    setError("");
    const user = { email, fullName }; // Save both email and full name
    localStorage.setItem("user", JSON.stringify(user)); // Save user info as a JSON object
    navigate("/login"); // Redirect after registration
  };

  return (
    <div className="container" style={{ maxWidth: "450px", marginTop: "150px", padding: "20px" }}>
      <div className="card p-4 shadow-sm" style={{ backgroundColor: "#141414", color: "white" }}>
        <h4 className="text-center mb-4">Create an Account</h4>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control mb-3" 
              placeholder="Full Name" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              style={{
                backgroundColor: "#333",
                border: "1px solid #555",
                color: "white",
                fontSize: "16px",
                padding: "15px",
                borderRadius: "4px"
              }}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              className="form-control mb-3" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{
                backgroundColor: "#333",
                border: "1px solid #555",
                color: "white",
                fontSize: "16px",
                padding: "15px",
                borderRadius: "4px"
              }}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control mb-3" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{
                backgroundColor: "#333",
                border: "1px solid #555",
                color: "white",
                fontSize: "16px",
                padding: "15px",
                borderRadius: "4px"
              }}
              required
            />
          </div>
          <button className="btn btn-danger w-100 mt-3" type="submit" style={{ fontSize: "16px", padding: "15px" }}>
            Register
          </button>
        </form>
      </div>
      <div className="text-center mt-4">
        <p style={{ color: "#888" }}>
          Already have an account? <a href="/login" style={{ color: "#e50914" }}>Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
