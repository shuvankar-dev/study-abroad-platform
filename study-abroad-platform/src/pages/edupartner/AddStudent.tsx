import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import "./addstudent.css";

const AddStudent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentIdParam = searchParams.get('student_id');
  const stepParam = searchParams.get('step');
  
  const [currentStep, setCurrentStep] = useState(stepParam ? parseInt(stepParam) : 1);
  const [confirmStep1, setConfirmStep1] = useState(false);
  const [confirmStep2, setConfirmStep2] = useState(false);
  const [confirmStep3, setConfirmStep3] = useState(false);
  const [studentId, setStudentId] = useState<number | null>(studentIdParam ? parseInt(studentIdParam) : null);
  const [studentCode, setStudentCode] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!!studentIdParam);
  
  const [formData, setFormData] = useState({
    // Contact Information
    email: "",
    mobile: "",
    // Personal Information
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    firstLanguage: "",
    countryOfCitizenship: "",
    passportNumber: "",
    passportExpiryDate: "",
    passportPlaceOfBirth: "",
    maritalStatus: "",
    gender: "",
    currentAddress: "",
    currentState: "",
    currentPincode: "",
    permanentAddress: "",
    permanentState: "",
    permanentPincode: "",
    sameAsCurrentAddress: false,
    tenth_board: "",
    tenth_institution: "",
    tenth_passoutYear: "",
    tenth_address: "",
    tenth_state: "",
    tenth_pincode: "",
    tenth_gradingScheme: "percentage",
    tenth_percentage: "",
    tenth_cgpa: "",
    twelfth_board: "",
    twelfth_institution: "",
    twelfth_passoutYear: "",
    twelfth_address: "",
    twelfth_state: "",
    twelfth_pincode: "",
    twelfth_gradingScheme: "percentage",
    twelfth_percentage: "",
    twelfth_cgpa: "",
    sameAsTenth: false,
    hasHigherDegree: "",
    degree_name: "",
    degree_board: "",
    degree_institution: "",
    degree_passoutYear: "",
    degree_address: "",
    degree_state: "",
    degree_pincode: "",
    degree_gradingScheme: "percentage",
    degree_percentage: "",
    degree_cgpa: "",
    languageTestOption: "",
    englishExamType: "",
    examDate: "",
    listening: "",
    reading: "",
    writing: "",
    speaking: "",
    openToLanguageCourse: false,
    hasGRE: false,
    hasGMAT: false,
    differentNameOnDocuments: "",
    visaRefused: "",
    hasStudyPermit: "",
    hasGapCertificate: "",
    gapCertificateFile: null,
    hasWorkExperience: "",
    workExperienceFile: null,
    hasBachelorDegree: "",
    bachelorDegreeFile: null,
    hasMOI: "",
    moiFile: null,
    hasLOR: "",
    lorFile: null,
    hasEnglishTestScore: "",
    englishTestScoreFile: null,
    passportFile: null,
    tenthMarksheetFile: null,
    twelfthMarksheetFile: null,
    sopFile: null,
    cvFile: null
  });

  // Load existing student data if editing
  useEffect(() => {
    const loadStudentData = async () => {
      if (!studentIdParam) {
        setIsLoading(false);
        return;
      }

      try {
        const API_BASE = window.location.hostname === 'localhost'
          ? 'http://localhost/studyabroadplatform-api'
          : '/studyabroadplatform-api';

        const response = await fetch(`${API_BASE}/edupartner/get_student_by_id.php?student_id=${studentIdParam}`);
        const result = await response.json();

        if (result.success && result.student) {
          const { profile, personal_info, education, test_scores, additional_info } = result.student;

          // Set student ID and code
          setStudentId(profile.student_id);
          setStudentCode(profile.student_code);

          // Load personal info
          if (personal_info) {
            setFormData(prev => ({
              ...prev,
              email: profile.email || "",
              mobile: profile.mobile || "",
              firstName: personal_info.first_name || "",
              middleName: personal_info.middle_name || "",
              lastName: personal_info.last_name || "",
              dateOfBirth: personal_info.date_of_birth || "",
              firstLanguage: personal_info.first_language || "",
              countryOfCitizenship: personal_info.country_of_citizenship || "",
              passportNumber: personal_info.passport_number || "",
              passportExpiryDate: personal_info.passport_expiry_date || "",
              passportPlaceOfBirth: personal_info.passport_place_of_birth || "",
              maritalStatus: personal_info.marital_status || "",
              gender: personal_info.gender || "",
              currentAddress: personal_info.current_address || "",
              currentState: personal_info.current_state || "",
              currentPincode: personal_info.current_pincode || "",
              permanentAddress: personal_info.permanent_address || "",
              permanentState: personal_info.permanent_state || "",
              permanentPincode: personal_info.permanent_pincode || "",
            }));
          }

          // Load education data
          if (education) {
            const updates: any = {};
            
            if (education['10th']) {
              const tenth = education['10th'];
              updates.tenth_board = tenth.board_university || "";
              updates.tenth_institution = tenth.institution_name || "";
              updates.tenth_passoutYear = tenth.passout_year || "";
              updates.tenth_address = tenth.institution_address || "";
              updates.tenth_state = tenth.institution_state || "";
              updates.tenth_pincode = tenth.institution_pincode || "";
              updates.tenth_gradingScheme = tenth.grading_scheme || "percentage";
              updates.tenth_percentage = tenth.percentage || "";
              updates.tenth_cgpa = tenth.cgpa || "";
            }

            if (education['12th']) {
              const twelfth = education['12th'];
              updates.twelfth_board = twelfth.board_university || "";
              updates.twelfth_institution = twelfth.institution_name || "";
              updates.twelfth_passoutYear = twelfth.passout_year || "";
              updates.twelfth_address = twelfth.institution_address || "";
              updates.twelfth_state = twelfth.institution_state || "";
              updates.twelfth_pincode = twelfth.institution_pincode || "";
              updates.twelfth_gradingScheme = twelfth.grading_scheme || "percentage";
              updates.twelfth_percentage = twelfth.percentage || "";
              updates.twelfth_cgpa = twelfth.cgpa || "";
            }

            if (education['bachelor']) {
              const bachelor = education['bachelor'];
              updates.hasHigherDegree = "yes";
              updates.degree_name = bachelor.board_university || "";
              updates.degree_board = bachelor.board_university || "";
              updates.degree_institution = bachelor.institution_name || "";
              updates.degree_passoutYear = bachelor.passout_year || "";
              updates.degree_address = bachelor.institution_address || "";
              updates.degree_state = bachelor.institution_state || "";
              updates.degree_pincode = bachelor.institution_pincode || "";
              updates.degree_gradingScheme = bachelor.grading_scheme || "percentage";
              updates.degree_percentage = bachelor.percentage || "";
              updates.degree_cgpa = bachelor.cgpa || "";
            } else {
              updates.hasHigherDegree = "no";
            }

            setFormData(prev => ({ ...prev, ...updates }));
          }

          // Load test scores
          if (test_scores) {
            setFormData(prev => ({
              ...prev,
              languageTestOption: test_scores.language_test_option || "",
              englishExamType: test_scores.english_exam_type || "",
              examDate: test_scores.exam_date || "",
              listening: test_scores.listening_score || "",
              reading: test_scores.reading_score || "",
              writing: test_scores.writing_score || "",
              speaking: test_scores.speaking_score || "",
              openToLanguageCourse: test_scores.open_to_language_course === 1,
              hasGRE: test_scores.has_gre === 1,
              hasGMAT: test_scores.has_gmat === 1,
            }));
          }

          // Load additional info
          if (additional_info) {
            setFormData(prev => ({
              ...prev,
              differentNameOnDocuments: additional_info.different_name_on_documents || "",
              visaRefused: additional_info.visa_refused || "",
              hasStudyPermit: additional_info.has_study_permit || "",
            }));
          }
        } else {
          alert("Failed to load student data: " + result.message);
          navigate("/edupartner/students");
        }
      } catch (error) {
        console.error("Error loading student data:", error);
        alert("An error occurred while loading student data");
        navigate("/edupartner/students");
      } finally {
        setIsLoading(false);
      }
    };

    loadStudentData();
  }, [studentIdParam, navigate]);

  const steps = [
    { number: 1, title: "Personal Information", completed: currentStep > 1 },
    { number: 2, title: "Education Details", completed: currentStep > 2 },
    { number: 3, title: "Test Scores", completed: currentStep > 3 },
    { number: 4, title: "Additional Details", completed: currentStep > 4 }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === "sameAsCurrentAddress" && value === true) {
        updated.permanentAddress = prev.currentAddress;
        updated.permanentState = prev.currentState;
        updated.permanentPincode = prev.currentPincode;
      }
      if (prev.sameAsCurrentAddress) {
        if (field === "currentAddress") updated.permanentAddress = value;
        if (field === "currentState") updated.permanentState = value;
        if (field === "currentPincode") updated.permanentPincode = value;
      }
      if (field === "sameAsTenth" && value === true) {
        updated.twelfth_institution = prev.tenth_institution;
        updated.twelfth_address = prev.tenth_address;
        updated.twelfth_state = prev.tenth_state;
        updated.twelfth_pincode = prev.tenth_pincode;
      }
      if (prev.sameAsTenth) {
        if (field === "tenth_institution") updated.twelfth_institution = value;
        if (field === "tenth_address") updated.twelfth_address = value;
        if (field === "tenth_state") updated.twelfth_state = value;
        if (field === "tenth_pincode") updated.twelfth_pincode = value;
      }
      return updated;
    });
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.email && formData.firstName && formData.lastName && formData.dateOfBirth && 
          formData.firstLanguage && formData.countryOfCitizenship && formData.passportNumber && 
          formData.passportExpiryDate && formData.currentAddress && formData.currentState && 
          formData.currentPincode && formData.permanentAddress && formData.permanentState && 
          formData.permanentPincode && formData.maritalStatus && formData.gender);
      case 2:
        const tenth_valid = !!(formData.tenth_board && formData.tenth_institution && 
          formData.tenth_passoutYear && formData.tenth_address && formData.tenth_state && 
          formData.tenth_pincode && (formData.tenth_gradingScheme === "percentage" ? 
          formData.tenth_percentage : formData.tenth_cgpa));
        const twelfth_valid = !!(formData.twelfth_board && formData.twelfth_institution && 
          formData.twelfth_passoutYear && formData.twelfth_address && formData.twelfth_state && 
          formData.twelfth_pincode && (formData.twelfth_gradingScheme === "percentage" ? 
          formData.twelfth_percentage : formData.twelfth_cgpa));
        const degree_valid = formData.hasHigherDegree === "no" || !!(formData.degree_name && 
          formData.degree_board && formData.degree_institution && formData.degree_passoutYear && 
          formData.degree_address && formData.degree_state && formData.degree_pincode && 
          (formData.degree_gradingScheme === "percentage" ? formData.degree_percentage : formData.degree_cgpa));
        return tenth_valid && twelfth_valid && degree_valid && formData.hasHigherDegree !== "";
      case 3:
        if (!formData.languageTestOption) return false;
        if (formData.languageTestOption === "have_proof") {
          return !!(formData.englishExamType && formData.examDate && formData.listening && 
            formData.reading && formData.writing && formData.speaking);
        }
        return true;
      case 4:
        // Check required fields
        if (!formData.differentNameOnDocuments || !formData.visaRefused) return false;
        // If English test not taken, MOI and LOR are required
        if (formData.languageTestOption !== "have_proof") {
          return !!(formData.hasMOI === "yes" && formData.hasLOR === "yes");
        }
        return true;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (validateStep(currentStep)) {
      // Check if confirmation checkbox is checked for steps 1, 2, 3
      if (currentStep === 1 && !confirmStep1) {
        alert("Please confirm that all details are correct");
        return;
      }
      if (currentStep === 2 && !confirmStep2) {
        alert("Please confirm that all details are correct");
        return;
      }
      if (currentStep === 3 && !confirmStep3) {
        alert("Please confirm that all details are correct");
        return;
      }
      
      setIsSaving(true);
      
      try {
        // Save Step 1 data
        if (currentStep === 1) {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          
          const step1Data = {
            email: formData.email,
            mobile: formData.mobile,
            first_name: formData.firstName,
            middle_name: formData.middleName,
            last_name: formData.lastName,
            date_of_birth: formData.dateOfBirth,
            first_language: formData.firstLanguage,
            country_of_citizenship: formData.countryOfCitizenship,
            passport_number: formData.passportNumber,
            passport_expiry_date: formData.passportExpiryDate,
            passport_place_of_birth: formData.passportPlaceOfBirth,
            marital_status: formData.maritalStatus,
            gender: formData.gender,
            current_address: formData.currentAddress,
            current_state: formData.currentState,
            current_pincode: formData.currentPincode,
            permanent_address: formData.permanentAddress,
            permanent_state: formData.permanentState,
            permanent_pincode: formData.permanentPincode,
            created_by_user_id: user.id,
            created_by_role: user.role
          };
          
          const API_BASE = window.location.hostname === 'localhost'
            ? 'http://localhost/studyabroadplatform-api'
            : '/studyabroadplatform-api';
          
          const response = await fetch(`${API_BASE}/edupartner/save_student_step1.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(step1Data)
          });
          
          const result = await response.json();
          
          if (result.success) {
            setStudentId(result.student_id);
            setStudentCode(result.student_code);
            alert(`${result.message}\nStudent ID: ${result.student_code}`);
            setCurrentStep(prev => prev + 1);
            setConfirmStep1(false);
          } else {
            alert(result.message || 'Failed to save data');
          }
        }
        
        // TODO: Save Step 2 data
        else if (currentStep === 2) {
          if (!studentId) {
            alert("Student ID not found. Please complete Step 1 first.");
            return;
          }
          
          const step2Data = {
            student_id: studentId,
            tenth_board: formData.tenth_board,
            tenth_institution: formData.tenth_institution,
            tenth_passoutYear: formData.tenth_passoutYear,
            tenth_address: formData.tenth_address,
            tenth_state: formData.tenth_state,
            tenth_pincode: formData.tenth_pincode,
            tenth_gradingScheme: formData.tenth_gradingScheme,
            tenth_percentage: formData.tenth_percentage,
            tenth_cgpa: formData.tenth_cgpa,
            twelfth_board: formData.twelfth_board,
            twelfth_institution: formData.twelfth_institution,
            twelfth_passoutYear: formData.twelfth_passoutYear,
            twelfth_address: formData.twelfth_address,
            twelfth_state: formData.twelfth_state,
            twelfth_pincode: formData.twelfth_pincode,
            twelfth_gradingScheme: formData.twelfth_gradingScheme,
            twelfth_percentage: formData.twelfth_percentage,
            twelfth_cgpa: formData.twelfth_cgpa,
            hasHigherDegree: formData.hasHigherDegree,
            degree_name: formData.degree_name,
            degree_board: formData.degree_board,
            degree_institution: formData.degree_institution,
            degree_passoutYear: formData.degree_passoutYear,
            degree_address: formData.degree_address,
            degree_state: formData.degree_state,
            degree_pincode: formData.degree_pincode,
            degree_gradingScheme: formData.degree_gradingScheme,
            degree_percentage: formData.degree_percentage,
            degree_cgpa: formData.degree_cgpa
          };
          
          const API_BASE = window.location.hostname === 'localhost'
            ? 'http://localhost/studyabroadplatform-api'
            : '/studyabroadplatform-api';
          
          const response = await fetch(`${API_BASE}/edupartner/save_student_step2.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(step2Data)
          });
          
          const result = await response.json();
          
          if (result.success) {
            alert(result.message);
            setCurrentStep(prev => prev + 1);
            setConfirmStep2(false);
          } else {
            alert(result.message || 'Failed to save education details');
          }
        }
        
        // TODO: Save Step 3 data
        else if (currentStep === 3) {
          if (!studentId) {
            alert("Student ID not found. Please complete Step 1 first.");
            return;
          }
          
          const step3Data = {
            student_id: studentId,
            languageTestOption: formData.languageTestOption,
            englishExamType: formData.englishExamType,
            examDate: formData.examDate,
            listening: formData.listening,
            reading: formData.reading,
            writing: formData.writing,
            speaking: formData.speaking,
            openToLanguageCourse: formData.openToLanguageCourse,
            hasGRE: formData.hasGRE,
            hasGMAT: formData.hasGMAT
          };
          
          const API_BASE = window.location.hostname === 'localhost'
            ? 'http://localhost/studyabroadplatform-api'
            : '/studyabroadplatform-api';
          
          const response = await fetch(`${API_BASE}/edupartner/save_student_step3.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(step3Data)
          });
          
          const result = await response.json();
          
          if (result.success) {
            alert(result.message);
            setCurrentStep(prev => prev + 1);
            setConfirmStep3(false);
          } else {
            alert(result.message || 'Failed to save test scores');
          }
        }
        
      } catch (error) {
        console.error("Error saving data:", error);
        alert("An error occurred while saving. Please try again.");
      } finally {
        setIsSaving(false);
      }
      
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!studentId) {
      alert("Student ID not found. Please complete previous steps first.");
      return;
    }
    
    if (!validateStep(4)) {
      alert("Please fill in all required fields");
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('student_id', studentId.toString());
      submitData.append('differentNameOnDocuments', formData.differentNameOnDocuments);
      submitData.append('visaRefused', formData.visaRefused);
      submitData.append('hasStudyPermit', formData.hasStudyPermit || 'no');
      
      // Append document availability flags
      submitData.append('hasGapCertificate', formData.hasGapCertificate || 'no');
      submitData.append('hasWorkExperience', formData.hasWorkExperience || 'no');
      submitData.append('hasBachelorDegree', formData.hasBachelorDegree || 'no');
      submitData.append('hasMOI', formData.hasMOI || 'no');
      submitData.append('hasLOR', formData.hasLOR || 'no');
      submitData.append('hasEnglishTestScore', formData.hasEnglishTestScore || 'no');
      
      // Append files if they exist
      if (formData.passportFile) submitData.append('passportFile', formData.passportFile);
      if (formData.tenthMarksheetFile) submitData.append('tenthMarksheetFile', formData.tenthMarksheetFile);
      if (formData.twelfthMarksheetFile) submitData.append('twelfthMarksheetFile', formData.twelfthMarksheetFile);
      if (formData.sopFile) submitData.append('sopFile', formData.sopFile);
      if (formData.cvFile) submitData.append('cvFile', formData.cvFile);
      if (formData.gapCertificateFile) submitData.append('gapCertificateFile', formData.gapCertificateFile);
      if (formData.workExperienceFile) submitData.append('workExperienceFile', formData.workExperienceFile);
      if (formData.bachelorDegreeFile) submitData.append('bachelorDegreeFile', formData.bachelorDegreeFile);
      if (formData.moiFile) submitData.append('moiFile', formData.moiFile);
      if (formData.lorFile) submitData.append('lorFile', formData.lorFile);
      if (formData.englishTestScoreFile) submitData.append('englishTestScoreFile', formData.englishTestScoreFile);
      
      const API_BASE = window.location.hostname === 'localhost'
        ? 'http://localhost/studyabroadplatform-api'
        : '/studyabroadplatform-api';
      
      const response = await fetch(`${API_BASE}/edupartner/save_student_step4.php`, {
        method: 'POST',
        body: submitData // Don't set Content-Type header, browser will set it with boundary
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(`${result.message}\nStudent ID: ${result.student_code}\nStatus: ${result.status}`);
        navigate("/edupartner/dashboard");
      } else {
        alert(result.message || 'Failed to complete student profile');
      }
      
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="add-student-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading student data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-student-container">
      <div className="add-student-header">
        <button className="back-btn" onClick={() => navigate("/edupartner/students")}>
          <ArrowLeft size={20} />
          Back to Students
        </button>
        <h1>{studentIdParam ? `Edit Student - ${studentCode}` : 'Add New Student'}</h1>
      </div>
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div key={step.number} className="step-item">
            <div className={`step-indicator ${currentStep === step.number ? "active" : ""} ${step.completed ? "completed" : ""}`}>
              {step.completed ? <Check size={20} /> : step.number}
            </div>
            <span className="step-title">{step.title}</span>
            {index < steps.length - 1 && <div className="step-line" />}
          </div>
        ))}
      </div>
      <div className="form-content">
        {currentStep === 1 && (
          <>
            <Step1PersonalInfo formData={formData} onChange={handleInputChange} />
            <div className="confirmation-section">
              <label className="confirmation-label">
                <input 
                  type="checkbox" 
                  checked={confirmStep1} 
                  onChange={(e) => setConfirmStep1(e.target.checked)}
                />
                <span>I confirm that all the details provided are correct</span>
              </label>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <Step2EducationDetails formData={formData} onChange={handleInputChange} />
            <div className="confirmation-section">
              <label className="confirmation-label">
                <input 
                  type="checkbox" 
                  checked={confirmStep2} 
                  onChange={(e) => setConfirmStep2(e.target.checked)}
                />
                <span>I confirm that all the details provided are correct</span>
              </label>
            </div>
          </>
        )}
        {currentStep === 3 && (
          <>
            <Step3TestScores formData={formData} onChange={handleInputChange} />
            <div className="confirmation-section">
              <label className="confirmation-label">
                <input 
                  type="checkbox" 
                  checked={confirmStep3} 
                  onChange={(e) => setConfirmStep3(e.target.checked)}
                />
                <span>I confirm that all the details provided are correct</span>
              </label>
            </div>
          </>
        )}
        {currentStep === 4 && <Step4AdditionalDetails formData={formData} onChange={handleInputChange} />}
      </div>
      <div className="form-navigation">
        {currentStep > 1 && <button className="btn-secondary" onClick={handleBack} disabled={isSaving}>Previous</button>}
        {currentStep < 4 ? (
          <button 
            className="btn-primary" 
            onClick={handleNext}
            disabled={
              isSaving ||
              (currentStep === 1 && !confirmStep1) || 
              (currentStep === 2 && !confirmStep2) || 
              (currentStep === 3 && !confirmStep3)
            }
          >
            {isSaving ? 'Saving...' : 'Save & Next'}
          </button>
        ) : (
          <button className="btn-primary" onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? 'Submitting...' : 'Submit'}
          </button>
        )}
      </div>
    </div>
  );
};

const Step1PersonalInfo = ({ formData, onChange }: any) => (
  <div className="form-step">
    <h2>Personal Information</h2>
    <p className="step-subtitle">(As indicated on the student's passport)</p>
    
    {/* Contact Information Section */}
    <div className="education-section">
      <h3 className="section-heading">Contact Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Email Address <span className="required">*</span></label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={(e) => onChange("email", e.target.value)} 
            placeholder="Enter email address" 
          />
          <small style={{color: "#64748b", fontSize: "12px", marginTop: "4px", display: "block"}}>
            This email will be used as unique student identifier
          </small>
        </div>
        <div className="form-group">
          <label>Mobile Number (Optional)</label>
          <input 
            type="tel" 
            value={formData.mobile} 
            onChange={(e) => onChange("mobile", e.target.value.replace(/\D/g, ""))} 
            placeholder="Enter mobile number"
            maxLength={10}
          />
        </div>
      </div>
    </div>
    
    <div className="form-grid">
      <div className="form-group">
        <label>First Name <span className="required">*</span></label>
        <input type="text" value={formData.firstName} onChange={(e) => onChange("firstName", e.target.value)} placeholder="Enter first name" />
      </div>
      <div className="form-group">
        <label>Middle Name</label>
        <input type="text" value={formData.middleName} onChange={(e) => onChange("middleName", e.target.value)} placeholder="Enter middle name" />
      </div>
      <div className="form-group">
        <label>Last Name <span className="required">*</span></label>
        <input type="text" value={formData.lastName} onChange={(e) => onChange("lastName", e.target.value)} placeholder="Enter last name" />
      </div>
      <div className="form-group">
        <label>Date of Birth <span className="required">*</span></label>
        <input type="date" value={formData.dateOfBirth} onChange={(e) => onChange("dateOfBirth", e.target.value)} />
      </div>
      <div className="form-group">
        <label>First Language <span className="required">*</span></label>
        <input type="text" value={formData.firstLanguage} onChange={(e) => onChange("firstLanguage", e.target.value)} placeholder="e.g., Hindi, English" />
      </div>
      <div className="form-group">
        <label>Country of Citizenship <span className="required">*</span></label>
        <select value={formData.countryOfCitizenship} onChange={(e) => onChange("countryOfCitizenship", e.target.value)}>
          <option value="">Select country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
        </select>
      </div>
      <div className="form-group">
        <label>Passport Number <span className="required">*</span></label>
        <input type="text" value={formData.passportNumber} onChange={(e) => onChange("passportNumber", e.target.value)} placeholder="Enter passport number" />
      </div>
      <div className="form-group">
        <label>Passport Expiry Date <span className="required">*</span></label>
        <input type="date" value={formData.passportExpiryDate} onChange={(e) => onChange("passportExpiryDate", e.target.value)} />
      </div>
      <div className="form-group">
        <label>Passport Place of Birth</label>
        <select value={formData.passportPlaceOfBirth} onChange={(e) => onChange("passportPlaceOfBirth", e.target.value)}>
          <option value="">Select place</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Marital Status <span className="required">*</span></label>
        <div className="radio-group">
          <label className="radio-label"><input type="radio" value="single" checked={formData.maritalStatus === "single"} onChange={(e) => onChange("maritalStatus", e.target.value)} />Single</label>
          <label className="radio-label"><input type="radio" value="married" checked={formData.maritalStatus === "married"} onChange={(e) => onChange("maritalStatus", e.target.value)} />Married</label>
        </div>
      </div>
      <div className="form-group">
        <label>Gender <span className="required">*</span></label>
        <div className="radio-group">
          <label className="radio-label"><input type="radio" value="male" checked={formData.gender === "male"} onChange={(e) => onChange("gender", e.target.value)} />Male</label>
          <label className="radio-label"><input type="radio" value="female" checked={formData.gender === "female"} onChange={(e) => onChange("gender", e.target.value)} />Female</label>
        </div>
      </div>
    </div>
    <div className="form-group full-width">
      <label>Current Address <span className="required">*</span></label>
      <textarea value={formData.currentAddress} onChange={(e) => onChange("currentAddress", e.target.value)} placeholder="Enter current address" rows={3} />
    </div>
    <div className="form-grid">
      <div className="form-group">
        <label>State <span className="required">*</span></label>
        <input type="text" value={formData.currentState} onChange={(e) => onChange("currentState", e.target.value)} placeholder="Enter state" />
      </div>
      <div className="form-group">
        <label>Pincode <span className="required">*</span></label>
        <input type="text" value={formData.currentPincode} onChange={(e) => onChange("currentPincode", e.target.value)} placeholder="Enter pincode" maxLength={6} />
      </div>
    </div>
    <div className="form-group full-width">
      <label className="checkbox-label">
        <input type="checkbox" checked={formData.sameAsCurrentAddress} onChange={(e) => onChange("sameAsCurrentAddress", e.target.checked)} />
        Permanent address is same as current address
      </label>
    </div>
    <div className="form-group full-width">
      <label>Permanent Address <span className="required">*</span></label>
      <textarea value={formData.permanentAddress} onChange={(e) => onChange("permanentAddress", e.target.value)} placeholder="Enter permanent address" rows={3} disabled={formData.sameAsCurrentAddress} style={{background: formData.sameAsCurrentAddress ? "#f1f5f9" : "#fff", cursor: formData.sameAsCurrentAddress ? "not-allowed" : "text"}} />
    </div>
    <div className="form-grid">
      <div className="form-group">
        <label>State <span className="required">*</span></label>
        <input type="text" value={formData.permanentState} onChange={(e) => onChange("permanentState", e.target.value)} placeholder="Enter state" disabled={formData.sameAsCurrentAddress} style={{background: formData.sameAsCurrentAddress ? "#f1f5f9" : "#fff", cursor: formData.sameAsCurrentAddress ? "not-allowed" : "text"}} />
      </div>
      <div className="form-group">
        <label>Pincode <span className="required">*</span></label>
        <input type="text" value={formData.permanentPincode} onChange={(e) => onChange("permanentPincode", e.target.value)} placeholder="Enter pincode" maxLength={6} disabled={formData.sameAsCurrentAddress} style={{background: formData.sameAsCurrentAddress ? "#f1f5f9" : "#fff", cursor: formData.sameAsCurrentAddress ? "not-allowed" : "text"}} />
      </div>
    </div>
  </div>
);

const Step2EducationDetails = ({ formData, onChange }: any) => (
  <div className="form-step">
    <h2>Education Details</h2>
    <p className="step-subtitle">Please provide your educational qualifications</p>
    <div className="education-section">
      <h3 className="section-heading">10th Standard <span className="required">*</span></h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Board/University <span className="required">*</span></label>
          <input type="text" value={formData.tenth_board} onChange={(e) => onChange("tenth_board", e.target.value)} placeholder="e.g., CBSE, ICSE, State Board" />
        </div>
        <div className="form-group">
          <label>Institution Name <span className="required">*</span></label>
          <input type="text" value={formData.tenth_institution} onChange={(e) => onChange("tenth_institution", e.target.value)} placeholder="Enter school name" />
        </div>
        <div className="form-group">
          <label>Passout Year <span className="required">*</span></label>
          <input type="text" value={formData.tenth_passoutYear} onChange={(e) => onChange("tenth_passoutYear", e.target.value)} placeholder="e.g., 2020" maxLength={4} />
        </div>
      </div>
      <div className="form-group full-width">
        <label>Institution Address <span className="required">*</span></label>
        <textarea value={formData.tenth_address} onChange={(e) => onChange("tenth_address", e.target.value)} placeholder="Enter complete address" rows={2} />
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label>State <span className="required">*</span></label>
          <input type="text" value={formData.tenth_state} onChange={(e) => onChange("tenth_state", e.target.value)} placeholder="Enter state" />
        </div>
        <div className="form-group">
          <label>Pincode <span className="required">*</span></label>
          <input type="text" value={formData.tenth_pincode} onChange={(e) => onChange("tenth_pincode", e.target.value)} placeholder="Enter pincode" maxLength={6} />
        </div>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label>Grading Scheme <span className="required">*</span></label>
          <select value={formData.tenth_gradingScheme} onChange={(e) => onChange("tenth_gradingScheme", e.target.value)}>
            <option value="percentage">Percentage</option>
            <option value="cgpa">CGPA</option>
          </select>
        </div>
        {formData.tenth_gradingScheme === "percentage" ? (
          <div className="form-group">
            <label>Percentage <span className="required">*</span></label>
            <input type="number" step="0.01" value={formData.tenth_percentage} onChange={(e) => onChange("tenth_percentage", e.target.value)} placeholder="e.g., 85.5" min="0" max="100" />
          </div>
        ) : (
          <div className="form-group">
            <label>CGPA <span className="required">*</span></label>
            <input type="number" step="0.01" value={formData.tenth_cgpa} onChange={(e) => onChange("tenth_cgpa", e.target.value)} placeholder="e.g., 9.2" min="0" max="10" />
          </div>
        )}
      </div>
    </div>
    <div className="education-section">
      <h3 className="section-heading">12th Standard <span className="required">*</span></h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Board/University <span className="required">*</span></label>
          <input type="text" value={formData.twelfth_board} onChange={(e) => onChange("twelfth_board", e.target.value)} placeholder="e.g., CBSE, ICSE, State Board" />
        </div>
        <div className="form-group">
          <label>Institution Name <span className="required">*</span></label>
          <input type="text" value={formData.twelfth_institution} onChange={(e) => onChange("twelfth_institution", e.target.value)} placeholder="Enter school/college name" disabled={formData.sameAsTenth} style={{background: formData.sameAsTenth ? "#f1f5f9" : "#fff", cursor: formData.sameAsTenth ? "not-allowed" : "text"}} />
        </div>
        <div className="form-group">
          <label>Passout Year <span className="required">*</span></label>
          <input type="text" value={formData.twelfth_passoutYear} onChange={(e) => onChange("twelfth_passoutYear", e.target.value)} placeholder="e.g., 2022" maxLength={4} />
        </div>
      </div>
      <div className="form-group full-width">
        <label className="checkbox-label">
          <input type="checkbox" checked={formData.sameAsTenth} onChange={(e) => onChange("sameAsTenth", e.target.checked)} />
          Same institution as 10th standard
        </label>
      </div>
      <div className="form-group full-width">
        <label>Institution Address <span className="required">*</span></label>
        <textarea value={formData.twelfth_address} onChange={(e) => onChange("twelfth_address", e.target.value)} placeholder="Enter complete address" rows={2} disabled={formData.sameAsTenth} style={{background: formData.sameAsTenth ? "#f1f5f9" : "#fff", cursor: formData.sameAsTenth ? "not-allowed" : "text"}} />
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label>State <span className="required">*</span></label>
          <input type="text" value={formData.twelfth_state} onChange={(e) => onChange("twelfth_state", e.target.value)} placeholder="Enter state" disabled={formData.sameAsTenth} style={{background: formData.sameAsTenth ? "#f1f5f9" : "#fff", cursor: formData.sameAsTenth ? "not-allowed" : "text"}} />
        </div>
        <div className="form-group">
          <label>Pincode <span className="required">*</span></label>
          <input type="text" value={formData.twelfth_pincode} onChange={(e) => onChange("twelfth_pincode", e.target.value)} placeholder="Enter pincode" maxLength={6} disabled={formData.sameAsTenth} style={{background: formData.sameAsTenth ? "#f1f5f9" : "#fff", cursor: formData.sameAsTenth ? "not-allowed" : "text"}} />
        </div>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label>Grading Scheme <span className="required">*</span></label>
          <select value={formData.twelfth_gradingScheme} onChange={(e) => onChange("twelfth_gradingScheme", e.target.value)}>
            <option value="percentage">Percentage</option>
            <option value="cgpa">CGPA</option>
          </select>
        </div>
        {formData.twelfth_gradingScheme === "percentage" ? (
          <div className="form-group">
            <label>Percentage <span className="required">*</span></label>
            <input type="number" step="0.01" value={formData.twelfth_percentage} onChange={(e) => onChange("twelfth_percentage", e.target.value)} placeholder="e.g., 85.5" min="0" max="100" />
          </div>
        ) : (
          <div className="form-group">
            <label>CGPA <span className="required">*</span></label>
            <input type="number" step="0.01" value={formData.twelfth_cgpa} onChange={(e) => onChange("twelfth_cgpa", e.target.value)} placeholder="e.g., 9.2" min="0" max="10" />
          </div>
        )}
      </div>
    </div>
    <div className="education-section">
      <h3 className="section-heading">Higher Degree</h3>
      <div className="form-group">
        <label>Do you have a higher degree? <span className="required">*</span></label>
        <div className="radio-group">
          <label className="radio-label"><input type="radio" value="yes" checked={formData.hasHigherDegree === "yes"} onChange={(e) => onChange("hasHigherDegree", e.target.value)} />Yes</label>
          <label className="radio-label"><input type="radio" value="no" checked={formData.hasHigherDegree === "no"} onChange={(e) => onChange("hasHigherDegree", e.target.value)} />No</label>
        </div>
      </div>
      {formData.hasHigherDegree === "yes" && (
        <>
          <div className="form-grid">
            <div className="form-group">
              <label>Degree Name <span className="required">*</span></label>
              <input type="text" value={formData.degree_name} onChange={(e) => onChange("degree_name", e.target.value)} placeholder="e.g., Bachelor of Science, B.Tech" />
            </div>
            <div className="form-group">
              <label>Board/University <span className="required">*</span></label>
              <input type="text" value={formData.degree_board} onChange={(e) => onChange("degree_board", e.target.value)} placeholder="Enter university name" />
            </div>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Institution Name <span className="required">*</span></label>
              <input type="text" value={formData.degree_institution} onChange={(e) => onChange("degree_institution", e.target.value)} placeholder="Enter college/university name" />
            </div>
            <div className="form-group">
              <label>Passout Year <span className="required">*</span></label>
              <input type="text" value={formData.degree_passoutYear} onChange={(e) => onChange("degree_passoutYear", e.target.value)} placeholder="e.g., 2024" maxLength={4} />
            </div>
          </div>
          <div className="form-group full-width">
            <label>Institution Address <span className="required">*</span></label>
            <textarea value={formData.degree_address} onChange={(e) => onChange("degree_address", e.target.value)} placeholder="Enter complete address" rows={2} />
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>State <span className="required">*</span></label>
              <input type="text" value={formData.degree_state} onChange={(e) => onChange("degree_state", e.target.value)} placeholder="Enter state" />
            </div>
            <div className="form-group">
              <label>Pincode <span className="required">*</span></label>
              <input type="text" value={formData.degree_pincode} onChange={(e) => onChange("degree_pincode", e.target.value)} placeholder="Enter pincode" maxLength={6} />
            </div>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Grading Scheme <span className="required">*</span></label>
              <select value={formData.degree_gradingScheme} onChange={(e) => onChange("degree_gradingScheme", e.target.value)}>
                <option value="percentage">Percentage</option>
                <option value="cgpa">CGPA</option>
              </select>
            </div>
            {formData.degree_gradingScheme === "percentage" ? (
              <div className="form-group">
                <label>Percentage <span className="required">*</span></label>
                <input type="number" step="0.01" value={formData.degree_percentage} onChange={(e) => onChange("degree_percentage", e.target.value)} placeholder="e.g., 75.5" min="0" max="100" />
              </div>
            ) : (
              <div className="form-group">
                <label>CGPA <span className="required">*</span></label>
                <input type="number" step="0.01" value={formData.degree_cgpa} onChange={(e) => onChange("degree_cgpa", e.target.value)} placeholder="e.g., 8.5" min="0" max="10" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  </div>
);

const Step3TestScores = ({ formData, onChange }: any) => (
  <div className="form-step">
    <h2>Test Scores</h2>
    <div className="form-group">
      <div className="radio-group-vertical">
        <label className="radio-label"><input type="radio" value="have_proof" checked={formData.languageTestOption === "have_proof"} onChange={(e) => onChange("languageTestOption", e.target.value)} />I have or will have proof of language proficiency before I apply</label>
        <label className="radio-label"><input type="radio" value="no_test_proof_after" checked={formData.languageTestOption === "no_test_proof_after"} onChange={(e) => onChange("languageTestOption", e.target.value)} />I have not taken a language test and will only apply to programs allowing proof after acceptance</label>
        <label className="radio-label"><input type="radio" value="exemption" checked={formData.languageTestOption === "exemption"} onChange={(e) => onChange("languageTestOption", e.target.value)} />I believe my academic or nationality background may qualify me for an exemption</label>
        <label className="radio-label"><input type="radio" value="no_plan" checked={formData.languageTestOption === "no_plan"} onChange={(e) => onChange("languageTestOption", e.target.value)} />I have not taken a language test, and do not plan to take one</label>
      </div>
    </div>
    {formData.languageTestOption === "have_proof" && (
      <div className="form-grid">
        <div className="form-group full-width">
          <label>English Exam Type <span className="required">*</span></label>
          <select value={formData.englishExamType} onChange={(e) => onChange("englishExamType", e.target.value)}>
            <option value="">Select exam type</option>
            <option value="IELTS">IELTS</option>
            <option value="TOEFL">TOEFL</option>
            <option value="PTE">PTE</option>
            <option value="Duolingo">Duolingo</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date of Exam <span className="required">*</span></label>
          <input type="date" value={formData.examDate} onChange={(e) => onChange("examDate", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Listening <span className="required">*</span></label>
          <input type="number" value={formData.listening} onChange={(e) => onChange("listening", e.target.value)} placeholder="Score" />
        </div>
        <div className="form-group">
          <label>Reading <span className="required">*</span></label>
          <input type="number" value={formData.reading} onChange={(e) => onChange("reading", e.target.value)} placeholder="Score" />
        </div>
        <div className="form-group">
          <label>Writing <span className="required">*</span></label>
          <input type="number" value={formData.writing} onChange={(e) => onChange("writing", e.target.value)} placeholder="Score" />
        </div>
        <div className="form-group">
          <label>Speaking <span className="required">*</span></label>
          <input type="number" value={formData.speaking} onChange={(e) => onChange("speaking", e.target.value)} placeholder="Score" />
        </div>
      </div>
    )}
    <div className="form-group">
      <label className="checkbox-label"><input type="checkbox" checked={formData.openToLanguageCourse} onChange={(e) => onChange("openToLanguageCourse", e.target.checked)} />I'm open to taking a language proficiency course before starting my academic program</label>
    </div>
    <div className="form-group">
      <label className="checkbox-label"><input type="checkbox" checked={formData.hasGRE} onChange={(e) => onChange("hasGRE", e.target.checked)} />I have GRE exam scores</label>
    </div>
    <div className="form-group">
      <label className="checkbox-label"><input type="checkbox" checked={formData.hasGMAT} onChange={(e) => onChange("hasGMAT", e.target.checked)} />I have GMAT exam scores</label>
    </div>
  </div>
);

const Step4AdditionalDetails = ({ formData, onChange }: any) => {
  const isEnglishTestRequired = formData.languageTestOption !== "have_proof";
  
  return (
    <div className="form-step">
      <h2>Additional Details</h2>
      <div className="form-group">
        <label>Do any of your documents show a different name than your passport? <span className="required">*</span></label>
        <div className="radio-group">
          <label className="radio-label"><input type="radio" value="yes" checked={formData.differentNameOnDocuments === "yes"} onChange={(e) => onChange("differentNameOnDocuments", e.target.value)} />Yes</label>
          <label className="radio-label"><input type="radio" value="no" checked={formData.differentNameOnDocuments === "no"} onChange={(e) => onChange("differentNameOnDocuments", e.target.value)} />No</label>
        </div>
      </div>
      <h3>Background Information</h3>
      <div className="form-group">
        <label>Have you been refused a visa from Canada, the USA, the United Kingdom, New Zealand, Australia or Ireland? <span className="required">*</span></label>
        <div className="radio-group">
          <label className="radio-label"><input type="radio" value="yes" checked={formData.visaRefused === "yes"} onChange={(e) => onChange("visaRefused", e.target.value)} />Yes</label>
          <label className="radio-label"><input type="radio" value="no" checked={formData.visaRefused === "no"} onChange={(e) => onChange("visaRefused", e.target.value)} />No</label>
        </div>
      </div>
      <div className="form-group">
        <label>Do you have a valid Study Permit / Visa?</label>
        <div className="radio-group">
          <label className="radio-label"><input type="radio" value="yes" checked={formData.hasStudyPermit === "yes"} onChange={(e) => onChange("hasStudyPermit", e.target.value)} />Yes</label>
          <label className="radio-label"><input type="radio" value="no" checked={formData.hasStudyPermit === "no"} onChange={(e) => onChange("hasStudyPermit", e.target.value)} />No</label>
        </div>
      </div>
      
      <h3>Student Required Documents</h3>
      {isEnglishTestRequired && (
        <p className="step-subtitle" style={{color: "#ef4444", fontWeight: 500}}>
          Note: Since you haven't taken an English test, MOI and LOR are required.
        </p>
      )}
      
      <div className="document-list">
        <div className="document-item">
          <div>
            <label>Passport <span className="required">*</span></label>
          </div>
          <input type="file" onChange={(e) => onChange("passportFile", e.target.files?.[0])} />
        </div>
        
        <div className="document-item">
          <div>
            <label>10th Marksheet <span className="required">*</span></label>
          </div>
          <input type="file" onChange={(e) => onChange("tenthMarksheetFile", e.target.files?.[0])} />
        </div>
        
        <div className="document-item">
          <div>
            <label>10+2 Marksheet <span className="required">*</span></label>
          </div>
          <input type="file" onChange={(e) => onChange("twelfthMarksheetFile", e.target.files?.[0])} />
        </div>
        
        <div className="document-item">
          <div>
            <label>SOP <span className="required">*</span></label>
          </div>
          <input type="file" onChange={(e) => onChange("sopFile", e.target.files?.[0])} />
        </div>
        
        <div className="document-item">
          <div>
            <label>CV <span className="required">*</span></label>
          </div>
          <input type="file" onChange={(e) => onChange("cvFile", e.target.files?.[0])} />
        </div>
        
        <div className="document-item">
          <div>
            <label>Gap Certificate (Optional)</label>
            <div className="radio-group" style={{marginTop: 8}}>
              <label className="radio-label"><input type="radio" value="yes" checked={formData.hasGapCertificate === "yes"} onChange={(e) => onChange("hasGapCertificate", e.target.value)} />Yes</label>
              <label className="radio-label"><input type="radio" value="no" checked={formData.hasGapCertificate === "no"} onChange={(e) => onChange("hasGapCertificate", e.target.value)} />No</label>
            </div>
          </div>
          {formData.hasGapCertificate === "yes" && (
            <input type="file" onChange={(e) => onChange("gapCertificateFile", e.target.files?.[0])} />
          )}
        </div>
        
        <div className="document-item">
          <div>
            <label>Work Experience (Optional)</label>
            <div className="radio-group" style={{marginTop: 8}}>
              <label className="radio-label"><input type="radio" value="yes" checked={formData.hasWorkExperience === "yes"} onChange={(e) => onChange("hasWorkExperience", e.target.value)} />Yes</label>
              <label className="radio-label"><input type="radio" value="no" checked={formData.hasWorkExperience === "no"} onChange={(e) => onChange("hasWorkExperience", e.target.value)} />No</label>
            </div>
          </div>
          {formData.hasWorkExperience === "yes" && (
            <input type="file" onChange={(e) => onChange("workExperienceFile", e.target.files?.[0])} />
          )}
        </div>
        
        <div className="document-item">
          <div>
            <label>Bachelor Degree {isEnglishTestRequired && <span className="required">*</span>}</label>
            <div className="radio-group" style={{marginTop: 8}}>
              <label className="radio-label"><input type="radio" value="yes" checked={formData.hasBachelorDegree === "yes"} onChange={(e) => onChange("hasBachelorDegree", e.target.value)} />Yes</label>
              <label className="radio-label"><input type="radio" value="no" checked={formData.hasBachelorDegree === "no"} onChange={(e) => onChange("hasBachelorDegree", e.target.value)} />No</label>
            </div>
          </div>
          {formData.hasBachelorDegree === "yes" && (
            <input type="file" onChange={(e) => onChange("bachelorDegreeFile", e.target.files?.[0])} />
          )}
        </div>
        
        <div className="document-item">
          <div>
            <label>MOI (Medium of Instruction) {isEnglishTestRequired && <span className="required">*</span>}</label>
            <div className="radio-group" style={{marginTop: 8}}>
              <label className="radio-label"><input type="radio" value="yes" checked={formData.hasMOI === "yes"} onChange={(e) => onChange("hasMOI", e.target.value)} />Yes</label>
              <label className="radio-label"><input type="radio" value="no" checked={formData.hasMOI === "no"} onChange={(e) => onChange("hasMOI", e.target.value)} />No</label>
            </div>
          </div>
          {formData.hasMOI === "yes" && (
            <input type="file" onChange={(e) => onChange("moiFile", e.target.files?.[0])} />
          )}
        </div>
        
        <div className="document-item">
          <div>
            <label>LOR (Letter of Recommendation) {isEnglishTestRequired && <span className="required">*</span>}</label>
            <div className="radio-group" style={{marginTop: 8}}>
              <label className="radio-label"><input type="radio" value="yes" checked={formData.hasLOR === "yes"} onChange={(e) => onChange("hasLOR", e.target.value)} />Yes</label>
              <label className="radio-label"><input type="radio" value="no" checked={formData.hasLOR === "no"} onChange={(e) => onChange("hasLOR", e.target.value)} />No</label>
            </div>
          </div>
          {formData.hasLOR === "yes" && (
            <input type="file" onChange={(e) => onChange("lorFile", e.target.files?.[0])} />
          )}
        </div>
        
        <div className="document-item">
          <div>
            <label>English Test Score Card</label>
            <div className="radio-group" style={{marginTop: 8}}>
              <label className="radio-label"><input type="radio" value="yes" checked={formData.hasEnglishTestScore === "yes"} onChange={(e) => onChange("hasEnglishTestScore", e.target.value)} />Yes</label>
              <label className="radio-label"><input type="radio" value="no" checked={formData.hasEnglishTestScore === "no"} onChange={(e) => onChange("hasEnglishTestScore", e.target.value)} />No</label>
            </div>
          </div>
          {formData.hasEnglishTestScore === "yes" && (
            <input type="file" onChange={(e) => onChange("englishTestScoreFile", e.target.files?.[0])} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
