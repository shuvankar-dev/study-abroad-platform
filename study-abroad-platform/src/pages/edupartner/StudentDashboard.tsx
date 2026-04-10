import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, User, FileText, Edit, CheckCircle, 
  Clock, AlertCircle, XCircle, Calendar, Building2,
  Mail, Phone, Globe, History, Download, Eye, File,
  GraduationCap, Star, X, Sparkles
} from "lucide-react";
import ApplicationStatusBar from "../../components/ApplicationStatusBar";
import ApplicationStatusManager from "../../components/ApplicationStatusManager";
import StudentStatusBar from "../../components/StudentStatusBar";
import StudentStatusManager from "../../components/StudentStatusManager";
import "./studentdashboard.css";

interface Application {
  id: number;
  application_code?: string;
  student_id?: number;
  student_code?: string;
  student_name: string;
  university_name: string;
  course_name: string;
  pref_intake: string;
  additional_notes: string;
  status: string;
  application_status?: string;
  submitted: string;
  offer_letter_file?: string;
  offer_letter_original_name?: string;
  offer_letter_uploaded_at?: string;
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
  const [offerLetterFile, setOfferLetterFile] = useState<File | null>(null);
  const [isUploadingOffer, setIsUploadingOffer] = useState(false);
  const [extraDoc1File, setExtraDoc1File] = useState<File | null>(null);
  const [extraDoc1Label, setExtraDoc1Label] = useState("");
  const [extraDoc2File, setExtraDoc2File] = useState<File | null>(null);
  const [extraDoc2Label, setExtraDoc2Label] = useState("");
  const [isUploadingExtra, setIsUploadingExtra] = useState(false);
  const [activeTab, setActiveTab] = useState<'progress' | 'documents' | 'applications'>('progress');
  const [showStatusHistory, setShowStatusHistory] = useState(false);
  const [showStudentStatusHistory, setShowStudentStatusHistory] = useState(false);

