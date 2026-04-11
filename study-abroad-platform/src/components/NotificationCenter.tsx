import { useState, useEffect } from 'react';
import { Bell, X, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import './NotificationCenter.css';

interface Notification {
  id: number;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  target_role: string;
  created_at: string;
  created_by_name: string;
  is_read: number;
}

interface NotificationCenterProps {
  userId: number;
  userRole: string;
}

const NotificationCenter = ({ userId, userRole }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost/studyabroadplatform-api'
    : '/studyabroadplatform-api';

  useEffect(() => {
    fetchNotifications();
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [userId, userRole]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/edupartner/get_notifications.php?user_id=${userId}&user_role=${encodeURIComponent(userRole)}`
      );
      const data = await response.json();
      
      if (data.success) {
        setNotifications(data.notifications);
        setUnreadCount(data.unread_count);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId: number) => {
    try {
      const response = await fetch(`${API_BASE}/edupartner/mark_notification_read.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notification_id: notificationId, user_id: userId })
      });
      
      const data = await response.json();
      if (data.success) {
        fetchNotifications();
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle size={20} />;
      case 'high':
        return <AlertTriangle size={20} />;
      case 'medium':
        return <Info size={20} />;
      case 'low':
        return <CheckCircle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="notification-center">
      <button 
        className="notification-bell-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="notification-overlay" onClick={() => setIsOpen(false)} />
          <div className="notification-panel">
            <div className="notification-header">
              <div>
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                  <span className="unread-count">{unreadCount} unread</span>
                )}
              </div>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="notification-list">
              {loading ? (
                <div className="notification-loading">
                  <div className="spinner" />
                  <p>Loading notifications...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="notification-empty">
                  <Bell size={48} />
                  <p>No notifications yet</p>
                  <span>You're all caught up!</span>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${notification.is_read ? 'read' : 'unread'} priority-${notification.priority}`}
                    onClick={() => !notification.is_read && markAsRead(notification.id)}
                  >
                    <div className="notification-icon">
                      {getPriorityIcon(notification.priority)}
                    </div>
                    <div className="notification-content">
                      <div className="notification-title-row">
                        <h4>{notification.title}</h4>
                        {!notification.is_read && <span className="unread-dot" />}
                      </div>
                      <p className="notification-message">{notification.message}</p>
                      <div className="notification-meta">
                        <span className="notification-time">{formatDate(notification.created_at)}</span>
                        <span className="notification-divider">•</span>
                        <span className="notification-from">From: {notification.created_by_name}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;
