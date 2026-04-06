import { Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, GraduationCap, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import "./login.css";

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost/studyabroadplatform-api'
  : '/studyabroadplatform-api';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/edupartner/forgot_password.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || "Failed to send reset email");
      }
    } catch {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ 
      display: 'flex', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      
      {/* LEFT SECTION */}
      <div className="login-left" style={{
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
            Reset Your Password
          </h1>

          <p style={{ 
            maxWidth: '520px', 
            fontSize: '18px', 
            lineHeight: '1.6',
            opacity: 0.95
          }}>
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <div style={{ fontSize: '14px', opacity: 0.8 }}>
          © 2024 EduPartner. Powered by <a href="https://codescholaroverseas.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}><strong>CodeScholar Overseas</strong></a>. All rights reserved.
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="login-right" style={{
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
              Forgot Password
            </CardTitle>
            <CardDescription style={{ fontSize: '15px', color: '#718096' }}>
              We'll send you a password reset link
            </CardDescription>
          </CardHeader>
          
          <CardContent style={{ paddingTop: 0 }}>
            {!success ? (
              <>
                {/* Email Field */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#2d3748',
                    marginBottom: '8px'
                  }}>
                    Email Address
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
                      onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
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

                {/* Submit Button */}
                <button 
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#ffffff',
                    background: loading ? '#a0aec0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    boxShadow: loading ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                    }
                  }}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </>
            ) : (
              /* Success Message */
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 0'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#d1fae5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CheckCircle size={36} style={{ color: '#10b981' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a202c', marginBottom: '8px' }}>
                    Check Your Email
                  </h3>
                  <p style={{ fontSize: '14px', color: '#718096', lineHeight: '1.6' }}>
                    If your email is registered, you will receive a password reset link shortly.
                  </p>
                </div>
              </div>
            )}

            {/* Back to Login Link */}
            <div style={{ 
              textAlign: 'center',
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid #e2e8f0'
            }}>
              <Link 
                to="/edupartner/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#667eea',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '14px'
                }}
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
