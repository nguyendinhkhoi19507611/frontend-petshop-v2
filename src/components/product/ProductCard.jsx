// src/components/product/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package, Heart, Eye, Star, Zap } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      return;
    }
    addToCart(product);
    
    // Toast notification effect
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    toast.textContent = 'Đã thêm vào giỏ hàng!';
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getPetTypeLabel = (petType) => {
    const labels = {
      DOG: 'Chó',
      CAT: 'Mèo',
      BIRD: 'Chim',
      FISH: 'Cá',
      RABBIT: 'Thỏ',
      OTHER: 'Khác'
    };
    return labels[petType] || petType;
  };

  const getPetTypeEmoji = (petType) => {
    const emojis = {
      DOG: '🐕',
      CAT: '🐱',
      BIRD: '🐦',
      FISH: '🐠',
      RABBIT: '🐰',
      OTHER: '🐾'
    };
    return emojis[petType] || '🐾';
  };

  const getStockStatus = () => {
    if (product.quantity === 0) {
      return { text: 'Hết hàng', color: 'text-red-600 bg-red-100', icon: '❌' };
    } else if (product.quantity <= 5) {
      return { text: `Còn ${product.quantity}`, color: 'text-orange-600 bg-orange-100', icon: '⚠️' };
    }
    return { text: 'Còn hàng', color: 'text-green-600 bg-green-100', icon: '✅' };
  };

  const stockStatus = getStockStatus();

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div 
        className={`bg-white rounded-2xl shadow-lg overflow-hidden h-full transform transition-all duration-500 ${
          isHovered ? 'scale-105 shadow-2xl' : 'hover:scale-102 hover:shadow-xl'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className={`w-full h-64 object-cover transition-all duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <Package className="h-20 w-20 text-gray-400" />
            </div>
          )}
          
          {/* Overlay Actions */}
          <div className={`absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 ${
            isHovered ? 'bg-opacity-20' : ''
          }`}>
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
              } ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>

            {/* Quick View Button */}
            <div className={`absolute bottom-4 left-4 right-4 transform transition-all duration-300 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <button className="w-full bg-white/90 backdrop-blur-sm text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-white transition-colors duration-200 flex items-center justify-center gap-2">
                <Eye className="h-4 w-4" />
                Xem chi tiết
              </button>
            </div>
          </div>

          {/* Stock Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stockStatus.color} backdrop-blur-sm`}>
              {stockStatus.icon} {stockStatus.text}
            </span>
          </div>

          {/* Pet Type Badge */}
          {product.petType && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                {getPetTypeEmoji(product.petType)} {getPetTypeLabel(product.petType)}
              </span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Category */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500 font-medium">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">4.5</span>
            </div>
          </div>
          
          {/* Product Name */}
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
            {product.name}
          </h3>
          
          {/* Brand */}
          {product.brand && (
            <p className="text-sm text-gray-600 mb-3 font-medium">
              Thương hiệu: {product.brand}
            </p>
          )}
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          
          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary-600">
                {formatPrice(product.price)}
              </span>
              {product.brand && (
                <span className="text-xs text-gray-500">Giá đã bao gồm VAT</span>
              )}
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
              className={`p-3 rounded-xl transition-all duration-300 transform ${
                product.quantity === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700 hover:scale-110 shadow-lg hover:shadow-xl'
              }`}
              title={product.quantity === 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
            >
              {product.quantity === 0 ? (
                <Package className="h-5 w-5" />
              ) : (
                <ShoppingCart className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Quick Add Indicator */}
          {product.quantity > 0 && (
            <div className={`mt-3 transform transition-all duration-300 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}>
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs py-1 px-3 rounded-full text-center flex items-center justify-center gap-1">
                <Zap className="h-3 w-3" />
                Thêm nhanh vào giỏ
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;