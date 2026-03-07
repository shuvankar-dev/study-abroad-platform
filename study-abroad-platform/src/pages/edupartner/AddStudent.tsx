import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import "./addstudent.css";

const AddStudent = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmStep1, setConfirmStep1] = useState(false);
  const [confirmStep2, setConfirmStep2] = useState(false);
  const [confirmStep3, setConfirmStep3] = useState(false);
  
  const [formData, setFormData] = useState({
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
        return !!(formData.firstName && formData.lastName && formData.dateOfBirth && 
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

  const handleNext = () => {
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
      
      // TODO: Save data to database here before moving to next step
      console.log("Saving step", currentStep, "data:", formData);
      
      setCurrentStep(prev => prev + 1);
      
      // Reset confirmation for next step
      if (currentStep === 1) setConfirmStep1(false);
      if (currentStep === 2) setConfirmStep2(false);
      if (currentStep === 3) setConfirmStep3(false);
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    console.log("Form submitted:", formData);
    alert("Student added successfully!");
    navigate("/edupartner/dashboard");
  };

  return (
    <div className="add-student-container">
      <div className="add-student-header">
        <button className="back-btn" onClick={() => navigate("/edupartner/dashboard")}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1>Add New Student</h1>
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
        {currentStep > 1 && <button className="btn-secondary" onClick={handleBack}>Previous</button>}
        {currentStep < 4 ? (
          <button 
            className="btn-primary" 
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !confirmStep1) || 
              (currentStep === 2 && !confirmStep2) || 
              (currentStep === 3 && !confirmStep3)
            }
          >
            Save & Next
          </button>
        ) : (
          <button className="btn-primary" onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

const Step1PersonalInfo = ({ formData, onChange }: any) => (
  <div className="form-step">
    <h2>Personal Information</h2>
    <p className="step-subtitle">(As indicated on the student's passport)</p>
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
