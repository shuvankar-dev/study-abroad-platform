import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, UserPlus, Eye, Edit, FileText as FileTextIcon, Download,
  Home, GraduationCap, Users, FileText, DollarSign, Building2, 
  CreditCard, BookOpen, MessageSquare, Shield, Menu, X
} from "lucide-react";
import "./students.css";

interface Student {
  student_id: number;
  student_code: string;
  name: string;
  email: string;
  mobile: string;
  country: string;
  current_step: number;
  current_step_label: string;
  status: string;
  status_label: string;
  progress: number;
  created_by_name: string;
  created_by_company: string;
  created_by_role: string;
  created_at: string;
  updated_at: string;
}

const Students = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStudentDetails, setSelectedStudentDetails] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.name || "User";
  const companyName = user.company_name || "Company";
  const userRole = user.role || "User";
  const isSuperAdmin = user.role === "Super Admin";
  const avatarLetter = userName.charAt(0).toUpperCase();

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [searchTerm, statusFilter, students]);

  const fetchStudents = async () => {
    try {
      const API_BASE = window.location.hostname === 'localhost'
        ? 'http://localhost/studyabroadplatform-api'
        : '/studyabroadplatform-api';

      const response = await fetch(`${API_BASE}/edupartner/get_student_profiles.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          role: user.role
        })
      });

      const data = await response.json();

      if (data.success) {
        setStudents(data.students);
        setFilteredStudents(data.students);
      } else {
        console.error("Failed to fetch students:", data.message);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterStudents = () => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(student => student.status === statusFilter);
    }

    setFilteredStudents(filtered);
  };

  const handleViewStudent = (studentId: number) => {
    navigate(`/edupartner/student/${studentId}`);
  };

  const handleEditStudent = (studentId: number, currentStep: number) => {
    navigate(`/edupartner/add-student?student_id=${studentId}&step=${currentStep}`);
  };

  const handleViewDetails = async (studentId: number) => {
    setLoadingDetails(true);
    setShowDetailsModal(true);
    
    try {
      const API_BASE = window.location.hostname === 'localhost'
        ? 'http://localhost/studyabroadplatform-api'
        : '/studyabroadplatform-api';

      const response = await fetch(`${API_BASE}/edupartner/get_student_by_id.php?student_id=${studentId}`);
      const data = await response.json();

      if (data.success) {
        setSelectedStudentDetails(data.student);
      } else {
        console.error("Failed to fetch student details:", data.message);
        alert("Failed to load student details");
        setShowDetailsModal(false);
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
      alert("Error loading student details");
      setShowDetailsModal(false);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleDownloadDetails = () => {
    if (!selectedStudentDetails) return;

    const details = selectedStudentDetails;
    let content = "STUDENT DETAILS\n";
    content += "=".repeat(80) + "\n\n";

    // Profile Information
    if (details.profile) {
      content += "PROFILE INFORMATION\n";
      content += "-".repeat(80) + "\n";
      content += `Student ID: ${details.profile.student_code || 'N/A'}\n`;
      content += `Name: ${details.profile.name || 'N/A'}\n`;
      content += `Email: ${details.profile.email || 'N/A'}\n`;
      content += `Mobile: ${details.profile.mobile || 'N/A'}\n`;
      content += `Country: ${details.profile.country || 'N/A'}\n`;
      content += `Status: ${details.profile.status || 'N/A'}\n`;
      content += `Created: ${details.profile.created_at || 'N/A'}\n\n`;
    }

    // Personal Information
    if (details.personal_info) {
      const p = details.personal_info;
      content += "PERSONAL INFORMATION\n";
      content += "-".repeat(80) + "\n";
      content += `Date of Birth: ${p.date_of_birth || 'N/A'}\n`;
      content += `Gender: ${p.gender || 'N/A'}\n`;
      content += `Marital Status: ${p.marital_status || 'N/A'}\n`;
      content += `Nationality: ${p.nationality || 'N/A'}\n`;
      content += `Passport Number: ${p.passport_number || 'N/A'}\n`;
      content += `Passport Expiry: ${p.passport_expiry || 'N/A'}\n`;
      content += `Address: ${p.address || 'N/A'}\n`;
      content += `City: ${p.city || 'N/A'}\n`;
      content += `State: ${p.state || 'N/A'}\n`;
      content += `Postal Code: ${p.postal_code || 'N/A'}\n`;
      content += `Emergency Contact: ${p.emergency_contact_name || 'N/A'}\n`;
      content += `Emergency Phone: ${p.emergency_contact_phone || 'N/A'}\n`;
      content += `Emergency Relationship: ${p.emergency_contact_relationship || 'N/A'}\n\n`;
    }

    // Education Information
    if (details.education) {
      content += "EDUCATION INFORMATION\n";
      content += "-".repeat(80) + "\n";
      
      if (details.education['10th']) {
        const e = details.education['10th'];
        content += `10th Grade:\n`;
        content += `  School: ${e.school_name || 'N/A'}\n`;
        content += `  Board: ${e.board || 'N/A'}\n`;
        content += `  Year: ${e.passing_year || 'N/A'}\n`;
        content += `  Percentage: ${e.percentage || 'N/A'}%\n\n`;
      }
      
      if (details.education['12th']) {
        const e = details.education['12th'];
        content += `12th Grade:\n`;
        content += `  School: ${e.school_name || 'N/A'}\n`;
        content += `  Board: ${e.board || 'N/A'}\n`;
        content += `  Stream: ${e.stream || 'N/A'}\n`;
        content += `  Year: ${e.passing_year || 'N/A'}\n`;
        content += `  Percentage: ${e.percentage || 'N/A'}%\n\n`;
      }
      
      if (details.education['bachelor']) {
        const e = details.education['bachelor'];
        content += `Bachelor's Degree:\n`;
        content += `  University: ${e.university_name || 'N/A'}\n`;
        content += `  Degree: ${e.degree_name || 'N/A'}\n`;
        content += `  Specialization: ${e.specialization || 'N/A'}\n`;
        content += `  Year: ${e.passing_year || 'N/A'}\n`;
        content += `  CGPA/Percentage: ${e.cgpa || e.percentage || 'N/A'}\n\n`;
      }
    }

    // Test Scores
    if (details.test_scores) {
      const t = details.test_scores;
      content += "TEST SCORES\n";
      content += "-".repeat(80) + "\n";
      
      if (t.ielts_score) {
        content += `IELTS: ${t.ielts_score} (L:${t.ielts_listening} R:${t.ielts_reading} W:${t.ielts_writing} S:${t.ielts_speaking})\n`;
      }
      if (t.toefl_score) {
        content += `TOEFL: ${t.toefl_score}\n`;
      }
      if (t.pte_score) {
        content += `PTE: ${t.pte_score}\n`;
      }
      if (t.gre_score) {
        content += `GRE: ${t.gre_score} (Verbal:${t.gre_verbal} Quant:${t.gre_quantitative} AWA:${t.gre_analytical})\n`;
      }
      if (t.gmat_score) {
        content += `GMAT: ${t.gmat_score}\n`;
      }
      if (t.sat_score) {
        content += `SAT: ${t.sat_score}\n`;
      }
      content += "\n";
    }

    // Additional Information
    if (details.additional_info) {
      const a = details.additional_info;
      content += "ADDITIONAL INFORMATION\n";
      content += "-".repeat(80) + "\n";
      content += `Work Experience: ${a.work_experience || 'N/A'}\n`;
      content += `Study Gap: ${a.study_gap || 'N/A'}\n`;
      content += `Preferred Country: ${a.preferred_country || 'N/A'}\n`;
      content += `Preferred Course: ${a.preferred_course || 'N/A'}\n`;
      content += `Budget: ${a.budget || 'N/A'}\n`;
      content += `Intake: ${a.intake_year || 'N/A'} ${a.intake_month || ''}\n`;
      if (a.additional_notes) {
        content += `Notes: ${a.additional_notes}\n`;
      }
    }

    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${details.profile?.student_code || 'student'}_details.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'draft':
        return 'status-draft';
      case 'submitted':
        return 'status-submitted';
      default:
        return 'status-default';
    }
  };

  const handleSidebarNavigation = (section: string) => {
    setSidebarOpen(false);
    if (section === "students") {
      return;
    }
    if (section === "universities") {
      navigate("/edupartner/new-universities");
      return;
    }
    navigate(`/edupartner/dashboard?section=${section}`);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading students...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Mobile overlay */}
      <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <GraduationCap size={24} /> <span>EduPartner</span>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>

        <ul className="menu">
          <li onClick={() => handleSidebarNavigation("dashboard")}>
            <Home size={18} /> Dashboard
          </li>

          <li onClick={() => handleSidebarNavigation("universities")}>
            <GraduationCap size={18} /> Universities
          </li>

          <li className="active">
            <Users size={18} /> Students
          </li>

          {userRole === "Admin" && !isSuperAdmin && (
            <li onClick={() => handleSidebarNavigation("agents")}>
              <UserPlus size={18} /> Agents
            </li>
          )}

          {isSuperAdmin && (
            <li onClick={() => handleSidebarNavigation("admins")}>
              <Shield size={18} /> Admins
            </li>
          )}

          {userRole === "Agent" && (
            <li onClick={() => handleSidebarNavigation("counselors")}>
              <UserPlus size={18} /> Counselors
            </li>
          )}

          <li onClick={() => handleSidebarNavigation("applications")}>
            <FileText size={18} /> Applications
          </li>

          {userRole !== "Counselor" && (
            <li onClick={() => handleSidebarNavigation("commissions")}>
              <DollarSign size={18} /> Commissions
            </li>
          )}

          <li onClick={() => handleSidebarNavigation("accommodation")}>
            <Building2 size={18} /> Accommodation
          </li>

          <li onClick={() => handleSidebarNavigation("loan")}>
            <CreditCard size={18} /> Loan Services
          </li>

          <li onClick={() => handleSidebarNavigation("testprep")}>
            <BookOpen size={18} /> Test Prep
          </li>

          <li onClick={() => handleSidebarNavigation("teamchat")}>
            <MessageSquare size={18} /> Team Chat
          </li>

          {userRole === "Admin" && (
            <li onClick={() => handleSidebarNavigation("permissions")}>
              <Shield size={18} /> Permissions
            </li>
          )}
        </ul>

        <div className="sidebar-footer">
          <div className="avatar">{avatarLetter}</div>
          <div>
            <strong>{userName}</strong>
            <p>{companyName}</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content" style={{ paddingTop: "20px" }}>
        <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
        {/* STUDENTS CONTENT */}
        <div className="students-content">
          <div className="students-header-section">
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: 600, color: "#1e293b", margin: "0 0 4px 0" }}>Students</h1>
              <p className="subtitle">Manage your student records</p>
            </div>
            <button className="btn-primary" onClick={() => navigate("/edupartner/add-student")}>
              <UserPlus size={20} />
              Add Student
            </button>
          </div>

          <div className="students-filters">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search by name, email, or student ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="draft">In Progress</option>
              <option value="completed">Completed</option>
              <option value="submitted">Submitted</option>
            </select>
          </div>

          <div className="students-stats">
            <div className="stat-card">
              <div className="stat-value">{students.length}</div>
              <div className="stat-label">Total Students</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{students.filter(s => s.status === 'completed').length}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{students.filter(s => s.status === 'draft').length}</div>
              <div className="stat-label">In Progress</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{students.filter(s => s.status === 'submitted').length}</div>
              <div className="stat-label">Submitted</div>
            </div>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="no-students">
              <p>No students found</p>
              {searchTerm || statusFilter !== "all" ? (
                <button className="btn-secondary" onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}>
                  Clear Filters
                </button>
              ) : (
                <button className="btn-primary" onClick={() => navigate("/edupartner/add-student")}>
                  <UserPlus size={20} />
                  Add Your First Student
                </button>
              )}
            </div>
          ) : (
            <div className="students-table">
              <table>
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Details</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.student_id}>
                      <td>
                        <span className="student-code">{student.student_code}</span>
                      </td>
                      <td>
                        <div className="student-name-cell">
                          <div 
                            className="student-name student-name-link" 
                            onClick={() => handleViewStudent(student.student_id)}
                          >
                            {student.name}
                          </div>
                          <div className="student-mobile">{student.mobile}</div>
                        </div>
                      </td>
                      <td>{student.email}</td>
                      <td>{student.country}</td>
                      <td>
                        <div className="progress-cell">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="progress-text">
                            Step {student.current_step}/4 - {student.current_step_label}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusColor(student.status)}`}>
                          {student.status_label}
                        </span>
                      </td>
                      <td>
                        <div className="created-cell">
                          <div>{student.created_at}</div>
                          <div className="created-by">by {student.created_by_name}</div>
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn-icon btn-details"
                          onClick={() => handleViewDetails(student.student_id)}
                          title="View Full Details"
                        >
                          <FileTextIcon size={18} />
                        </button>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-icon"
                            onClick={() => handleViewStudent(student.student_id)}
                            title="View Dashboard"
                          >
                            <Eye size={18} />
                          </button>
                          {student.status === 'draft' && (
                            <button
                              className="btn-icon"
                              onClick={() => handleEditStudent(student.student_id, student.current_step)}
                              title="Continue Editing"
                            >
                              <Edit size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
          <div className="modal-content details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Student Details</h2>
              <button className="modal-close" onClick={() => setShowDetailsModal(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              {loadingDetails ? (
                <div className="loading-details">Loading details...</div>
              ) : selectedStudentDetails ? (
                <div className="details-content">
                  {/* Profile Information */}
                  {selectedStudentDetails.profile && (
                    <div className="details-section">
                      <h3>Profile Information</h3>
                      <div className="details-grid">
                        <div className="detail-item">
                          <span className="detail-label">Student ID:</span>
                          <span className="detail-value">{selectedStudentDetails.profile.student_code || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Name:</span>
                          <span className="detail-value">{selectedStudentDetails.profile.name || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Email:</span>
                          <span className="detail-value">{selectedStudentDetails.profile.email || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Mobile:</span>
                          <span className="detail-value">{selectedStudentDetails.profile.mobile || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Country:</span>
                          <span className="detail-value">{selectedStudentDetails.profile.country || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Status:</span>
                          <span className="detail-value">{selectedStudentDetails.profile.status || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Personal Information */}
                  {selectedStudentDetails.personal_info && (
                    <div className="details-section">
                      <h3>Personal Information</h3>
                      <div className="details-grid">
                        <div className="detail-item">
                          <span className="detail-label">Date of Birth:</span>
                          <span className="detail-value">{selectedStudentDetails.personal_info.date_of_birth || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Gender:</span>
                          <span className="detail-value">{selectedStudentDetails.personal_info.gender || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Marital Status:</span>
                          <span className="detail-value">{selectedStudentDetails.personal_info.marital_status || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Nationality:</span>
                          <span className="detail-value">{selectedStudentDetails.personal_info.nationality || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Passport Number:</span>
                          <span className="detail-value">{selectedStudentDetails.personal_info.passport_number || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Passport Expiry:</span>
                          <span className="detail-value">{selectedStudentDetails.personal_info.passport_expiry || 'N/A'}</span>
                        </div>
                        <div className="detail-item full-width">
                          <span className="detail-label">Address:</span>
                          <span className="detail-value">{selectedStudentDetails.personal_info.address || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">City:</span>
                          <span className="detail-value">{selectedStudentDetails.personal_info.city || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">State:</span>
                          <span className="detail-value">{selectedStudentDetails.personal_info.state || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Postal Code:</span>
                          <span className="detail-value">{selectedStudentDetails.personal_info.postal_code || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Emergency Contact:</span>
                          <span className="detail-value">{selectedStudentDetails.personal_info.emergency_contact_name || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Emergency Phone:</span>
                          <span className="detail-value">{selectedStudentDetails.personal_info.emergency_contact_phone || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Education Information */}
                  {selectedStudentDetails.education && Object.keys(selectedStudentDetails.education).length > 0 && (
                    <div className="details-section">
                      <h3>Education Information</h3>
                      
                      {selectedStudentDetails.education['10th'] && (
                        <div className="education-block">
                          <h4>10th Grade</h4>
                          <div className="details-grid">
                            <div className="detail-item">
                              <span className="detail-label">School:</span>
                              <span className="detail-value">{selectedStudentDetails.education['10th'].school_name || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Board:</span>
                              <span className="detail-value">{selectedStudentDetails.education['10th'].board || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Year:</span>
                              <span className="detail-value">{selectedStudentDetails.education['10th'].passing_year || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Percentage:</span>
                              <span className="detail-value">{selectedStudentDetails.education['10th'].percentage || 'N/A'}%</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedStudentDetails.education['12th'] && (
                        <div className="education-block">
                          <h4>12th Grade</h4>
                          <div className="details-grid">
                            <div className="detail-item">
                              <span className="detail-label">School:</span>
                              <span className="detail-value">{selectedStudentDetails.education['12th'].school_name || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Board:</span>
                              <span className="detail-value">{selectedStudentDetails.education['12th'].board || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Stream:</span>
                              <span className="detail-value">{selectedStudentDetails.education['12th'].stream || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Year:</span>
                              <span className="detail-value">{selectedStudentDetails.education['12th'].passing_year || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Percentage:</span>
                              <span className="detail-value">{selectedStudentDetails.education['12th'].percentage || 'N/A'}%</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedStudentDetails.education['bachelor'] && (
                        <div className="education-block">
                          <h4>Bachelor's Degree</h4>
                          <div className="details-grid">
                            <div className="detail-item">
                              <span className="detail-label">University:</span>
                              <span className="detail-value">{selectedStudentDetails.education['bachelor'].university_name || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Degree:</span>
                              <span className="detail-value">{selectedStudentDetails.education['bachelor'].degree_name || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Specialization:</span>
                              <span className="detail-value">{selectedStudentDetails.education['bachelor'].specialization || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Year:</span>
                              <span className="detail-value">{selectedStudentDetails.education['bachelor'].passing_year || 'N/A'}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">CGPA/Percentage:</span>
                              <span className="detail-value">
                                {selectedStudentDetails.education['bachelor'].cgpa || selectedStudentDetails.education['bachelor'].percentage || 'N/A'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Test Scores */}
                  {selectedStudentDetails.test_scores && (
                    <div className="details-section">
                      <h3>Test Scores</h3>
                      <div className="details-grid">
                        {selectedStudentDetails.test_scores.ielts_score && (
                          <>
                            <div className="detail-item">
                              <span className="detail-label">IELTS Overall:</span>
                              <span className="detail-value">{selectedStudentDetails.test_scores.ielts_score}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">IELTS Breakdown:</span>
                              <span className="detail-value">
                                L:{selectedStudentDetails.test_scores.ielts_listening} 
                                R:{selectedStudentDetails.test_scores.ielts_reading} 
                                W:{selectedStudentDetails.test_scores.ielts_writing} 
                                S:{selectedStudentDetails.test_scores.ielts_speaking}
                              </span>
                            </div>
                          </>
                        )}
                        {selectedStudentDetails.test_scores.toefl_score && (
                          <div className="detail-item">
                            <span className="detail-label">TOEFL:</span>
                            <span className="detail-value">{selectedStudentDetails.test_scores.toefl_score}</span>
                          </div>
                        )}
                        {selectedStudentDetails.test_scores.pte_score && (
                          <div className="detail-item">
                            <span className="detail-label">PTE:</span>
                            <span className="detail-value">{selectedStudentDetails.test_scores.pte_score}</span>
                          </div>
                        )}
                        {selectedStudentDetails.test_scores.gre_score && (
                          <>
                            <div className="detail-item">
                              <span className="detail-label">GRE Overall:</span>
                              <span className="detail-value">{selectedStudentDetails.test_scores.gre_score}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">GRE Breakdown:</span>
                              <span className="detail-value">
                                V:{selectedStudentDetails.test_scores.gre_verbal} 
                                Q:{selectedStudentDetails.test_scores.gre_quantitative} 
                                AWA:{selectedStudentDetails.test_scores.gre_analytical}
                              </span>
                            </div>
                          </>
                        )}
                        {selectedStudentDetails.test_scores.gmat_score && (
                          <div className="detail-item">
                            <span className="detail-label">GMAT:</span>
                            <span className="detail-value">{selectedStudentDetails.test_scores.gmat_score}</span>
                          </div>
                        )}
                        {selectedStudentDetails.test_scores.sat_score && (
                          <div className="detail-item">
                            <span className="detail-label">SAT:</span>
                            <span className="detail-value">{selectedStudentDetails.test_scores.sat_score}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Additional Information */}
                  {selectedStudentDetails.additional_info && (
                    <div className="details-section">
                      <h3>Additional Information</h3>
                      <div className="details-grid">
                        <div className="detail-item">
                          <span className="detail-label">Work Experience:</span>
                          <span className="detail-value">{selectedStudentDetails.additional_info.work_experience || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Study Gap:</span>
                          <span className="detail-value">{selectedStudentDetails.additional_info.study_gap || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Preferred Country:</span>
                          <span className="detail-value">{selectedStudentDetails.additional_info.preferred_country || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Preferred Course:</span>
                          <span className="detail-value">{selectedStudentDetails.additional_info.preferred_course || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Budget:</span>
                          <span className="detail-value">{selectedStudentDetails.additional_info.budget || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Intake:</span>
                          <span className="detail-value">
                            {selectedStudentDetails.additional_info.intake_year || 'N/A'} {selectedStudentDetails.additional_info.intake_month || ''}
                          </span>
                        </div>
                        {selectedStudentDetails.additional_info.additional_notes && (
                          <div className="detail-item full-width">
                            <span className="detail-label">Notes:</span>
                            <span className="detail-value">{selectedStudentDetails.additional_info.additional_notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="no-details">No details available</div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowDetailsModal(false)}>
                Close
              </button>
              <button className="btn-primary" onClick={handleDownloadDetails}>
                <Download size={18} />
                Download Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
