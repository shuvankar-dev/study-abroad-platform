import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, User, Mail, Phone, Lock, GraduationCap, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

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

    if (!company_name || !user_name || !email || !password || !confirmPassword || !role) {
      setError("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

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

  const InputField = ({ 
    icon: Icon, 
    label, 
    name, 
    type = "text", 
    placeholder, 
    value, 
    required = true 
  }: any) => (
    <div style={{ marginBottom: '18px' }}>
      <label style={{ 
        display: 'block',
        fontSize: '14px',
        fontWeight: '500',
        color: '#2d3748',
        marginBottom: '8px'
      }}>
        {label} {required && <span style={{ color: '#f56565' }}>*</span>}
      </label>
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Icon 
          size={18} 
          style={{ 
            position: 'absolute',
            left: '14px',
            color: '#a0aec0'
          }} 
        />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '11px 11px 11px 44px',
            fontSize: '14px',
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
  );

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
            Join Our Partner Network
          </h1>

          <p style={{ 
            maxWidth: '520px', 
            fontSize: '18px', 
            lineHeight: '1.6',
            opacity: 0.95,
            marginBottom: '32px'
          }}>
            Get access to 500+ universities worldwide, competitive
            commissions, and dedicated support for your education
            consultancy business.
          </p>

          <ul style={{ 
            listStyle: 'none', 
            padding: 0,
            fontSize: '16px',
            lineHeight: '2'
          }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckCircle2 size={20} />
              Access to global universities
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckCircle2 size={20} />
              Real-time application tracking
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckCircle2 size={20} />
              Transparent commission structure
            </li>
          </ul>
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
        padding: '40px',
        overflowY: 'auto'
      }}>
        <Card style={{ 
          width: '100%', 
          maxWidth: '480px',
          border: 'none',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          marginTop: '20px',
          marginBottom: '20px'
        }}>
          <CardHeader style={{ paddingBottom: '20px' }}>
            <CardTitle style={{ fontSize: '28px', fontWeight: '700', color: '#1a202c' }}>
              Create Account
            </CardTitle>
            <CardDescription style={{ fontSize: '15px', color: '#718096' }}>
              Register as a partner to get started
            </CardDescription>
          </CardHeader>
          
          <CardContent style={{ paddingTop: 0 }}>
            <InputField 
              icon={Building2}
              label="Company Name"
              name="company_name"
              placeholder="Your Company Ltd"
              value={form.company_name}
            />

            <InputField 
              icon={User}
              label="Contact Person"
              name="user_name"
              placeholder="Full Name"
              value={form.user_name}
            />

            <InputField 
              icon={Mail}
              label="Email"
              name="email"
              type="email"
              placeholder="xyz@gmail.com"
              value={form.email}
            />

            <InputField 
              icon={Phone}
              label="Phone"
              name="phone"
              placeholder="+1 234 567 8900"
              value={form.phone}
              required={false}
            />

            <InputField 
              icon={Lock}
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
            />

            <InputField 
              icon={Lock}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
            />

            {/* Role Select */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ 
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#2d3748',
                marginBottom: '8px'
              }}>
                Role <span style={{ color: '#f56565' }}>*</span>
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <User 
                  size={18} 
                  style={{ 
                    position: 'absolute',
                    left: '14px',
                    color: '#a0aec0',
                    pointerEvents: 'none',
                    zIndex: 1
                  }} 
                />
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '11px 11px 11px 44px',
                    fontSize: '14px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    backgroundColor: '#f7fafc',
                    cursor: 'pointer',
                    appearance: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.backgroundColor = '#ffffff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.backgroundColor = '#f7fafc';
                  }}
                >
                  <option value="">---Select Role---</option>
                  <option value="Admin">Admin</option>
                  <option value="Agent">Agent</option>
                </select>
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
                marginBottom: '16px'
              }}>
                <AlertCircle size={18} style={{ color: '#f56565', flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: '#c53030' }}>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                backgroundColor: '#f0fff4',
                border: '1px solid #9ae6b4',
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <CheckCircle2 size={18} style={{ color: '#38a169', flexShrink: 0 }} />
                <span style={{ fontSize: '14px', color: '#2f855a' }}>{success}</span>
              </div>
            )}

            {/* Create Account Button */}
            <button 
              onClick={handleSubmit}
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
              Create Account
              <ArrowRight size={20} />
            </button>

            {/* Sign In Link */}
            <p style={{ 
              textAlign: 'center',
              marginTop: '20px',
              fontSize: '14px',
              color: '#718096'
            }}>
              Already have an account?{" "}
              <Link 
                to="/edupartner/login"
                style={{
                  color: '#667eea',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
