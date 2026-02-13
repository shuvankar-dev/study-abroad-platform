import { useState } from "react";
import { useEffect } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { 
  Home, GraduationCap, Users, FileText, DollarSign, Building2, 
  CreditCard, BookOpen, MessageSquare, Shield, User, 
  LogOut, Plus, Search, Filter, Clock,
  TrendingUp, CheckCircle, AlertCircle, Mail, Phone, Globe, 
  Calendar, Edit2, Trash2, X, UserPlus
} from "lucide-react";

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


const Dashboard = () => {
  
  
  
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
  
  // Agent Management States
  const [agents, setAgents] = useState<any[]>([]);
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
  const [showEditAgentModal, setShowEditAgentModal] = useState(false);
  const [showDeleteAgentModal, setShowDeleteAgentModal] = useState(false);
  const [agentForm, setAgentForm] = useState({
    company_name: "",
    user_name: "",
    email: "",
    phone: ""
  });
  const [editingAgent, setEditingAgent] = useState<any>(null);
  const [deletingAgentId, setDeletingAgentId] = useState<number | null>(null);



  const [showFilters, setShowFilters] = useState(false);

  

  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const [applicationForm, setApplicationForm] = useState({
  student_id: "",
  course: "",
  university: "",
  preferred_intake: "",
  notes: "",
});

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



const [showDeleteAccommodationConfirm, setShowDeleteAccommodationConfirm] = useState(false);
const [deleteAccommodationId, setDeleteAccommodationId] = useState<number | null>(null);


const handleDeleteAccommodation = async (id: number) => {
  const res = await fetch(
    `${API_BASE}/edupartner/delete_accommodation.php`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }
  );

  const data = await res.json();

  if (data.success) {
    fetchAccommodationRequests();
  } else {
    alert(data.error || "Failed to delete request");
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




const [showEditLoanModal, setShowEditLoanModal] = useState(false);
const [editingLoanId, setEditingLoanId] = useState<number | null>(null);

const [editLoanForm, setEditLoanForm] = useState({
  student_name: "",
  loan_amount: "",
  study_country: "",
  purpose: "",
  additional_notes: "",
  status: "",
});



const updateLoanRequest = async () => {
  if (!editingLoanId) return;

  const res = await fetch(
    `${API_BASE}/edupartner/update_loan.php`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingLoanId,
        ...editLoanForm,
      }),
    }
  );

  const data = await res.json();

  if (data.success) {
    fetchLoanRequests();
    setShowEditLoanModal(false);
  } else {
    alert(data.error || "Failed to update loan");
  }
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



const openApplicationModal = async () => {
  setShowApplicationModal(true);

  const studentRes = await fetch(`${API_BASE}/edupartner/get_students.php`);
  const studentData = await studentRes.json();
  if (studentData.success) setStudents(studentData.students);

  const uniRes = await fetch(`${API_BASE}/edupartner/get_universities.php`);
  const uniData = await uniRes.json();
  if (uniData.success) setUniversities(uniData.universities);
};







const [showDeleteLoanModal, setShowDeleteLoanModal] = useState(false);
const [loanToDelete, setLoanToDelete] = useState<number | null>(null);

const confirmDeleteLoan = async () => {
  if (!loanToDelete) return;

  try {
    const res = await fetch(
      `${API_BASE}/edupartner/delete_loan.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: loanToDelete }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setLoanRequests((prev) =>
        prev.filter((l) => l.id !== loanToDelete)
      );
    } else {
      alert("Failed to delete loan request");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  } finally {
    setShowDeleteLoanModal(false);
    setLoanToDelete(null);
  }
};




const fetchAccommodationRequests = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
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
    console.log("Accommodation response:", data);

    if (data.success) {
      setAccommodationRequests(data.accommodations);
    } else {
      console.error("Accommodation fetch failed:", data);
    }
  } catch (err) {
    console.error("Failed to fetch accommodation requests:", err);
  }
};


useEffect(() => {
  fetchAccommodationRequests();
}, []);


// ================= AGENT MANAGEMENT FUNCTIONS =================

const fetchAgents = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("Fetching agents for admin_id:", user.id);
    
    const res = await fetch(`${API_BASE}/edupartner/get_agents.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admin_id: user.id }),
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log("Agents response:", data);
    
    if (data.success) {
      setAgents(data.agents || []);
      console.log("Agents set:", data.agents);
    } else {
      console.error("API returned success: false", data.message);
      setAgents([]);
    }
  } catch (err) {
    console.error("Failed to fetch agents:", err);
    setAgents([]);
  }
};

const submitAgent = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const res = await fetch(`${API_BASE}/edupartner/add_agent.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...agentForm,
      admin_id: user.id
    }),
  });

  const data = await res.json();
  
  if (data.success) {
    alert(data.email_sent ? "Agent created and email sent successfully!" : "Agent created but email failed to send");
    setShowAddAgentModal(false);
    setAgentForm({ company_name: "", user_name: "", email: "", phone: "" });
    fetchAgents();
  } else {
    alert(data.message || "Failed to create agent");
  }
};

useEffect(() => {
  if (userRole === "Admin") {
    fetchAgents();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

// Fetch agents when Agents section is opened
useEffect(() => {
  if (activeSection === "agents" && userRole === "Admin") {
    fetchAgents();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [activeSection]);


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





const [showEditTestPrepModal, setShowEditTestPrepModal] = useState(false);

const initialEditTestPrepForm = {
  id: "",
  student_name: "",
  test_type: "",
  target_score: "",
  expected_test_date: "",
  current_level: "",
  additional_notes: "",
  status: "",
};

const [editTestPrepForm, setEditTestPrepForm] = useState(initialEditTestPrepForm);


const updateTestPrepRequest = async () => {
  try {
    const res = await fetch(
      `${API_BASE}/edupartner/update_testprep.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTestPrepForm),
      }
    );

    const data = await res.json();

    if (data.success) {
      setTestPrepRequests((prev) =>
        prev.map((r) =>
          r.id === editTestPrepForm.id ? { ...r, ...editTestPrepForm } : r
        )
      );

      setShowEditTestPrepModal(false);
      setEditTestPrepForm(initialEditTestPrepForm);
    } else {
      alert("Update failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};



const [universities, setUniversities] = useState<any[]>([]);

const ITEMS_PER_PAGE = 10;

const [currentPage, setCurrentPage] = useState(1);

// const totalPages = Math.ceil(universities.length / ITEMS_PER_PAGE);




const [filterCountry, setFilterCountry] = useState("");
const [filterLevel, setFilterLevel] = useState("");
const [filterIntake, setFilterIntake] = useState("");

const filteredUniversities11 = universities.filter((u) => {
  const matchesSearch =
    searchTerm === "" || // if search is empty, include all
    u.University.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.Program_Name.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesCountry = filterCountry === "" || u.Country === filterCountry;
  const matchesLevel = filterLevel === "" || u.Study_Level === filterLevel;
  const matchesIntake = filterIntake === "" || u.Open_Intakes.includes(filterIntake);

  return matchesSearch && matchesCountry && matchesLevel && matchesIntake;
});

const totalPages = Math.ceil(filteredUniversities11.length / ITEMS_PER_PAGE);

const paginatedUniversities = filteredUniversities11.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);

const fetchUniversities = async () => {
  const res = await fetch(
    `${API_BASE}/edupartner/get_universities.php`,
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
    setUniversities(data.universities);
  }
};


useEffect(() => {
  if (activeSection === "universities") {
    fetchUniversities();
    setCurrentPage(1);
  }
}, [activeSection]);





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


const [showDeleteTestPrepModal, setShowDeleteTestPrepModal] = useState(false);
const [testPrepToDelete, setTestPrepToDelete] = useState<number | null>(null);


const confirmDeleteTestPrep = async () => {
  if (!testPrepToDelete) return;

  try {
    const res = await fetch(
      `${API_BASE}/edupartner/delete_testprep.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: testPrepToDelete }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setTestPrepRequests((prev) =>
        prev.filter((t) => t.id !== testPrepToDelete)
      );
    } else {
      alert("Failed to delete test preparation request");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  } finally {
    setShowDeleteTestPrepModal(false);
    setTestPrepToDelete(null);
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




const uniqueCourses = Array.from(
  new Set(universities.map((u) => u.Program_Name))
);


const filteredUniversities = universities.filter(
  (u) => u.Program_Name === applicationForm.course
);


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




// const submitApplication = async () => {
//   if (
//     !applicationForm.student_id ||
//     !applicationForm.course ||
//     !applicationForm.university
//   ) {
//     alert("Please fill all required fields");
//     return;
//   }

//   const selectedStudent = students.find(
//     (s) => s.id === applicationForm.student_id
//   );

//   try {
//     const res = await fetch(
//       `${API_BASE}/edupartner/submit_application.php`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           user_id: user.id,
//           student_name: selectedStudent?.name,
//           university_name: applicationForm.university,
//           course_name: applicationForm.course,
//           pref_intake: applicationForm.preferred_intake,
//           additional_notes: applicationForm.notes,
//         }),
//       }
//     );

//     const data = await res.json();

//     if (data.success) {
//       alert("Application submitted successfully");

//       setShowApplicationModal(false);
//       setApplicationForm({
//         student_id: "",
//         course: "",
//         university: "",
//         preferred_intake: "",
//         notes: "",
//       });

//       // later you can call fetchApplications()
//     } else {
//       alert(data.error || "Failed to submit application");
//     }
//   } catch (error) {
//     console.error("Submit error:", error);
//     alert("Server error");
//   }
// };


const initialApplicationForm = {
  student_id: "",
  student_name: "",
  course: "",
  university: "",
  preferred_intake: "",
  notes: "",
};

const resetApplicationForm = () => {
  setApplicationForm(initialApplicationForm);
};



const submitApplication = async () => {
  if (!applicationForm.student_id || !applicationForm.course) {
    alert("Please fill all required fields");
    return;
  }

  const selectedStudent = students.find(
    (s) => s.id === Number(applicationForm.student_id)
  );

  if (!selectedStudent) {
    alert("Student not found");
    return;
  }

  try {
    const res = await fetch(
      `${API_BASE}/edupartner/submit_application.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          student_name: selectedStudent.name, // ✅ NOW CORRECT
          university_name: applicationForm.university,
          course_name: applicationForm.course,
          pref_intake: applicationForm.preferred_intake,
          additional_notes: applicationForm.notes,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
   
      setShowApplicationModal(false);
     resetApplicationForm();
     fetchApplications();
    } else {
      alert(data.error || "Failed to submit application");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};



const [applications, setApplications] = useState<any[]>([]);

const fetchApplications = async () => {
  try {
    const res = await fetch(
      `${API_BASE}/edupartner/get_applications.php`,
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
      setApplications(data.applications);
    }
  } catch (err) {
    console.error("Fetch applications error:", err);
  }
};



// useEffect(() => {
//   if (activeSection === "applications") {
//     fetchApplications();
//   }
// }, [activeSection]);

useEffect(() => {
  fetchApplications(); // fetch once on mount
}, []);


const [showEditApplicationModal, setShowEditApplicationModal] = useState(false);
const [editApplicationForm, setEditApplicationForm] = useState({
  id: "",
  student_id: "",
  student_name: "",
  course: "",
  university: "",
  preferred_intake: "",
  notes: "",
  status: "Submitted",
});


// const handleEditApplication = (app: any) => {
//   const matchedStudent = students.find(
//     (s) => s.name === app.student_name
//   );

//   setEditApplicationForm({
//     id: app.id,
//     student_id: matchedStudent?.id || "",
//     student_name: app.student_name,
//     course: app.course_name,
//     university: app.university_name,
//     preferred_intake: app.pref_intake,
//     notes: app.additional_notes,
//     status: app.status,
//   });

//   setShowEditApplicationModal(true);
// };

const handleEditApplication = async (app: any) => {

  // ✅ Ensure universities are loaded
  if (universities.length === 0) {
    await fetchUniversities();
  }

  const matchedStudent = students.find(
    (s) => s.name === app.student_name
  );

  setEditApplicationForm({
    id: app.id,
    student_id: matchedStudent?.id || "",
    student_name: app.student_name,

    // ✅ THESE MUST MATCH DROPDOWN VALUES EXACTLY
    course: app.course_name,
    university: app.university_name,

    preferred_intake: app.pref_intake || "",
    notes: app.additional_notes || "",
    status: app.status || "Submitted",
  });

  setShowEditApplicationModal(true);
};




const updateApplication = async () => {
  try {
    const payload = {
      id: editApplicationForm.id,
      student_name: editApplicationForm.student_name,
      course_name: editApplicationForm.course,
      university_name: editApplicationForm.university,
      pref_intake: editApplicationForm.preferred_intake,
      additional_notes: editApplicationForm.notes,
      status: editApplicationForm.status,
    };

    const res = await fetch(
      `${API_BASE}/edupartner/update_application.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (data.success) {
      fetchApplications();
      setShowEditApplicationModal(false);
    } else {
      console.error(data.error);
      alert("Failed to update application");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};



const [showDeleteApplicationConfirm, setShowDeleteApplicationConfirm] = useState(false);
const [deleteApplicationId, setDeleteApplicationId] = useState<number | null>(null);

const handleDeleteApplication = async (id: number) => {
  try {
    const res = await fetch(
      `${API_BASE}/edupartner/delete_application.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }
    );

    const data = await res.json();

    if (data.success) {
      fetchApplications(); // refresh table
    } else {
      alert("Failed to delete application");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};






  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
        navigate("/edupartner/login");
    }
    }, [navigate]);

    

    useEffect(() => {
    fetch(`${API_BASE}/edupartner/get-users.php`)
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.error(err));
    }, []);


    //  pagination for students
    const studentsPerPage = 5; // you can change this
const [currentStudentPage, setCurrentStudentPage] = useState(1);


const totalStudentPages = Math.ceil(
  filteredStudents.length / studentsPerPage
);

const paginatedStudents = filteredStudents.slice(
  (currentStudentPage - 1) * studentsPerPage,
  currentStudentPage * studentsPerPage
);


useEffect(() => {
  setCurrentStudentPage(1);
}, [filteredStudents]);



// Application Pagination



const [statusFilter, setStatusFilter] = useState("All Statuses");

const filteredApplications = applications.filter((app) => {
  const matchesSearch =
    app.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.university_name.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "All Statuses" || app.status === statusFilter;

  return matchesSearch && matchesStatus;
});

const applicationsPerPage = 5;
const [currentApplicationPage, setCurrentApplicationPage] = useState(1);

const totalApplicationPages = Math.ceil(
  filteredApplications.length / applicationsPerPage
);



const paginatedApplications = filteredApplications.slice(
  (currentApplicationPage - 1) * applicationsPerPage,
  currentApplicationPage * applicationsPerPage
);


