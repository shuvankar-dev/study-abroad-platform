import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, User, FileText, Edit, CheckCircle, 
  Clock, AlertCircle, XCircle, Calendar, Building2,
  Mail, Phone, Globe, History, Download, Eye, File
} from "lucide-react";
import ApplicationStatusBar from "../../components/ApplicationStatusBar";
import ApplicationStatusManager from "../../components/ApplicationStatusManager";
import StudentStatusBar from "../../components/StudentStatusBar";
import StudentStatusManager from "../../components/StudentStatusManager";
import "./studentdashboard.css";

interface Application {
  id: number;
  student_name: string;
  university_name: string;
  course_name: string;
  pref_intake: string;
  additional_notes: string;
  status: string;
  application_status?: string;
  submitted: string;
}

interface StudentDocument {
  id: number;
  document_type: string;
  file_name: string;
  file_path: string;
  file_size: number;
  file_size_mb: number;
  uploaded_at: string;
}

interface StatusHistory {
  id: number;
  old_status: string;
  new_status: string;
  changed_by_role: string;
  changed_by_name: string;
  notes: string;
  changed_at: string;
}

interface StudentProfile {
  student_id: number;
  student_code: string;
  email: string;
  mobile: string;
  created_by_user_id: number;
  created_by_role: string;
  current_step: number;
  status: string;
  overall_status: string;
}

interface StudentPersonalInfo {
  first_name: string;
  middle_name?: string;
  last_name: string;
  dob: string;
  citizenship_country: string;
  passport_number: string;
  gender: string;
}

interface StudentData {
  profile: StudentProfile;
  personal_info: StudentPersonalInfo;
  education: Record<string, unknown>;
  test_scores: Record<string, unknown> | null;
  additional_info: Record<string, unknown> | null;
  documents: string[];
}

