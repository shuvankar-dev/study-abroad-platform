import { useState } from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import "./applicationstatusmanager.css";

interface StatusOption {
  value: string;
  label: string;
  description: string;
}

interface ApplicationStatusManagerProps {
  applicationId: number;
  currentStatus: string;
  onStatusUpdate: (newStatus: string) => void;
  userRole: string;
}

const ApplicationStatusManager = ({
  applicationId,
  currentStatus,
  onStatusUpdate,
  userRole
}: ApplicationStatusManagerProps) => {
  
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost/studyabroadplatform-api'
    : '/studyabroadplatform-api';

  const statusOptions: StatusOption[] = [
    {
      value: "application_created",
      label: "Application Created",
      description: "Initial application has been created"
    },
    {
      value: "application_started",
      label: "Application Started",
      description: "Student has started filling the application"
    },
    {
      value: "application_reviewed_codesholer",
      label: "Reviewed by Codesholer Overseas",
      description: "Application reviewed and verified by Codesholer team"
    },
    {
      value: "submitted_to_school",
      label: "Submitted to School",
      description: "Application has been submitted to the university"
    },
    {
      value: "awaiting_school_decision",
      label: "Awaiting School Decision",
      description: "Waiting for university admission decision"
    },
    {
      value: "admission_processing",
      label: "Admission Processing",
      description: "University is processing the admission"
    },
    {
      value: "pre_arrival",
      label: "Pre-Arrival",
      description: "Student preparing for departure"
    },
    {
      value: "arrival",
      label: "Arrival",
      description: "Student has arrived at destination"
    }
  ];

  const handleUpdateStatus = async () => {
    if (selectedStatus === currentStatus) {
      setMessage({ type: 'error', text: 'Please select a different status' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      
      const response = await fetch(`${API_BASE}/edupartner/update_application_status.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          role: user.role,
          application_id: applicationId,
          new_status: selectedStatus,
          notes: notes
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Status updated successfully!' });
        setNotes("");
        onStatusUpdate(selectedStatus);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update status' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    const statusIndex = statusOptions.findIndex(opt => opt.value === status);
    const currentIndex = statusOptions.findIndex(opt => opt.value === currentStatus);
    
    if (statusIndex < currentIndex) {
      return <CheckCircle size={20} className="status-completed" />;
    } else if (statusIndex === currentIndex) {
      return <Clock size={20} className="status-current" />;
    } else {
      return <AlertCircle size={20} className="status-pending" />;
    }
  };

  return (
    <div className="application-status-manager">
      <div className="manager-header">
        <h3>Update Application Status</h3>
        <span className="permission-badge">{userRole} Access</span>
      </div>

      <div className="status-options">
        {statusOptions.map((option) => (
          <div
            key={option.value}
            className={`status-option ${selectedStatus === option.value ? 'selected' : ''} ${currentStatus === option.value ? 'current' : ''}`}
            onClick={() => setSelectedStatus(option.value)}
          >
            <div className="option-header">
              {getStatusIcon(option.value)}
              <div className="option-content">
                <div className="option-label">{option.label}</div>
                <div className="option-description">{option.description}</div>
              </div>
              {currentStatus === option.value && (
                <span className="current-badge">Current</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="notes-section">
        <label htmlFor="status-notes">Notes (Optional)</label>
        <textarea
          id="status-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any notes about this status change..."
          rows={3}
        />
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="manager-actions">
        <button
          className="btn-update"
          onClick={handleUpdateStatus}
          disabled={loading || selectedStatus === currentStatus}
        >
          {loading ? 'Updating...' : 'Update Status'}
        </button>
      </div>
    </div>
  );
};

export default ApplicationStatusManager;
