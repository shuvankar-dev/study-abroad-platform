import { useState } from 'react';
import { Send, X, AlertCircle } from 'lucide-react';
import './NotificationManager.css';

interface NotificationManagerProps {
  userId: number;
  onClose: () => void;
  onSuccess: () => void;
}

const NotificationManager = ({ userId, onClose, onSuccess }: NotificationManagerProps) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    target_role: 'ALL',
    priority: 'medium',
    expires_at: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost/studyabroadplatform-api'
    : '/studyabroadplatform-api';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.title || !formData.message) {
      setError('Title and message are required');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/edupartner/create_notification.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          created_by: userId,
          expires_at: formData.expires_at || null
        })
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
        onClose();
      } else {
        setError(data.message || 'Failed to create notification');
      }
    } catch (err) {
      setError('Error creating notification');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notification-manager-overlay" onClick={onClose}>
      <div className="notification-manager-modal" onClick={(e) => e.stopPropagation()}>
        <div className="notification-manager-header">
          <h2>Create Notification</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="notification-manager-form">
          {error && (
            <div className="error-alert">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label>Title <span className="required">*</span></label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter notification title"
              maxLength={255}
              required
            />
          </div>

          <div className="form-group">
            <label>Message <span className="required">*</span></label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Enter notification message"
              rows={4}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Target Audience <span className="required">*</span></label>
              <select
                value={formData.target_role}
                onChange={(e) => setFormData({ ...formData, target_role: e.target.value })}
                required
              >
                <option value="ALL">All Users</option>
                <option value="Admin">Admins Only</option>
                <option value="Agent">Agents Only</option>
                <option value="Counselor">Counselors Only</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority <span className="required">*</span></label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Expiration Date (Optional)</label>
            <input
              type="datetime-local"
              value={formData.expires_at}
              onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
            />
            <small>Leave empty for no expiration</small>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <div className="btn-spinner" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Notification
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationManager;
