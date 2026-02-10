import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useState } from "react";

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost/studyabroadplatform-api'
  : '/studyabroadplatform-api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

    const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/edupartner/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/edupartner/dashboard");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">

      {/* LEFT SECTION */}
      <div className="login-left">

        <div className="brand">
          <div className="logo-box">🎓</div>
          <span>EduPartner</span>
        </div>

        <div className="left-content">
          <h1>
            Manage Your Students,<br />
            <span>Grow Your Business</span>
          </h1>

          <p>
            Access universities worldwide, track applications,
            manage commissions, and connect with our support
            team—all in one place.
          </p>
        </div>

        <div className="copyright">
          © 2024 EduPartner. All rights reserved.
        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="login-right">

        <div className="login-card">
          <h2>Welcome back</h2>
          <p className="subtitle">Sign in to your partner account</p>

          <div className="form-group">
            <label>Email</label>
            <div className="input-box">
              <span className="icon">✉</span>
              <input
                type="email"
                placeholder="partner@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-box">
              <span className="icon">🔒</span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {error}
            </p>
          )}

          {/* <button
            className="signin-btn"
            onClick={() => navigate("/dashboard")}
          >
            Sign In
          </button> */}

          <button className="signin-btn" onClick={handleLogin}>
            Sign In
          </button>

          <p className="register-text">
            Don't have an account?{" "}
            <Link to="/edupartner/signup">Register here</Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;
