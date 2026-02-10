import { useState } from "react";
import { useEffect } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost/studyabroadplatform-api'
  : '/studyabroadplatform-api';


const cardStyle = {
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  padding: 20,
  background: "#fff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const inputStyle = {
  width: "90%",
  padding: "10px 12px",
  marginTop: 6,
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 14,
  outline: "none",
    background: "#ffffff",
    color: "#0f172a",
};


const labelStyle = {
  fontSize: 14,
  color: "#64748b",
  marginBottom: 6,
};

const iconBox = {
  width: 40,
  height: 40,
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 18,
};

const selectStyle = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  background: "#fff",
  color: "#0f172a",
  cursor: "pointer",
};


const Profileedit = () => {
  // ✅ ADDED: section state
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAccommodationModal, setShowAccommodationModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showTestPrepModal, setShowTestPrepModal] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [testPrepRequests, setTestPrepRequests] = useState<any[]>([]);
  const [loanRequests, setLoanRequests] = useState<any[]>([]);
  const [accommodationRequests, setAccommodationRequests] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((s) =>
  `${s.name} ${s.email}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);


const [showEditStudent, setShowEditStudent] = useState(false);
const [editStudent, setEditStudent] = useState<any>(null);


const handleUpdateStudent = async () => {
  const res = await fetch(`${API_BASE}/edupartner/update_student.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editStudent),
  });

  const data = await res.json();

  if (data.success) {
    setShowEditStudent(false);
    fetchStudents(); // reload table
  } else {
    alert(data.error);
  }
};


const handleEditClick = async (studentId: number) => {
  const res = await fetch(
    `${API_BASE}/edupartner/get_student_by_id.php`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id: studentId }),
    }
  );

  const data = await res.json();

  if (data.success) {
    setEditStudent(data.student);
    setShowEditStudent(true);
  } else {
    alert(data.error);
  }
};



const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
const [deleteStudentId, setDeleteStudentId] = useState<number | null>(null);


const handleDeleteStudent = async (studentId: number) => {
  const res = await fetch(
    `${API_BASE}/edupartner/delete_student.php`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id: studentId }),
    }
  );

  const data = await res.json();

  if (data.success) {
    fetchStudents();
  } else {
    alert(data.error);
  }
};




const [showEditAccommodationModal, setShowEditAccommodationModal] = useState(false);
const [editAccommodation, setEditAccommodation] = useState<any>(null);


const handleUpdateAccommodation = async () => {
  const res = await fetch(
    `${API_BASE}/edupartner/update_accommodation.php`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editAccommodation),
    }
  );

  const data = await res.json();

  if (data.success) {
    setShowEditAccommodationModal(false);
    fetchAccommodationRequests(); // reload list
  } else {
    alert(data.error);
  }
};






  const user = JSON.parse(localStorage.getItem("user") || "{}");

    const userName = user.user_name || "";
    const userRole = user.role;
    const userId = user.id;
    const companyName = user.company_name || "";
    const avatarLetter = userName ? userName.charAt(0).toUpperCase() : "U";

    const [users, setUsers] = useState<any[]>([]);


  const [formData, setFormData] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    nationality: "",
    passport_num: "",
    education: "",
    });

    const [form, setForm] = useState({
  student_name: "",
  location: "",
  move_in_date: "",
  duration: "",
  monthly_budget: "",
  preferences: "",
});


const initialFormState = {
  student_name: "",
  location: "",
  move_in_date: "",
  duration: "",
  monthly_budget: "",
  preferences: ""
};



const loanInitialState = {
  student_name: "",
  loan_amount: "",
  study_country: "",
  purpose: "",
  additional_notes: ""
};

const [loanForm, setLoanForm] = useState(loanInitialState);

const resetLoanForm = () => {
  setLoanForm(loanInitialState);
};

const resetForm = () => {
  setForm(initialFormState);
};


  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
    };


    const initialTestPrepForm = {
  student_name: "",
  test_type: "",
  target_score: "",
  expected_test_date: "",
  current_level: "",
  additional_notes: "",
};

const [testPrepForm, setTestPrepForm] = useState(initialTestPrepForm);


const handleAddStudent = async () => {
  try {
    const res = await fetch(
      `${API_BASE}/edupartner/add_student.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,   // ✅ comes from localStorage
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          dob: formData.dob,
          nationality: formData.nationality,
          passport_num: formData.passport_num,
          education: formData.education,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setShowAddStudent(false);
      fetchStudents();
    } else {
      alert(data.message || "Failed to add student");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};



const fetchAccommodationRequests = async () => {
  try {
    const res = await fetch(
      `${API_BASE}/edupartner/get_accommodation.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          role: user.role,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setAccommodationRequests(data.accommodations);
    }
  } catch (err) {
    console.error("Failed to fetch accommodation requests");
  }
};


useEffect(() => {
  fetchAccommodationRequests();
}, []);


