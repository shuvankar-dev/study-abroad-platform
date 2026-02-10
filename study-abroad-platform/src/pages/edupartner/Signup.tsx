import { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost/studyabroadplatform-api'
  : '/studyabroadplatform-api';

const Signup = () => {

  const [form, setForm] = useState({
    company_name: "",
    user_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



    const handleSubmit = async () => {
    setError("");
    setSuccess("");

    const { company_name, user_name, email, password, confirmPassword, role } = form;

    // Required field validation
    if (!company_name || !user_name || !email || !password || !confirmPassword || !role) {
      setError("Please fill all required fields");
      return;
    }

    // Password match check
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Status logic
    const status = role === "Admin" ? "Active" : "Inactive";

    try {
      const res = await fetch(`${API_BASE}/edupartner/signup.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          status
        })
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Account created successfully!");
        setForm({
          company_name: "",
          user_name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          role: ""
        });
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
          <h1>Join Our Partner Network</h1>
          <p>
            Get access to 500+ universities worldwide, competitive
            commissions, and dedicated support for your education
            consultancy business.
          </p>

          <ul className="features">
            <li>✔ Access to global universities</li>
            <li>✔ Real-time application tracking</li>
            <li>✔ Transparent commission structure</li>
          </ul>
        </div>

        <div className="copyright">
          © 2024 EduPartner. All rights reserved.
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="login-right">
        <div className="login-card">
          <h2>Create Account</h2>
          <p className="subtitle">Register as a partner to get started</p>

          {/* Company Name */}
          <div className="form-group">
            <label>Company Name</label>
            <div className="input-box">
              <span className="icon">🏢</span>
              <input
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
                placeholder="Your Company Ltd"
              />
            </div>
          </div>

          {/* Contact Person */}
          <div className="form-group">
            <label>Contact Person</label>
            <div className="input-box">
              <span className="icon">👤</span>
              <input
                name="user_name"
                value={form.user_name}
                onChange={handleChange}
                placeholder="Full Name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <div className="input-box">
              <span className="icon">✉️</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="xyz@gmail.com"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone (Optional)</label>
            <div className="input-box">
              <span className="icon">📞</span>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <div className="input-box">
              <span className="icon">🔒</span>
            
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-box">
              <span className="icon">🔒</span>
              
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>
          </div>


          <div className="form-group">
          <label>Role</label>
          <div
            className="input-box"
            style={{
              display: "flex",
              alignItems: "center",
              width: "94%"
            }}
          >
            <span
              className="icon"
              style={{
                marginRight: "8px",
                fontSize: "16px"
              }}
            >
              👤
            </span>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              style={{
                width: "90%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                outline: "none",
                fontSize: "14px",
                backgroundColor: "#fff",
                color: "#333"
              }}
            >
              <option value="">---Select Role---</option>
              <option value="Admin">Admin</option>
              <option value="Agent">Agent</option>
            </select>
          </div>
        </div>


          {error && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {error}
            </p>
          )}

          {success && (
            <p style={{ color: "green", marginBottom: "10px" }}>
              {success}
            </p>
          )}

          <button className="signin-btn" onClick={handleSubmit}>
            Create Account
          </button>

          <p className="register-text">
            Already have an account? <Link to="/edupartner/login">Sign in</Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Signup;
