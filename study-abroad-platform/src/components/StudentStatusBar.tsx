import { CheckCircle, Circle } from "lucide-react";
import "./studentstatusbar.css";

interface StudentStatusBarProps {
  currentStatus: string;
  showLabels?: boolean;
}

const StudentStatusBar = ({ 
  currentStatus, 
  showLabels = true 
}: StudentStatusBarProps) => {
  
  const statusSteps = [
    { key: "details_submitted", label: "Details Submitted" },
    { key: "documents_verified_codescholer", label: "Documents Verified by Codescholer" },
    { key: "application_started", label: "Application Started" },
    { key: "application_created", label: "Application Created" }
  ];

  const getCurrentStepIndex = () => {
    const index = statusSteps.findIndex(step => step.key === currentStatus);
    return index >= 0 ? index : 0;
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="student-status-bar">
      <div className="student-status-steps">
        {statusSteps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          const isFuture = index > currentStepIndex;
          const isLastStepAndCurrent = index === statusSteps.length - 1 && isActive;

          return (
            <div key={step.key} className="student-status-step-wrapper">
              <div className={`student-status-step ${isCompleted || isLastStepAndCurrent ? 'completed' : ''} ${isActive && !isLastStepAndCurrent ? 'active' : ''} ${isFuture ? 'future' : ''}`}>
                <div className="student-step-indicator">
                  {isCompleted || isLastStepAndCurrent ? (
                    <CheckCircle className="student-step-icon completed-icon" size={28} />
                  ) : isActive ? (
                    <div className="student-step-icon active-icon">
                      <Circle size={28} fill="currentColor" />
                    </div>
                  ) : (
                    <Circle className="student-step-icon future-icon" size={28} />
                  )}
                </div>
                
                {showLabels && (
                  <div className="student-step-label">
                    {step.label}
                  </div>
                )}
              </div>
              
              {index < statusSteps.length - 1 && (
                <div className={`student-step-connector ${isCompleted || isLastStepAndCurrent ? 'completed' : ''}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentStatusBar;