useEffect(() => {
  setCurrentApplicationPage(1);
}, [searchTerm, statusFilter]);







const rowsPerPage = 5; // change if needed
const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;
const currentUsers = users.slice(indexOfFirstRow, indexOfLastRow);

const totalPages1 = Math.ceil(users.length / rowsPerPage);



// Email logic

const [emails, setEmails] = useState<string[]>([]);



const [message, setMessage] = useState("");




const sendTeamChat = async () => {
  if (!message.trim()) return;

  const receiverEmail =
    activeChat?.sender_email || emails[0];

  const newMessage = {
    message,
    time: new Date().toISOString(),
    type: "out",
  };

  /* ✅ INSTANT UI UPDATE */
  if (activeChat) {
    setActiveChat({
      ...activeChat,
      messages: [...activeChat.messages, newMessage],
    });
  }

  const updatedChats = chatList.map((chat) =>
    chat.sender_email === receiverEmail
      ? {
          ...chat,
          messages: [...chat.messages, newMessage],
        }
      : chat
  );

  if (
    !chatList.some((chat) => chat.sender_email === receiverEmail)
  ) {
    updatedChats.push({
      sender_name: receiverEmail,
      sender_email: receiverEmail,
      messages: [newMessage],
    });
  }

  setChatList(updatedChats);

  setMessage("");
  setEmails([]);

  /* 🔁 BACKEND */
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    await fetch(
      `${API_BASE}/edupartner/send_team_chat.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          sender_name: user.user_name,
          sender_email: user.email,
          receiver_email: [receiverEmail],
          message_info: message,
        }),
      }
    );
  } catch (err) {
    console.error(err);
  }
};



const [chatList, setChatList] = useState<any[]>([]);
const [activeChat, setActiveChat] = useState<any | null>(null);


useEffect(() => {
  fetch(`${API_BASE}/edupartner/get_team_chats.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: user.id }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) setChatList(data.data);
    });
}, []);



// User email retrieved from localStorage when needed



const handleSelectChat = (chat: any) => {
  setActiveChat(chat);

  // auto-fill recipient email
  setEmails([chat.sender_email]);

  // clear emails
  setEmails([]);
};

const [chatUsers, setChatUsers] = useState<any[]>([]);


const fetchChatUsers = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const res = await fetch(
      `${API_BASE}/edupartner/get_chat_users.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      }
    );

    const data = await res.json();
    if (data.success) {
      setChatUsers(data.users);
    }
  } catch (err) {
    console.error("Failed to fetch chat users", err);
  }
};

useEffect(() => {
  fetchChatUsers();
}, []);



// Accodmodation section

const INITIAL_VISIBLE = 4;
const LOAD_MORE_COUNT = 8;

const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

useEffect(() => {
  if (activeSection === "accommodation") {
    setVisibleCount(INITIAL_VISIBLE);
  }
}, [activeSection]);


const visibleAccommodationRequests = accommodationRequests.slice(
  0,
  visibleCount
);

const hasMore = visibleCount < accommodationRequests.length;


// Loan load


const INITIAL_LOAN_VISIBLE = 4;
const LOAD_MORE_LOANS = 8;

const [visibleLoanCount, setVisibleLoanCount] = useState(INITIAL_LOAN_VISIBLE);

useEffect(() => {
  if (activeSection === "loan") {
    setVisibleLoanCount(INITIAL_LOAN_VISIBLE);
  }
}, [activeSection]);


const visibleLoanRequests = loanRequests.slice(0, visibleLoanCount);
const hasMoreLoans = visibleLoanCount < loanRequests.length;



// Test Prep Load

const LOAD_MORE_COUNT1 = 4;

const [visibleTestPrepCount, setVisibleTestPrepCount] = useState(LOAD_MORE_COUNT1);


// const visibleTestPrepRequests = testPrepRequests.slice(0, visibleTestPrepCount);

const [selectedTestTypes, setSelectedTestTypes] = useState<string[]>([]);

const filteredTestPrepRequests =
  selectedTestTypes.length === 0
    ? testPrepRequests
    : testPrepRequests.filter((item) =>
        selectedTestTypes.includes(item.test_type)
      );


const visibleTestPrepRequests = filteredTestPrepRequests.slice(
  0,
  visibleTestPrepCount
);


const hasMoreTestPrep =
  visibleTestPrepCount < filteredTestPrepRequests.length;



// useEffect(() => {
//   if (activeSection === "testprep") {
//     setVisibleTestPrepCount(LOAD_MORE_COUNT1);
//   }
// }, [activeSection]);


useEffect(() => {
  setVisibleTestPrepCount(LOAD_MORE_COUNT1);
}, [selectedTestTypes]);



// user profile update

const [profileSuccess, setProfileSuccess] = useState("");
const [profileError, setProfileError] = useState("");


const [profileForm, setProfileForm] = useState<any>({
  company_name: user.company_name || "",
  user_name: user.user_name || "",
  email: user.email || "",
  phone: user.phone || "",
  country: user.country || "",
});


const handleUpdateProfile = async () => {

  setProfileSuccess("");
  setProfileError("");

  try {
    const res = await fetch(
      `${API_BASE}/edupartner/update_profile.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          ...profileForm,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      // update localStorage user
      const updatedUser = { ...user, ...profileForm };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      // alert("Profile updated successfully");
      setProfileSuccess("Profile updated successfully!");
    } else {
      // alert(data.message || "Update failed");
      setProfileError(data.message || "Update failed");
    }
  } catch (err) {
    console.error(err);
    // alert("Server error");
    setProfileError("Server error. Please try again.");
  }
};