const StudentDashboard = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [studentDocuments, setStudentDocuments] = useState<StudentDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [statusHistory, setStatusHistory] = useState<StatusHistory[]>([]);
  const [studentStatusHistory, setStudentStatusHistory] = useState<StatusHistory[]>([]);
  const [showStatusManager, setShowStatusManager] = useState(false);
  const [showStudentStatusManager, setShowStudentStatusManager] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [isAdminOrSuper, setIsAdminOrSuper] = useState(false);

  const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost/studyabroadplatform-api'
    : '/studyabroadplatform-api';

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserRole(user.role || "");
    setIsAdminOrSuper(user.role === "Super Admin" || user.role === "Admin");
    
    const loadData = async () => {
      setLoading(true);
      await fetchStudentData();
      await Promise.all([fetchApplications(), fetchDocuments(), fetchStudentStatusHistory()]);
      setLoading(false);
    };
    loadData();
  }, [studentId]);

  const fetchStudentData = async () => {
    try {
      const res = await fetch(`${API_BASE}/edupartner/get_student_by_id.php?student_id=${studentId}`);
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
      const res = await fetch(`${API_BASE}/edupartner/get_student_applications.php?student_id=${studentId}`);
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error("Failed to fetch applications", err);
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await fetch(`${API_BASE}/edupartner/get_student_documents.php?student_id=${studentId}`);
      const data = await res.json();
      if (data.success) {
        setStudentDocuments(data.documents);
      }
    } catch (err) {
      console.error("Failed to fetch documents", err);
    }
  };

  const fetchStudentStatusHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/edupartner/get_student_status_history.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: Number(studentId) })
      });
      const data = await res.json();
      if (data.success) {
        setStudentStatusHistory(data.history);
      }
    } catch (err) {
      console.error("Failed to fetch student status history", err);
    }
  };

  const fetchAppStatusHistory = async (applicationId: number) => {
    try {
      const res = await fetch(`${API_BASE}/edupartner/get_application_status_history.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ application_id: applicationId })
      });
      const data = await res.json();
      if (data.success) {
        setStatusHistory(data.history);
      }
    } catch (err) {
      console.error("Failed to fetch status history", err);
    }
  };

  const handleAppStatusUpdate = (newStatus: string) => {
    if (selectedApp) {
      setSelectedApp({ ...selectedApp, application_status: newStatus });
      fetchApplications();
      fetchAppStatusHistory(selectedApp.id);
    }
  };

  const handleStudentStatusUpdate = (newStatus: string) => {
    if (studentData) {
      setStudentData({
        ...studentData,
        profile: { ...studentData.profile, overall_status: newStatus }
      });
      fetchStudentStatusHistory();
    }
  };

  const handleViewDetails = (app: Application) => {
    setSelectedApp(app);
    setShowStatusManager(false);
    fetchAppStatusHistory(app.id);
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

  const getDocumentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      passport: "Passport",
      "10th_marksheet": "10th Marksheet",
      "12th_marksheet": "12th Marksheet",
      bachelor_degree: "Bachelor Degree",
      moi: "Medium of Instruction (MOI)",
      lor: "Letter of Recommendation (LOR)",
      english_test_score: "English Test Score",
      sop: "Statement of Purpose (SOP)",
      cv: "CV / Resume",
      gap_certificate: "Gap Certificate",
      work_experience: "Work Experience"
    };
    return labels[type] || type.replace(/_/g, " ");
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return <File size={18} className="doc-icon doc-pdf" />;
    if (['jpg', 'jpeg', 'png'].includes(ext || '')) return <Eye size={18} className="doc-icon doc-image" />;
    return <FileText size={18} className="doc-icon doc-default" />;
  };

  const getStudentName = () => {
    if (!studentData?.personal_info) return "Student";
    const { first_name, middle_name, last_name } = studentData.personal_info;
    return [first_name, middle_name, last_name].filter(Boolean).join(" ");
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
            <h2>{getStudentName()}</h2>
            <div className="profile-meta">
              <span className="student-id-badge">ID: {studentData.profile.student_code}</span>
              <span className={`profile-status-badge ${studentData.profile.status}`}>
                {studentData.profile.status}
              </span>
            </div>
            <div className="profile-details">
              {studentData.profile.email && (
                <span className="profile-detail">
                  <Mail size={14} /> {studentData.profile.email}
                </span>
              )}
              {studentData.profile.mobile && (
                <span className="profile-detail">
                  <Phone size={14} /> {studentData.profile.mobile}
                </span>
              )}
              {studentData.personal_info?.citizenship_country && (
                <span className="profile-detail">
                  <Globe size={14} /> {studentData.personal_info.citizenship_country}
                </span>
              )}
            </div>
          </div>
          <button className="edit-profile-btn" onClick={() => navigate(`/edupartner/add-student?edit=${studentId}`)}>
            <Edit size={16} /> Edit Profile
          </button>
        </div>
      )}

      {/* Student Overall Status Bar */}
      {studentData && (
        <div className="student-status-section">
          <div className="section-header">
            <h2>Student Progress</h2>
            {isAdminOrSuper && (
              <button 
                className="btn-primary"
                onClick={() => setShowStudentStatusManager(!showStudentStatusManager)}
              >
                {showStudentStatusManager ? 'Hide' : 'Update Status'}
              </button>
            )}
          </div>
          
          <StudentStatusBar 
            currentStatus={studentData.profile.overall_status || "details_submitted"} 
            showLabels={true}
          />

          {/* Student Status Manager for Admin/Super Admin */}
          {isAdminOrSuper && showStudentStatusManager && (
            <StudentStatusManager
              studentId={studentData.profile.student_id}
              currentStatus={studentData.profile.overall_status || "details_submitted"}
              onStatusUpdate={handleStudentStatusUpdate}
              userRole={userRole}
            />
          )}

          {/* Student Status History */}
          {studentStatusHistory.length > 0 && (
            <div className="student-status-history">
              <h3><History size={18} /> Status History</h3>
              <div className="status-history-list">
                {studentStatusHistory.map((history) => (
                  <div key={history.id} className="history-item">
                    <div className="history-header">
                      <span className="history-status">{history.new_status.replace(/_/g, ' ')}</span>
                      <span className="history-date">{history.changed_at}</span>
                    </div>
                    <div className="history-details">
                      <span>Changed by: {history.changed_by_name} ({history.changed_by_role})</span>
                      {history.notes && <p className="history-notes">{history.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Documents Section */}
      <div className="documents-section">
        <div className="section-header">
          <h2>Documents ({studentDocuments.length})</h2>
        </div>

        {studentDocuments.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} />
            <h3>No Documents Uploaded</h3>
            <p>No documents have been uploaded for this student yet.</p>
          </div>
        ) : (
          <div className="documents-grid">
            {studentDocuments.map((doc) => (
              <div key={doc.id} className="document-card">
                <div className="doc-card-icon">
                  {getFileIcon(doc.file_name)}
                </div>
                <div className="doc-card-info">
                  <div className="doc-type-label">{getDocumentTypeLabel(doc.document_type)}</div>
                  <div className="doc-file-name" title={doc.file_name}>{doc.file_name}</div>
                  <div className="doc-meta">
                    <span>{doc.file_size_mb} MB</span>
                    <span>{new Date(doc.uploaded_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="doc-card-actions">
                  <a
                    href={`${API_BASE}/edupartner/download_document.php?document_id=${doc.id}`}
                    className="doc-action-btn download"
                    title="Download"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
            {applications.map((app, index) => (
              <div key={`${app.id}-${index}`} className="application-card" onClick={() => handleViewDetails(app)}>
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
                  
                  {/* Mini application status bar */}
                  <div className="app-card-status-bar">
                    <ApplicationStatusBar 
                      currentStatus={app.application_status || "application_created"} 
                      showLabels={false}
                      compact={true}
                    />
                  </div>

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

            {/* Application Status Progress Bar */}
            <div className="modal-status-bar">
              <ApplicationStatusBar 
                currentStatus={selectedApp.application_status || "application_created"} 
                showLabels={true}
              />
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

              {/* Application Status History */}
              {statusHistory.length > 0 && (
                <div className="detail-section">
                  <h3><History size={18} /> Status History</h3>
                  <div className="status-history-list">
                    {statusHistory.map((history) => (
                      <div key={history.id} className="history-item">
                        <div className="history-header">
                          <span className="history-status">{history.new_status.replace(/_/g, ' ')}</span>
                          <span className="history-date">{history.changed_at}</span>
                        </div>
                        <div className="history-details">
                          <span>Changed by: {history.changed_by_name} ({history.changed_by_role})</span>
                          {history.notes && <p className="history-notes">{history.notes}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Application Status Manager for Admin/Super Admin */}
              {isAdminOrSuper && showStatusManager && (
                <ApplicationStatusManager
                  applicationId={selectedApp.id}
                  currentStatus={selectedApp.application_status || "application_created"}
                  onStatusUpdate={handleAppStatusUpdate}
                  userRole={userRole}
                />
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedApp(null)}>Close</button>
              {isAdminOrSuper && (
                <button 
                  className="btn-primary" 
                  onClick={() => setShowStatusManager(!showStatusManager)}
                >
                  {showStatusManager ? 'Hide Status Manager' : 'Update Status'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
