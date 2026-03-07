import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UserPlus, Eye, Edit } from "lucide-react";
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

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [searchTerm, statusFilter, students]);

  const fetchStudents = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      
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

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(student => student.status === statusFilter);
    }

    setFilteredStudents(filtered);
  };

  const handleViewStudent = (studentId: number) => {
    // Navigate to student dashboard (coming soon)
    navigate(`/edupartner/student/${studentId}`);
  };

  const handleEditStudent = (studentId: number, currentStep: number) => {
    // Navigate to add student form with student ID to resume
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

  if (loading) {
    return (
      <div className="students-container">
        <div className="loading">Loading students...</div>
      </div>
    );
  }

  return (
    <div className="students-container">
      <div className="students-header">
        <div>
          <h1>Students</h1>
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
                      <div className="student-name">{student.name}</div>
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
  );
};

export default Students;
