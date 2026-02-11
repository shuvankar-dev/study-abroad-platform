import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, GraduationCap, ArrowRight, AlertCircle } from "lucide-react";

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
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      
      {/* LEFT SECTION */}
      <div style={{
        flex: 1,
        padding: '60px',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <GraduationCap size={28} />
          </div>
          <span style={{ fontSize: '24px', fontWeight: '700' }}>EduPartner</span>
        </div>

        <div>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '700', 
            lineHeight: '1.2',
            marginBottom: '24px'
          }}>
            Manage Your Students,<br />
            <span style={{ opacity: 0.9 }}>Grow Your Business</span>
          </h1>

          <p style={{ 
            maxWidth: '520px', 
            fontSize: '18px', 
            lineHeight: '1.6',
            opacity: 0.95
          }}>
            Access universities worldwide, track applications,
            manage commissions, and connect with our support
            team—all in one place.
          </p>
        </div>

        <div style={{ fontSize: '14px', opacity: 0.8 }}>
          © 2024 EduPartner. All rights reserved.
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div style={{
        flex: 1,
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        <Card style={{ 
          width: '100%', 
          maxWidth: '440px',
          border: 'none',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
        }}>
          <CardHeader style={{ paddingBottom: '24px' }}>
            <CardTitle style={{ fontSize: '28px', fontWeight: '700', color: '#1a202c' }}>
              Welcome back
            </CardTitle>
            <CardDescription style={{ fontSize: '15px', color: '#718096' }}>
              Sign in to your partner account
            </CardDescription>
          </CardHeader>
          
          <CardContent style={{ paddingTop: 0 }}>
            {/* Email Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#2d3748',
                marginBottom: '8px'
              }}>
                Email
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Mail 
                  size={20} 
                  style={{ 
                    position: 'absolute',
                    left: '14px',
                    color: '#a0aec0'
                  }} 
                />
                <input
                  type="email"
                  placeholder="partner@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 46px',
                    fontSize: '15px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    backgroundColor: '#f7fafc'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.backgroundColor = '#ffffff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.backgroundColor = '#f7fafc';
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#2d3748',
                marginBottom: '8px'
              }}>
                Password
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Lock 
                  size={20} 
                  style={{ 
                    position: 'absolute',
                    left: '14px',
                    color: '#a0aec0'
                  }} 
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 46px',
                    fontSize: '15px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    backgroundColor: '#f7fafc'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.backgroundColor = '#ffffff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.backgroundColor = '#f7fafc';
                  }}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                backgroundColor: '#fff5f5',
                border: '1px solid #feb2b2',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <AlertCircle size={18} style={{ color: '#f56565' }} />
                <span style={{ fontSize: '14px', color: '#c53030' }}>{error}</span>
              </div>
            )}

            {/* Sign In Button */}
            <button 
              onClick={handleLogin}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
              }}
            >
              Sign In
              <ArrowRight size={20} />
            </button>

            {/* Register Link */}
            <p style={{ 
              textAlign: 'center',
              marginTop: '24px',
              fontSize: '14px',
              color: '#718096'
            }}>
              Don't have an account?{" "}
              <Link 
                to="/edupartner/signup"
                style={{
                  color: '#667eea',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                Register here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
