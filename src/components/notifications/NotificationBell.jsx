// src/components/notifications/NotificationBell.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, X, Check, CheckCheck, Package, CreditCard, MessageCircle, User, Gift, AlertTriangle, ExternalLink, Eye } from 'lucide-react';
import { useWebSocket } from '../../contexts/WebSocketContext';
import notificationService from '../../services/notificationService';

const NotificationBell = () => {
  const { notifications } = useWebSocket();
  const [showDropdown, setShowDropdown] = useState(false);
  const [allNotifications, setAllNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadNotifications();
    loadUnreadCount();
  }, []);

  useEffect(() => {
    // Update notifications when new ones arrive via WebSocket
    if (notifications.length > 0) {
      setAllNotifications(prev => [...notifications, ...prev]);
      setUnreadCount(prev => prev + notifications.length);
    }
  }, [notifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await notificationService.getUserNotifications();
      setAllNotifications(response.data);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const loadUnreadCount = async () => {
    try {
      const response = await notificationService.getUnreadCount();
      setUnreadCount(response.data);
    } catch (error) {
      console.error('Error loading unread count:', error);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);
      setAllNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setAllNotifications(prev =>
        prev.map(notif => ({ ...notif, isRead: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  // Navigate to appropriate page based on notification type
  const handleNotificationClick = async (notification) => {
    // Mark as read if not already read
    if (!notification.isRead) {
      await handleMarkAsRead(notification.id);
    }
    
    setShowDropdown(false);
    
    // Navigate based on notification type
    switch (notification.type) {
      case 'ORDER_CREATED':
      case 'ORDER_STATUS_UPDATED':
        navigate('/orders');
        break;
      case 'PAYMENT_SUCCESSFUL':
      case 'PAYMENT_FAILED':
        navigate('/orders');
        break;
      case 'NEW_MESSAGE':
        // Could navigate to chat or support page
        navigate('/');
        break;
      case 'WELCOME':
        navigate('/');
        break;
      default:
        navigate('/');
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = (now - date) / (1000 * 60);
    
    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)} phút trước`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
  };

  const getNotificationIcon = (type) => {
    const iconProps = { className: "h-5 w-5" };
    
    switch (type) {
      case 'ORDER_CREATED':
      case 'ORDER_STATUS_UPDATED':
        return <Package {...iconProps} className="h-5 w-5 text-blue-500" />;
      case 'PAYMENT_SUCCESSFUL':
        return <CheckCheck {...iconProps} className="h-5 w-5 text-green-500" />;
      case 'PAYMENT_FAILED':
        return <AlertTriangle {...iconProps} className="h-5 w-5 text-red-500" />;
      case 'NEW_MESSAGE':
        return <MessageCircle {...iconProps} className="h-5 w-5 text-purple-500" />;
      case 'WELCOME':
        return <Gift {...iconProps} className="h-5 w-5 text-pink-500" />;
      default:
        return <Bell {...iconProps} className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type, isRead) => {
    if (isRead) return 'bg-gray-50';
    
    switch (type) {
      case 'ORDER_CREATED':
      case 'ORDER_STATUS_UPDATED':
        return 'bg-blue-50 border-l-4 border-blue-500';
      case 'PAYMENT_SUCCESSFUL':
        return 'bg-green-50 border-l-4 border-green-500';
      case 'PAYMENT_FAILED':
        return 'bg-red-50 border-l-4 border-red-500';
      case 'NEW_MESSAGE':
        return 'bg-purple-50 border-l-4 border-purple-500';
      case 'WELCOME':
        return 'bg-pink-50 border-l-4 border-pink-500';
      default:
        return 'bg-blue-50 border-l-4 border-blue-500';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[32rem] overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b bg-gradient-to-r from-primary-500 to-primary-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Thông báo</h3>
                <p className="text-sm text-primary-100">
                  {unreadCount > 0 ? `${unreadCount} thông báo mới` : 'Tất cả đã đọc'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-sm text-primary-100 hover:text-white transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/20"
                  >
                    Đánh dấu tất cả
                  </button>
                )}
                <button
                  onClick={() => setShowDropdown(false)}
                  className="p-1 rounded-lg hover:bg-white/20 transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {allNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Chưa có thông báo</h4>
                <p className="text-sm text-gray-500">
                  Thông báo mới sẽ hiển thị ở đây
                </p>
              </div>
            ) : (
              allNotifications.slice(0, 20).map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                    getNotificationColor(notification.type, notification.isRead)
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${
                            !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {formatTime(notification.createdAt)}
                            </span>
                            <ExternalLink className="h-3 w-3 text-gray-400" />
                          </div>
                        </div>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0 ml-2 mt-1"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {allNotifications.length > 20 && (
            <div className="p-3 text-center border-t bg-gray-50">
              <button 
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/notifications'); // Navigate to a dedicated notifications page
                }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                Xem tất cả thông báo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;