const fetchUserInfo = async (userId: number) => {
  try {
    const res = await fetch(`${API_BASE}/edupartner/get_user_info.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });

    const data = await res.json();

    if (data.success) {
      setProfileForm((prev: any) => ({
        ...prev,
        email: data.email,
        phone: data.phone,
        country: data.country,
      }));
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};



useEffect(() => {
  if (activeSection === "userprofile" && user.id) {
    fetchUserInfo(user.id);
  }
}, [activeSection]);





  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <GraduationCap size={24} /> <span>EduPartner</span>
        </div>

        <ul className="menu">
          <li
            className={activeSection === "dashboard" ? "active" : ""}
            onClick={() => setActiveSection("dashboard")}
          >
            <Home size={18} /> Dashboard
          </li>

          <li
            className={activeSection === "universities" ? "active" : ""}
            onClick={() => setActiveSection("universities")}
          >
            <GraduationCap size={18} /> Universities
          </li>

          <li
            className={activeSection === "students" ? "active" : ""}
            onClick={() => setActiveSection("students")}
            >
            <Users size={18} /> Students
          </li>

          {userRole === "Admin" && (
            <li
              className={activeSection === "agents" ? "active" : ""}
              onClick={() => setActiveSection("agents")}
            >
              <UserPlus size={18} /> Agents
            </li>
          )}

          <li
            className={activeSection === "applications" ? "active" : ""}
            onClick={() => setActiveSection("applications")}
            >
            <FileText size={18} /> Applications
            </li>

          <li
            className={activeSection === "commissions" ? "active" : ""}
            onClick={() => setActiveSection("commissions")}
            >
            <DollarSign size={18} /> Commissions
            </li>

           <li
                className={activeSection === "accommodation" ? "active" : ""}
                onClick={() => setActiveSection("accommodation")}
            >
                <Building2 size={18} /> Accommodation
            </li>

            <li
                className={activeSection === "loan" ? "active" : ""}
                onClick={() => setActiveSection("loan")}
            >
                <CreditCard size={18} /> Loan Services
            </li>

            <li
                className={activeSection === "testprep" ? "active" : ""}
                onClick={() => setActiveSection("testprep")}
            >
                <BookOpen size={18} /> Test Prep
            </li>
          <li 
          className={activeSection === "teamchat" ? "active" : ""}
          onClick={() => setActiveSection("teamchat")}
          >
            <MessageSquare size={18} /> Team Chat
            </li>
            {userRole === "Admin" && (
            <>
                <li
                className={activeSection === "permissions" ? "active" : ""}
                onClick={() => setActiveSection("permissions")}
                >
                <Shield size={18} /> Permissions
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
      <main className="main-content" style={{ paddingTop: "20px" }}>

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
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        }}

                    //      onClick={() => {
                    // navigate("/dashboard/profile_edit");
                    // }}

                    onClick={() => setActiveSection("userprofile")}
                    >

                      {/* <Link to="/signup">Register here</Link> */}
                        <User size={16} /> Profile Settings
                    </div>

                    <div
                    style={{
                        padding: "12px 16px",
                        fontSize: 14,
                        cursor: "pointer",
                        color: "#dc2626",
                        borderTop: "1px solid #e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                    onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/edupartner/login");
                    }}
                    >
                    <LogOut size={16} /> Logout
                    </div>
                    
                    </div>
                )}
                </div>


          </div>
        </div>

        {/* ================= DASHBOARD SECTION (UNCHANGED) ================= */}
        {activeSection === "dashboard" && (
          <>
            {/* TOP BAR */}
            <div className="topbar" style={{ 
              padding: "24px", 
              background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
              borderRadius: "12px",
              marginBottom: "24px",
              border: "1px solid #e2e8f0"
            }}>
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 700 }}>Dashboard</h2>

              <div className="top-actions" style={{ display: "flex", gap: "12px" }}>
                <button 
                  className="outline-btn" 
                  onClick={() => setActiveSection("universities")}
                  style={{
                    padding: "11px 20px",
                    borderRadius: "10px",
                    border: "2px solid #e2e8f0",
                    background: "#fff",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#667eea";
                    e.currentTarget.style.background = "#f8fafc";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.background = "#fff";
                  }}
                >
                  <Search size={16} /> Browse Universities
                </button>
                {userRole === "Admin" ? (
                  <button className="add-student-btn" onClick={() => setShowAddAgentModal(true)}>
                  <Plus size={18} />
                  <span>Add Agent</span>
                  </button>
                ) : (
                  <button className="add-student-btn" onClick={() => setActiveSection("students")}>
                  <Plus size={18} />
                  <span>Add Student</span>
                  </button>
                )}
              </div>
            </div>

            {/* HEADER */}
            <div className="welcome" style={{ marginBottom: "28px" }}>
              <h1 style={{ margin: 0, fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>Welcome back, {userName}!</h1>
              <p style={{ color: "#64748b", fontSize: "16px", margin: 0 }}>Here's what's happening with your students today.</p>
            </div>

            {/* STATS */}
            <div className="stats-grid" style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
              gap: "20px",
              marginBottom: "28px"
            }}>
              <div className="stat-card" style={{
                padding: "24px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                position: "relative",
                transition: "all 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
              }}>
                <div style={{ 
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "48px",
                  height: "48px",
                  background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Users size={24} style={{ color: "#4f46e5" }} />
                </div>
                <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8, fontWeight: 500 }}>Total Students</div>
                <h2 style={{ fontSize: 32, margin: 0, fontWeight: 700, color: "#0f172a" }}>{students.length}</h2>
              </div>

              <div className="stat-card" style={{
                padding: "24px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                position: "relative",
                transition: "all 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
              }}>
                <div style={{ 
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "48px",
                  height: "48px",
                  background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <FileText size={24} style={{ color: "#2563eb" }} />
                </div>
                <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8, fontWeight: 500 }}>Applications</div>
                <h2 style={{ fontSize: 32, margin: 0, fontWeight: 700, color: "#0f172a" }}>{applications.length}</h2>
                <span style={{ fontSize: 13, color: "#64748b", marginTop: 4, display: "block" }}>
                    {applications.filter(
                      (app) => app.status === "Submitted"
                    ).length}{" "}
                    pending
                </span>
              </div>

              <div className="stat-card" style={{
                padding: "24px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                position: "relative",
                transition: "all 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
              }}>
                <div style={{ 
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "48px",
                  height: "48px",
                  background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Clock size={24} style={{ color: "#d97706" }} />
                </div>
                <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8, fontWeight: 500 }}>Commission Due</div>
                <h2 style={{ fontSize: 32, margin: 0, fontWeight: 700, color: "#0f172a" }}>$0</h2>
              </div>

              <div className="stat-card" style={{
                padding: "24px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                position: "relative",
                transition: "all 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
              }}>
                <div style={{ 
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "48px",
                  height: "48px",
                  background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <DollarSign size={24} style={{ color: "#16a34a" }} />
                </div>
                <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8, fontWeight: 500 }}>Commission Paid</div>
                <h2 style={{ fontSize: 32, margin: 0, fontWeight: 700, color: "#0f172a" }}>$0</h2>
              </div>
            </div>

            {/* CONTENT GRID */}
            <div className="content-grid" style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "20px",
              marginBottom: "28px"
            }}>
              <div className="box" style={{
                padding: "24px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
              }}>
                <h3 style={{ margin: "0 0 20px 0", fontSize: "18px", fontWeight: 700 }}>Quick Actions</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <button 
                    onClick={() => setActiveSection("students")}
                    style={{
                      padding: "12px 16px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#0f172a",
                      transition: "all 0.2s",
                      textAlign: "left"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f1f5f9";
                      e.currentTarget.style.borderColor = "#cbd5e1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f8fafc";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }}
                  >
                    <Plus size={16} /> Add New Student
                  </button>
                  <button 
                    onClick={() => setActiveSection("applications")}
                    style={{
                      padding: "12px 16px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#0f172a",
                      transition: "all 0.2s",
                      textAlign: "left"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f1f5f9";
                      e.currentTarget.style.borderColor = "#cbd5e1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f8fafc";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }}
                  >
                    <FileText size={16} /> Submit Application
                  </button>
                  <button 
                    onClick={() => setActiveSection("universities")}
                    style={{
                      padding: "12px 16px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#0f172a",
                      transition: "all 0.2s",
                      textAlign: "left"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f1f5f9";
                      e.currentTarget.style.borderColor = "#cbd5e1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f8fafc";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }}
                  >
                    <Search size={16} /> Search Universities
                  </button>
                  <button 
                    onClick={() => setActiveSection("commissions")}
                    style={{
                      padding: "12px 16px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#0f172a",
                      transition: "all 0.2s",
                      textAlign: "left"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f1f5f9";
                      e.currentTarget.style.borderColor = "#cbd5e1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f8fafc";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }}
                  >
                    <DollarSign size={16} /> View Commissions
                  </button>
                </div>
              </div>

              <div className="box" style={{
                padding: "24px",
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
              }}>
                <div className="box-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "20px" }}>
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>Recent Applications</h3>
                  <span
  className="view"
  role="button"
  tabIndex={0}
  style={{ color: '#667eea', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}
  onClick={() => setActiveSection("applications")}
  onKeyDown={(e) => e.key === 'Enter' && setActiveSection("applications")}
>
  View All →
</span>

                </div>

                <div className="empty" style={{ textAlign: 'center', color: '#94a3b8', padding: "40px 20px" }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}>
                    <FileText size={32} style={{ color: "#cbd5e1" }} />
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#64748b", marginBottom: 8 }}>No applications yet</div>
                  <a
  href="#applications"
  onClick={(e) => {
    e.preventDefault();
    setActiveSection("applications");
  }}
  style={{
    color: "#667eea",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 600
  }}
>
  Submit your first application →
</a>

                </div>
              </div>
            </div>

            {/* STATUS */}
            <div className="status-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px"
            }}>
              <div className="status-card blue" style={{
                padding: "24px",
                background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                borderRadius: "12px",
                border: "1px solid #93c5fd",
                textAlign: "center"
              }}>
                <div style={{ marginBottom: 12 }}>
                  <AlertCircle size={32} style={{ color: "#1e40af" }} />
                </div>
                <h2 style={{ fontSize: 36, margin: "0 0 8px 0", fontWeight: 700, color: "#1e3a8a" }}>
                  {applications.filter((app) => app.status === "Submitted").length}
                </h2>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#1e40af" }}>Pending Review</p>
              </div>
              <div className="status-card green" style={{
                padding: "24px",
                background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                borderRadius: "12px",
                border: "1px solid #86efac",
                textAlign: "center"
              }}>
                <div style={{ marginBottom: 12 }}>
                  <CheckCircle size={32} style={{ color: "#15803d" }} />
                </div>
                <h2 style={{ fontSize: 36, margin: "0 0 8px 0", fontWeight: 700, color: "#14532d" }}>
                  {applications.filter((app) => app.status === "Accepted").length}
                </h2>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#15803d" }}>Accepted</p>
              </div>
              <div className="status-card gray" style={{
                padding: "24px",
                background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                textAlign: "center"
              }}>
                <div style={{ marginBottom: 12 }}>
                  <TrendingUp size={32} style={{ color: "#475569" }} />
                </div>
                <h2 style={{ fontSize: 36, margin: "0 0 8px 0", fontWeight: 700, color: "#1e293b" }}>0%</h2>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#475569" }}>Success Rate</p>
              </div>
              <div className="status-card teal" style={{
                padding: "24px",
                background: "linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)",
                borderRadius: "12px",
                border: "1px solid #5eead4",
                textAlign: "center"
              }}>
                <div style={{ marginBottom: 12 }}>
                  <GraduationCap size={32} style={{ color: "#0f766e" }} />
                </div>
                <h2 style={{ fontSize: 36, margin: "0 0 8px 0", fontWeight: 700, color: "#134e4a" }}>{students.length}</h2>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#0f766e" }}>Active Students</p>
              </div>
            </div>
          </>
        )}

        {/* ================= UNIVERSITIES SECTION (NEW ONLY) ================= */}
        {activeSection === "universities" && (
        <div style={{ padding: "24px" }}>

            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
                <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>University Search</h1>
                <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>
                Find the perfect course for your students
                </p>
            </div>

            <button 
              className="outline-btn" 
              onClick={() => setShowFilters((prev) => !prev)}
              style={{
                padding: "11px 20px",
                borderRadius: "10px",
                border: "2px solid #e2e8f0",
                background: showFilters ? "#f8fafc" : "#fff",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.background = "#f8fafc";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.background = showFilters ? "#f8fafc" : "#fff";
              }}
            >
              <Filter size={16} /> Filters
            </button>
            </div>

            {/* SEARCH BOX */}
            <div
            style={{
                padding: 24,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
            }}
            >
            <div style={{ position: "relative" }}>
              <Search 
                size={20} 
                style={{ 
                  position: "absolute", 
                  left: "14px", 
                  top: "50%", 
                  transform: "translateY(-50%)",
                  color: "#94a3b8"
                }} 
              />
              <input
                  type="text"
                  placeholder="Search universities or courses..."
                  value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                      width: "100%",
                      padding: "12px 14px 12px 44px",
                      borderRadius: 10,
                      border: "2px solid #e2e8f0",
                      outline: "none",
                      fontSize: 14,
                      background: "#ffffff",
                      color: "#0f172a",
                      transition: "all 0.2s",
                      boxSizing: "border-box"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#667eea";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  />
            </div>


{showFilters && (
  <>
  <div
    style={{
      marginTop: 20,
      marginBottom: 20,
      height: 1,
      backgroundColor: "#e2e8f0",
    }}
  />

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 20,
      alignItems: "flex-end",
    }}
  >
    {/* Country */}
    <div>
      <label
        style={{
          display: "block",
          marginBottom: 8,
          fontSize: 14,
          fontWeight: 600,
          color: "#334155",
        }}
      >
        Country
      </label>
      <select
      value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 10,
          border: "2px solid #e2e8f0",
          background: "#ffffff",
          fontSize: 14,
          color: "#0f172a",
          outline: "none",
          cursor: "pointer",
          transition: "all 0.2s"
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#667eea";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e2e8f0";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <option value="">All Countries</option>
  <option value="Australia">Australia</option>
  <option value="Canada">Canada</option>
  <option value="France">France</option>
  <option value="Germany">Germany</option>
  <option value="Ireland">Ireland</option>
  <option value="Netherlands">Netherlands</option>
  <option value="New Zealand">New Zealand</option>
  <option value="Singapore">Singapore</option>
  <option value="United Kingdom">United Kingdom</option>
  <option value="United States">United States</option>
        
      </select>
    </div>

    {/* Level */}
    <div>
      <label
        style={{
          display: "block",
          marginBottom: 8,
          fontSize: 14,
          fontWeight: 600,
          color: "#334155",
        }}
      >
        Level
      </label>
      <select
      value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 10,
          border: "2px solid #e2e8f0",
          background: "#ffffff",
          fontSize: 14,
          color: "#0f172a",
          outline: "none",
          cursor: "pointer",
          transition: "all 0.2s"
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#667eea";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e2e8f0";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <option value="">All Levels</option>
  <option value="Undergraduate">Undergraduate</option>
  <option value="Postgraduate">Postgraduate</option>
      </select>
    </div>

    {/* Intake Month */}
    <div>
      <label
        style={{
          display: "block",
          marginBottom: 8,
          fontSize: 14,
          fontWeight: 600,
          color: "#334155",
        }}
      >
        Intake Month
      </label>
      <select
      value={filterIntake}
          onChange={(e) => setFilterIntake(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 10,
          border: "2px solid #e2e8f0",
          background: "#ffffff",
          fontSize: 14,
          color: "#0f172a",
          outline: "none",
          cursor: "pointer",
          transition: "all 0.2s"
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#667eea";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e2e8f0";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <option value="">All Intakes</option>
  <option value="Jan">Jan</option>
  <option value="Feb">Feb</option>
  <option value="Mar">Mar</option>
  <option value="Apr">Apr</option>
  <option value="May">May</option>
  <option value="Jun">Jun</option>
  <option value="Jul">Jul</option>
  <option value="Aug">Aug</option>
  <option value="Sep">Sep</option>
  <option value="Oct">Oct</option>
  <option value="Nov">Nov</option>
  <option value="Dec">Dec</option>
  <option value="No Open Intakes">No Open Intakes</option>
      </select>
    </div>
  </div>
  </>
)}


</div>


            {/* COUNT */}
            <div style={{ marginTop: 20, color: "#64748b", fontSize: 14, fontWeight: 500 }}>
  Showing {paginatedUniversities.length} of {filteredUniversities11.length} courses
</div>


            {universities.length === 0 ? (
  <div
    style={{
      marginTop: 20,
      padding: 80,
      border: "1px solid #e2e8f0",
      borderRadius: 12,
      textAlign: "center",
      background: "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
    }}
  >
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 16px",
      }}
    >
      <GraduationCap size={32} style={{ color: "#cbd5e1" }} />
    </div>
    <h3 style={{ marginBottom: 6, color: "#0f172a" }}>No courses found</h3>
    <p style={{ color: "#64748b", margin: 0 }}>
      Try adjusting your search or filters
    </p>
  </div>
) : (
   <div
  style={{
    marginTop: 20,
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    background: "#fff",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
  }}
>
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr
        style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          textAlign: "left",
          fontSize: 13,
          color: "#64748b",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.5px"
        }}
      >
        <th style={{ padding: "16px 20px" }}>University</th>
        <th style={{ padding: "16px 20px" }}>Course</th>
        <th style={{ padding: "16px 20px" }}>Study Level</th>
        <th style={{ padding: "16px 20px" }}>Campus</th>
        <th style={{ padding: "16px 20px" }}>Country</th>
        <th style={{ padding: "16px 20px" }}>Duration</th>
        <th style={{ padding: "16px 20px" }}>Open Intakes</th>
      </tr>
    </thead>

    <tbody>
      {paginatedUniversities.map((u, i) => (
        <tr
          key={i}
          style={{
            borderTop: "1px solid #f1f5f9",
            fontSize: 14,
            color: "#0f172a",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f8fafc";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          {/* University */}
          <td style={{ padding: "18px 20px", fontWeight: 600 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <GraduationCap size={18} style={{ color: "#667eea" }} />
              {u.University}
            </div>
          </td>

          {/* Course */}
          <td style={{ padding: "18px 20px", color: "#475569" }}>
            {u.Program_Name}
          </td>

          {/* Study Level */}
          <td style={{ padding: "18px 20px" }}>
            <span style={{
              padding: "4px 10px",
              borderRadius: 999,
              background: "#eff6ff",
              color: "#3b82f6",
              fontSize: 12,
              fontWeight: 600
            }}>
              {u.Study_Level}
            </span>
          </td>

          {/* Campus */}
          <td style={{ padding: "18px 20px", color: "#475569" }}>
            {u.Campus}
          </td>

          {/* Country */}
          <td style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#475569" }}>
              <Globe size={16} style={{ color: "#64748b" }} />
              {u.Country}
            </div>
          </td>

          {/* Duration */}
          <td style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#475569" }}>
              <Clock size={16} style={{ color: "#64748b" }} />
              {u.Duration}
            </div>
          </td>

          {/* Open Intakes */}
          <td style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#475569" }}>
              <Calendar size={16} style={{ color: "#64748b" }} />
              {u.Open_Intakes}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
)}


<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  }}
>
  <span style={{ fontSize: 14, color: "#64748b", fontWeight: 500 }}>
    Page {currentPage} of {totalPages}
  </span>

  <div style={{ display: "flex", gap: 10 }}>
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
      style={{
        padding: "10px 18px",
        borderRadius: 10,
        border: "2px solid #e2e8f0",
        background: currentPage === 1 ? "#f8fafc" : "#fff",
        cursor: currentPage === 1 ? "not-allowed" : "pointer",
        color: currentPage === 1 ? "#94a3b8" : "#0f172a",
        fontWeight: 600,
        fontSize: 14,
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        gap: 6
      }}
      onMouseEnter={(e) => {
        if (currentPage !== 1) {
          e.currentTarget.style.borderColor = "#667eea";
          e.currentTarget.style.background = "#f8fafc";
        }
      }}
      onMouseLeave={(e) => {
        if (currentPage !== 1) {
          e.currentTarget.style.borderColor = "#e2e8f0";
          e.currentTarget.style.background = "#fff";
        }
      }}
    >
      ◀ Previous
    </button>

    <button
      disabled={currentPage === totalPages || totalPages === 0}
      onClick={() => setCurrentPage((p) => p + 1)}
      style={{
        padding: "10px 18px",
        borderRadius: 10,
        border: "2px solid #e2e8f0",
        background: currentPage === totalPages || totalPages === 0 ? "#f8fafc" : "#fff",
        cursor: currentPage === totalPages || totalPages === 0 ? "not-allowed" : "pointer",
        color: currentPage === totalPages || totalPages === 0 ? "#94a3b8" : "#0f172a",
        fontWeight: 600,
        fontSize: 14,
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        gap: 6
      }}
      onMouseEnter={(e) => {
        if (currentPage !== totalPages && totalPages !== 0) {
          e.currentTarget.style.borderColor = "#667eea";
          e.currentTarget.style.background = "#f8fafc";
        }
      }}
      onMouseLeave={(e) => {
        if (currentPage !== totalPages && totalPages !== 0) {
          e.currentTarget.style.borderColor = "#e2e8f0";
          e.currentTarget.style.background = "#fff";
        }
      }}
    >
      Next ▶
    </button>
  </div>
</div>



{/* <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  }}
>
  <span style={{ fontSize: 14, color: "#64748b" }}>
    Page {currentPage} of {totalPages}
  </span>

  <div style={{ display: "flex", gap: 8 }}>
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
      style={{
        padding: "8px 14px",
        borderRadius: 8,
        border: "1px solid #e2e8f0",
        background: currentPage === 1 ? "#f1f5f9" : "#fff",
        cursor: currentPage === 1 ? "not-allowed" : "pointer",
        color: currentPage === 1 ? "#94a3b8" : "#0f172a",
      }}
    >
      ◀ Previous
    </button>

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((p) => p + 1)}
      style={{
        padding: "8px 14px",
        borderRadius: 8,
        border: "1px solid #e2e8f0",
        background: currentPage === totalPages ? "#f1f5f9" : "#fff",
        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        color: currentPage === totalPages ? "#94a3b8" : "#0f172a",
      }}
    >
      Next ▶
    </button>
  </div>
</div> */}




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
    border: "1px solid #dddedf",
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

            <div style={{ marginTop: 16, color: "#64748b", fontSize: 14 }}>
  Showing {paginatedStudents.length} of {filteredStudents.length} students
</div>


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
      {paginatedStudents.map((s, i) => (
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
                <User size={18} />
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
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Mail size={16} style={{ color: "#64748b" }} />
              {s.email}
            </span>
          </td>

          {/* Phone */}
          <td style={{ padding: "16px 20px", color: "#334155" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Phone size={16} style={{ color: "#64748b" }} />
              {s.phone}
            </span>
          </td>

          {/* Nationality */}
          <td style={{ padding: "16px 20px", color: "#334155" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Globe size={16} style={{ color: "#64748b" }} />
              {s.nationality}
            </span>
          </td>

          {/* Added */}
          <td style={{ padding: "16px 20px", color: "#334155" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Calendar size={16} style={{ color: "#64748b" }} />
              {s.added}
            </span>
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
              padding: "8px",
              cursor: "pointer",
              border: "none",
              background: "#eff6ff",
              borderRadius: "6px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "8px",
              transition: "all 0.2s"
            }}
            onClick={() => handleEditClick(s.id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#dbeafe";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#eff6ff";
            }}
           >
             <Edit2 size={16} style={{ color: "#3b82f6" }} />
           </button>

           <button
           style={{
              padding: "8px",
              cursor: "pointer",
              border: "none",
              background: "#fef2f2",
              borderRadius: "6px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            }}
            onClick={() => {
    setDeleteStudentId(s.id);
    setShowDeleteConfirm(true);
  }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fee2e2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fef2f2";
            }}
           >
             <Trash2 size={16} style={{ color: "#ef4444" }} />
           </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

)}

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  }}
>
  <span style={{ fontSize: 14, color: "#64748b" }}>
    Page {currentStudentPage} of {totalStudentPages}
  </span>

  <div style={{ display: "flex", gap: 8 }}>
    <button
      disabled={currentStudentPage === 1}
      onClick={() => setCurrentStudentPage((p) => p - 1)}
      style={{
        padding: "8px 14px",
        borderRadius: 8,
        border: "1px solid #e2e8f0",
        background: currentStudentPage === 1 ? "#f1f5f9" : "#fff",
        cursor: currentStudentPage === 1 ? "not-allowed" : "pointer",
        color: currentStudentPage === 1 ? "#94a3b8" : "#0f172a",
      }}
    >
      ◀ Previous
    </button>

    <button
      disabled={currentStudentPage === totalStudentPages}
      onClick={() => setCurrentStudentPage((p) => p + 1)}
      style={{
        padding: "8px 14px",
        borderRadius: 8,
        border: "1px solid #e2e8f0",
        background:
          currentStudentPage === totalStudentPages ? "#f1f5f9" : "#fff",
        cursor:
          currentStudentPage === totalStudentPages
            ? "not-allowed"
            : "pointer",
        color:
          currentStudentPage === totalStudentPages
            ? "#94a3b8"
            : "#0f172a",
      }}
    >
      Next ▶
    </button>
  </div>
</div>




            {/* Div for Add Student Modal */}


            {showAddStudent && (
                <div
                    style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                    padding: "20px"
                    }}
                    onClick={() => setShowAddStudent(false)}
                >
                    <div
                    style={{
                        background: "#fff",
                        width: "100%",
                        maxWidth: "800px",
                        borderRadius: 16,
                        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                        overflow: "hidden",
                        animation: "slideUp 0.3s ease-out"
                    }}
                    onClick={(e) => e.stopPropagation()}
                    >
                    {/* Header */}
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "24px 28px",
                        borderBottom: "1px solid #e2e8f0",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                    >
                        <div>
                          <h2 style={{ margin: 0, color: "#fff", fontSize: "22px", fontWeight: 700 }}>Add New Student</h2>
                          <p style={{ margin: "4px 0 0 0", color: "rgba(255,255,255,0.9)", fontSize: "14px" }}>Fill in the student details below</p>
                        </div>
                        <button
                        onClick={() => setShowAddStudent(false)}
                        style={{
                            background: "rgba(255,255,255,0.2)",
                            border: "none",
                            width: "36px",
                            height: "36px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                        }}
                        >
                        <X size={20} />
                        </button>
                    </div>

                    {/* Form */}
                    <div style={{ padding: "28px", maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
                    <div
                        style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 20,
                        }}
                    >
                        {/* First Name */}
                        <div>
                        <label style={{ 
                          display: "block",
                          fontSize: 14, 
                          fontWeight: 600,
                          color: "#334155",
                          marginBottom: 8
                        }}>
                            First Name <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <input
                            style={{
                              ...inputStyle,
                              border: "2px solid #e2e8f0",
                              transition: "all 0.2s",
                              fontSize: 15
                            }}
                            placeholder="Enter first name"
                            name="first_name"
                            onChange={handleChange}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#667eea";
                              e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e2e8f0";
                              e.target.style.boxShadow = "none";
                            }}
                        />
                        </div>

                        {/* Last Name */}
                        <div>
                        <label style={{ 
                          display: "block",
                          fontSize: 14, 
                          fontWeight: 600,
                          color: "#334155",
                          marginBottom: 8
                        }}>
                            Last Name <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <input 
                            style={{
                              ...inputStyle,
                              border: "2px solid #e2e8f0",
                              transition: "all 0.2s",
                              fontSize: 15
                            }}
                            placeholder="Enter last name"
                            name="last_name" 
                            onChange={handleChange}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#667eea";
                              e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e2e8f0";
                              e.target.style.boxShadow = "none";
                            }}
                        />
                        </div>

                        {/* Email */}
                        <div>
                        <label style={{ 
                          display: "block",
                          fontSize: 14, 
                          fontWeight: 600,
                          color: "#334155",
                          marginBottom: 8
                        }}>
                            Email <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <input 
                            style={{
                              ...inputStyle,
                              border: "2px solid #e2e8f0",
                              transition: "all 0.2s",
                              fontSize: 15
                            }}
                            placeholder="student@example.com"
                            type="email"
                            name="email" 
                            onChange={handleChange}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#667eea";
                              e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e2e8f0";
                              e.target.style.boxShadow = "none";
                            }}
                        />
                        </div>

                        {/* Phone */}
                        <div>
                        <label style={{ 
                          display: "block",
                          fontSize: 14, 
                          fontWeight: 600,
                          color: "#334155",
                          marginBottom: 8
                        }}>
                            Phone
                        </label>
                        <input 
                            style={{
                              ...inputStyle,
                              border: "2px solid #e2e8f0",
                              transition: "all 0.2s",
                              fontSize: 15
                            }}
                            placeholder="+1 (555) 000-0000"
                            name="phone" 
                            onChange={handleChange}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#667eea";
                              e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e2e8f0";
                              e.target.style.boxShadow = "none";
                            }}
                        />
                        </div>

                        {/* Date of Birth */}
                        <div>
                        <label style={{ 
                          display: "block",
                          fontSize: 14, 
                          fontWeight: 600,
                          color: "#334155",
                          marginBottom: 8
                        }}>
                            Date of Birth
                        </label>
                        <input 
                            type="date" 
                            style={{
                              ...inputStyle,
                              border: "2px solid #e2e8f0",
                              transition: "all 0.2s",
                              fontSize: 15
                            }}
                            name="dob" 
                            onChange={handleChange}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#667eea";
                              e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e2e8f0";
                              e.target.style.boxShadow = "none";
                            }}
                        />
                        </div>

                        {/* Nationality */}
                        <div>
                        <label style={{ 
                          display: "block",
                          fontSize: 14, 
                          fontWeight: 600,
                          color: "#334155",
                          marginBottom: 8
                        }}>
                            Nationality
                        </label>
                        <input 
                            style={{
                              ...inputStyle,
                              border: "2px solid #e2e8f0",
                              transition: "all 0.2s",
                              fontSize: 15
                            }}
                            placeholder="e.g., Indian"
                            name="nationality" 
                            onChange={handleChange}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#667eea";
                              e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e2e8f0";
                              e.target.style.boxShadow = "none";
                            }}
                        />
                        </div>

                        {/* Passport Number */}
                        <div>
                        <label style={{ 
                          display: "block",
                          fontSize: 14, 
                          fontWeight: 600,
                          color: "#334155",
                          marginBottom: 8
                        }}>
                            Passport Number
                        </label>
                        <input 
                            style={{
                              ...inputStyle,
                              border: "2px solid #e2e8f0",
                              transition: "all 0.2s",
                              fontSize: 15
                            }}
                            placeholder="Enter passport number"
                            name="passport_num" 
                            onChange={handleChange}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#667eea";
                              e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e2e8f0";
                              e.target.style.boxShadow = "none";
                            }}
                        />
                        </div>

                        {/* Current Education */}
                        <div>
                        <label style={{ 
                          display: "block",
                          fontSize: 14, 
                          fontWeight: 600,
                          color: "#334155",
                          marginBottom: 8
                        }}>
                            Current Education
                        </label>
                        <input
                            style={{
                              ...inputStyle,
                              border: "2px solid #e2e8f0",
                              transition: "all 0.2s",
                              fontSize: 15
                            }}
                            name="education"
                            placeholder="e.g., Bachelor's in Computer Science"
                            onChange={handleChange}
                            onFocus={(e) => {
                              e.target.style.borderColor = "#667eea";
                              e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = "#e2e8f0";
                              e.target.style.boxShadow = "none";
                            }}
                        />
                        </div>
                    </div>
                    </div>

                    {/* Actions */}
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 12,
                        padding: "20px 28px",
                        borderTop: "1px solid #e2e8f0",
                        background: "#f8fafc"
                        }}
                    >
                        <button
                        onClick={() => setShowAddStudent(false)}
                        style={{
                            padding: "12px 24px",
                            borderRadius: 10,
                            border: "2px solid #e2e8f0",
                            background: "#fff",
                            cursor: "pointer",
                            fontWeight: 600,
                            color: "#64748b",
                            fontSize: 15,
                            transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f1f5f9";
                          e.currentTarget.style.borderColor = "#cbd5e1";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#fff";
                          e.currentTarget.style.borderColor = "#e2e8f0";
                        }}
                        >
                        Cancel
                        </button>

                        <button
                        onClick={handleAddStudent}
                        style={{
                            padding: "12px 28px",
                            borderRadius: 10,
                            border: "none",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "#fff",
                            cursor: "pointer",
                            fontWeight: 600,
                            fontSize: 15,
                            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                            transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
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


        {/* ================= AGENTS SECTION (ADMIN ONLY) ================= */}
        {activeSection === "agents" && userRole === "Admin" && (
          <div style={{ padding: "24px" }}>
            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h1 style={{ marginBottom: 4 }}>Agents</h1>
                <p style={{ color: "#64748b" }}>Manage your agent accounts ({agents.length} total)</p>
              </div>
              <button className="add-student-btn" onClick={() => setShowAddAgentModal(true)}>
                <Plus size={18} />
                <span>Add Agent</span>
              </button>
            </div>

            {/* AGENTS TABLE */}
            {!agents || agents.length === 0 ? (
              <div style={{ padding: 80, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff", textAlign: "center" }}>
                <div style={{ fontSize: 42, marginBottom: 12, color: "#94a3b8" }}>
                  <UserPlus size={48} style={{ margin: "0 auto" }} />
                </div>
                <h3 style={{ marginBottom: 6 }}>No agents found</h3>
                <p style={{ color: "#64748b", marginBottom: 20 }}>Add your first agent to get started</p>
                <button className="add-student-btn" onClick={() => setShowAddAgentModal(true)}>
                  <Plus size={18} />
                  <span>Add Agent</span>
                </button>
              </div>
            ) : (
              <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", textAlign: "left", fontSize: 13, color: "#fff" }}>
                      <th style={{ padding: "14px 20px" }}>Company Name</th>
                      <th style={{ padding: "14px 20px" }}>Agent Name</th>
                      <th style={{ padding: "14px 20px" }}>Email</th>
                      <th style={{ padding: "14px 20px" }}>Phone</th>
                      <th style={{ padding: "14px 20px" }}>Status</th>
                      <th style={{ padding: "14px 20px" }}>Created</th>
                      <th style={{ padding: "14px 20px", textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((agent: any) => (
                      <tr key={agent.id} style={{ borderTop: "1px solid #e2e8f0", fontSize: 14, color: "#0f172a" }}>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#4f46e5", fontSize: 16 }}>
                              <Building2 size={18} />
                            </div>
                            <div style={{ fontWeight: 600 }}>{agent.company_name}</div>
                          </div>
                        </td>
                        <td style={{ padding: "16px 20px", color: "#334155" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <User size={16} style={{ color: "#64748b" }} />
                            {agent.user_name}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", color: "#334155" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Mail size={16} style={{ color: "#64748b" }} />
                            {agent.email}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", color: "#334155" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Phone size={16} style={{ color: "#64748b" }} />
                            {agent.phone}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ 
                            padding: "4px 12px", 
                            borderRadius: 20, 
                            fontSize: 12, 
                            fontWeight: 600,
                            background: agent.status === "Active" ? "#dcfce7" : "#fee2e2",
                            color: agent.status === "Active" ? "#166534" : "#991b1b"
                          }}>
                            {agent.status}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", color: "#334155" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Calendar size={16} style={{ color: "#64748b" }} />
                            {new Date(agent.created_at).toLocaleDateString()}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", textAlign: "right" }}>
                          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                            <button
                              onClick={() => {
                                setEditingAgent(agent);
                                setShowEditAgentModal(true);
                              }}
                              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                            >
                              <Edit2 size={16} style={{ color: "#667eea" }} />
                            </button>
                            <button
                              onClick={() => {
                                setDeletingAgentId(agent.id);
                                setShowDeleteAgentModal(true);
                              }}
                              style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #fee2e2", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                            >
                              <Trash2 size={16} style={{ color: "#ef4444" }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
            <button className="add-student-btn" onClick={openApplicationModal}>
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
                color: "#0f172a",
                border: "1px solid #e2e8f0",
                outline: "none",
                fontSize: 14,
                background: "#fff",
                }}

                value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setCurrentApplicationPage(1); // reset page
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

                value={statusFilter}
  onChange={(e) => {
    setStatusFilter(e.target.value);
    setCurrentApplicationPage(1); // reset page
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



            <div style={{ marginTop: 16, color: "#64748b", fontSize: 14 }}>
  Showing {paginatedApplications.length} of {filteredApplications.length} applications

</div>

            {/* EMPTY STATE */}
            {filteredApplications.length === 0 ? (
  <div
    style={{
      padding: 80,
      border: "1px solid #e2e8f0",
      borderRadius: 12,
      background: "#fff",
      textAlign: "center",
    }}
  >
    <div style={{ 
      fontSize: 48, 
      marginBottom: 16, 
      color: "#94a3b8",
      display: "flex",
      justifyContent: "center"
    }}>
      <FileText size={64} style={{ color: "#cbd5e1" }} />
    </div>

    <h3 style={{ marginBottom: 8 }}>No applications found</h3>

    <p style={{ color: "#64748b", marginBottom: 24 }}>
      Submit your first application to get started
    </p>

    <button className="add-student-btn" onClick={openApplicationModal}>
      <span style={{ fontSize: 18, lineHeight: 0 }}>+</span>
      <span>New Application</span>
    </button>
  </div>
) : (

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
        <th style={{ padding: "14px 20px" }}>Student</th>
        <th style={{ padding: "14px 20px" }}>University</th>
        <th style={{ padding: "14px 20px" }}>Course</th>
        <th style={{ padding: "14px 20px" }}>Preferred Intake</th>
        <th style={{ padding: "14px 20px" }}>Status</th>
        <th style={{ padding: "14px 20px", textAlign: "right" }}>Actions</th>
      </tr>
    </thead>

    <tbody>
      {paginatedApplications.map((app) => (
        <tr
          key={app.id}
          style={{
            borderTop: "1px solid #e2e8f0",
            fontSize: 14,
            color: "#0f172a",
          }}
        >
          {/* Student */}
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
                }}
              >
                <User size={18} />
              </div>
              <span style={{ fontWeight: 600 }}>{app.student_name}</span>
            </div>
          </td>

          {/* University */}
          <td style={{ padding: "16px 20px", color: "#334155" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <GraduationCap size={16} style={{ color: "#64748b" }} />
              {app.university_name}
            </span>
          </td>

          {/* Course */}
          <td style={{ padding: "16px 20px", color: "#334155" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <BookOpen size={16} style={{ color: "#64748b" }} />
              {app.course_name}
            </span>
          </td>

          {/* Intake */}
          <td style={{ padding: "16px 20px", color: "#334155" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Calendar size={16} style={{ color: "#64748b" }} />
              {app.pref_intake || "-"}
            </span>
          </td>

          {/* Status */}
          <td style={{ padding: "16px 20px" }}>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: 20,
                fontSize: 12,
                background: "#fff7ed",
                color: "#f97316",
                border: "1px solid #fed7aa",
                fontWeight: 500,
              }}
            >
              {app.status}
            </span>
          </td>

          {/* Actions */}
          <td
            style={{
              padding: "16px 20px",
              textAlign: "right",
            }}
          >
            <button
              style={{
                padding: "8px",
                cursor: "pointer",
                border: "none",
                background: "#eff6ff",
                borderRadius: "6px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "8px",
                transition: "all 0.2s"
              }}
              onClick={() => handleEditApplication(app)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#dbeafe";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#eff6ff";
              }}
            >
              <Edit2 size={16} style={{ color: "#3b82f6" }} />
            </button>
            <button
              style={{
                padding: "8px",
                cursor: "pointer",
                border: "none",
                background: "#fef2f2",
                borderRadius: "6px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s"
              }}
              onClick={() => {
                setDeleteApplicationId(app.id);
                setShowDeleteApplicationConfirm(true);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fee2e2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fef2f2";
              }}
            >
              <Trash2 size={16} style={{ color: "#ef4444" }} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
)}

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  }}
>
  <span style={{ fontSize: 14, color: "#64748b" }}>
    Page {currentApplicationPage} of {totalApplicationPages}
  </span>

  <div style={{ display: "flex", gap: 8 }}>
    <button
      disabled={currentApplicationPage === 1}
      onClick={() => setCurrentApplicationPage((p) => p - 1)}
      style={{
        padding: "8px 14px",
        borderRadius: 8,
        border: "1px solid #e2e8f0",
        background:
          currentApplicationPage === 1 ? "#f1f5f9" : "#fff",
        cursor:
          currentApplicationPage === 1 ? "not-allowed" : "pointer",
        color:
          currentApplicationPage === 1 ? "#94a3b8" : "#0f172a",
      }}
    >
      ◀ Previous
    </button>

    <button
      disabled={currentApplicationPage === totalApplicationPages}
      onClick={() => setCurrentApplicationPage((p) => p + 1)}
      style={{
        padding: "8px 14px",
        borderRadius: 8,
        border: "1px solid #e2e8f0",
        background:
          currentApplicationPage === totalApplicationPages
            ? "#f1f5f9"
            : "#fff",
        cursor:
          currentApplicationPage === totalApplicationPages
            ? "not-allowed"
            : "pointer",
        color:
          currentApplicationPage === totalApplicationPages
            ? "#94a3b8"
            : "#0f172a",
      }}
    >
      Next ▶
    </button>
  </div>
</div>




            {/* New Application Model */}

            {showApplicationModal && (
  <div 
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px"
    }}
    onClick={() => {resetApplicationForm(); setShowApplicationModal(false)}}
  >
    <div 
      style={{
        background: "#fff",
        width: "100%",
        maxWidth: "600px",
        borderRadius: 16,
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        overflow: "hidden"
      }}
      onClick={(e) => e.stopPropagation()}
    >

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 28px",
        borderBottom: "1px solid #e2e8f0",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}>
        <div>
          <h3 style={{ margin: 0, color: "#fff", fontSize: "22px", fontWeight: 700 }}>Submit New Application</h3>
          <p style={{ margin: "4px 0 0 0", color: "rgba(255,255,255,0.9)", fontSize: "14px" }}>Fill in the application details</p>
        </div>
        <button 
          onClick={() => {resetApplicationForm(); setShowApplicationModal(false)}}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            cursor: "pointer",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.2)";
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* BODY */}
      <div style={{ padding: "28px", maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>

        {/* STUDENT */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: "block",
            fontSize: 14, 
            fontWeight: 600,
            color: "#334155",
            marginBottom: 8
          }}>
            Student <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <select
            value={applicationForm.student_id}
            onChange={(e) =>
              setApplicationForm({ ...applicationForm, student_id: e.target.value })
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "2px solid #e2e8f0",
              fontSize: 15,
              outline: "none",
              background: "#fff",
              color: "#0f172a",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#667eea";
              e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.boxShadow = "none";
            }}
          >
            <option value="">Select a student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* COURSE */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: "block",
            fontSize: 14, 
            fontWeight: 600,
            color: "#334155",
            marginBottom: 8
          }}>
            Course <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <select
            value={applicationForm.course}
            onChange={(e) =>
              setApplicationForm({
                ...applicationForm,
                course: e.target.value,
                university: "",
              })
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "2px solid #e2e8f0",
              fontSize: 15,
              outline: "none",
              background: "#fff",
              color: "#0f172a",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#667eea";
              e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.boxShadow = "none";
            }}
          >
            <option value="">Select a course</option>
            {uniqueCourses.map((course, i) => (
              <option key={i} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* UNIVERSITY */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: "block",
            fontSize: 14, 
            fontWeight: 600,
            color: "#334155",
            marginBottom: 8
          }}>
            University <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <select
            value={applicationForm.university}
            onChange={(e) =>
              setApplicationForm({ ...applicationForm, university: e.target.value })
            }
            disabled={!applicationForm.course}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "2px solid #e2e8f0",
              fontSize: 15,
              outline: "none",
              background: applicationForm.course ? "#fff" : "#f1f5f9",
              color: applicationForm.course ? "#0f172a" : "#94a3b8",
              cursor: applicationForm.course ? "pointer" : "not-allowed",
              transition: "all 0.2s"
            }}
            onFocus={(e) => {
              if (applicationForm.course) {
                e.target.style.borderColor = "#667eea";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.boxShadow = "none";
            }}
          >
            <option value="">Select a university</option>
            {filteredUniversities.map((u, i) => (
              <option key={i} value={u.University}>
                {u.University}
              </option>
            ))}
          </select>
        </div>

        {/* INTAKE */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: "block",
            fontSize: 14, 
            fontWeight: 600,
            color: "#334155",
            marginBottom: 8
          }}>
            Preferred Intake
          </label>
          <input
            placeholder="e.g. September 2025"
            value={applicationForm.preferred_intake}
            onChange={(e) =>
              setApplicationForm({
                ...applicationForm,
                preferred_intake: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "2px solid #e2e8f0",
              fontSize: 15,
              outline: "none",
              background: "#fff",
              color: "#0f172a",
              transition: "all 0.2s",
              boxSizing: "border-box"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#667eea";
              e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        {/* NOTES */}
        <div style={{ marginBottom: 0 }}>
          <label style={{ 
            display: "block",
            fontSize: 14, 
            fontWeight: 600,
            color: "#334155",
            marginBottom: 8
          }}>
            Additional Notes
          </label>
          <textarea
            placeholder="Any additional information..."
            value={applicationForm.notes}
            onChange={(e) =>
              setApplicationForm({ ...applicationForm, notes: e.target.value })
            }
            rows={4}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "2px solid #e2e8f0",
              fontSize: 15,
              outline: "none",
              background: "#fff",
              color: "#0f172a",
              resize: "vertical",
              fontFamily: "inherit",
              transition: "all 0.2s",
              boxSizing: "border-box"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#667eea";
              e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

      </div>

      {/* FOOTER */}
      <div style={{ 
        display: "flex", 
        justifyContent: "flex-end", 
        gap: 12, 
        padding: "20px 28px",
        borderTop: "1px solid #e2e8f0",
        background: "#f8fafc"
      }}>
        <button 
          onClick={() => {resetApplicationForm(); setShowApplicationModal(false)}}
          style={{
            padding: "12px 24px",
            borderRadius: 10,
            border: "2px solid #e2e8f0",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 600,
            color: "#64748b",
            fontSize: 15,
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f1f5f9";
            e.currentTarget.style.borderColor = "#cbd5e1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          Cancel
        </button>

        <button 
          onClick={submitApplication}
          style={{
            padding: "12px 28px",
            borderRadius: 10,
            border: "none",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 15,
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
          }}
        >
          Submit Application
        </button>
      </div>
    </div>
  </div>
)}



{/* Edit Application Modal */}

{showEditApplicationModal && (
  <div className="modal-overlay">
    <div className="modal-card">

      {/* HEADER */}
      <div className="modal-header">
        <h3>Edit Application</h3>
        <button
          onClick={() => setShowEditApplicationModal(false)}
          style={{ background: "white", color: "black" }}
        >
          ✕
        </button>
      </div>

      {/* BODY */}
      <div className="modal-body">

        {/* STUDENT */}
        <label>Student *</label>
        <select
          value={editApplicationForm.student_id}
          onChange={(e) => {
            const selected = students.find(
              (s) => s.id === Number(e.target.value)
            );

            setEditApplicationForm({
              ...editApplicationForm,
              student_id: e.target.value,
              student_name: selected?.name || "",
            });
          }}
          style={{ width: "100%" }}
        >
          <option value="">Select student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {/* COURSE */}
        <label>Course *</label>
        <select
          value={editApplicationForm.course}
          onChange={(e) =>
            setEditApplicationForm({
              ...editApplicationForm,
              course: e.target.value,
              university: "",
            })
          }
          style={{ width: "100%" }}
        >
          <option value="">Select course</option>
          {uniqueCourses.map((course, i) => (
            <option key={i} value={course}>
              {course}
            </option>
          ))}
        </select>

        {/* UNIVERSITY */}
        <label>University *</label>
        <select
          value={editApplicationForm.university}
          onChange={(e) =>
            setEditApplicationForm({
              ...editApplicationForm,
              university: e.target.value,
            })
          }
          disabled={!editApplicationForm.course}
          style={{ width: "100%" }}
        >
          <option value="">Select university</option>
          {universities
            .filter((u) => u.Program_Name === editApplicationForm.course)
            .map((u, i) => (
              <option key={i} value={u.University}>
                {u.University}
              </option>
            ))}
        </select>

        {/* INTAKE */}
        <label>Preferred Intake</label>
        <input
          value={editApplicationForm.preferred_intake}
          onChange={(e) =>
            setEditApplicationForm({
              ...editApplicationForm,
              preferred_intake: e.target.value,
            })
          }
          style={{ width: "95%" }}
        />

        {/* STATUS */}
        <label>Status *</label>
        <select
          value={editApplicationForm.status}
          onChange={(e) =>
            setEditApplicationForm({
              ...editApplicationForm,
              status: e.target.value,
            })
          }
          style={{ width: "100%" }}
        >
          <option value="Submitted">Submitted</option>
          <option value="Under Review">Under Review</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Enrolled">Enrolled</option>
        </select>

        {/* NOTES */}
        <label>Additional Notes</label>
        <textarea
          value={editApplicationForm.notes}
          onChange={(e) =>
            setEditApplicationForm({
              ...editApplicationForm,
              notes: e.target.value,
            })
          }
          style={{ width: "95%" }}
        />
      </div>

      {/* FOOTER */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
        <button
          onClick={() => setShowEditApplicationModal(false)}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            background: "#fff",
            color: "#374151",
          }}
        >
          Cancel
        </button>

        <button
          onClick={updateApplication}
          style={{
            background: "#1d4ed8",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
          }}
        >
          Update Application
        </button>
        <br></br>
      </div>
      <br></br>
    </div>
  </div>
)}


{showDeleteApplicationConfirm && (
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
      <h3 style={{ marginBottom: 12 }}>Delete Application</h3>

      <p style={{ color: "#475569" }}>
        Are you sure you want to delete this application?
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
            setShowDeleteApplicationConfirm(false);
            setDeleteApplicationId(null);
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
            if (deleteApplicationId) {
              handleDeleteApplication(deleteApplicationId);
            }
            setShowDeleteApplicationConfirm(false);
            setDeleteApplicationId(null);
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
                <TrendingUp size={20} />
                </div>
            </div>

            {/* Paid */}
            <div style={cardStyle}>
                <div>
                <p style={labelStyle}>Paid</p>
                <h2 style={{ color: "#16a34a" }}>$0</h2>
                </div>
                <div style={{ ...iconBox, background: "#ecfdf5", color: "#16a34a" }}>
                <CheckCircle size={20} />
                </div>
            </div>

            {/* Due */}
            <div style={cardStyle}>
                <div>
                <p style={labelStyle}>Due / Payable</p>
                <h2 style={{ color: "#f97316" }}>$0</h2>
                </div>
                <div style={{ ...iconBox, background: "#fff7ed", color: "#f97316" }}>
                <Clock size={20} />
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
                <div style={{ 
                  fontSize: 42, 
                  color: "#94a3b8", 
                  marginBottom: 12,
                  display: "flex",
                  justifyContent: "center"
                }}>
                <DollarSign size={64} style={{ color: "#cbd5e1" }} />
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
                <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>Accommodation Services</h1>
                <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>
                Find housing for your students
                </p>
            </div>
            <button className="add-student-btn" onClick={() => setShowAccommodationModal(true)}>
            <Plus size={18} />
            <span>Request Accommodation</span>
            </button>
            </div>

            {/* Support Card */}
            <div
            style={{
                display: "flex",
                alignItems: "center",
                padding: 24,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                marginBottom: 24,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
            }}
            >
            <div
                style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
                }}
            >
                <Building2 size={24} style={{ color: "#fff" }} />
            </div>
            <div>
                <p style={{ fontWeight: 600, marginBottom: 6, fontSize: 16 }}>
                Student Accommodation Support
                </p>
                <p style={{ color: "#64748b", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
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
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
            }}
            >
            <p style={{ fontWeight: 700, marginBottom: 20, fontSize: 18 }}>Your Requests</p>

            {accommodationRequests.length === 0 ? (
  <div style={{ padding: 80, textAlign: "center", color: "#64748b" }}>
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 16px",
      }}
    >
      <Building2 size={32} style={{ color: "#cbd5e1" }} />
    </div>
    <h3 style={{ color: "#0f172a", marginBottom: 6 }}>
      No requests yet
    </h3>
    <p>Submit your first accommodation request</p>
  </div>
) : (
  <div
  style={{
    maxHeight: 520,
    overflowY: "auto",
    paddingRight: 6,
  }}
>
   <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
      gap: 20,
    }}
  >
    {visibleAccommodationRequests.map((item) => (
      <div
        key={item.id}
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: 20,
          background: "#fff",
          position: "relative",
          transition: "all 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        
        <div
  style={{
    position: "absolute",
    top: 16,
    right: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
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
      fontWeight: 600
    }}
  >
    {item.status}
  </span>

  <button
    style={{
      padding: "8px",
      cursor: "pointer",
      border: "none",
      background: "#eff6ff",
      borderRadius: "6px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s"
    }}
    onClick={() => {
    setEditAccommodation(item);
    setShowEditAccommodationModal(true);
  }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#dbeafe";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "#eff6ff";
    }}
  >
    <Edit2 size={16} style={{ color: "#3b82f6" }} />
  </button>

  <button
    style={{
      padding: "8px",
      cursor: "pointer",
      border: "none",
      background: "#fef2f2",
      borderRadius: "6px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s"
    }}
    onClick={() => {
    setDeleteAccommodationId(item.id);
    setShowDeleteAccommodationConfirm(true);
  }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#fee2e2";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "#fef2f2";
    }}
  >
    <Trash2 size={16} style={{ color: "#ef4444" }} />
  </button>
</div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#4f46e5",
      }}
    >
      <Building2 size={24} />
    </div>

    <div style={{ flex: 1 }}>
      <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{item.location}</h4>
      <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
        <User size={14} />
        {item.student_name}
      </p>
    </div>
  </div>

  <div style={{ 
    marginTop: 14, 
    fontSize: 14,
    display: "grid",
    gap: 10,
    paddingTop: 16,
    borderTop: "1px solid #f1f5f9"
  }}>
    <p style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, color: "#475569" }}>
      <Calendar size={16} style={{ color: "#64748b" }} />
      <span>Move-in: <strong>{item.move_in_date}</strong></span>
    </p>
    <p style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, color: "#475569" }}>
      <DollarSign size={16} style={{ color: "#64748b" }} />
      <span>Budget: <strong>{item.monthly_budget}</strong></span>
    </p>
    <p style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontSize: 13 }}>
      <Clock size={14} style={{ color: "#94a3b8" }} />
      Submitted: {new Date(item.submitted_at).toLocaleDateString()}
    </p>
  </div>

      </div>
    ))}
  </div>
   {hasMore && (
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <button
          onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}
          style={{
            padding: "12px 28px",
            borderRadius: 10,
            border: "2px solid #e2e8f0",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 600,
            color: "#667eea",
            fontSize: 15,
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f8fafc";
            e.currentTarget.style.borderColor = "#667eea";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          Load more
        </button>
      </div>
    )}
  </div>



)}





            
            </div>

            {/* Submit Accommodation Modal */}


            {showAccommodationModal && (
  <div 
    className="modal-overlay"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        resetForm();
        setShowAccommodationModal(false);
      }
    }}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px"
    }}
  >
    <div 
      className="modal-card accommodation-card"
      style={{
        background: "#fff",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "600px",
        maxHeight: "90vh",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* PREMIUM GRADIENT HEADER */}
      <div 
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "24px 28px",
          color: "#fff",
          position: "relative"
        }}
      >
        <h3 style={{ 
          margin: 0, 
          fontSize: "22px", 
          fontWeight: 700,
          marginBottom: "6px"
        }}>
          Request Accommodation
        </h3>
        <p style={{ 
          margin: 0, 
          fontSize: "14px", 
          opacity: 0.95,
          fontWeight: 400
        }}>
          Submit your accommodation requirements
        </p>
        <button
          onClick={() => {
            resetForm();
            setShowAccommodationModal(false);
          }}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(255, 255, 255, 0.2)",
            border: "none",
            borderRadius: "8px",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s",
            color: "#fff"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* SCROLLABLE FORM BODY */}
      <div 
        style={{
          padding: "28px",
          overflowY: "auto",
          flex: 1
        }}
      >
        {/* STUDENT DROPDOWN */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#374151"
          }}>
            Student (Optional)
          </label>
          <select
            value={form.student_name}
            onChange={(e) =>
              setForm({ ...form, student_name: e.target.value })
            }
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              transition: "all 0.2s",
              outline: "none",
              boxSizing: "border-box"
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#667eea";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <option value="">Select a student</option>
            {students.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151"
            }}>
              Location / City <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              placeholder="e.g. London, UK"
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "all 0.2s",
                outline: "none",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <div>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151"
            }}>
              Move-in Date
            </label>
            <input
              type="date"
              onChange={(e) =>
                setForm({ ...form, move_in_date: e.target.value })
              }
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "all 0.2s",
                outline: "none",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151"
            }}>
              Duration
            </label>
            <select
              onChange={(e) =>
                setForm({ ...form, duration: e.target.value })
              }
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "all 0.2s",
                outline: "none",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <option value="">Select duration</option>
              <option>3 Months</option>
              <option>6 Months</option>
              <option>1 Year</option>
              <option>2 Years</option>
            </select>
          </div>

          <div>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151"
            }}>
              Monthly Budget
            </label>
            <input
              placeholder="e.g. $800-1200"
              onChange={(e) =>
                setForm({ ...form, monthly_budget: e.target.value })
              }
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "all 0.2s",
                outline: "none",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#374151"
          }}>
            Preferences & Requirements
          </label>
          <textarea
            placeholder="Any specific preferences..."
            onChange={(e) =>
              setForm({ ...form, preferences: e.target.value })
            }
            rows={4}
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              transition: "all 0.2s",
              outline: "none",
              resize: "vertical",
              fontFamily: "inherit",
              boxSizing: "border-box"
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#667eea";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          padding: "20px 28px",
          background: "#f9fafb",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px"
        }}
      >
        <button 
          onClick={() => {
            resetForm();
            setShowAccommodationModal(false);
          }}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 500,
            color: "#374151",
            fontSize: "14px",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f9fafb";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
          }}
        >
          Cancel
        </button>
        <button
          onClick={submitAccommodation}
          style={{
            padding: "10px 24px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "14px",
            transition: "all 0.2s",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
          }}
        >
          Submit Request
        </button>
      </div>
    </div>
  </div>
)}



{/* Edit Accommodation Modal */}

{showEditAccommodationModal && editAccommodation && (
  <div 
    className="modal-overlay"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        setShowEditAccommodationModal(false);
      }
    }}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px"
    }}
  >
    <div 
      className="modal-card accommodation-card"
      style={{
        background: "#fff",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "600px",
        maxHeight: "90vh",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* PREMIUM GRADIENT HEADER */}
      <div 
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "24px 28px",
          color: "#fff",
          position: "relative"
        }}
      >
        <h3 style={{ 
          margin: 0, 
          fontSize: "22px", 
          fontWeight: 700,
          marginBottom: "6px"
        }}>
          Edit Accommodation Request
        </h3>
        <p style={{ 
          margin: 0, 
          fontSize: "14px", 
          opacity: 0.95,
          fontWeight: 400
        }}>
          Update accommodation details
        </p>
        <button
          onClick={() => setShowEditAccommodationModal(false)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(255, 255, 255, 0.2)",
            border: "none",
            borderRadius: "8px",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s",
            color: "#fff"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* SCROLLABLE FORM BODY */}
      <div 
        style={{
          padding: "28px",
          overflowY: "auto",
          flex: 1
        }}
      >
        {/* STATUS */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#374151"
          }}>
            Status <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <select
            value={editAccommodation.status}
            onChange={(e) =>
              setEditAccommodation({
                ...editAccommodation,
                status: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              transition: "all 0.2s",
              outline: "none",
              boxSizing: "border-box"
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#667eea";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Not Approved">Not Approved</option>
          </select>
        </div>

        {/* STUDENT */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#374151"
          }}>
            Student
          </label>
          <select
            value={editAccommodation.student_name || ""}
            onChange={(e) =>
              setEditAccommodation({
                ...editAccommodation,
                student_name: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              transition: "all 0.2s",
              outline: "none",
              boxSizing: "border-box"
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#667eea";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <option value="">Select a student</option>
            {students.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151"
            }}>
              Location / City <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              value={editAccommodation.location || ""}
              onChange={(e) =>
                setEditAccommodation({
                  ...editAccommodation,
                  location: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "all 0.2s",
                outline: "none",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <div>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151"
            }}>
              Move-in Date
            </label>
            <input
              type="date"
              value={editAccommodation.move_in_date || ""}
              onChange={(e) =>
                setEditAccommodation({
                  ...editAccommodation,
                  move_in_date: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "all 0.2s",
                outline: "none",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151"
            }}>
              Duration
            </label>
            <select
              value={editAccommodation.duration || ""}
              onChange={(e) =>
                setEditAccommodation({
                  ...editAccommodation,
                  duration: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "all 0.2s",
                outline: "none",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <option value="">Select duration</option>
              <option>3 Months</option>
              <option>6 Months</option>
              <option>1 Year</option>
              <option>2 Years</option>
            </select>
          </div>

          <div>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151"
            }}>
              Monthly Budget
            </label>
            <input
              value={editAccommodation.monthly_budget || ""}
              onChange={(e) =>
                setEditAccommodation({
                  ...editAccommodation,
                  monthly_budget: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                transition: "all 0.2s",
                outline: "none",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#374151"
          }}>
            Preferences & Requirements
          </label>
          <textarea
            value={editAccommodation.preferences || ""}
            onChange={(e) =>
              setEditAccommodation({
                ...editAccommodation,
                preferences: e.target.value,
              })
            }
            rows={4}
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              transition: "all 0.2s",
              outline: "none",
              resize: "vertical",
              fontFamily: "inherit",
              boxSizing: "border-box"
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#667eea";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          padding: "20px 28px",
          background: "#f9fafb",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px"
        }}
      >
        <button
          onClick={() => setShowEditAccommodationModal(false)}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 500,
            color: "#374151",
            fontSize: "14px",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f9fafb";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
          }}
        >
          Cancel
        </button>

        <button
          onClick={handleUpdateAccommodation}
          style={{
            padding: "10px 24px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "14px",
            transition: "all 0.2s",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
          }}
        >
          Update Request
        </button>
      </div>
    </div>
  </div>
)}


{/* Delete Accommodation Confirmation Modal */}


{showDeleteAccommodationConfirm && (
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
      <h3 style={{ marginBottom: 10 }}>Delete Accommodation</h3>

      <p style={{ color: "#475569", fontSize: 14 }}>
        Are you sure you want to delete this accommodation request?
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
        {/* NO */}
        <button
          onClick={() => {
            setShowDeleteAccommodationConfirm(false);
            setDeleteAccommodationId(null);
          }}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 500,
            color: "#374151",
          }}
        >
          No
        </button>

        {/* YES */}
        <button
          onClick={() => {
            if (deleteAccommodationId) {
              handleDeleteAccommodation(deleteAccommodationId);
            }
            setShowDeleteAccommodationConfirm(false);
            setDeleteAccommodationId(null);
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
                <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>Loan Services</h1>
                <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>
                Education financing support for students
                </p>
            </div>
            <button className="add-student-btn" onClick={() => setShowLoanModal(true)}>
            <Plus size={18} />
            <span>Request Loan Service</span>
            </button>
            </div>

            {/* Support Card */}
            <div
            style={{
                display: "flex",
                alignItems: "center",
                padding: 24,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                marginBottom: 24,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
            }}
            >
            <div
                style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
                }}
            >
                <CreditCard size={24} style={{ color: "#fff" }} />
            </div>
            <div>
                <p style={{ fontWeight: 600, marginBottom: 6, fontSize: 16 }}>
                Education Loan Support
                </p>
                <p style={{ color: "#64748b", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
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
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
            }}
            >
            <p style={{ fontWeight: 700, marginBottom: 20, fontSize: 18 }}>Your Requests</p>

            {loanRequests.length === 0 ? (
  <div style={{ padding: 80, textAlign: "center", color: "#64748b" }}>
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 16px",
      }}
    >
      <CreditCard size={32} style={{ color: "#cbd5e1" }} />
    </div>
    <h3 style={{ color: "#0f172a", marginBottom: 6 }}>
      No loan requests yet
    </h3>
    <p>Submit a loan service request for your students</p>
  </div>
) : (
  <div
      style={{
        maxHeight: 520,
        overflowY: "auto",
        paddingRight: 6,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
          gap: 20,
        }}
      >
    {visibleLoanRequests.map((item) => (
      <div
        key={item.id}
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: 20,
          background: "#fff",
          position: "relative",
          transition: "all 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        
        <div
  style={{
    position: "absolute",
    top: 16,
    right: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
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
      fontWeight: 600
    }}
  >
    {item.status}
  </span>

  <button
    style={{
      padding: "8px",
      cursor: "pointer",
      border: "none",
      background: "#eff6ff",
      borderRadius: "6px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s"
    }}
    onClick={() => {
    setEditingLoanId(item.id);
    setEditLoanForm({
      student_name: item.student_name,
      loan_amount: item.loan_amount,
      study_country: item.study_country,
      purpose: item.purpose,
      additional_notes: item.additional_notes || "",
      status: item.status,
    });
    setShowEditLoanModal(true);
  }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#dbeafe";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "#eff6ff";
    }}
  >
    <Edit2 size={16} style={{ color: "#3b82f6" }} />
  </button>

  <button
    style={{
      padding: "8px",
      cursor: "pointer",
      border: "none",
      background: "#fef2f2",
      borderRadius: "6px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s"
    }}
    onClick={() => {
    setLoanToDelete(item.id);
    setShowDeleteLoanModal(true);
  }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#fee2e2";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "#fef2f2";
    }}
  >
    <Trash2 size={16} style={{ color: "#ef4444" }} />
  </button>
</div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#4f46e5",
      }}
    >
      <User size={24} />
    </div>

    <div style={{ flex: 1 }}>
      <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{item.student_name}</h4>
      <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
        <DollarSign size={14} />
        {item.loan_amount}
      </p>
    </div>
  </div>

  <div style={{ 
    marginTop: 14, 
    fontSize: 14,
    display: "grid",
    gap: 10,
    paddingTop: 16,
    borderTop: "1px solid #f1f5f9"
  }}>
    <p style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, color: "#475569" }}>
      <BookOpen size={16} style={{ color: "#64748b" }} />
      <span>{item.purpose}</span>
    </p>
    <p style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, color: "#475569" }}>
      <Globe size={16} style={{ color: "#64748b" }} />
      <span>Country: <strong>{item.study_country}</strong></span>
    </p>
    <p style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontSize: 13 }}>
      <Clock size={14} style={{ color: "#94a3b8" }} />
      Submitted: {new Date(item.submitted_at).toLocaleDateString()}
    </p>
  </div>

      </div>
    ))}
  </div>


  {hasMoreLoans && (
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <button
          onClick={() =>
            setVisibleLoanCount((prev) => prev + LOAD_MORE_LOANS)
          }
          style={{
            padding: "12px 28px",
            borderRadius: 10,
            border: "2px solid #e2e8f0",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 600,
            color: "#667eea",
            fontSize: 15,
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f8fafc";
            e.currentTarget.style.borderColor = "#667eea";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          Load more
        </button>
      </div>
    )}


  </div>
)}


            {/* LOAN MODAL */}

            {showLoanModal && (
  <div 
    className="modal-overlay"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        resetLoanForm();
        setShowLoanModal(false);
      }
    }}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px"
    }}
  >
    <div 
      className="modal-card accommodation-card"
      style={{
        background: "#fff",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "600px",
        maxHeight: "90vh",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* PREMIUM GRADIENT HEADER */}
      <div 
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "24px 28px",
          color: "#fff",
          position: "relative"
        }}
      >
        <h3 style={{ 
          margin: 0, 
          fontSize: "22px", 
          fontWeight: 700,
          marginBottom: "6px"
        }}>
          Request Loan Service
        </h3>
        <p style={{ 
          margin: 0, 
          fontSize: "14px", 
          opacity: 0.95,
          fontWeight: 400
        }}>
          Submit your loan requirements
        </p>
        <button
          onClick={() => {
            resetLoanForm();
            setShowLoanModal(false);
          }}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(255, 255, 255, 0.2)",
            border: "none",
            borderRadius: "8px",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
          }}
        >
          <X size={20} style={{ color: "#fff" }} />
        </button>
      </div>

      {/* BODY */}
      <div 
        style={{
          padding: "28px",
          overflowY: "auto",
          flex: 1
        }}
      >

        {/* STUDENT */}
        <label style={{ 
          display: "block", 
          marginBottom: "8px", 
          fontSize: "14px", 
          fontWeight: 600, 
          color: "#334155" 
        }}>
          Student <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <select
          value={loanForm.student_name}
          onChange={(e) =>
            setLoanForm({ ...loanForm, student_name: e.target.value })
          }
          style={{ 
            width: "100%",
            padding: "12px 14px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "2px solid #e2e8f0",
            fontSize: "14px",
            outline: "none",
            background: "#ffffff",
            color: "#0f172a",
            transition: "all 0.2s"
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#667eea";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#e2e8f0";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <option value="">Select a student</option>
          {students.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontSize: "14px", 
              fontWeight: 600, 
              color: "#334155" 
            }}>
              Loan Amount <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              placeholder="e.g. $25,000"
              value={loanForm.loan_amount}
              onChange={(e) =>
                setLoanForm({ ...loanForm, loan_amount: e.target.value })
              }
              style={{ 
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "2px solid #e2e8f0",
                fontSize: "14px",
                outline: "none",
                background: "#ffffff",
                color: "#0f172a",
                transition: "all 0.2s",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontSize: "14px", 
              fontWeight: 600, 
              color: "#334155" 
            }}>
              Study Country
            </label>
            <input
              placeholder="e.g. United Kingdom"
              value={loanForm.study_country}
              onChange={(e) =>
                setLoanForm({ ...loanForm, study_country: e.target.value })
              }
              style={{ 
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "2px solid #e2e8f0",
                fontSize: "14px",
                outline: "none",
                background: "#ffffff",
                color: "#0f172a",
                transition: "all 0.2s",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
        </div>

        <label style={{ 
          display: "block", 
          marginBottom: "8px", 
          fontSize: "14px", 
          fontWeight: 600, 
          color: "#334155" 
        }}>
          Purpose
        </label>
        <select
          value={loanForm.purpose}
          onChange={(e) =>
            setLoanForm({ ...loanForm, purpose: e.target.value })
          }
          style={{ 
            width: "100%",
            padding: "12px 14px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "2px solid #e2e8f0",
            fontSize: "14px",
            outline: "none",
            background: "#ffffff",
            color: "#0f172a",
            transition: "all 0.2s"
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#667eea";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#e2e8f0";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <option value="">Select purpose</option>
          <option value="Tuition Fees">Tuition Fees</option>
          <option value="Living Expenses">Living Expenses</option>
          <option value="Tuition + Living">Tuition + Living</option>
        </select>

        <label style={{ 
          display: "block", 
          marginBottom: "8px", 
          fontSize: "14px", 
          fontWeight: 600, 
          color: "#334155" 
        }}>
          Additional Notes
        </label>
        <textarea
          placeholder="Any additional information..."
          value={loanForm.additional_notes}
          onChange={(e) =>
            setLoanForm({ ...loanForm, additional_notes: e.target.value })
          }
          rows={4}
          style={{ 
            width: "100%",
            padding: "12px 14px",
            borderRadius: "10px",
            border: "2px solid #e2e8f0",
            fontSize: "14px",
            outline: "none",
            background: "#ffffff",
            color: "#0f172a",
            transition: "all 0.2s",
            resize: "vertical",
            fontFamily: "inherit",
            boxSizing: "border-box"
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#667eea";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#e2e8f0";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>

      {/* FOOTER */}
      <div
        style={{
          padding: "20px 28px",
          background: "#f8fafc",
          borderTop: "1px solid #e2e8f0",
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
        }}
      >
        <button
          onClick={() => {
            resetLoanForm();
            setShowLoanModal(false);
          }}
          style={{
            padding: "11px 20px",
            borderRadius: "10px",
            border: "2px solid #e2e8f0",
            background: "#fff",
            cursor: "pointer",
            color: "#64748b",
            fontWeight: 600,
            fontSize: "14px",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f8fafc";
            e.currentTarget.style.borderColor = "#cbd5e1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          Cancel
        </button>

        <button
          onClick={submitLoanRequest}
          style={{
            padding: "11px 24px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "14px",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
          }}
        >
          Submit Request
        </button>
      </div>

    </div>
  </div>
)}



{/* Loan Edit Modal */}



{showEditLoanModal && (
  <div className="modal-overlay">
    <div className="modal-card accommodation-card">

      {/* HEADER */}
      <div className="modal-header">
        <h3>Edit Loan Request</h3>
        <button
          className="close-btn"
          onClick={() => setShowEditLoanModal(false)}
          style={{
            color:"black",
            background: "transparent",
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
          value={editLoanForm.student_name}
          onChange={(e) =>
            setEditLoanForm({ ...editLoanForm, student_name: e.target.value })
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
              value={editLoanForm.loan_amount}
              onChange={(e) =>
                setEditLoanForm({ ...editLoanForm, loan_amount: e.target.value })
              }
            />
          </div>

          <div>
            <label>Study Country</label>
            <input
              value={editLoanForm.study_country}
              onChange={(e) =>
                setEditLoanForm({ ...editLoanForm, study_country: e.target.value })
              }
            />
          </div>
        </div>

        <label>Purpose</label>
        <select
          value={editLoanForm.purpose}
          onChange={(e) =>
            setEditLoanForm({ ...editLoanForm, purpose: e.target.value })
          }
          style={{ width: "101%" }}
        >
          <option value="">Select purpose</option>
          <option value="Tuition Fees">Tuition Fees</option>
          <option value="Living Expenses">Living Expenses</option>
          <option value="Tuition + Living">Tuition + Living</option>
        </select>

        {/* STATUS (NEW) */}
        <label>Status *</label>
        <select
          value={editLoanForm.status}
          onChange={(e) =>
            setEditLoanForm({ ...editLoanForm, status: e.target.value })
          }
          style={{ width: "101%" }}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Not Approved">Not Approved</option>
        </select>

        <label>Additional Notes</label>
        <textarea
          value={editLoanForm.additional_notes}
          onChange={(e) =>
            setEditLoanForm({
              ...editLoanForm,
              additional_notes: e.target.value,
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
          onClick={() => setShowEditLoanModal(false)}
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
          onClick={updateLoanRequest}
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


{/* Delete Loan Confirmation Modal */}

{showDeleteLoanModal && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
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
      <h3 style={{ marginBottom: 10 }}>Delete Loan Request</h3>

      <p style={{ color: "#475569", marginBottom: 24 }}>
        Are you sure you want to delete this loan request?  
        This action cannot be undone.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
        }}
      >
        <button
          onClick={() => {
            setShowDeleteLoanModal(false);
            setLoanToDelete(null);
          }}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 500,
            color: "#374151",
          }}
        >
          No
        </button>

        <button
          onClick={confirmDeleteLoan}
          style={{
            padding: "10px 18px",
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
                <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700 }}>Test Preparation</h1>
                <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>
                IELTS, TOEFL, GRE, GMAT and more
                </p>
            </div>
            <button className="add-student-btn" onClick={() => setShowTestPrepModal(true)}>
            <Plus size={18} />
            <span>Request Test Prep</span>
            </button>
            </div>

            {/* Support Card */}
            <div
            style={{
                display: "flex",
                alignItems: "center",
                padding: 24,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                marginBottom: 24,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
            }}
            >
            <div
                style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
                }}
            >
                <BookOpen size={24} style={{ color: "#fff" }} />
            </div>
            <div>
                <p style={{ fontWeight: 600, marginBottom: 6, fontSize: 16 }}>
                Expert Test Preparation
                </p>
                <p style={{ color: "#64748b", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
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
            ].map((test) => {
  const isSelected = selectedTestTypes.includes(test);

  return (
    <button
      key={test}
      onClick={() => {
        setSelectedTestTypes((prev) =>
          prev.includes(test)
            ? prev.filter((t) => t !== test)
            : [...prev, test]
        );
      }}
      style={{
        padding: "14px 12px",
        border: isSelected ? "2px solid #667eea" : "2px solid #e2e8f0",
        borderRadius: 10,
        background: isSelected ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#ffffff",
        color: isSelected ? "#ffffff" : "#0f172a",
        textAlign: "center",
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: isSelected ? "0 4px 12px rgba(102, 126, 234, 0.3)" : "none"
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = "#cbd5e1";
          e.currentTarget.style.background = "#f8fafc";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = "#e2e8f0";
          e.currentTarget.style.background = "#ffffff";
        }
      }}
    >
      {test}
    </button>
  );
})}
            </div>
            



            {/* Requests Section */}
            <div
            style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#ffffff",
                padding: 24,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
            }}
            >
            <p style={{ fontWeight: 700, marginBottom: 20, fontSize: 18 }}>Your Requests</p>

            {testPrepRequests.length === 0 ? (
  <div style={{ padding: 80, textAlign: "center", color: "#64748b" }}>
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 16px",
      }}
    >
      <BookOpen size={32} style={{ color: "#cbd5e1" }} />
    </div>
    <h3 style={{ color: "#0f172a", marginBottom: 6 }}>
      No test prep requests yet
    </h3>
    <p>Submit a test preparation request for your students</p>
  </div>
) : (
  <div
      style={{
        maxHeight: 520,
        overflowY: "auto",
        paddingRight: 6,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
          gap: 20,
        }}
      >
    {visibleTestPrepRequests.map((item) => (
      <div
        key={item.id}
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: 20,
          background: "#fff",
          position: "relative",
          transition: "all 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        
        <div
  style={{
    position: "absolute",
    top: 16,
    right: 16,
    display: "flex",
    alignItems: "center",
    gap: 8,
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
      fontWeight: 600
    }}
  >
    {item.status}
  </span>

  <button
    style={{
      padding: "8px",
      cursor: "pointer",
      border: "none",
      background: "#eff6ff",
      borderRadius: "6px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s"
    }}
    onClick={() => {
    setEditTestPrepForm({
      id: item.id,
      student_name: item.student_name,
      test_type: item.test_type,
      target_score: item.target_score || "",
      expected_test_date: item.expected_test_date || "",
      current_level: item.current_level || "",
      additional_notes: item.additional_notes || "",
      status: item.status,
    });
    setShowEditTestPrepModal(true);
  }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#dbeafe";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "#eff6ff";
    }}
  >
    <Edit2 size={16} style={{ color: "#3b82f6" }} />
  </button>

  <button
    style={{
      padding: "8px",
      cursor: "pointer",
      border: "none",
      background: "#fef2f2",
      borderRadius: "6px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s"
    }}
    onClick={() => {
    setTestPrepToDelete(item.id);
    setShowDeleteTestPrepModal(true);
  }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#fee2e2";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "#fef2f2";
    }}
  >
    <Trash2 size={16} style={{ color: "#ef4444" }} />
  </button>
</div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#4f46e5",
      }}
    >
      <User size={24} />
    </div>

    <div style={{ flex: 1 }}>
      <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{item.student_name}</h4>
      <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
        <BookOpen size={14} />
        {item.test_type}
      </p>
    </div>
  </div>

  <div style={{ 
    marginTop: 14, 
    fontSize: 14,
    display: "grid",
    gap: 10,
    paddingTop: 16,
    borderTop: "1px solid #f1f5f9"
  }}>
    <p style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, color: "#475569" }}>
      <AlertCircle size={16} style={{ color: "#64748b" }} />
      <span>Target: <strong>{item.target_score || "-"}</strong></span>
    </p>
    <p style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, color: "#475569" }}>
      <Calendar size={16} style={{ color: "#64748b" }} />
      <span>Test Date: <strong>{item.expected_test_date}</strong></span>
    </p>
    <p style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontSize: 13 }}>
      <Clock size={14} style={{ color: "#94a3b8" }} />
      Submitted: {new Date(item.submitted_at).toLocaleDateString()}
    </p>
  </div>

      </div>
    ))}

    </div>


{hasMoreTestPrep && (
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <button
          onClick={() =>
            setVisibleTestPrepCount((prev) => prev + LOAD_MORE_COUNT1)
          }
          style={{
            padding: "12px 28px",
            borderRadius: 10,
            border: "2px solid #e2e8f0",
            background: "#fff",
            cursor: "pointer",
            fontWeight: 600,
            color: "#667eea",
            fontSize: 15,
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f8fafc";
            e.currentTarget.style.borderColor = "#667eea";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          Load more
        </button>
      </div>
    )}


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



{/* Edit Test Prep Modal */}

{showEditTestPrepModal && (
  <div className="modal-overlay">
    <div className="modal-card">

      {/* HEADER */}
      <div className="modal-header">
        <h3>Edit Test Preparation Request</h3>
        <button
          onClick={() => {
            setShowEditTestPrepModal(false);
            setEditTestPrepForm(initialEditTestPrepForm);
          }}
          className="close-btn"
          style={{
            color:"black",
            background: "white"
          }}
        >
          ✕
        </button>
      </div>

      {/* BODY */}
      <div className="modal-body">

        <label>Student *</label>
        <select
          value={editTestPrepForm.student_name}
          onChange={(e) =>
            setEditTestPrepForm({ ...editTestPrepForm, student_name: e.target.value })
          }
          style={{ width: "101%" }}
        >
          <option value="">Select a student</option>
          {students.map((s) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>

        <div className="row">
          <div>
            <label>Test Type *</label>
            <select
              value={editTestPrepForm.test_type}
              onChange={(e) =>
                setEditTestPrepForm({ ...editTestPrepForm, test_type: e.target.value })
              }
              style={{ width: "101%" }}
            >
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
              value={editTestPrepForm.target_score}
              onChange={(e) =>
                setEditTestPrepForm({ ...editTestPrepForm, target_score: e.target.value })
              }
            />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Expected Test Date</label>
            <input
              type="date"
              value={editTestPrepForm.expected_test_date}
              onChange={(e) =>
                setEditTestPrepForm({ ...editTestPrepForm, expected_test_date: e.target.value })
              }
            />
          </div>

          <div>
            <label>Current Level</label>
            <select
              value={editTestPrepForm.current_level}
              onChange={(e) =>
                setEditTestPrepForm({ ...editTestPrepForm, current_level: e.target.value })
              }
              style={{ width: "101%" }}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        {/* STATUS (NEW) */}
        <label>Status</label>
        <select
          value={editTestPrepForm.status}
          onChange={(e) =>
            setEditTestPrepForm({ ...editTestPrepForm, status: e.target.value })
          }
          style={{ width: "101%" }}
        >
          <option value="Pending">
            Pending
          </option>
          <option value="Approved">Approved</option>
          <option value="Not Approved">Not Approved</option>
        </select>

        <label>Additional Notes</label>
        <textarea
          value={editTestPrepForm.additional_notes}
          onChange={(e) =>
            setEditTestPrepForm({ ...editTestPrepForm, additional_notes: e.target.value })
          }
          style={{ width: "95%" }}
        />

      </div>

      {/* FOOTER */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
        <button
          onClick={() => setShowEditTestPrepModal(false)}
          style={{
            padding: "10px 18px",
            border: "1px solid #e2e8f0",
            background: "#fff",
            borderRadius: 8,
            color: "#374151",
          }}
        >
          Cancel
        </button>

        <button
          onClick={updateTestPrepRequest}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background: "#1d4ed8",
            color: "#fff",
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



{/* Delete Test Prep Confirmation Modal */}


{showDeleteTestPrepModal && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
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

      <h3 style={{ marginBottom: 10 }}>
        Delete Test Preparation Request
      </h3>

      <p style={{ color: "#475569", marginBottom: 24 }}>
        Are you sure you want to delete this loan request?  
        This action cannot be undone.
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
            setShowDeleteTestPrepModal(false);
            setTestPrepToDelete(null);
          }}
          style={{
            padding: "10px 18px",
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
          onClick={confirmDeleteTestPrep}
          style={{
            padding: "10px 18px",
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
            {/* <div
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
            </div> */}

            {/* ================= CHAT BODY ================= */}
{chatList.length === 0 ? (
  /* ================= EMPTY CHAT STATE ================= */
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
    <div style={{ fontSize: 48, marginBottom: 16, color: "#9ca3af" }}>
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
) : (
  /* ================= CHAT UI ================= */
  <div
    style={{
      display: "flex",
      height: "75%",
    }}
  >
    {/* ========== LEFT: CHAT LIST (WhatsApp style) ========== */}
    <div
      style={{
        width: 280,
        borderRight: "1px solid #e2e8f0",
        overflowY: "auto",
      }}
    >
      {chatList.map((chat) => (
        <div
          key={chat.sender_email}
          onClick={() => handleSelectChat(chat)}
          style={{
            padding: 14,
            cursor: "pointer",
            background:
              activeChat?.sender_email === chat.sender_email
                ? "#eef2ff"
                : "#fff",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div style={{ fontWeight: 600, color: "#0f172a" }}>
            {chat.sender_name}
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#64748b",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {chat.messages[0]?.message}
          </div>
        </div>
      ))}
    </div>

    {/* ========== RIGHT: MESSAGE VIEW ========== */}
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: 16,
        overflowY: "auto",
      }}
    >
      {activeChat ? (
        <>
          {/* Header */}
          <div
            style={{
              paddingBottom: 12,
              borderBottom: "1px solid #e2e8f0",
              marginBottom: 16,
            }}
          >
            <h3 style={{ margin: 0 }}>{activeChat.sender_name}</h3>
          </div>

          {/* Messages */}
          {activeChat.messages.map((msg: any, i: number) => (
  <div
    key={i}
    style={{
      alignSelf: msg.type === "out" ? "flex-end" : "flex-start",
      background: msg.type === "out" ? "#dcf8c6" : "#f1f5f9",
      padding: "10px 14px",
      borderRadius: 12,
      marginBottom: 10,
      maxWidth: "65%",
    }}
  >
    <div style={{ fontSize: 14 }}>{msg.message}</div>
    <div
      style={{
        fontSize: 11,
        color: "#475569",
        textAlign: "right",
        marginTop: 4,
      }}
    >
      {new Date(msg.time).toLocaleTimeString()}
    </div>
  </div>
))}

        </>
      ) : (
        /* No chat selected */
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748b",
          }}
        >
          Select a conversation to view messages
        </div>
      )}
    </div>
  </div>
)}


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
      flexWrap: "wrap",
      gap: 8,
      padding: 10,
      borderRadius: 8,
      border: "1px solid #e2e8f0",
      background: "#f9fafb",
      marginBottom: 12,
    }}
  >

                  

                  {/* {emails.map((email) => (
    <div
      key={email}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        background: "#e0e7ff",
        borderRadius: 16,
        fontSize: 13,
        color: "#1e3a8a",
      }}
    >
      {email}
      <span
        style={{ cursor: "pointer", fontWeight: "bold" }}
        onClick={() => removeEmail(email)}
      >
        ×
      </span>
    </div>
  ))} */}

  {/* <input
      type="email"
      placeholder="Add recipient email..."
      value={emailInput}
      onChange={(e) => setEmailInput(e.target.value)}
      onKeyDown={handleEmailKeyDown}
      style={{
        flex: 1,
        minWidth: 180,
        border: "none",
        outline: "none",
        background: "transparent",
        fontSize: 14,
        color: "#0f172a",
      }}
    /> */}

    {/* Email Dropdown */}
<select
  value={emails[0] || ""}
  onChange={(e) => {
    const selectedEmail = e.target.value;

    if (!selectedEmail) return;

    // ❌ DO NOTHING if already selected
    if (emails.length > 0) return;

    setEmails([selectedEmail]);
  }}
  disabled={emails.length > 0} // 🔒 lock dropdown
  style={{
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    color: "#0f172a",
    border: "1px solid #e2e8f0",
    fontSize: 14,
    background: emails.length > 0 ? "#f1f5f9" : "#f9fafb",
    cursor: emails.length > 0 ? "not-allowed" : "pointer",
    marginBottom: 12,
  }}
>
  <option value="">Select recipient</option>
  {chatUsers.map((user) => (
    <option key={user.id} value={user.email}>
      {user.user_name} ({user.email})
    </option>
  ))}
</select>




  </div>
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
                    value={message}
  onChange={(e) => setMessage(e.target.value)}
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
                onClick={sendTeamChat}
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
                        {currentUsers.map((user, index) => (
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


                <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    borderTop: "1px solid #e2e8f0",
    background: "#f8fafc",
  }}
>
  {/* Page Info */}
  <span style={{ fontSize: 13, color: "#64748b" }}>
    Showing {indexOfFirstRow + 1}–
    {Math.min(indexOfLastRow, users.length)} of {users.length}
  </span>

  {/* Pagination Buttons */}
  <div style={{ display: "flex", gap: 8 }}>
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
      style={{
        padding: "6px 12px",
        borderRadius: 6,
        border: "1px solid #e2e8f0",
        background: "#fff",
        cursor: currentPage === 1 ? "not-allowed" : "pointer",
        opacity: currentPage === 1 ? 0.5 : 1,
        color: "#1f2933",
      }}
    >
      Previous
    </button>

    {[...Array(totalPages1)].map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        style={{
          padding: "6px 12px",
          borderRadius: 6,
          border: "1px solid #e2e8f0",
          background: currentPage === i + 1 ? "#2563eb" : "#fff",
          color: currentPage === i + 1 ? "#fff" : "#1f2933",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        {i + 1}
      </button>
    ))}

    <button
      disabled={currentPage === totalPages1}
      onClick={() => setCurrentPage((p) => p + 1)}
      style={{
        padding: "6px 12px",
        borderRadius: 6,
        border: "1px solid #e2e8f0",
        background: "#fff",
        color: "#1f2933",
        cursor: currentPage === totalPages1 ? "not-allowed" : "pointer",
        opacity: currentPage === totalPages1 ? 0.5 : 1,
      }}
    >
      Next
    </button>
  </div>
</div>



        </div>
        )}



        {/* ================= User Profile Section ================= */}
{activeSection === "userprofile" && (
   <div
    style={{
  
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "24px",
      background: "#f8fafc",
    }}
  >
    <div style={{ width: "100%", maxWidth: 600 }}>
    {/* HEADER */}
    <div style={{ marginBottom: 16, textAlign: "center" }}>
      <h1 style={{ marginBottom: 4 }}>User Profile</h1>
      <p style={{ color: "#64748b" }}>
        Update your account information
      </p>
    </div>

    {/* PROFILE FORM CARD */}
    <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
        }}
      >
       <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        
        {/* Company Name */}
        <div>
          <label style={labelStyle}>Company Name</label>
          <input
            style={inputStyle}
            type="text"
            value={profileForm.company_name}
            onChange={(e) =>
              setProfileForm({
                ...profileForm,
                company_name: e.target.value,
              })
            }
          />
        </div>

        {/* Contact Person */}
        <div>
          <label style={labelStyle}>Contact Person</label>
          <input
            style={inputStyle}
            type="text"
            value={profileForm.user_name}
            onChange={(e) =>
              setProfileForm({
                ...profileForm,
                user_name: e.target.value,
              })
            }
          />
        </div>

        {/* Email (Read Only) */}
<div>
  <label style={labelStyle}>Email</label>
  <input
    style={{
      ...inputStyle,
      background: "#f1f5f9",
      cursor: "not-allowed",
    }}
    type="email"
    value={profileForm.email || ""}
    readOnly
  />
</div>

{/* Phone */}
<div>
  <label style={labelStyle}>Phone</label>
  <input
    style={inputStyle}
    type="text"
    value={profileForm.phone || ""}
    onChange={(e) =>
      setProfileForm({
        ...profileForm,
        phone: e.target.value,
      })
    }
  />
</div>

{/* Country */}
<div>
  <label style={labelStyle}>Country</label>
  <input
    style={inputStyle}
    type="text"
    value={profileForm.country || ""}
    onChange={(e) =>
      setProfileForm({
        ...profileForm,
        country: e.target.value,
      })
    }
  />
</div>


{/* Success Message */}
{profileSuccess && (
  <div
    style={{
      padding: "10px 12px",
      background: "#ecfdf5",
      color: "#065f46",
      border: "1px solid #10b981",
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 500,
    }}
  >
    {profileSuccess}
  </div>
)}

{/* Error Message */}
{profileError && (
  <div
    style={{
      padding: "10px 12px",
      background: "#fef2f2",
      color: "#991b1b",
      border: "1px solid #ef4444",
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 500,
    }}
  >
    {profileError}
  </div>
)}



        {/* Save Button */}
        <button
          style={{
            marginTop: 10,
            padding: "12px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={handleUpdateProfile}
        >
          Save Changes
        </button>
      </div>
      </div>
    </div>
  </div>
)}

{/* ================= ADD AGENT MODAL ================= */}
{showAddAgentModal && (
  <div 
    className="modal-overlay"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        setShowAddAgentModal(false);
        setAgentForm({ company_name: "", user_name: "", email: "", phone: "" });
      }
    }}
    style={{
      position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(4px)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 1000, padding: "20px"
    }}
  >
    <div style={{
      background: "#fff", borderRadius: "16px", width: "100%", maxWidth: "600px",
      maxHeight: "90vh", overflow: "hidden", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
      display: "flex", flexDirection: "column"
    }}>
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "24px 28px", color: "#fff", position: "relative"
      }}>
        <h3 style={{ margin: 0, fontSize: "22px", fontWeight: 700, marginBottom: "6px" }}>
          Add New Agent
        </h3>
        <p style={{ margin: 0, fontSize: "14px", opacity: 0.95, fontWeight: 400 }}>
          Create agent account and send credentials via email
        </p>
        <button
          onClick={() => {
            setShowAddAgentModal(false);
            setAgentForm({ company_name: "", user_name: "", email: "", phone: "" });
          }}
          style={{
            position: "absolute", top: "20px", right: "20px",
            background: "rgba(255, 255, 255, 0.2)", border: "none",
            borderRadius: "8px", width: "36px", height: "36px",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <X size={20} style={{ color: "#fff" }} />
        </button>
      </div>

      <div style={{ padding: "28px", overflowY: "auto", flex: 1 }}>
        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: "#334155" }}>
          Company Name <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input type="text" placeholder="Enter company name" value={agentForm.company_name}
          onChange={(e) => setAgentForm({ ...agentForm, company_name: e.target.value })}
          style={{ width: "100%", padding: "12px 14px", marginBottom: "20px", borderRadius: "10px",
            border: "2px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
        />

        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: "#334155" }}>
          Agent Name <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input type="text" placeholder="Enter agent name" value={agentForm.user_name}
          onChange={(e) => setAgentForm({ ...agentForm, user_name: e.target.value })}
          style={{ width: "100%", padding: "12px 14px", marginBottom: "20px", borderRadius: "10px",
            border: "2px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
        />

        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: "#334155" }}>
          Email <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input type="email" placeholder="agent@example.com" value={agentForm.email}
          onChange={(e) => setAgentForm({ ...agentForm, email: e.target.value })}
          style={{ width: "100%", padding: "12px 14px", marginBottom: "20px", borderRadius: "10px",
            border: "2px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
        />

        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600, color: "#334155" }}>
          Phone <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <input type="tel" placeholder="Enter phone number" value={agentForm.phone}
          onChange={(e) => setAgentForm({ ...agentForm, phone: e.target.value })}
          style={{ width: "100%", padding: "12px 14px", borderRadius: "10px",
            border: "2px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
        />

        <p style={{ marginTop: "16px", fontSize: "13px", color: "#64748b", background: "#f8fafc",
          padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <strong>Note:</strong> A random password will be generated and sent to the agent's email.
        </p>
      </div>

      <div style={{ padding: "20px 28px", background: "#f8fafc", borderTop: "1px solid #e2e8f0",
        display: "flex", justifyContent: "flex-end", gap: 12 }}>
        <button
          onClick={() => {
            setShowAddAgentModal(false);
            setAgentForm({ company_name: "", user_name: "", email: "", phone: "" });
          }}
          style={{ padding: "11px 20px", borderRadius: "10px", border: "2px solid #e2e8f0",
            background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: "14px" }}
        >
          Cancel
        </button>

        <button onClick={submitAgent}
          style={{ padding: "11px 24px", borderRadius: "10px", border: "none",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff",
            cursor: "pointer", fontWeight: 600, fontSize: "14px",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)" }}
        >
          Create Agent
        </button>
      </div>
    </div>
  </div>
)}


      </main>
    </div>
  );
};

export default Dashboard;


