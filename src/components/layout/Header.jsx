// src/components/layout/Header.jsx - Fixed version
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, Package, LayoutDashboard, UserCircle, MessageCircle, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import NotificationBell from '../notifications/NotificationBell';

const Header = ({ onMenuClick, showMenuButton = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Safe destructuring with default values
  const { user, logout, isAdmin, isEmployee } = useAuth() || {};
  const { getCartItemsCount } = useCart() || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) {
      logout();
      navigate('/');
      setIsUserMenuOpen(false);
    }
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  // Safe function to get cart count
  const getCartCount = () => {
    try {
      return getCartItemsCount ? getCartItemsCount() : 0;
    } catch (error) {
      console.error('Error getting cart count:', error);
      return 0;
    }
  };

  // Safe function to get user role
  const getUserRole = () => {
    if (!user || !user.roles || !Array.isArray(user.roles) || user.roles.length === 0) {
      return 'Khách hàng';
    }
    
    const role = user.roles[0];
    switch (role) {
      case 'ADMIN':
        return 'Quản trị viên';
      case 'EMPLOYEE':
        return 'Nhân viên';
      default:
        return 'Khách hàng';
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Menu button (for admin) + Logo */}
          <div className="flex items-center">
            {showMenuButton && (
              <button
                onClick={onMenuClick}
                className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 lg:hidden mr-3 transition-all duration-200"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            
            <Link to="/" className="flex items-center space-x-3 group" onClick={closeMenus}>
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                  Pet Food Store
                </span>
                <div className="text-xs text-gray-500 font-medium">Thực phẩm thú cưng</div>
              </div>
            </Link>
          </div>

      

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {!showMenuButton && ( // Only show for customer layout
              <>
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-primary-600 transition-all duration-200 font-medium relative group"
                >
                  Trang chủ
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                
                {user && (
                  <Link 
                    to="/orders" 
                    className="text-gray-600 hover:text-primary-600 transition-all duration-200 font-medium relative group"
                  >
                    Đơn hàng
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </>
            )}

            {/* Admin/Employee quick links */}
            {showMenuButton && (
              <>
                {isAdmin && (
                  <>
                    <Link 
                      to="/admin/dashboard" 
                      className="text-gray-600 hover:text-primary-600 transition-all duration-200 flex items-center gap-2 font-medium"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link 
                      to="/admin/products" 
                      className="text-gray-600 hover:text-primary-600 transition-all duration-200 font-medium"
                    >
                      Sản phẩm
                    </Link>
                    <Link 
                      to="/admin/users" 
                      className="text-gray-600 hover:text-primary-600 transition-all duration-200 font-medium"
                    >
                      Người dùng
                    </Link>
                  </>
                )}
                <Link 
                  to="/employee/orders" 
                  className="text-gray-600 hover:text-primary-600 transition-all duration-200 font-medium"
                >
                  Đơn hàng
                </Link>
                <Link 
                  to="/employee/chat" 
                  className="text-gray-600 hover:text-primary-600 transition-all duration-200 flex items-center gap-2 font-medium"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat
                </Link>
              </>
            )}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            {/* Notifications - show for all authenticated users */}
            {user && <NotificationBell />}

            {/* Cart button - only show for customers */}
            {!showMenuButton && (
              <Link to="/cart" className="relative group" onClick={closeMenus}>
                <div className="p-2 text-gray-600 hover:text-primary-600 transition-all duration-200 rounded-lg hover:bg-primary-50">
                  <ShoppingCart className="h-6 w-6" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                      {getCartCount()}
                    </span>
                  )}
                </div>
              </Link>
            )}

            {/* User menu */}
            {user ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary-600 transition-all duration-200 rounded-lg hover:bg-primary-50"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-md">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden md:block font-medium">
                    {user.fullName || user.username || 'User'}
                  </span>
                </button>

                {/* Dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-20 border border-gray-100">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-primary-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-md">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {user.fullName || user.username || 'User'}
                          </p>
                          <p className="text-xs text-primary-600 font-medium">
                            {getUserRole()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {!showMenuButton && ( // Customer menu items
                      <>
                        <Link
                          to="/profile"
                          onClick={closeMenus}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <UserCircle className="h-4 w-4 mr-3 text-gray-500" />
                          Hồ sơ cá nhân
                        </Link>
                        <Link
                          to="/orders"
                          onClick={closeMenus}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <ShoppingCart className="h-4 w-4 mr-3 text-gray-500" />
                          Đơn hàng của tôi
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                      </>
                    )}
                    
                    {showMenuButton && ( // Admin/Employee menu items
                      <>
                        <Link
                          to="/"
                          onClick={closeMenus}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Package className="h-4 w-4 mr-3 text-gray-500" />
                          Xem cửa hàng
                        </Link>
                        <Link
                          to="/admin/chat"
                          onClick={closeMenus}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <MessageCircle className="h-4 w-4 mr-3 text-gray-500" />
                          Quản lý Chat
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                      </>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-primary-50"
                  onClick={closeMenus}
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={closeMenus}
                >
                  Đăng ký
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white">
            {/* Mobile Search */}
            {!showMenuButton && (
              <div className="mb-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-20 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
                  >
                    Tìm
                  </button>
                </form>
              </div>
            )}

            {!showMenuButton && (
              // Customer mobile menu
              <>
                <Link
                  to="/"
                  className="block py-3 text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
                  onClick={closeMenus}
                >
                  🏠 Trang chủ
                </Link>
                {user && (
                  <Link
                    to="/orders"
                    className="block py-3 text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
                    onClick={closeMenus}
                  >
                    📦 Đơn hàng của tôi
                  </Link>
                )}
              </>
            )}
            
            {showMenuButton && (
              // Admin/Employee mobile menu
              <>
                {isAdmin && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className="block py-3 text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
                      onClick={closeMenus}
                    >
                      📊 Dashboard
                    </Link>
                    <Link
                      to="/admin/products"
                      className="block py-3 text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
                      onClick={closeMenus}
                    >
                      📦 Sản phẩm
                    </Link>
                    <Link
                      to="/admin/users"
                      className="block py-3 text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
                      onClick={closeMenus}
                    >
                      👥 Người dùng
                    </Link>
                  </>
                )}
                <Link
                  to="/employee/orders"
                  className="block py-3 text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
                  onClick={closeMenus}
                >
                  📋 Đơn hàng
                </Link>
                <Link
                  to="/employee/chat"
                  className="block py-3 text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
                  onClick={closeMenus}
                >
                  💬 Chat hỗ trợ
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;