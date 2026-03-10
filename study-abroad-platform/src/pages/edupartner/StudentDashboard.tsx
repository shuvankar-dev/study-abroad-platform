import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, User, FileText, Download, Edit, CheckCircle, 
  Clock, AlertCircle, XCircle, Calendar, Building2, GraduationCap,
  Mail, Phone, MapPin, Globe
} from "lucide-react";
import "./studentdashboard.css";

interface Application {
  id: number;
  student_name: string;
  university_name: string;
  course_name: string;
  pref_intake: string;
  additional_notes: string;
  status: string;
  submitted: string;
}

interface StudentData {
  id: number;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  // Add more fields as needed
}

const StudentDashboard = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost";

  useEffect(() => {
    fetchStudentData();
    fetchApplications();
  }, [studentId]);

  const fetchStudentData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await fetch(`${API_BASE}/edupartner/get_student_by_id.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          student_id: studentId
        })
      });
      const data = await res.json();
      if (data.success) {
        setStudentData(data.student);
      }
    } catch (err) {
      console.error("Failed to fetch student data", err);
    }
  };

  const fetchApplications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await fetch(`${API_BASE}/edupartner/get_applications.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          role: user.role
        })
      });
      const data = await res.json();
      if (data.success) {
        // Filter applications for this specific student
        const studentApps = data.applications.filter(
          (app: Application) => app.student_name === studentData?.name
        );
        setApplications(studentApps);
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch applications", err);
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "submitted":
        return <Clock size={18} className="status-icon status-submitted" />;
      case "under review":
        return <AlertCircle size={18} className="status-icon status-review" />;
      case "accepted":
      case "approved":
        return <CheckCircle size={18} className="status-icon status-accepted" />;
      case "rejected":
        return <XCircle size={18} className="status-icon status-rejected" />;
      default:
        return <Clock size={18} className="status-icon status-pending" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "submitted":
        return "status-badge status-submitted";
      case "under review":
        return "status-badge status-review";
      case "accepted":
      case "approved":
        return "status-badge status-accepted";
      case "rejected":
        return "status-badge status-rejected";
      default:
        return "status-badge status-pending";
    }
  };

  // Application Status Progress Steps
  const statusSteps = [
    { label: "Application Created", status: "created", icon: <FileText size={16} /> },
    { label: "Application Started", status: "started", icon: <Edit size={16} /> },
    { label: "Application Reviewed", status: "reviewed", icon: <CheckCircle size={16} /> },
    { label: "Submitted to School", status: "submitted", icon: <Building2 size={16} /> },
    { label: "Awaiting Decision", status: "awaiting", icon: <Clock size={16} /> },
    { label: "Admission Processing", status: "processing", icon: <AlertCircle size={16} /> },
    { label: "Pre-Arrival", status: "pre-arrival", icon: <Calendar size={16} /> },
    { label: "Arrival", status: "arrival", icon: <GraduationCap size={16} /> }
  ];

  const getCurrentStep = (status: string) => {
    const statusMap: { [key: string]: number } = {
      "created": 0,
      "started": 1,
      "reviewed": 2,
      "submitted": 3,
      "awaiting": 4,
      "processing": 5,
      "pre-arrival": 6,
      "arrival": 7
    };
    return statusMap[status.toLowerCase()] || 3;
  };

  if (loading) {
    return (
      <div className="student-dashboard-container">
        <div className="loading-state">Loading...</div>
      </div>
    );
  }

  return (
    <div className="student-dashboard-container">
      <div className="dashboard-header">
        <button className="back-btn" onClick={() => navigate("/edupartner/students")}>
          <ArrowLeft size={20} />
          Back to Students
        </button>
        <h1>Student Dashboard</h1>
      </div>

      {/* Student Profile Card */}
      {studentData && (
        <div className="student-profile-card">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div className="profile-info">
            <h2>{studentData.name}</h2>
            <div className="profile-details">
              {studentData.email && (
                <span className="profile-detail">
                  <Mail size={14} /> {studentData.email}
                </span>
              )}
              {studentData.phone && (
                <span className="profile-detail">
                  <Phone size={14} /> {studentData.phone}
                </span>
              )}
              {studentData.nationality && (
                <span className="profile-detail">
                  <Globe size={14} /> {studentData.nationality}
                </span>
              )}
            </div>
          </div>
          <button className="edit-profile-btn" onClick={() => navigate(`/edupartner/add-student?edit=${studentId}`)}>
            <Edit size={16} /> Edit Profile
          </button>
        </div>
      )}

      {/* Applications Section */}
      <div className="applications-section">
        <div className="section-header">
          <h2>Applications ({applications.length})</h2>
          <button className="btn-primary" onClick={() => navigate("/edupartner/dashboard?section=applications")}>
            + New Application
          </button>
        </div>

        {applications.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} />
            <h3>No Applications Yet</h3>
            <p>This student hasn't submitted any applications.</p>
            <button className="btn-primary" onClick={() => navigate("/edupartner/dashboard?section=applications")}>
              Create First Application
            </button>
          </div>
        ) : (
          <div className="applications-grid">
            {applications.map((app) => (
              <div key={app.id} className="application-card" onClick={() => setSelectedApp(app)}>
                <div className="app-card-header">
                  <div className="app-id">App ID: #{app.id}</div>
                  <div className={getStatusClass(app.status)}>
                    {getStatusIcon(app.status)}
                    {app.status}
                  </div>
                </div>
                
                <div className="app-card-body">
                  <h3>{app.university_name}</h3>
                  <p className="course-name">{app.course_name}</p>
                  
                  <div className="app-details">
                    <div className="app-detail">
                      <Calendar size={14} />
                      <span>Intake: {app.pref_intake || "Not specified"}</span>
                    </div>
                    <div className="app-detail">
                      <Clock size={14} />
                      <span>Submitted: {app.submitted}</span>
                    </div>
                  </div>
                </div>

                <div className="app-card-footer">
                  <button className="view-details-btn">View Details →</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
          <div className="modal-content application-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Application Details - #{selectedApp.id}</h2>
              <button className="modal-close" onClick={() => setSelectedApp(null)}>×</button>
            </div>

            {/* Status Progress Bar */}
            <div className="status-progress-bar">
              {statusSteps.map((step, index) => {
                const currentStep = getCurrentStep(selectedApp.status);
                const isCompleted = index <= currentStep;
                const isActive = index === currentStep;
                
                return (
                  <div key={index} className={`progress-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                    <div className="step-icon">{step.icon}</div>
                    <div className="step-label">{step.label}</div>
                    {index < statusSteps.length - 1 && (
                      <div className={`step-line ${isCompleted ? 'completed' : ''}`} />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <h3><Building2 size={18} /> University Information</h3>
                <p><strong>University:</strong> {selectedApp.university_name}</p>
                <p><strong>Course:</strong> {selectedApp.course_name}</p>
                <p><strong>Preferred Intake:</strong> {selectedApp.pref_intake || "Not specified"}</p>
              </div>

              <div className="detail-section">
                <h3><FileText size={18} /> Application Status</h3>
                <div className={getStatusClass(selectedApp.status)}>
                  {getStatusIcon(selectedApp.status)}
                  {selectedApp.status}
                </div>
                <p><strong>Submitted:</strong> {selectedApp.submitted}</p>
              </div>

              {selectedApp.additional_notes && (
                <div className="detail-section">
                  <h3><FileText size={18} /> Additional Notes</h3>
                  <p>{selectedApp.additional_notes}</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedApp(null)}>Close</button>
              <button className="btn-primary">Update Status</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
