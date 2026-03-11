import "./applicationstatusbar.css";

interface StatusStep {
  key: string;
  label: string;
}

interface ApplicationStatusBarProps {
  currentStatus: string;
  showLabels?: boolean;
  compact?: boolean;
}

const ApplicationStatusBar = ({ 
  currentStatus, 
  showLabels = true,
  compact = false 
}: ApplicationStatusBarProps) => {
  
  const statusSteps: StatusStep[] = [
    { key: "application_created", label: "Application Created" },
    { key: "application_started", label: "Application Started" },
    { key: "application_reviewed_codesholer", label: "Reviewed by Codesholer Overseas" },
    { key: "submitted_to_school", label: "Submitted to School" },
    { key: "awaiting_school_decision", label: "Awaiting School Decision" },
    { key: "admission_processing", label: "Admission Processing" },
    { key: "pre_arrival", label: "Pre-Arrival" },
    { key: "arrival", label: "Arrival" }
  ];

  const getCurrentStepIndex = () => {
    const index = statusSteps.findIndex(step => step.key === currentStatus);
    return index >= 0 ? index : 0;
  };

  const currentStepIndex = getCurrentStepIndex();

  // Simple checkmark SVG component
  const CheckmarkIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  return (
    <div className={`application-status-bar ${compact ? 'compact' : ''}`}>
      <div className="status-steps">
        {/* Background progress bar */}
        <div className="progress-bar-background">
          <div 
            className="progress-bar-fill" 
            style={{ 
              width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` 
            }}
          />
        </div>

        {statusSteps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          const isFuture = index > currentStepIndex;

          return (
            <div key={step.key} className="status-step-wrapper">
              <div className={`status-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${isFuture ? 'future' : ''}`}>
                {isCompleted ? (
                  <div className="completed-indicator">
                    <CheckmarkIcon />
                  </div>
                ) : (
                  <div className={`step-dot ${isActive ? 'active-dot' : 'future-dot'}`} />
                )}
                
                {showLabels && (
                  <div className="step-label">
                    {step.label}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationStatusBar;
