// src/pages/MessagesPage.jsx - Updated without header
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  MessageCircle, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  UserCheck,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { useWebSocket } from '../contexts/WebSocketContext';
import { useAuth } from '../contexts/AuthContext';
import chatService from '../services/chatService';
import ChatWindow from '../components/chat/ChatWindow';

const MessagesPage = () => {
  const { user, isAdmin, isEmployee } = useAuth();
  const { connected } = useWebSocket();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [chatRooms, setChatRooms] = useState([]);
  const [unassignedRooms, setUnassignedRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Lấy tab từ URL parameters
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['all', 'unassigned', 'my-chats', 'archived'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Lấy roomId từ URL parameters và mở chat
  useEffect(() => {
    const roomId = searchParams.get('room');
    if (roomId) {
      setSelectedRoom(roomId);
    }
  }, [searchParams]);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (isAdmin || isEmployee) {
        // Load both user chats and unassigned rooms for admin/employee
        await Promise.all([
          loadChatRooms(),
          loadUnassignedRooms()
        ]);
      } else {
        // Load only user chats for customers
        await loadChatRooms();
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadChatRooms = async () => {
    try {
      const response = await chatService.getUserChatRooms();
      setChatRooms(response.data);
    } catch (error) {
      console.error('Error loading chat rooms:', error);
    }
  };

  const loadUnassignedRooms = async () => {
    if (!isAdmin && !isEmployee) return;
    
    try {
      const response = await chatService.getUnassignedRooms();
      setUnassignedRooms(response.data);
    } catch (error) {
      console.error('Error loading unassigned rooms:', error);
    }
  };

  const handleAssignRoom = async (roomId) => {
    try {
      await chatService.assignStaffToRoom(roomId);
      loadData();
      alert('Đã nhận hỗ trợ khách hàng');
    } catch (error) {
      console.error('Error assigning room:', error);
      alert('Lỗi khi nhận hỗ trợ');
    }
  };

  const handleCreateNewChat = async () => {
    try {
      const response = await chatService.createChatRoom('SUPPORT', 'Hỗ trợ khách hàng');
      setSelectedRoom(response.data.roomId);
      loadChatRooms();
    } catch (error) {
      console.error('Error creating chat room:', error);
      alert('Không thể tạo cuộc trò chuyện mới');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId);
    setSearchParams({ tab: activeTab, room: roomId });
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Chưa có tin nhắn';
    return new Date(timestamp).toLocaleString('vi-VN');
  };

  const getRoomStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'text-green-600 bg-green-100';
      case 'WAITING': return 'text-yellow-600 bg-yellow-100';
      case 'CLOSED': return 'text-gray-600 bg-gray-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getRoomStatusIcon = (status) => {
    switch (status) {
      case 'ACTIVE': return <CheckCircle className="h-4 w-4" />;
      case 'WAITING': return <Clock className="h-4 w-4" />;
      case 'CLOSED': return <AlertCircle className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const filterRooms = (rooms) => {
    let filtered = rooms;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(room =>
        room.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.lastMessage?.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus) {
      filtered = filtered.filter(room => room.status === filterStatus);
    }

    return filtered;
  };

  const getAllRooms = () => {
    switch (activeTab) {
      case 'unassigned':
        return filterRooms(unassignedRooms);
      case 'my-chats':
        return filterRooms(chatRooms);
      case 'archived':
        return filterRooms(chatRooms.filter(room => room.status === 'CLOSED'));
      default:
        return filterRooms([...unassignedRooms, ...chatRooms]);
    }
  };

  const tabs = [
    { 
      id: 'all', 
      label: 'Tất cả', 
      count: unassignedRooms.length + chatRooms.length,
      show: isAdmin || isEmployee
    },
    { 
      id: 'unassigned', 
      label: 'Chờ hỗ trợ', 
      count: unassignedRooms.length,
      show: isAdmin || isEmployee
    },
    { 
      id: 'my-chats', 
      label: 'Cuộc trò chuyện của tôi', 
      count: chatRooms.length,
      show: true
    },
    { 
      id: 'archived', 
      label: 'Đã đóng', 
      count: chatRooms.filter(room => room.status === 'CLOSED').length,
      show: isAdmin || isEmployee
    }
  ].filter(tab => tab.show);

  const statusOptions = [
    { value: '', label: 'Tất cả trạng thái' },
    { value: 'ACTIVE', label: 'Đang hoạt động' },
    { value: 'WAITING', label: 'Chờ phản hồi' },
    { value: 'CLOSED', label: 'Đã đóng' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex bg-gray-50">
      {/* Sidebar - Room List */}
      <div className="w-80 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Tin nhắn</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <div className={`flex items-center gap-1 ${connected ? 'text-green-600' : 'text-red-600'}`}>
                  <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  {connected ? 'Đã kết nối' : 'Mất kết nối'}
                </div>
              </div>
            </div>
            
            {!isAdmin && !isEmployee && (
              <button
                onClick={handleCreateNewChat}
                className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition"
                title="Tạo cuộc trò chuyện mới"
              >
                <Plus className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex-shrink-0 border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 py-3 px-2 text-xs font-medium border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 bg-primary-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="truncate">{tab.label}</div>
                {tab.count > 0 && (
                  <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="flex-shrink-0 p-4 border-b bg-gray-50">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm cuộc trò chuyện..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Room List with Scrollable Area */}
        <div className="flex-1 overflow-y-auto">
          {getAllRooms().length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <MessageCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">
                {searchTerm || filterStatus ? 'Không tìm thấy cuộc trò chuyện' : 'Chưa có cuộc trò chuyện nào'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {getAllRooms().map((room) => (
                <div 
                  key={room.id || room.roomId} 
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition ${
                    selectedRoom === (room.roomId || room.id) ? 'bg-primary-50 border-r-4 border-primary-500' : ''
                  }`}
                  onClick={() => handleRoomSelect(room.roomId || room.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="font-medium text-gray-900 truncate">
                        {room.customerName || 'Khách hàng'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 flex-shrink-0 ${getRoomStatusColor(room.status)}`}>
                        {getRoomStatusIcon(room.status)}
                        {room.status}
                      </span>
                    </div>
                    {room.unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 flex-shrink-0">
                        {room.unreadCount}
                      </span>
                    )}
                  </div>
                  
                  {room.subject && (
                    <p className="text-sm text-gray-600 mb-1 truncate">{room.subject}</p>
                  )}
                  
                  {room.lastMessage && (
                    <p className="text-sm text-gray-600 truncate mb-2">
                      {room.lastMessage.content}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      {formatTime(room.lastMessageAt || room.createdAt)}
                    </p>
                    
                    {activeTab === 'unassigned' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAssignRoom(room.roomId);
                        }}
                        className="text-xs bg-primary-600 text-white px-2 py-1 rounded hover:bg-primary-700 transition flex items-center gap-1"
                      >
                        <UserCheck className="h-3 w-3" />
                        Nhận
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <ChatWindow
            roomId={selectedRoom}
            onClose={() => {
              setSelectedRoom(null);
              setSearchParams({ tab: activeTab });
            }}
            minimized={false}
            onToggleMinimize={() => {}}
            fullHeight={true}
          />
        ) : (
          <div className="flex-1 bg-white flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Chọn một cuộc trò chuyện
              </h3>
              <p className="text-gray-600 mb-4">
                Chọn cuộc trò chuyện từ danh sách bên trái để bắt đầu
              </p>
              {!isAdmin && !isEmployee && (
                <button
                  onClick={handleCreateNewChat}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  Tạo cuộc trò chuyện mới
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;