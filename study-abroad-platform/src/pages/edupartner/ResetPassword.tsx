import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, GraduationCap, ArrowLeft, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import "./login.css";

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost/studyabroadplatform-api'
  : '/studyabroadplatform-api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new password reset.");
    }
  }, [token]);

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/edupartner/reset_password.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          new_password: newPassword,
          confirm_password: confirmPassword
        })
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/edupartner/login");
        }, 3000);
      } else {
        setError(data.message || "Failed to reset password");
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
            Create New Password
          </h1>

          <p style={{ 
            maxWidth: '520px', 
            fontSize: '18px', 
            lineHeight: '1.6',
            opacity: 0.95
          }}>
            Enter your new password below. Make sure it's at least 6 characters long.
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
              Reset Password
            </CardTitle>
            <CardDescription style={{ fontSize: '15px', color: '#718096' }}>
              Enter your new password
            </CardDescription>
          </CardHeader>
          
          <CardContent style={{ paddingTop: 0 }}>
            {!success ? (
              <>
                {/* New Password Field */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ 
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#2d3748',
                    marginBottom: '8px'
                  }}>
                    New Password
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
                      type={showNewPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 46px 12px 46px',
                        fontSize: '15px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '10px',
                        outline: 'none',
                        transition: 'all 0.2s',
                        backgroundColor: '#f7fafc',
                        boxSizing: 'border-box'
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
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{
                        position: 'absolute',
                        right: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#a0aec0'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#a0aec0'}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ 
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#2d3748',
                    marginBottom: '8px'
                  }}>
                    Confirm Password
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
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                      style={{
                        width: '100%',
                        padding: '12px 46px 12px 46px',
                        fontSize: '15px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '10px',
                        outline: 'none',
                        transition: 'all 0.2s',
                        backgroundColor: '#f7fafc',
                        boxSizing: 'border-box'
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
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: 'absolute',
                        right: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#a0aec0'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#a0aec0'}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
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
                  disabled={loading || !token}
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#ffffff',
                    background: (loading || !token) ? '#a0aec0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: (loading || !token) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    boxShadow: (loading || !token) ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && token) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading && token) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                    }
                  }}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
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
                    Password Reset Successfully
                  </h3>
                  <p style={{ fontSize: '14px', color: '#718096', lineHeight: '1.6' }}>
                    Your password has been reset. Redirecting to login...
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

export default ResetPassword;