  // New Application Modal state
  const [showNewAppModal, setShowNewAppModal] = useState(false);
  const [universities, setUniversities] = useState<any[]>([]);
  const [isSubmittingApp, setIsSubmittingApp] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    student_name: "",
    course: "",
    university: "",
    preferred_intake: "",
    notes: "",
  });

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
      console.log('Fetched documents:', data);
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

  const handleOfferLetterUpload = async () => {
    if (!offerLetterFile || !selectedApp) return;

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (user.role !== "Super Admin" && user.role !== "Admin") {
      alert("Only Super Admin and Admin can upload offer letters");
      return;
    }

    setIsUploadingOffer(true);

    try {
      const formData = new FormData();
      formData.append("offer_letter", offerLetterFile);
      formData.append("application_id", selectedApp.id.toString());
      formData.append("user_id", user.id.toString());
      formData.append("user_role", user.role);

      const res = await fetch(`${API_BASE}/edupartner/upload_offer_letter.php`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        alert("Offer letter uploaded successfully!");
        setOfferLetterFile(null);
        fetchApplications();
        if (selectedApp) {
          fetchAppStatusHistory(selectedApp.id);
        }
      } else {
        alert(data.message || "Failed to upload offer letter");
      }
    } catch (err) {
      console.error("Error uploading offer letter:", err);
      alert("Error uploading offer letter");
    } finally {
      setIsUploadingOffer(false);
    }
  };

  const handleDownloadOfferLetter = (applicationId: number) => {
    window.open(`${API_BASE}/edupartner/download_offer_letter.php?application_id=${applicationId}`, '_blank');
  };

  const handleViewDocument = (documentId: number) => {
    window.open(`${API_BASE}/edupartner/view_document.php?document_id=${documentId}`, '_blank');
  };

  const handleExtraDocUpload = async (docType: string) => {
    const file = docType === 'extra_doc_1' ? extraDoc1File : extraDoc2File;
    const label = docType === 'extra_doc_1' ? extraDoc1Label : extraDoc2Label;

    if (!file || !label.trim() || !studentId) return;

    setIsUploadingExtra(true);

    try {
      const formData = new FormData();
      formData.append("document", file);
      formData.append("student_id", studentId);
      formData.append("document_type", docType);
      formData.append("document_label", label.trim());

      const res = await fetch(`${API_BASE}/edupartner/upload_student_documents.php`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      console.log('Upload response:', data);

      if (data.success) {
        alert(`${label} uploaded successfully!`);
        if (docType === 'extra_doc_1') {
          setExtraDoc1File(null);
          setExtraDoc1Label("");
        } else {
          setExtraDoc2File(null);
          setExtraDoc2Label("");
        }
        await fetchDocuments();
      } else {
        alert(data.message || "Failed to upload document");
      }
    } catch (err) {
      console.error("Error uploading extra document:", err);
      alert("Error uploading document");
    } finally {
      setIsUploadingExtra(false);
    }
  };

  const handleViewDetails = (app: Application) => {
    setSelectedApp(app);
    setShowStatusManager(false);
    fetchAppStatusHistory(app.id);
  };

  // ========== New Application Modal Functions ==========
  const fetchUniversitiesForModal = async () => {
    try {
      const res = await fetch(`${API_BASE}/edupartner/get_universities.php`);
      const data = await res.json();
      if (data.success) setUniversities(data.universities);
    } catch (err) {
      console.error("Failed to fetch universities", err);
    }
  };

  const openNewAppModal = () => {
    const studentName = getStudentName();
    setApplicationForm({
      student_name: studentName,
      course: "",
      university: "",
      preferred_intake: "",
      notes: "",
    });
    setShowNewAppModal(true);
    fetchUniversitiesForModal();
  };

  const closeNewAppModal = () => {
    setShowNewAppModal(false);
    setApplicationForm({
      student_name: "",
      course: "",
      university: "",
      preferred_intake: "",
      notes: "",
    });
  };

  const handleSelectRecommendation = (uni: any) => {
    const intakes = uni.Open_Intakes
      ? uni.Open_Intakes.split(/[,;]/).map((s: string) => s.trim()).filter(Boolean).join(',')
      : '';
    setApplicationForm({
      ...applicationForm,
      course: uni.Program_Name || "",
      university: uni.University || "",
      preferred_intake: intakes || applicationForm.preferred_intake,
    });
  };

  const submitNewApplication = async () => {
    if (!applicationForm.course || !applicationForm.university) {
      alert("Please fill all required fields (Course & University)");
      return;
    }

    setIsSubmittingApp(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    try {
      const res = await fetch(`${API_BASE}/edupartner/submit_application_v2.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          student_id: studentId, // Pass the actual student ID
          student_name: applicationForm.student_name,
          university_name: applicationForm.university,
          course_name: applicationForm.course,
          pref_intake: applicationForm.preferred_intake,
          additional_notes: applicationForm.notes,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert(`Application created successfully! Application ID: ${data.application_code}`);
        closeNewAppModal();
        fetchApplications();
      } else {
        alert(data.error || "Failed to submit application");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setIsSubmittingApp(false);
    }
  };

  // Derived data for modal dropdowns
  const uniqueCourses = [...new Set(universities.map((u: any) => u.Program_Name).filter(Boolean))];
  const filteredUniversitiesForCourse = universities.filter(
    (u: any) => u.Program_Name === applicationForm.course
  );

  // Recommended universities: filtered by selected course, sorted by Entry_Requirements ASC
  const recommendedForCourse = applicationForm.course
    ? [...filteredUniversitiesForCourse].sort((a: any, b: any) => {
        const reqA = (a.Entry_Requirements || '').toString().toLowerCase();
        const reqB = (b.Entry_Requirements || '').toString().toLowerCase();
        return reqA.localeCompare(reqB);
      })
    : [];

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

  const getDocumentTypeLabel = (type: string, fileName?: string) => {
    if ((type === 'extra_doc_1' || type === 'extra_doc_2') && fileName) {
      return fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
    }
    
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
      work_experience: "Work Experience",
      extra_doc_1: "Extra Document",
      extra_doc_2: "Extra Document"
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

      <div className="dashboard-layout">
        {/* Sidebar with Student Details */}
        {studentData && (
          <aside className="dashboard-sidebar">
            <div className="sidebar-profile">
              <div className="sidebar-avatar">
                <User size={56} />
              </div>
              <h2 className="sidebar-name">{getStudentName()}</h2>
              <div className="sidebar-badges">
                <span className="sidebar-id-badge">ID: {studentData.profile.student_code}</span>
                <span className={`sidebar-status-badge ${studentData.profile.status}`}>
                  {studentData.profile.status}
                </span>
              </div>
            </div>

            <div className="sidebar-details">
              {studentData.profile.email && (
                <div className="sidebar-detail-item">
                  <Mail size={16} />
                  <div>
                    <div className="detail-label">Email</div>
                    <div className="detail-value">{studentData.profile.email}</div>
                  </div>
                </div>
              )}
              {studentData.profile.mobile && (
                <div className="sidebar-detail-item">
                  <Phone size={16} />
                  <div>
                    <div className="detail-label">Phone</div>
                    <div className="detail-value">{studentData.profile.mobile}</div>
                  </div>
                </div>
              )}
              {studentData.personal_info?.citizenship_country && (
                <div className="sidebar-detail-item">
                  <Globe size={16} />
                  <div>
                    <div className="detail-label">Country</div>
                    <div className="detail-value">{studentData.personal_info.citizenship_country}</div>
                  </div>
                </div>
              )}
            </div>

            <button 
              className="sidebar-edit-btn" 
              onClick={() => navigate(`/edupartner/add-student?edit=${studentId}`)}
            >
              <Edit size={16} /> Edit Profile
            </button>
          </aside>
        )}

        {/* Main Content Area with Tabs */}
        <main className="dashboard-main">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('progress')}
            >
              <CheckCircle size={18} />
              Student Progress
            </button>
            <button 
              className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <FileText size={18} />
              Documents
            </button>
            <button 
              className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveTab('applications')}
            >
              <Building2 size={18} />
              Applications
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Student Progress Tab */}
            {activeTab === 'progress' && studentData && (
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

                {isAdminOrSuper && showStudentStatusManager && (
                  <StudentStatusManager
                    studentId={studentData.profile.student_id}
                    currentStatus={studentData.profile.overall_status || "details_submitted"}
                    onStatusUpdate={handleStudentStatusUpdate}
                    userRole={userRole}
                  />
                )}

                {studentStatusHistory.length > 0 && (
                  <div className="student-status-history">
                    <div 
                      className="status-history-header" 
                      onClick={() => setShowStudentStatusHistory(!showStudentStatusHistory)}
                    >
                      <h3><History size={18} /> Status History</h3>
                      <button className="toggle-history-btn">
                        {showStudentStatusHistory ? '−' : '+'}
                      </button>
                    </div>
                    
                    {showStudentStatusHistory && (
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
                    )}
                    
                    {!showStudentStatusHistory && (
                      <p className="history-collapsed-text">Click to view status history</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
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
                          <div className="doc-type-label">{getDocumentTypeLabel(doc.document_type, doc.file_name)}</div>
                          <div className="doc-file-name" title={doc.file_name}>{doc.file_name}</div>
                          <div className="doc-meta">
                            <span>{doc.file_size_mb} MB</span>
                            <span>{new Date(doc.uploaded_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="doc-card-actions">
                          <button
                            onClick={() => handleViewDocument(doc.id)}
                            className="doc-action-btn view"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
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

                <div className="extra-docs-upload-section">
                  <h3>Upload Additional Documents</h3>
                  <p className="extra-docs-info">If university requests additional documents, you can upload them here</p>
                    
                  <div className="extra-docs-grid">
                    <div className="extra-doc-upload-card">
                      <input
                        type="text"
                        placeholder="Document name (e.g., Financial Statement)"
                        value={extraDoc1Label}
                        onChange={(e) => setExtraDoc1Label(e.target.value)}
                        className="extra-doc-name-input"
                      />
                      <div className="extra-doc-upload-controls">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={(e) => setExtraDoc1File(e.target.files?.[0] || null)}
                          className="file-input"
                          id="extra-doc1-main"
                        />
                        <label htmlFor="extra-doc1-main" className="btn-choose-file-compact">
                          {extraDoc1File ? extraDoc1File.name : 'Choose File'}
                        </label>
                        {extraDoc1File && extraDoc1Label.trim() && (
                          <button
                            className="btn-upload-compact"
                            onClick={() => handleExtraDocUpload('extra_doc_1')}
                            disabled={isUploadingExtra}
                          >
                            {isUploadingExtra ? 'Uploading...' : 'Upload'}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="extra-doc-upload-card">
                      <input
                        type="text"
                        placeholder="Document name (e.g., Medical Certificate)"
                        value={extraDoc2Label}
                        onChange={(e) => setExtraDoc2Label(e.target.value)}
                        className="extra-doc-name-input"
                      />
                      <div className="extra-doc-upload-controls">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={(e) => setExtraDoc2File(e.target.files?.[0] || null)}
                          className="file-input"
                          id="extra-doc2-main"
                        />
                        <label htmlFor="extra-doc2-main" className="btn-choose-file-compact">
                          {extraDoc2File ? extraDoc2File.name : 'Choose File'}
                        </label>
                        {extraDoc2File && extraDoc2Label.trim() && (
                          <button
                            className="btn-upload-compact"
                            onClick={() => handleExtraDocUpload('extra_doc_2')}
                            disabled={isUploadingExtra}
                          >
                            {isUploadingExtra ? 'Uploading...' : 'Upload'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="applications-section">
                <div className="section-header">
                  <h2>Applications ({applications.length})</h2>
                  <button className="btn-primary" onClick={openNewAppModal}>
                    + New Application
                  </button>
                </div>

                {applications.length === 0 ? (
                  <div className="empty-state">
                    <FileText size={48} />
                    <h3>No Applications Yet</h3>
                    <p>This student hasn't submitted any applications. Click "+ New Application" above to get started.</p>
                  </div>
                ) : (
                  <div className="applications-grid">
                    {applications.map((app, index) => (
                      <div key={`${app.id}-${index}`} className="application-card" onClick={() => handleViewDetails(app)}>
                        <div className="app-card-header">
                          <div className="app-id" style={{ 
                            fontFamily: "monospace", 
                            fontSize: 13, 
                            fontWeight: 600,
                            color: "#6366f1",
                            background: "#eef2ff",
                            padding: "4px 8px",
                            borderRadius: 6
                          }}>
                            {app.application_code || `#${app.id}`}
                          </div>
                          <div className={getStatusClass(app.status)}>
                            {getStatusIcon(app.status)}
                            {app.status}
                          </div>
                        </div>
                        
                        <div className="app-card-body">
                          <h3>{app.university_name}</h3>
                          <p className="course-name">{app.course_name}</p>
                          
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
            )}
          </div>
        </main>
      </div>

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
          <div className="modal-content application-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Application Details - {selectedApp.application_code || `#${selectedApp.id}`}</h2>
              <button className="modal-close" onClick={() => setSelectedApp(null)}>×</button>
            </div>

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

              {/* Two Column Layout for Application Status and Status History */}
              <div className="detail-section-grid">
                <div className="detail-section">
                  <h3><FileText size={18} /> Application Status</h3>
                  <div className={getStatusClass(selectedApp.status)}>
                    {getStatusIcon(selectedApp.status)}
                    {selectedApp.status}
                  </div>
                  <p><strong>Submitted:</strong> {selectedApp.submitted}</p>
                </div>

                <div className="detail-section">
                  <div 
                    className="status-history-header" 
                    onClick={() => setShowStatusHistory(!showStatusHistory)}
                  >
                    <h3><History size={18} /> Status History</h3>
                    <button className="toggle-history-btn">
                      {showStatusHistory ? '−' : '+'}
                    </button>
                  </div>
                  
                  {showStatusHistory && statusHistory.length > 0 && (
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
                  )}
                  
                  {!showStatusHistory && (
                    <p className="history-collapsed-text">Click to view status history</p>
                  )}
                </div>
              </div>

              {selectedApp.additional_notes && (
                <div className="detail-section">
                  <h3><FileText size={18} /> Additional Notes</h3>
                  <p>{selectedApp.additional_notes}</p>
                </div>
              )}

              {selectedApp.application_status && 
               ['awaiting_school_decision', 'admission_processing', 'pre_arrival', 'arrival'].includes(selectedApp.application_status) && (
                <div className="detail-section offer-letter-section">
                  <h3><FileText size={18} /> Offer Letter</h3>
                  
                  {selectedApp.offer_letter_file ? (
                    <div className="offer-letter-info">
                      <div className="offer-letter-details">
                        <File size={20} className="offer-icon" />
                        <div>
                          <p className="offer-filename">{selectedApp.offer_letter_original_name}</p>
                          <p className="offer-date">Uploaded: {selectedApp.offer_letter_uploaded_at}</p>
                        </div>
                      </div>
                      <button 
                        className="btn-download-offer"
                        onClick={() => handleDownloadOfferLetter(selectedApp.id)}
                      >
                        <Download size={16} /> Download
                      </button>
                    </div>
                  ) : (
                    <div className="no-offer-letter">
                      {isAdminOrSuper ? (
                        <div className="upload-offer-section">
                          <p className="upload-info">No offer letter uploaded yet</p>
                          <div className="upload-offer-controls">
                            <input
                              type="file"
                              accept=".pdf"
                              onChange={(e) => setOfferLetterFile(e.target.files?.[0] || null)}
                              className="file-input"
                              id="offer-letter-input"
                            />
                            <label htmlFor="offer-letter-input" className="btn-choose-file">
                              Choose PDF File
                            </label>
                            {offerLetterFile && (
                              <div className="selected-file-info">
                                <span>{offerLetterFile.name}</span>
                                <button
                                  className="btn-upload-offer"
                                  onClick={handleOfferLetterUpload}
                                  disabled={isUploadingOffer}
                                >
                                  {isUploadingOffer ? 'Uploading...' : 'Upload Offer Letter'}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="no-offer-message">No offer letter available yet</p>
                      )}
                    </div>
                  )}
                </div>
              )}

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

      {/* ============ New Application Modal ============ */}
      {showNewAppModal && (
        <div className="modal-overlay" onClick={closeNewAppModal}>
          <div className="new-app-modal" onClick={(e) => e.stopPropagation()}>

            {/* HEADER */}
            <div className="new-app-modal-header">
              <div>
                <h3>Submit New Application</h3>
                <p>Fill in the details and choose a university</p>
              </div>
              <button className="new-app-close-btn" onClick={closeNewAppModal}>
                <X size={20} />
              </button>
            </div>

            {/* BODY: Two columns */}
            <div className="new-app-modal-body">

              {/* LEFT: Application Form */}
              <div className="new-app-form-section">
                <h4 className="new-app-section-title"><FileText size={18} /> Application Details</h4>

                {/* Student Name (auto-filled, read-only) */}
                <div className="new-app-field">
                  <label>Student <span className="required">*</span></label>
                  <div className="new-app-student-display">
                    <User size={18} />
                    <span>{applicationForm.student_name || getStudentName()}</span>
                  </div>
                </div>

                {/* Course */}
                <div className="new-app-field">
                  <label>Course <span className="required">*</span></label>
                  <select
                    value={applicationForm.course}
                    onChange={(e) =>
                      setApplicationForm({
                        ...applicationForm,
                        course: e.target.value,
                        university: "",
                        preferred_intake: "",
                      })
                    }
                  >
                    <option value="">Select a course</option>
                    {uniqueCourses.map((course, i) => (
                      <option key={i} value={course as string}>
                        {course as string}
                      </option>
                    ))}
                  </select>
                </div>

                {/* University */}
                <div className="new-app-field">
                  <label>University <span className="required">*</span></label>
                  <select
                    value={applicationForm.university}
                    onChange={(e) => {
                      const selectedUniversity = e.target.value;
                      const universityData = universities.find(
                        (u: any) => u.University === selectedUniversity && u.Program_Name === applicationForm.course
                      );
                      const intakes = universityData?.Open_Intakes
                        ? universityData.Open_Intakes.split(/[,;]/).map((s: string) => s.trim()).filter(Boolean).join(',')
                        : '';
                      setApplicationForm({
                        ...applicationForm,
                        university: selectedUniversity,
                        preferred_intake: intakes || applicationForm.preferred_intake,
                      });
                    }}
                    disabled={!applicationForm.course}
                  >
                    <option value="">Select a university</option>
                    {filteredUniversitiesForCourse.map((u: any, i: number) => (
                      <option key={i} value={u.University}>
                        {u.University}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Intake */}
                <div className="new-app-field">
                  <label>
                    Preferred Intake
                    {applicationForm.preferred_intake && (
                      <span className="auto-filled-tag">Auto-filled</span>
                    )}
                  </label>
                  {(() => {
                    const intakes = applicationForm.preferred_intake
                      ? applicationForm.preferred_intake.split(',').map((i) => i.trim()).filter(Boolean)
                      : [];
                    if (intakes.length > 1) {
                      return (
                        <select
                          value={applicationForm.preferred_intake}
                          onChange={(e) =>
                            setApplicationForm({ ...applicationForm, preferred_intake: e.target.value })
                          }
                        >
                          <option value="">Select Intake Month</option>
                          {intakes.map((intake, idx) => (
                            <option key={idx} value={intake}>{intake}</option>
                          ))}
                        </select>
                      );
                    } else {
                      return (
                        <input
                          placeholder="e.g. September 2025"
                          value={applicationForm.preferred_intake}
                          onChange={(e) =>
                            setApplicationForm({ ...applicationForm, preferred_intake: e.target.value })
                          }
                          readOnly={intakes.length === 1}
                        />
                      );
                    }
                  })()}
                </div>

                {/* Notes */}
                <div className="new-app-field">
                  <label>Additional Notes</label>
                  <textarea
                    placeholder="Any additional information..."
                    value={applicationForm.notes}
                    onChange={(e) =>
                      setApplicationForm({ ...applicationForm, notes: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                {/* Submit Button */}
                <div className="new-app-form-actions">
                  <button className="new-app-cancel-btn" onClick={closeNewAppModal}>Cancel</button>
                  <button
                    className="new-app-submit-btn"
                    onClick={submitNewApplication}
                    disabled={isSubmittingApp}
                  >
                    {isSubmittingApp ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </div>

              {/* RIGHT: Recommendation Panel */}
              <div className="new-app-rec-section">
                <div className="new-app-rec-header">
                  <h4><Sparkles size={18} /> Recommended Universities</h4>
                  <p>Sorted by highest admission chance</p>
                </div>

                <div className="new-app-rec-list">
                  {!applicationForm.course ? (
                    <div className="new-app-rec-empty">
                      <GraduationCap size={32} />
                      <p>Select a course to see recommended universities</p>
                    </div>
                  ) : recommendedForCourse.length === 0 ? (
                    <div className="new-app-rec-empty">
                      <GraduationCap size={32} />
                      <p>No universities found for this course</p>
                    </div>
                  ) : (
                    recommendedForCourse.map((uni: any, idx: number) => (
                      <div
                        key={uni.id || idx}
                        className={`new-app-rec-card ${
                          applicationForm.university === uni.University
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => handleSelectRecommendation(uni)}
                      >
                        <div className="rec-card-top">
                          <div className="rec-card-rank">#{idx + 1}</div>
                          <div className="rec-card-info">
                            <div className="rec-card-uni">{uni.University}</div>
                            <div className="rec-card-program">{uni.Program_Name}</div>
                          </div>
                        </div>
                        <div className="rec-card-meta">
                          {uni.Country && (
                            <span className="rec-meta-item">
                              <Globe size={12} /> {uni.Country}
                            </span>
                          )}
                          {uni.Entry_Requirements && (
                            <span className="rec-meta-item rec-meta-entry">
                              <Star size={12} /> {uni.Entry_Requirements}
                            </span>
                          )}
                          {uni.Open_Intakes && (
                            <span className="rec-meta-item">
                              <Calendar size={12} /> {uni.Open_Intakes}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