const fetchStudents = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const res = await fetch(`${API_BASE}/edupartner/get_students.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.id,
      role: user.role,
    }),
  });

  const data = await res.json();

  if (data.success) {
    setStudents(data.students);
  }
};

useEffect(() => {
  fetchStudents();
}, []);



const submitAccommodation = async (e?: React.MouseEvent) => {
  if (e) e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const res = await fetch(
    `${API_BASE}/edupartner/add_accommodation.php`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        user_id: user.id,
      }),
    }
  );

  const data = await res.json();

  if (data.success) {
    // alert("Accommodation request submitted");
    fetchAccommodationRequests();
    setShowAccommodationModal(false);
    // setAccommodationForm(initialAccommodationForm);
  }
};



const submitLoanRequest = async () => {
  if (!loanForm.student_name || !loanForm.loan_amount) {
    alert("Student and Loan Amount are required");
    return;
  }

  const res = await fetch(
    `${API_BASE}/edupartner/add_loan.php`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...loanForm,
        user_id: user.id
      }),
    }
  );

  const data = await res.json();

  if (data.success) {
    resetLoanForm();
    fetchLoanRequests(); 
    setShowLoanModal(false);
    // setLoanForm(initialLoanForm);
  }
};



// const submitTestPrepRequest = async () => {
//   if (!testPrepForm.student_name || !testPrepForm.test_type) {
//     alert("Please fill required fields");
//     return;
//   }

//   const res = await fetch(
//     `${API_BASE}/edupartner/add_test_prep.php`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...testPrepForm,
//         user_id: user.id,
//       }),
//     }
//   );

//   const data = await res.json();

//   if (data.success) {
//     setShowTestPrepModal(false);
//     setTestPrepForm(initialTestPrepForm);
//   }
// };


const submitTestPrepRequest = async () => {
  if (!testPrepForm.student_name || !testPrepForm.test_type) {
    alert("Please fill required fields");
    return;
  }

  const res = await fetch(
    `${API_BASE}/edupartner/add_test_prep.php`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...testPrepForm,
        user_id: user.id,
      }),
    }
  );

  const data = await res.json();

  if (data.success) {
    // ✅ REFRESH LIST
    fetchTestPrepRequests();

    // ✅ RESET FORM
    setTestPrepForm(initialTestPrepForm);

    // ✅ CLOSE MODAL
    setShowTestPrepModal(false);
  }
};




  const handleToggleStatus = async (user: any, index: number) => {
  const newStatus = user.status === "Active" ? "Inactive" : "Active";

  // Update UI immediately
  const updatedUsers = [...users];
  updatedUsers[index] = { ...user, status: newStatus };
  setUsers(updatedUsers);

  

    


  try {
    const res = await fetch(
      `${API_BASE}/edupartner/update-user-status.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,        // ✅ IMPORTANT
          status: newStatus,
        }),
      }
    );

    const data = await res.json();

        if (!data.success) {
        alert("Failed to update user status");
        }
    } catch (error) {
        alert("Server error");
    }
    };


    const fetchLoanRequests = async () => {
  try {
    const res = await fetch(
      `${API_BASE}/edupartner/get_loans.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          role: user.role,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setLoanRequests(data.loans);
    }
  } catch (err) {
    console.error("Failed to fetch loan requests");
  }
};


useEffect(() => {
  fetchLoanRequests();
}, []);


    const fetchTestPrepRequests = async () => {
  const res = await fetch(
    `${API_BASE}/edupartner/get_test_prep.php`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        role: user.role,
      }),
    }
  );

  const data = await res.json();

  if (data.success) {
    setTestPrepRequests(data.requests);
  }
};

useEffect(() => {
  fetchTestPrepRequests();
}, []);




  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
        navigate("/login");
    }
    }, [navigate]);

    

    useEffect(() => {
    fetch(`${API_BASE}/edupartner/get-users.php`)
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.error(err));
    }, []);



    

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          🎓 <span>EduPartner</span>
        </div>

        <ul className="menu">
          <li
            className={activeSection === "dashboard" ? "active" : ""}
            onClick={() => navigate("/edupartner/dashboard")}
          >
            🏠 Dashboard
          </li>

          <li
            className={activeSection === "universities" ? "active" : ""}
            onClick={() => setActiveSection("universities")}
          >
            🎓 Universities
          </li>

          <li
            className={activeSection === "students" ? "active" : ""}
            onClick={() => setActiveSection("students")}
            >
            👨‍🎓 Students
          </li>
          <li
            className={activeSection === "applications" ? "active" : ""}
            onClick={() => setActiveSection("applications")}
            >
            📄 Applications
            </li>

          <li
            className={activeSection === "commissions" ? "active" : ""}
            onClick={() => setActiveSection("commissions")}
            >
            💰 Commissions
            </li>

           <li
                className={activeSection === "accommodation" ? "active" : ""}
                onClick={() => setActiveSection("accommodation")}
            >
                🏠 Accommodation
            </li>

            <li
                className={activeSection === "loan" ? "active" : ""}
                onClick={() => setActiveSection("loan")}
            >
                💳 Loan Services
            </li>

            <li
                className={activeSection === "testprep" ? "active" : ""}
                onClick={() => setActiveSection("testprep")}
            >
                📝 Test Prep
            </li>
          <li 
          className={activeSection === "teamchat" ? "active" : ""}
          onClick={() => setActiveSection("teamchat")}
          >
            💬 Team Chat
            </li>
            {userRole === "Admin" && (
            <>
                <li
                className={activeSection === "permissions" ? "active" : ""}
                onClick={() => setActiveSection("permissions")}
                >
                👨‍🎓 Permissions
            </li>
           </>
            )}
        </ul>

        <div className="sidebar-footer">
        <div className="avatar">{avatarLetter}</div>
        <div>
            <strong>{userName}</strong>
            <p>{companyName}</p>
            {/* <p>{userId}</p> */}
         
        </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main-content">

        {/* HEADER STRIP */}
        <div className="header-strip">
          <h2 className="header-title">
            {{
                dashboard: "Dashboard",
                universities: "Universities",
                students: "Students",
                applications: "Applications",
                commissions: "Commissions",
                accommodation: "Accommodation",
                loan: "Loan Services",
                testprep: "Test Prep",
                teamchat: "Team Chat",
                permissions: "Permissions",
            }[activeSection] || ""}
          </h2>

          <div className="header-right">
            {/* <div className="notify">
              🔔
              <span className="notify-badge">3</span>
            </div> */}

            <div
                className="header-user"
                style={{ position: "relative", cursor: "pointer" }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                >
                <div className="header-avatar">{avatarLetter}</div>
                <span>{userName}</span>

                

                {showUserMenu && (
                    <div
                    style={{
                        position: "absolute",
                        top: "48px",
                        right: 0,
                        width: 180,
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: 10,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                        zIndex: 100,
                        overflow: "hidden",
                    }}
                    >
                    <div
                        style={{
                        padding: "12px 16px",
                        fontSize: 14,
                        cursor: "pointer",
                        }}

                         onClick={() => {
                    navigate("/edupartner/profile-edit");
                    }}
                    >

                      {/* <Link to="/signup">Register here</Link> */}
                        👤 Profile Settings
                    </div>

                    <div
                    style={{
                        padding: "12px 16px",
                        fontSize: 14,
                        cursor: "pointer",
                        color: "#dc2626",
                        borderTop: "1px solid #e2e8f0",
                    }}
                    onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/edupartner/login");
                    }}
                    >
                    🚪 Logout
                    </div>
                    
                    </div>
                )}
                </div>


          </div>
        </div>

        {/* ================= DASHBOARD SECTION (UNCHANGED) ================= */}
        
        



        {/* ================= UNIVERSITIES SECTION (NEW ONLY) ================= */}
        {activeSection === "universities" && (
        <div style={{ padding: "24px" }}>

            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
                <h1 style={{ marginBottom: 4 }}>University Search</h1>
                <p style={{ color: "#64748b" }}>
                Find the perfect course for your students
                </p>
            </div>

            <button className="outline-btn">⚙️ Filters</button>
            </div>

            {/* SEARCH BOX */}
            <div
            style={{
                marginTop: 24,
                padding: 20,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#fff",
            }}
            >
            <input
                type="text"
                placeholder="Search universities or courses..."
                style={{
                    width: "98%",
                    padding: "12px 14px",
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    outline: "none",
                    fontSize: 14,
                    background: "#ffffff",
                    color: "#0f172a",
                }}
                />
        </div>

            {/* COUNT */}
            <div style={{ marginTop: 16, color: "#64748b", fontSize: 14 }}>
            Showing 0 courses
            </div>

            {/* EMPTY STATE */}
            <div
            style={{
                marginTop: 20,
                padding: 60,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                textAlign: "center",
                background: "#fff",
            }}
            >
            <div style={{ fontSize: 40, marginBottom: 10 }}>🎓</div>
            <h3 style={{ marginBottom: 6 }}>No courses found</h3>
            <p style={{ color: "#64748b" }}>
                Try adjusting your search or filters
            </p>
            </div>

        </div>
        )}




        {/* ================= STUDENTS SECTION (MODIFIED ONLY) ================= */}
        {activeSection === "students" && (
        <div style={{ padding: "24px" }}>

            {/* HEADER */}
            <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
            }}
            >
            <div>
                <h1 style={{ marginBottom: 4 }}>Students</h1>
                <p style={{ color: "#64748b" }}>
                Manage your student records
                </p>
            </div>

            {/* <button className="primary-btn">+ Add Student</button> */}
            {/* <button className="add-student-btn">
            <span style={{ fontSize: 18, lineHeight: 0 }}>+</span>
            <span>Add Student</span>
            </button> */}
            <button
            className="add-student-btn"
            onClick={() => setShowAddStudent(true)}
            >
            <span style={{ fontSize: 18, lineHeight: 0 }}>+</span>
            <span>Add Student</span>
            </button>
            </div>

            {/* SEARCH BAR */}
            <div
            style={{
                padding: 20,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#fff",
                marginBottom: 20,
            }}
            >
            {/* <input
                type="text"
                placeholder="Search students by name or email..."
                style={{
                width: "98%",
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #2563eb",
                outline: "none",
                fontSize: 14,
                background: "#ffffff",
                }}
            /> */}

            <input
  type="text"
  placeholder="Search students by name or email..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{
    width: "98%",
    padding: "12px 14px",
    borderRadius: 8,
    border: "1px solid #2563eb",
    outline: "none",
    fontSize: 14,
    background: "#ffffff",
    color: "#0f172a",
  }}
/>



            </div>

            {/* EMPTY STATE */}
            {/* <div
            style={{
                padding: 80,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#fff",
                textAlign: "center",
            }}
            >
            <div style={{ fontSize: 42, marginBottom: 12, color: "#94a3b8" }}>
                👤
            </div>

            <h3 style={{ marginBottom: 6 }}>No students found</h3>

            <p style={{ color: "#64748b", marginBottom: 20 }}>
                Add your first student to get started
            </p>

            

            <button
            className="add-student-btn"
            onClick={() => setShowAddStudent(true)}
            >
            <span style={{ fontSize: 18, lineHeight: 0 }}>+</span>
            <span>Add Student</span>
            </button>


            </div> */}


            {filteredStudents.length === 0 ? (
  /* EMPTY STATE */
  <div
    style={{
      padding: 80,
      border: "1px solid #e2e8f0",
      borderRadius: 12,
      background: "#fff",
      textAlign: "center",
    }}
  >
    <div style={{ fontSize: 42, marginBottom: 12, color: "#94a3b8" }}>👤</div>
    <h3>No students found</h3>
    <p style={{ color: "#64748b" }}>
      Add your first student to get started
    </p>
    <button
      className="add-student-btn"
      onClick={() => setShowAddStudent(true)}
    >
      + Add Student
    </button>
  </div>
) : (
  /* STUDENT TABLE */
  <div
  style={{
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    background: "#fff",
    overflow: "hidden",
  }}
>
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr
        style={{
          background: "#f8fafc",
          textAlign: "left",
          fontSize: 13,
          color: "#64748b",
        }}
      >
        <th style={{ padding: "14px 20px" }}>Name</th>
        <th style={{ padding: "14px 20px" }}>Email</th>
        <th style={{ padding: "14px 20px" }}>Phone</th>
        <th style={{ padding: "14px 20px" }}>Nationality</th>
        <th style={{ padding: "14px 20px" }}>Added</th>
        <th style={{ padding: "14px 20px", textAlign: "right" }}>
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      {filteredStudents.map((s, i) => (
        <tr
          key={i}
          style={{
            borderTop: "1px solid #e2e8f0",
            fontSize: 14,
            color: "#0f172a",
          }}
        >
          {/* Name + Avatar */}
          <td style={{ padding: "16px 20px" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#e0e7ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#4f46e5",
                  fontSize: 16,
                }}
              >
                👤
              </div>

              <div>
                <div style={{ fontWeight: 600 }}>{s.name}</div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#64748b",
                    marginTop: 2,
                  }}
                >
                  {s.education}
                </div>
              </div>
            </div>
          </td>

          {/* Email */}
          <td style={{ padding: "16px 20px", color: "#334155" }}>
            📧 {s.email}
          </td>

          {/* Phone */}
          <td style={{ padding: "16px 20px", color: "#334155" }}>
            📞 {s.phone}
          </td>

          {/* Nationality */}
          <td style={{ padding: "16px 20px", color: "#334155" }}>
            🌍 {s.nationality}
          </td>

          {/* Added */}
          <td style={{ padding: "16px 20px", color: "#334155" }}>
            📅 {s.added}
          </td>

          {/* Actions */}
          <td
            style={{
              padding: "16px 20px",
              textAlign: "right",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
           <button
           style={{
              padding: "10px 10px",
              textAlign: "right",
              cursor: "pointer",
              fontSize: 16,
              border: "none",
              background: "transparent"
            }}
            onClick={() => handleEditClick(s.id)}
           >✏️</button>

           <button
           style={{
              padding: "10px 10px",
              textAlign: "right",
              cursor: "pointer",
              fontSize: 16,
              border: "none",
              background: "transparent"
            }}
            onClick={() => {
    setDeleteStudentId(s.id);
    setShowDeleteConfirm(true);
  }}
           >🗑️</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

)}




            {/* Div for Add Student Modal */}


            {showAddStudent && (
                <div
                    style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                    }}
                >
                    <div
                    style={{
                        background: "#fff",
                        width: "760px",
                        borderRadius: 12,
                        padding: 24,
                    }}
                    >
                    {/* Header */}
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 24,
                        }}
                    >
                        <h2 style={{ margin: 0 }}>Add New Student</h2>
                        <button
                        onClick={() => setShowAddStudent(false)}
                        style={{
                            background: "transparent",
                            border: "none",
                            fontSize: 20,
                            cursor: "pointer",
                            color: "#64748b",
                        }}
                        >
                        ✕
                        </button>
                    </div>

                    {/* Form */}
                    <div
                        style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 20,
                        }}
                    >
                        {/* First Name */}
                        <div>
                        <label style={{ fontSize: 14, fontWeight: 500 }}>
                            First Name *
                        </label>
                        {/* <input
                            style={inputStyle}
                            value={userId}
                            name="user_id"
                            placeholder=""
                            hidden
                            onChange={handleChange}
                        /> */}
                        <input
                            style={inputStyle}
                            placeholder=""
                            name="first_name"
                            onChange={handleChange}
                        />
                        </div>

                        {/* Last Name */}
                        <div>
                        <label style={{ fontSize: 14, fontWeight: 500 }}>
                            Last Name *
                        </label>
                        <input style={inputStyle} name="last_name" onChange={handleChange}/>
                        </div>

                        {/* Email */}
                        <div>
                        <label style={{ fontSize: 14, fontWeight: 500 }}>
                            Email *
                        </label>
                        <input style={inputStyle} name="email" onChange={handleChange}/>
                        </div>

                        {/* Phone */}
                        <div>
                        <label style={{ fontSize: 14, fontWeight: 500 }}>
                            Phone
                        </label>
                        <input style={inputStyle} name="phone" onChange={handleChange}/>
                        </div>

                        {/* Date of Birth */}
                        <div>
                        <label style={{ fontSize: 14, fontWeight: 500 }}>
                            Date of Birth
                        </label>
                        <input type="date" style={inputStyle} name="dob" onChange={handleChange}/>
                        </div>

                        {/* Nationality */}
                        <div>
                        <label style={{ fontSize: 14, fontWeight: 500 }}>
                            Nationality
                        </label>
                        <input style={inputStyle} name="nationality" onChange={handleChange}/>
                        </div>

                        {/* Passport Number */}
                        <div>
                        <label style={{ fontSize: 14, fontWeight: 500 }}>
                            Passport Number
                        </label>
                        <input style={inputStyle} name="passport_num" onChange={handleChange}/>
                        </div>

                        {/* Current Education */}
                        <div>
                        <label style={{ fontSize: 14, fontWeight: 500 }}>
                            Current Education
                        </label>
                        <input
                            style={inputStyle}
                            name="education"
                            placeholder="eg., Bachelor's in Computer Science"
                            onChange={handleChange}
                        />
                        </div>
                    </div>

                    {/* Actions */}
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 12,
                        marginTop: 28,
                        }}
                    >
                        <button
                        onClick={() => setShowAddStudent(false)}
                        style={{
                            padding: "10px 18px",
                            borderRadius: 8,
                            border: "1px solid #e2e8f0",
                            background: "#fff",
                            cursor: "pointer",
                            fontWeight: 500,
                            color: "#374151",
                        }}
                        >
                        Cancel
                        </button>

                        {/* <button
                        style={{
                            padding: "10px 20px",
                            borderRadius: 8,
                            border: "none",
                            background: "#1d4ed8",
                            color: "#fff",
                            cursor: "pointer",
                            fontWeight: 600,
                        }}
                        >
                        Add Student
                        </button> */}

                        <button
                        onClick={handleAddStudent}
                        style={{
                            padding: "10px 20px",
                            borderRadius: 8,
                            border: "none",
                            background: "#1d4ed8",
                            color: "#fff",
                            cursor: "pointer",
                            fontWeight: 600,
                        }}
                        >
                        Add Student
                        </button>


                    </div>
                    </div>
                </div>
                )}


                {/* Edit section */}


                {showEditStudent && editStudent && (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    width: "760px",
                    borderRadius: 12,
                    padding: 24,
                  }}
                >

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
  <h2>Edit Student</h2>
  <button
    onClick={() => setShowEditStudent(false)}
    style={{ background: "transparent", border: "none", fontSize: 20, color: "#64748b", cursor: "pointer" }}
  >
    ✕
  </button>
</div>



<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
<div>
<label style={{ fontSize: 14, fontWeight: 500 }}>
                            First Name *
                        </label>
<input
  style={inputStyle}
  value={editStudent.first_name}
  onChange={(e) =>
    setEditStudent({ ...editStudent, first_name: e.target.value })
  }
/>
</div>

<div>
 <label style={{ fontSize: 14, fontWeight: 500 }}>
                            Last Name *
                        </label> 
<input
  style={inputStyle}
  value={editStudent.last_name}
  onChange={(e) =>
    setEditStudent({ ...editStudent, last_name: e.target.value })
  }
/>
</div>

<div>
  <label style={{ fontSize: 14, fontWeight: 500 }}>
                            Email *
                        </label>
<input
  style={inputStyle}
  value={editStudent.email}
  onChange={(e) =>
    setEditStudent({ ...editStudent, email: e.target.value })
  }
/>
</div>

<div>
  <label style={{ fontSize: 14, fontWeight: 500 }}>
                            Phone
                        </label>
<input
  style={inputStyle}
  value={editStudent.phone}
  onChange={(e) =>
    setEditStudent({ ...editStudent, phone: e.target.value })
  }
/>
</div>

<div>
  <label style={{ fontSize: 14, fontWeight: 500 }}>
                            Date of Birth
                        </label>
<input
  type="date"
  style={inputStyle}
  value={editStudent.dob || ""}
  onChange={(e) =>
    setEditStudent({ ...editStudent, dob: e.target.value })
  }
/>
</div>

<div>
  <label style={{ fontSize: 14, fontWeight: 500 }}>
                            Nationality
                        </label>
<input
  style={inputStyle}
  value={editStudent.nationality}
  onChange={(e) =>
    setEditStudent({ ...editStudent, nationality: e.target.value })
  }
/>
</div>

<div>
  <label style={{ fontSize: 14, fontWeight: 500 }}>
                            Passport Number
                        </label>
<input
  style={inputStyle}
  value={editStudent.passport_num}
  onChange={(e) =>
    setEditStudent({ ...editStudent, passport_num: e.target.value })
  }
/>
</div>

<div>
  <label style={{ fontSize: 14, fontWeight: 500 }}>
                            Current Education
                        </label>
<input
  style={inputStyle}
  value={editStudent.education}
  onChange={(e) =>
    setEditStudent({ ...editStudent, education: e.target.value })
  }
/>
</div>

</div>



<div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
  <button onClick={() => setShowEditStudent(false)}
    style={{
                            padding: "10px 18px",
                            borderRadius: 8,
                            border: "1px solid #e2e8f0",
                            background: "#fff",
                            cursor: "pointer",
                            fontWeight: 500,
                            color: "#374151",
                        }}
    >Cancel</button>

  

  <button
    style={{
      background: "#1d4ed8",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: 8,
      border: "none"
    }}
    onClick={handleUpdateStudent}
  >
    Update Student
  </button>
</div>



                  </div>
                  
                  
                  </div>


                  )}



            {/* Delete Confirmation Modal */}

            {showDeleteConfirm && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        background: "#fff",
        width: 420,
        borderRadius: 12,
        padding: 24,
      }}
    >
      <h3 style={{ marginBottom: 12 }}>Delete Student</h3>
      <p style={{ color: "#475569" }}>
        Are you sure you want to delete this student?
        <br />
        <strong>This action cannot be undone.</strong>
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          marginTop: 24,
        }}
      >
        <button
          onClick={() => {
            setShowDeleteConfirm(false);
            setDeleteStudentId(null);
          }}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            background: "#fff",
            cursor: "pointer",
            color: "#374151",
          }}
        >
          No
        </button>

        <button
          onClick={() => {
            if (deleteStudentId) {
              handleDeleteStudent(deleteStudentId);
            }
            setShowDeleteConfirm(false);
            setDeleteStudentId(null);
          }}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            background: "#dc2626",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
)}



            

        </div>


    
        


        )}



        {/* ================= APPLICATIONS SECTION (ADDED ONLY) ================= */}
      
        {activeSection === "applications" && (
        <div style={{ padding: "24px" }}>

            {/* HEADER */}
            <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
            }}
            >
            <div>
                <h1 style={{ marginBottom: 4 }}>Applications</h1>
                <p style={{ color: "#64748b" }}>
                Track and manage student applications
                </p>
            </div>

            {/* <button className="primary-btn">+ New Application</button> */}
            <button className="add-student-btn">
            <span style={{ fontSize: 18, lineHeight: 0 }}>+</span>
            <span>New Application</span>
            </button>
            </div>

            {/* SEARCH + FILTER */}
            <div
            style={{
                display: "flex",
                gap: 12,
                padding: 20,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#fff",
                marginBottom: 20,
            }}
            >
            <input
                type="text"
                placeholder="Search by student or university..."
                style={{
                flex: 1,
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                outline: "none",
                fontSize: 14,
                background: "#fff",
                }}
            />

            <select
                style={{
                padding: "12px 14px",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 14,
                background: "#eaeaea",
                color: "#000000",
                cursor: "pointer",
                }}
            >
                <option>All Statuses</option>
                <option>Submitted</option>
                <option>Under Review</option>
                <option>Accepted</option>
                <option>Rejected</option>
                <option>Enrolled</option>
            </select>
            </div>

            {/* EMPTY STATE */}
            <div
            style={{
                padding: 80,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#fff",
                textAlign: "center",
            }}
            >
            <div style={{ fontSize: 48, marginBottom: 16, color: "#94a3b8" }}>
                📄
            </div>

            <h3 style={{ marginBottom: 8 }}>No applications found</h3>

            <p style={{ color: "#64748b", marginBottom: 24 }}>
                Submit your first application to get started
            </p>

            {/* <button className="primary-btn">+ New Application</button> */}
            <button className="add-student-btn">
            <span style={{ fontSize: 18, lineHeight: 0 }}>+</span>
            <span>New Application</span>
            </button>
            </div>

        </div>
        )}



        {/* ================= COMMISSIONS SECTION (ADDED ONLY) ================= */}
        {activeSection === "commissions" && (
        <div style={{ padding: "24px" }}>

            {/* HEADER */}
            <div style={{ marginBottom: 24 }}>
            <h1 style={{ marginBottom: 4 }}>Commissions</h1>
            <p style={{ color: "#64748b" }}>
                Track your earnings and payments
            </p>
            </div>

            {/* SUMMARY CARDS */}
            <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                marginBottom: 24,
            }}
            >
            {/* Total Earnings */}
            <div style={cardStyle}>
                <div>
                <p style={labelStyle}>Total Earnings</p>
                <h2>$0</h2>
                </div>
                <div style={{ ...iconBox, background: "#eef2ff", color: "#1d4ed8" }}>
                📈
                </div>
            </div>

            {/* Paid */}
            <div style={cardStyle}>
                <div>
                <p style={labelStyle}>Paid</p>
                <h2 style={{ color: "#16a34a" }}>$0</h2>
                </div>
                <div style={{ ...iconBox, background: "#ecfdf5", color: "#16a34a" }}>
                ✅
                </div>
            </div>

            {/* Due */}
            <div style={cardStyle}>
                <div>
                <p style={labelStyle}>Due / Payable</p>
                <h2 style={{ color: "#f97316" }}>$0</h2>
                </div>
                <div style={{ ...iconBox, background: "#fff7ed", color: "#f97316" }}>
                ⏰
                </div>
            </div>
            </div>

            {/* COMMISSION HISTORY */}
            <div
            style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#fff",
                color: "#0f172a",
                padding: 20,
            }}
            >
            {/* HISTORY HEADER */}
            <div
                style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                }}
            >
                <h2 style={{ fontSize: 18 }}>Commission History</h2>

                <select style={selectStyle}>
                <option>All</option>
                <option>Paid</option>
                <option>Payable</option>
                <option>Cancelled</option>
                </select>
            </div>

            {/* EMPTY STATE */}
            <div style={{ textAlign: "center", padding: 80 }}>
                <div style={{ fontSize: 42, color: "#94a3b8", marginBottom: 12 }}>
                $
                </div>

                <h3>No commissions found</h3>

                <p style={{ color: "#64748b", marginTop: 6 }}>
                Commissions will appear here once your applications are enrolled
                </p>
            </div>
            </div>

        </div>
        )}





        {/* ================= Accommodation Section (ADDED ONLY) ================= */}


        {activeSection === "accommodation" && (
        <div style={{ padding: "24px" }}>
            {/* Header */}
            <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
            }}
            >
            <div>
                <h1 style={{ margin: 0 }}>Accommodation Services</h1>
                <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>
                Find housing for your students
                </p>
            </div>
            {/* <button className="primary-btn">+ Request Accommodation</button> */}
            <button className="add-student-btn" onClick={() => setShowAccommodationModal(true)}>
            <span style={{ fontSize: 18, lineHeight: 0 }}>+</span>
            <span>Request Accommodation</span>
            </button>
            </div>

            {/* Support Card */}
            <div
            style={{
                display: "flex",
                alignItems: "center",
                padding: 20,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#f8fafc",
                marginBottom: 24,
            }}
            >
            <div
                style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#e0e7ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
                fontSize: 18,
                }}
            >
                🏠
            </div>
            <div>
                <p style={{ fontWeight: 600, marginBottom: 6 }}>
                Student Accommodation Support
                </p>
                <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
                We help find safe, affordable, and convenient housing options for your
                students near their universities. Submit a request and our team will
                get back to you with tailored options.
                </p>
            </div>
            </div>

            {/* Requests Section */}
            <div
            style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#ffffff",
                padding: 24,
            }}
            >
            <p style={{ fontWeight: 600, marginBottom: 16 }}>Your Requests</p>

            {/* Empty State */}
            {/* <div
                style={{
                padding: 80,
                textAlign: "center",
                color: "#64748b",
                }}
            >
                <div
                style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: "2px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    fontSize: 22,
                }}
                >
                🏠
                </div>
                <h3 style={{ color: "#0f172a", marginBottom: 6 }}>
                No requests yet
                </h3>
                <p style={{ marginBottom: 0 }}>
                Submit your first accommodation request
                </p>
            </div> */}


            {accommodationRequests.length === 0 ? (
  /* EMPTY STATE */
  <div style={{ padding: 80, textAlign: "center", color: "#64748b" }}>
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        border: "2px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 16px",
        fontSize: 22,
      }}
    >
      🏠
    </div>
    <h3 style={{ color: "#0f172a", marginBottom: 6 }}>
      No requests yet
    </h3>
    <p>Submit your first accommodation request</p>
  </div>
) : (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
      gap: 20,
    }}
  >
    {accommodationRequests.map((item) => (
      <div
        key={item.id}
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: 20,
          background: "#fff",
          position: "relative",
        }}
      >
        
        <div
  style={{
    position: "absolute",
    top: 16,
    right: 16,
    display: "flex",
    alignItems: "center",
    gap: 6, // space between span & buttons
  }}
>
  <span
    style={{
      background: "#fff7ed",
      color: "#f97316",
      fontSize: 12,
      padding: "4px 10px",
      borderRadius: 999,
      border: "1px solid #fed7aa",
      whiteSpace: "nowrap",
    }}
  >
    {item.status}
  </span>

  <button
    style={{
      padding: "6px",
      cursor: "pointer",
      fontSize: 16,
      border: "none",
      background: "transparent",
    }}

    onClick={() => {
    setEditAccommodation(item);
    setShowEditAccommodationModal(true);
  }}
  >
    ✏️
  </button>

  <button
    style={{
      padding: "6px",
      cursor: "pointer",
      fontSize: 16,
      border: "none",
      background: "transparent",
    }}
  >
    🗑️
  </button>
</div>

        

        {/* <h4>{item.location}</h4>
        <p>{item.student_name}</p>
        <p>📅 Move-in: {item.move_in_date}</p>
        <p>💰 Budget: {item.monthly_budget}</p>
        <p style={{ color: "#64748b" }}>
          Submitted: {new Date(item.submitted_at).toLocaleDateString()}
        </p> */}

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        background: "#eef2ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        color: "#1d4ed8",
      }}
    >
      🏠
    </div>

    <div>
      <h4 style={{ margin: 0 }}>{item.location}</h4>
      <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>
        {item.student_name}
      </p>
    </div>
  </div>

  {/* DETAILS */}
  <div style={{ marginTop: 14, fontSize: 14 }}>
    <p>📅 Move-in: {item.move_in_date}</p>
    <p>💰 Budget: {item.monthly_budget}</p>
    <p style={{ color: "#64748b" }}>
      Submitted: {new Date(item.submitted_at).toLocaleDateString()}
    </p>
  </div>



      </div>
    ))}
  </div>
)}





            
            </div>

            {/* Submit Accommodation Modal */}


            {showAccommodationModal && (
  <div className="modal-overlay">
     <div className="modal-card accommodation-card">

      {/* HEADER */}
      <div className="modal-header">
        <h3>Request Accommodation</h3>
        <button
          className="close-btn"
          
          onClick={() => {
  resetForm();
  setShowAccommodationModal(false);
}}
         style={{
    color: "#000",
    background: "transparent",
    border: "none",
    cursor: "pointer"
  }}
        >
          ✕
        </button>
      </div>

      {/* FORM */}
      <div className="modal-body">

        {/* STUDENT DROPDOWN */}
        <label>Student (Optional)</label>
        <select
          value={form.student_name}
          onChange={(e) =>
            setForm({ ...form, student_name: e.target.value })
          }
          style={{
    width: "101%",
  }}
        >
          <option value="">Select a student</option>
          {students.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        <div className="row">
          <div>
            <label>Location / City *</label>
            <input
              placeholder="e.g. London, UK"
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />
          </div>

          <div>
            <label>Move-in Date</label>
            <input
              type="date"
              onChange={(e) =>
                setForm({ ...form, move_in_date: e.target.value })
              }
            />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Duration</label>
            <select
              onChange={(e) =>
                setForm({ ...form, duration: e.target.value })
              }
                style={{ width: "102%" }}
            >
              <option value="">Select duration</option>
              <option>3 Months</option>
              <option>6 Months</option>
              <option>1 Year</option>
              <option>2 Years</option>
            </select>
          </div>

          <div>
            <label>Monthly Budget</label>
            <input
              placeholder="e.g. $800-1200"
              onChange={(e) =>
                setForm({ ...form, monthly_budget: e.target.value })
              }
            />
          </div>
        </div>

        <label>Preferences & Requirements</label>
        <textarea
          placeholder="Any specific preferences..."
          onChange={(e) =>
            setForm({ ...form, preferences: e.target.value })
          }
          style={{
            width: "95%"
          }}
        />

      </div>

      {/* FOOTER */}
      <div
                        style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 12,
                        marginTop: 28,
                        }}
                    >
        <button onClick={() => {
  resetForm();
  setShowAccommodationModal(false);
}}
 style={{
                            padding: "10px 18px",
                            borderRadius: 8,
                            border: "1px solid #e2e8f0",
                            background: "#fff",
                            cursor: "pointer",
                            fontWeight: 500,
                            color: "#374151",
                        }}>
          Cancel
        </button>
        <button
            
            onClick={submitAccommodation}
            style={{
                padding: "10px 20px",
                borderRadius: 8,
                border: "none",
                background: "#1d4ed8",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
            }}
            >
            Submit Request
            </button>
        <br></br>
      </div>
      <br></br>
      

    </div>
  </div>
)}



{/* Edit Accommodation Modal */}

{showEditAccommodationModal && editAccommodation && (
  <div className="modal-overlay">
    <div className="modal-card accommodation-card">

      {/* HEADER */}
      <div className="modal-header">
        <h3>Edit Accommodation Request</h3>
        <button
          className="close-btn"
          onClick={() => setShowEditAccommodationModal(false)}
          style={{ background: "transparent", border: "none", cursor: "pointer", color: "#000" }}
        >
          ✕
        </button>
      </div>

      {/* FORM */}
      <div className="modal-body">

        {/* STATUS (NEW) */}
        <label>Status *</label>
        <select
          value={editAccommodation.status || ""}
          onChange={(e) =>
            setEditAccommodation({
              ...editAccommodation,
              status: e.target.value,
            })
          }
          style={{ width: "101%" }}
        >
          <option value="">Select status</option>
          <option value="Approved">Approved</option>
          <option value="Not Approved">Not Approved</option>
        </select>

        {/* STUDENT */}
        <label>Student</label>
        <input
          value={editAccommodation.student_name || ""}
          onChange={(e) =>
            setEditAccommodation({
              ...editAccommodation,
              student_name: e.target.value,
            })
          }

          style={{
            width:"95%"
          }}
        />

        <div className="row">
          <div>
            <label>Location / City *</label>
            <input
              value={editAccommodation.location || ""}
              onChange={(e) =>
                setEditAccommodation({
                  ...editAccommodation,
                  location: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Move-in Date</label>
            <input
              type="date"
              value={editAccommodation.move_in_date || ""}
              onChange={(e) =>
                setEditAccommodation({
                  ...editAccommodation,
                  move_in_date: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Duration</label>
            <select
              value={editAccommodation.duration || ""}
              onChange={(e) =>
                setEditAccommodation({
                  ...editAccommodation,
                  duration: e.target.value,
                })
              }
              style={{ width: "102%" }}
            >
              <option value="">Select duration</option>
              <option>3 Months</option>
              <option>6 Months</option>
              <option>1 Year</option>
              <option>2 Years</option>
            </select>
          </div>

          <div>
            <label>Monthly Budget</label>
            <input
              value={editAccommodation.monthly_budget || ""}
              onChange={(e) =>
                setEditAccommodation({
                  ...editAccommodation,
                  monthly_budget: e.target.value,
                })
              }
            />
          </div>
        </div>

        <label>Preferences & Requirements</label>
        <textarea
          value={editAccommodation.preferences || ""}
          onChange={(e) =>
            setEditAccommodation({
              ...editAccommodation,
              preferences: e.target.value,
            })
          }
          style={{ width: "95%" }}
        />
      </div>

      {/* FOOTER */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          marginTop: 28,
        }}
      >
        <button
          onClick={() => setShowEditAccommodationModal(false)}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            background: "#fff",
            cursor: "pointer",
            color: "#374151",
          }}
        >
          Cancel
        </button>

        <button
          onClick={handleUpdateAccommodation}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background: "#1d4ed8",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Update Request
        </button>
        <br></br>
      </div>

      <br></br>

    </div>
  </div>
)}






        </div>
        )}


        {/* ================= Loan Services Section ================= */}

        {activeSection === "loan" && (
        <div style={{ padding: "24px" }}>
            {/* Header */}
            <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
            }}
            >
            <div>
                <h1 style={{ margin: 0 }}>Loan Services</h1>
                <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>
                Education financing support for students
                </p>
            </div>
            {/* <button className="primary-btn">+ Request Loan Service</button> */}
            <button className="add-student-btn" onClick={() => setShowLoanModal(true)}>
            <span style={{ fontSize: 18, lineHeight: 0 }}>+</span>
            <span>Request Loan Service</span>
            </button>
            </div>

            {/* Support Card */}
            <div
            style={{
                display: "flex",
                alignItems: "center",
                padding: 20,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#f8fafc",
                marginBottom: 24,
            }}
            >
            <div
                style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#e6f6f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
                fontSize: 18,
                }}
            >
                💳
            </div>
            <div>
                <p style={{ fontWeight: 600, marginBottom: 6 }}>
                Education Loan Support
                </p>
                <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
                We partner with leading financial institutions to help students secure
                education loans with competitive rates. Our team will guide students
                through the application process and documentation.
                </p>
            </div>
            </div>

            {/* Requests Section */}
            <div
            style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#ffffff",
                padding: 24,
            }}
            >
            <p style={{ fontWeight: 600, marginBottom: 16 }}>Your Requests</p>

            {/* Empty State */}
            {/* <div
                style={{
                padding: 80,
                textAlign: "center",
                color: "#64748b",
                }}
            >
                <div
                style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: "2px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    fontSize: 22,
                }}
                >
                💳
                </div>
                <h3 style={{ color: "#0f172a", marginBottom: 6 }}>
                No loan requests yet
                </h3>
                <p style={{ marginBottom: 0 }}>
                Submit a loan service request for your students
                </p>
            </div> */}

            {loanRequests.length === 0 ? (
  /* EMPTY STATE */
  <div
    style={{
      padding: 80,
      textAlign: "center",
      color: "#64748b",
    }}
  >
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        border: "2px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 16px",
        fontSize: 22,
      }}
    >
      💳
    </div>
    <h3 style={{ color: "#0f172a", marginBottom: 6 }}>
      No loan requests yet
    </h3>
    <p style={{ marginBottom: 0 }}>
      Submit a loan service request for your students
    </p>
  </div>
) : (
  /* DATA STATE */
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
      gap: 16,
    }}
  >
    {loanRequests.map((item) => (
      <div
        key={item.id}
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: 20,
          background: "#fff",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "#ecfeff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                color: "#0891b2",
              }}
            >
              $
            </div>

            <div>
              <div style={{ fontWeight: 600, color: "#0f172a" }}>
                {item.student_name}
              </div>
              <div style={{ fontSize: 13, color: "#64748b" }}>
                {item.loan_amount}
              </div>
            </div>
          </div>



          <div>

          <span
            style={{
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 20,
              background: "#fff7ed",
              color: "#f97316",
              border: "1px solid #fed7aa",
              fontWeight: 500,
            }}
          >
            {item.status}
          </span>

          <button
    style={{
      padding: "6px",
      cursor: "pointer",
      fontSize: 16,
      border: "none",
      background: "transparent",
    }}
  >
    ✏️
  </button>

  <button
    style={{
      padding: "6px",
      cursor: "pointer",
      fontSize: 16,
      border: "none",
      background: "transparent",
    }}
  >
    🗑️
  </button>
</div>


        </div>

        {/* DETAILS */}
        <div style={{ fontSize: 14, color: "#334155" }}>
          <div style={{ marginBottom: 6 }}>
            🎓 <strong>{item.purpose}</strong>
          </div>
          <div style={{ marginBottom: 6 }}>
            🌍 <strong>Country:</strong> {item.study_country}
          </div>
          <div>
            🕒 <strong>Submitted:</strong>{" "}
            {new Date(item.submitted_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    ))}
  </div>
)}


            {/* LOAN MODAL */}

            {showLoanModal && (
  <div className="modal-overlay">
    <div className="modal-card accommodation-card">

      {/* HEADER */}
      <div className="modal-header">
        <h3>Request Loan Service</h3>
        <button
          className="close-btn"
          onClick={() => {
            resetLoanForm();
            setShowLoanModal(false);
          }}
          style={{
            color: "#000",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>

      {/* BODY */}
      <div className="modal-body">

        {/* STUDENT */}
        <label>Student *</label>
        <select
          value={loanForm.student_name}
          onChange={(e) =>
            setLoanForm({ ...loanForm, student_name: e.target.value })
          }
          style={{ width: "101%" }}
        >
          <option value="">Select a student</option>
          {students.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        <div className="row">
          <div>
            <label>Loan Amount *</label>
            <input
              placeholder="e.g. $25,000"
              value={loanForm.loan_amount}
              onChange={(e) =>
                setLoanForm({ ...loanForm, loan_amount: e.target.value })
              }
            />
          </div>

          <div>
            <label>Study Country</label>
            <input
              placeholder="e.g. United Kingdom"
              value={loanForm.study_country}
              onChange={(e) =>
                setLoanForm({ ...loanForm, study_country: e.target.value })
              }
            />
          </div>
        </div>

        <label>Purpose</label>
        <select
          value={loanForm.purpose}
          onChange={(e) =>
            setLoanForm({ ...loanForm, purpose: e.target.value })
          }
          style={{ width: "101%" }}
        >
          <option value="">Select purpose</option>
          <option value="Tuition Fees">Tuition Fees</option>
          <option value="Living Expenses">Living Expenses</option>
          <option value="Tuition + Living">Tuition + Living</option>
        </select>

        <label>Additional Notes</label>
        <textarea
          placeholder="Any additional information..."
          value={loanForm.additional_notes}
          onChange={(e) =>
            setLoanForm({ ...loanForm, additional_notes: e.target.value })
          }
          style={{ width: "95%" }}
        />
      </div>

      {/* FOOTER */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          marginTop: 28,
        }}
      >
        <button
          onClick={() => {
            resetLoanForm();
            setShowLoanModal(false);
          }}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            background: "#fff",
            cursor: "pointer",
            color: "#374151",
            fontWeight: 500,
          }}
        >
          Cancel
        </button>

        <button
          onClick={submitLoanRequest}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background: "#1d4ed8",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Submit Request
        </button>
        <br></br>
      </div>
      <br></br>

    </div>
  </div>
)}




            </div>
        </div>
        )}





        {/* ================= Test Prep Section (ADDED ONLY) ================= */}

        {activeSection === "testprep" && (
        <div style={{ padding: "24px" }}>
            {/* Header */}
            <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
            }}
            >
            <div>
                <h1 style={{ margin: 0 }}>Test Preparation</h1>
                <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>
                IELTS, TOEFL, GRE, GMAT and more
                </p>
            </div>
            {/* <button className="primary-btn">+ Request Test Prep</button> */}
            <button className="add-student-btn" onClick={() => setShowTestPrepModal(true)}>
            <span style={{ fontSize: 18, lineHeight: 0 }}>+</span>
            <span>Request Test Prep</span>
            </button>
            </div>

            {/* Support Card */}
            <div
            style={{
                display: "flex",
                alignItems: "center",
                padding: 20,
                border: "1px solid #fde6cf",
                borderRadius: 12,
                background: "#fff7ed",
                marginBottom: 24,
            }}
            >
            <div
                style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#ffedd5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
                fontSize: 18,
                }}
            >
                📖
            </div>
            <div>
                <p style={{ fontWeight: 600, marginBottom: 6 }}>
                Expert Test Preparation
                </p>
                <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
                We offer comprehensive test preparation courses for IELTS, TOEFL,
                PTE, GRE, GMAT, and more. Our experienced instructors help students
                achieve their target scores with personalized coaching.
                </p>
            </div>
            </div>

            {/* Test Chips */}
            <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 12,
                marginBottom: 24,
            }}
            >
            {[
                "IELTS",
                "TOEFL",
                "PTE Academic",
                "GRE",
                "GMAT",
                "SAT",
                "Duolingo English Test",
            ].map((test) => (
                <div
                key={test}
                style={{
                    padding: "14px 12px",
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    background: "#ffffff",
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: 14,
                    cursor: "default",
                }}
                >
                {test}
                </div>
            ))}
            </div>

            {/* Requests Section */}
            <div
            style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#ffffff",
                padding: 24,
            }}
            >
            <p style={{ fontWeight: 600, marginBottom: 16 }}>Your Requests</p>

            {/* Empty State */}
            {/* <div
                style={{
                padding: 80,
                textAlign: "center",
                color: "#64748b",
                }}
            >
                <div
                style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: "2px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    fontSize: 22,
                }}
                >
                📖
                </div>
                <h3 style={{ color: "#0f172a", marginBottom: 6 }}>
                No test prep requests yet
                </h3>
                <p style={{ marginBottom: 0 }}>
                Submit a test preparation request for your students
                </p>
            </div> */}



            {testPrepRequests.length === 0 ? (
  /* EMPTY STATE */
  <div
    style={{
      padding: 80,
      textAlign: "center",
      color: "#64748b",
    }}
  >
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        border: "2px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 16px",
        fontSize: 22,
      }}
    >
      📖
    </div>
    <h3 style={{ color: "#0f172a", marginBottom: 6 }}>
      No test prep requests yet
    </h3>
    <p style={{ marginBottom: 0 }}>
      Submit a test preparation request for your students
    </p>
  </div>
) : (
  /* DATA STATE */
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
      gap: 16,
    }}
  >
    {testPrepRequests.map((item) => (
      <div
        key={item.id}
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: 20,
          background: "#fff",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "#fef3c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
            >
              📘
            </div>

            <div>
              <div style={{ fontWeight: 600, color: "#0f172a" }}>
                {item.student_name}
              </div>
              <div style={{ fontSize: 13, color: "#64748b" }}>
                {item.test_type}
              </div>
            </div>
          </div>


          <div>

          <span
            style={{
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 20,
              background: "#fff7ed",
              color: "#f97316",
              border: "1px solid #fed7aa",
              fontWeight: 500,
            }}
          >
            {item.status}
          </span>

          <button
    style={{
      padding: "6px",
      cursor: "pointer",
      fontSize: 16,
      border: "none",
      background: "transparent",
    }}
  >
    ✏️
  </button>

  <button
    style={{
      padding: "6px",
      cursor: "pointer",
      fontSize: 16,
      border: "none",
      background: "transparent",
    }}
  >
    🗑️
  </button>
</div>



        </div>

        {/* DETAILS */}
        <div style={{ fontSize: 14, color: "#334155" }}>
          <div style={{ marginBottom: 6 }}>
            🎯 <strong>Target:</strong> {item.target_score || "-"}
          </div>
          <div style={{ marginBottom: 6 }}>
            📅 <strong>Test Date:</strong> {item.expected_test_date}
          </div>
          <div>
            🕒 <strong>Submitted:</strong>{" "}
            {new Date(item.submitted_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    ))}
  </div>
)}


            {/* Test Preparation */}

            {showTestPrepModal && (
  <div className="modal-overlay">
    <div className="modal-card">

      {/* HEADER */}
      <div className="modal-header">
        <h3>Request Test Preparation</h3>
        <button
          className="close-btn"
          onClick={() => {
            setShowTestPrepModal(false);
            setTestPrepForm(initialTestPrepForm);
          }}
            style={{
            color: "#000",
            }}
        >
          ✕
        </button>
      </div>

      {/* BODY */}
      <div className="modal-body">

        <label>Student *</label>
        <select
          value={testPrepForm.student_name}
          onChange={(e) =>
            setTestPrepForm({ ...testPrepForm, student_name: e.target.value })
          }
          style={{
            width:"101%"
          }}
        >
          <option value="">Select a student</option>
          {students.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        <div className="row">
          <div>
            <label>Test Type *</label>
            <select
              value={testPrepForm.test_type}
              onChange={(e) =>
                setTestPrepForm({ ...testPrepForm, test_type: e.target.value })
              }
              style={{
            width:"101%"
          }}
            >
              <option value="">Select test</option>
              <option>IELTS</option>
              <option>TOEFL</option>
              <option>PTE Academic</option>
              <option>GRE</option>
              <option>GMAT</option>
              <option>SAT</option>
              <option>Duolingo English Test</option>
            </select>
          </div>

          <div>
            <label>Target Score</label>
            <input
              placeholder="e.g. 7.0 (IELTS)"
              onChange={(e) =>
                setTestPrepForm({ ...testPrepForm, target_score: e.target.value })
              }
            />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Expected Test Date</label>
            <input
              type="date"
              onChange={(e) =>
                setTestPrepForm({
                  ...testPrepForm,
                  expected_test_date: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Current Level</label>
            <select
              onChange={(e) =>
                setTestPrepForm({
                  ...testPrepForm,
                  current_level: e.target.value,
                })
              }

              style={{
            width:"101%"
          }}
            >
              <option value="">Select level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <label>Additional Notes</label>
        <textarea
          placeholder="Any specific requirements or learning preferences..."
          onChange={(e) =>
            setTestPrepForm({
              ...testPrepForm,
              additional_notes: e.target.value,
            })
          }
          style={{
            width:"95%"
          }}
        />

      </div>

      {/* FOOTER */}
      <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 12,
                        marginTop: 28,
                        }}>
        <button
          onClick={() => {
            setShowTestPrepModal(false);
            setTestPrepForm(initialTestPrepForm);
          }}
          style={{
                            padding: "10px 18px",
                            borderRadius: 8,
                            border: "1px solid #e2e8f0",
                            background: "#fff",
                            cursor: "pointer",
                            fontWeight: 500,
                            color: "#374151",
                        }}
        >
          Cancel
        </button>

        <button onClick={submitTestPrepRequest} style={{
                            padding: "10px 20px",
                            borderRadius: 8,
                            border: "none",
                            background: "#1d4ed8",
                            color: "#fff",
                            cursor: "pointer",
                            fontWeight: 600,
                        }}>
          Submit Request
        </button>
        <br></br>
      </div>

      <br></br>

    </div>
  </div>
)}






            </div>
        </div>
        )}
        

        {/* ================= Team Chat Section (ADDED ONLY) ================= */}

        {activeSection === "teamchat" && (
        <div style={{ padding: "24px" }}>
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#eef2ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                }}
                >
                💬
                </div>
                <div>
                <h1 style={{ margin: 0 }}>Team Chat</h1>
                <p style={{ color: "#64748b", fontSize: 14 }}>
                    Connect with our support team
                </p>
                </div>
            </div>
            </div>

            {/* Chat Container */}
            <div
            style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#ffffff",
                height: "70vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
            >
            {/* Empty Chat State */}
            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
                padding: 24,
                textAlign: "center",
                }}
            >
                <div
                style={{
                    fontSize: 48,
                    marginBottom: 16,
                    color: "#9ca3af",
                }}
                >
                💬
                </div>
                <h3 style={{ color: "#0f172a", marginBottom: 8 }}>
                Start a conversation
                </h3>
                <p style={{ maxWidth: 420, lineHeight: 1.6 }}>
                Have questions about applications, commissions, or services?
                Send us a message and our team will respond soon.
                </p>
            </div>

            {/* Message Input */}
            <div
                style={{
                borderTop: "1px solid #e2e8f0",
                padding: 16,
                }}
            >
                <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                }}
                >
                <input
                    type="text"
                    placeholder="Type your message..."
                    style={{
                    flex: 1,
                    padding: "12px 14px",
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    fontSize: 14,
                    background: "#f9fafb",
                    color: "#0f172a",
                    outline: "none",
                    }}
                />
                <button
                    style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    background: "#2563eb",
                    color: "#ffffff",
                    border: "none",
                    fontSize: 14,
                    cursor: "pointer",
                    }}
                >
                ➤
                </button>
                </div>

                <p
                style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: "#64748b",
                    marginTop: 10,
                }}
                >
                Our team typically responds within 24 hours
                </p>
            </div>
            </div>
        </div>
        )}




        {/* ================= Permission Section (ADDED ONLY) ================= */}

        {activeSection === "permissions" && (
        <div style={{ padding: "24px" }}>
            {/* Header */}
            <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
            }}
            >
            <div>
                <h1 style={{ margin: 0 }}>User Permissions</h1>
                
            </div>
            
            </div>

            

            

            {/* Requests Section */}
            
            <div
                style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    background: "#ffffff",
                    overflow: "hidden",
                }}
                >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr
                        style={{
                        background: "#f8fafc",
                        textAlign: "left",
                        fontSize: 13,
                        color: "#64748b",
                        }}
                    >
                        <th style={{ padding: "14px 20px" }}>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                       
                        <th style={{ paddingRight: 20 }}>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr
                            key={index}
                            style={{
                                borderTop: "1px solid #e2e8f0",
                                fontSize: 14,
                            }}
                            >
                            {/* Name */}
                            <td style={{ padding: "16px 20px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div
                                    style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: "50%",
                                    background: "#e0e7ff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 16,
                                    }}
                                >
                                    👤
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{user.user_name}</div>
                                    <div style={{ fontSize: 12, color: "#64748b" }}>
                                    {user.role}
                                    </div>
                                </div>
                                </div>
                            </td>

                            {/* Email */}
                            <td>
                                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                ✉️ {user.email}
                                </span>
                            </td>

                            {/* Phone */}
                            <td>
                                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                📞 {user.phone || "—"}
                                </span>
                            </td>

                            {/* Actions */}
                            {/* <td style={{ paddingRight: 20 }}>
                                <button
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: 16,
                                }}
                                >
                                ✏️
                                </button>
                            </td> */}


                            <td style={{ paddingRight: 20 }}>
                            <div
                                onClick={() => handleToggleStatus(user, index)}
                                style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                cursor: "pointer",
                                }}
                            >
                                {/* Toggle */}
                                <div
                                style={{
                                    width: 46,
                                    height: 24,
                                    borderRadius: 20,
                                    background: user.status === "Active" ? "#22c55e" : "#e5e7eb",
                                    position: "relative",
                                    transition: "0.3s",
                                }}
                                >
                                <div
                                    style={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: "50%",
                                    background: "#fff",
                                    position: "absolute",
                                    top: 3,
                                    left: user.status === "Active" ? 24 : 4,
                                    transition: "0.3s",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                                    }}
                                />
                                </div>

                                {/* Status Text */}
                                <span
                                style={{
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: user.status === "Active" ? "#16a34a" : "#64748b",
                                }}
                                >
                                {user.status}
                                </span>
                            </div>
                            </td>





                            </tr>
                        ))}
                        </tbody>

                </table>
                </div>


        </div>
        )}



      </main>
    </div>
  );
};

export default Profileedit;

