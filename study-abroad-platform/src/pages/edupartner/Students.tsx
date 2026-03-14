import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, UserPlus, Eye, Edit,
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
    </div>
  );
};

export default Students;
