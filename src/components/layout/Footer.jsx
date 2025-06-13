// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  Heart,
  Star,
  Shield,
  Truck,
  Clock,
  Award,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        {/* Top Section */}
        <div className="container mx-auto px-4 pt-16 pb-8">
          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="relative z-10">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-2">🎉 Đăng ký nhận tin khuyến mãi</h3>
                <p className="text-primary-100 mb-6">
                  Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt dành riêng cho thú cưng
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Nhập email của bạn..."
                    className="flex-1 px-4 py-3 rounded-xl text-gray-800 border-0 focus:outline-none focus:ring-4 focus:ring-white/30"
                  />
                  <button className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Pet Food Store</h3>
                  <p className="text-sm text-gray-400">Thực phẩm thú cưng</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Cung cấp thực phẩm chất lượng cao cho thú cưng của bạn. 
                Chúng tôi cam kết mang đến những sản phẩm tốt nhất cho người bạn bốn chân.
              </p>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span>Chất lượng đảm bảo</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Truck className="h-4 w-4 text-blue-400" />
                  <span>Giao hàng nhanh</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Award className="h-4 w-4 text-yellow-400" />
                  <span>Uy tín #1</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock className="h-4 w-4 text-purple-400" />
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-600 transition-all duration-200 transform hover:scale-110">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-pink-600 transition-all duration-200 transform hover:scale-110">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-400 transition-all duration-200 transform hover:scale-110">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <div className="w-2 h-6 bg-primary-500 rounded-full"></div>
                Liên kết nhanh
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary-500 rounded-full group-hover:w-2 transition-all duration-200"></span>
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary-500 rounded-full group-hover:w-2 transition-all duration-200"></span>
                    Sản phẩm
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary-500 rounded-full group-hover:w-2 transition-all duration-200"></span>
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary-500 rounded-full group-hover:w-2 transition-all duration-200"></span>
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary-500 rounded-full group-hover:w-2 transition-all duration-200"></span>
                    Hỗ trợ khách hàng
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <div className="w-2 h-6 bg-green-500 rounded-full"></div>
                Danh mục sản phẩm
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="text-lg">🐕</span>
                    Thức ăn cho chó
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="text-lg">🐱</span>
                    Thức ăn cho mèo
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="text-lg">🐦</span>
                    Thức ăn cho chim
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="text-lg">🎾</span>
                    Phụ kiện thú cưng
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="text-lg">💊</span>
                    Chăm sóc sức khỏe
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                Thông tin liên hệ
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 leading-relaxed">
                      123 Đường Nguyễn Văn Linh<br />
                      Quận 7, TP.HCM<br />
                      Việt Nam
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">0123 456 789</p>
                    <p className="text-sm text-gray-500">Hotline 24/7</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">info@petfoodstore.com</p>
                    <p className="text-sm text-gray-500">Email hỗ trợ</p>
                  </div>
                </li>
              </ul>

              {/* Rating */}
              <div className="mt-6 p-4 bg-gray-800 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">4.9/5</span>
                </div>
                <p className="text-xs text-gray-400">Từ 1,234+ đánh giá của khách hàng</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <p className="text-gray-400 text-sm">
                  © {currentYear} Pet Food Store. 
                </p>
                <span className="flex items-center gap-1 text-gray-400 text-sm">
                  Được phát triển với <Heart className="h-4 w-4 text-red-500 fill-current" /> tại Việt Nam
                </span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex gap-4 text-sm">
                  <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                    Chính sách bảo mật
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                    Điều khoản sử dụng
                  </a>
                  <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                    Chính sách đổi trả
                  </a>
                </div>
                
                {/* Back to top button */}
                <button
                  onClick={scrollToTop}
                  className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white hover:bg-primary-700 transition-all duration-200 transform hover:scale-110 shadow-lg"
                  title="Về đầu trang"
                >
                  <ArrowUp className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;