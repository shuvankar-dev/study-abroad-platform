import { useState } from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import "./studentstatusmanager.css";

interface StudentStatusManagerProps {
  studentId: number;
  currentStatus: string;
  onStatusUpdate: (newStatus: string) => void;
  userRole: string;
}

const StudentStatusManager = ({
  studentId,
  currentStatus,
  onStatusUpdate,
  userRole
}: StudentStatusManagerProps) => {
  
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost/studyabroadplatform-api'
    : '/studyabroadplatform-api';

  const statusOptions = [
    {
      value: "details_submitted",
      label: "Details Submitted",
      description: "Student profile and details have been submitted"
    },
    {
      value: "documents_verified_codescholer",
      label: "Documents Verified by Codescholer",
      description: "All documents reviewed and verified by Codescholer team"
    },
    {
      value: "application_started",
      label: "Application Started",
      description: "Student has started the application process"
    },
    {
      value: "application_created",
      label: "Application Created",
      description: "Application has been fully created and submitted"
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
      
      const response = await fetch(`${API_BASE}/edupartner/update_student_status.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          role: user.role,
          student_id: studentId,
          new_status: selectedStatus,
          notes: notes
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Student status updated successfully!' });
        setNotes("");
        onStatusUpdate(selectedStatus);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update status' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    const statusIndex = statusOptions.findIndex(opt => opt.value === status);
    const currentIndex = statusOptions.findIndex(opt => opt.value === currentStatus);
    
    if (statusIndex < currentIndex) {
      return <CheckCircle size={20} className="sstatus-completed" />;
    } else if (statusIndex === currentIndex) {
      return <Clock size={20} className="sstatus-current" />;
    } else {
      return <AlertCircle size={20} className="sstatus-pending" />;
    }
  };

  return (
    <div className="student-status-manager">
      <div className="smanager-header">
        <h3>Update Student Status</h3>
        <span className="spermission-badge">{userRole} Access</span>
      </div>

      <div className="sstatus-options">
        {statusOptions.map((option) => (
          <div
            key={option.value}
            className={`sstatus-option ${selectedStatus === option.value ? 'selected' : ''} ${currentStatus === option.value ? 'current' : ''}`}
            onClick={() => setSelectedStatus(option.value)}
          >
            <div className="soption-header">
              {getStatusIcon(option.value)}
              <div className="soption-content">
                <div className="soption-label">{option.label}</div>
                <div className="soption-description">{option.description}</div>
              </div>
              {currentStatus === option.value && (
                <span className="scurrent-badge">Current</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="snotes-section">
        <label htmlFor="student-status-notes">Notes (Optional)</label>
        <textarea
          id="student-status-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any notes about this status change..."
          rows={3}
        />
      </div>

      {message && (
        <div className={`smessage ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="smanager-actions">
        <button
          className="sbtn-update"
          onClick={handleUpdateStatus}
          disabled={loading || selectedStatus === currentStatus}
        >
          {loading ? 'Updating...' : 'Update Student Status'}
        </button>
      </div>
    </div>
  );
};

export default StudentStatusManager;
