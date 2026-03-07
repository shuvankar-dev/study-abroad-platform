import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, FileText, Download, Edit } from "lucide-react";
import "./studentdashboard.css";

const StudentDashboard = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="student-dashboard-container">
      <div className="dashboard-header">
        <button className="back-btn" onClick={() => navigate("/edupartner/students")}>
          <ArrowLeft size={20} />
          Back to Students
        </button>
        <h1>Student Dashboard</h1>
      </div>

      <div className="coming-soon-card">
        <div className="coming-soon-icon">
          <User size={64} />
        </div>
        <h2>Student Dashboard Coming Soon!</h2>
        <p>We're working on an amazing student dashboard that will include:</p>
        
        <div className="features-grid">
          <div className="feature-item">
            <User size={24} />
            <h3>Complete Profile</h3>
            <p>View all student information in one place</p>
          </div>
          
          <div className="feature-item">
            <FileText size={24} />
            <h3>Document Management</h3>
            <p>View, download, and manage all uploaded documents</p>
          </div>
          
          <div className="feature-item">
            <Download size={24} />
            <h3>Bulk Download</h3>
            <p>Download all documents as a ZIP file</p>
          </div>
          
          <div className="feature-item">
            <Edit size={24} />
            <h3>Edit Profile</h3>
            <p>Update student information anytime</p>
          </div>
        </div>

        <div className="coming-soon-info">
          <p><strong>Student ID:</strong> {studentId}</p>
          <p>This dashboard will be available in the next update.</p>
        </div>

        <div className="action-buttons">
          <button className="btn-primary" onClick={() => navigate("/edupartner/students")}>
            Back to Students List
          </button>
          <button className="btn-secondary" onClick={() => navigate("/edupartner/add-student")}>
            Add New Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
