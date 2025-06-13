// src/pages/customer/Home.jsx
import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Star, Heart, ShoppingCart, Package, ArrowRight, TrendingUp, Award, Shield, Truck } from 'lucide-react';
import ProductList from '../../components/product/ProductList';
import productService from '../../services/productService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPetType, setSelectedPetType] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Banner slides data
  const bannerSlides = [
    {
      id: 1,
      title: "Thức ăn cao cấp cho thú cưng",
      subtitle: "Dinh dưỡng hoàn hảo cho sức khỏe tối ưu",
      description: "Các sản phẩm được nhập khẩu từ những thương hiệu hàng đầu thế giới",
      buttonText: "Khám phá ngay",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      gradient: "from-blue-600 to-purple-700"
    },
    {
      id: 2,
      title: "Chăm sóc tận tình cho bạn nhỏ",
      subtitle: "Sản phẩm chăm sóc chuyên nghiệp",
      description: "Từ thức ăn đến đồ chơi, mọi thứ cho thú cưng yêu quý của bạn",
      buttonText: "Mua sắm ngay",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      gradient: "from-green-600 to-teal-700"
    },
    {
      id: 3,
      title: "Khuyến mãi đặc biệt",
      subtitle: "Giảm giá lên đến 50%",
      description: "Cơ hội vàng để mua sắm với giá tốt nhất cho thú cưng",
      buttonText: "Xem ưu đãi",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      gradient: "from-orange-600 to-red-700"
    }
  ];

  const categories = ['Thức ăn khô', 'Thức ăn ướt', 'Snack & Bánh thưởng', 'Dinh dưỡng', 'Phụ kiện'];
  const petTypes = ['DOG', 'CAT', 'BIRD', 'FISH', 'RABBIT', 'OTHER'];

  const features = [
    {
      icon: Shield,
      title: "Chất lượng đảm bảo",
      description: "Sản phẩm chính hãng, có nguồn gốc rõ ràng"
    },
    {
      icon: Truck,
      title: "Giao hàng nhanh",
      description: "Miễn phí giao hàng đơn từ 500k"
    },
    {
      icon: Award,
      title: "Uy tín hàng đầu",
      description: "Được hàng nghìn khách hàng tin tương"
    },
    {
      icon: TrendingUp,
      title: "Giá tốt nhất",
      description: "Cam kết giá cạnh tranh nhất thị trường"
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  // Auto slide banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchProducts();
      return;
    }

    setLoading(true);
    try {
      const response = await productService.searchProducts(searchTerm);
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);
    setSelectedPetType('');
    
    if (!category) {
      fetchProducts();
      return;
    }

    setLoading(true);
    try {
      const response = await productService.getProductsByCategory(category);
      setProducts(response.data);
    } catch (error) {
      console.error('Error filtering by category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePetTypeFilter = async (petType) => {
    setSelectedPetType(petType);
    setSelectedCategory('');
    
    if (!petType) {
      fetchProducts();
      return;
    }

    setLoading(true);
    try {
      const response = await productService.getProductsByPetType(petType);
      setProducts(response.data);
    } catch (error) {
      console.error('Error filtering by pet type:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const getPetTypeLabel = (type) => {
    const labels = {
      DOG: '🐕 Chó',
      CAT: '🐱 Mèo', 
      BIRD: '🐦 Chim',
      FISH: '🐠 Cá',
      RABBIT: '🐰 Thỏ',
      OTHER: '🐾 Khác'
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner Section */}
      <section className="relative h-[600px] overflow-hidden rounded-2xl mx-4 mt-4 shadow-2xl">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-75`}></div>
              <div className="absolute inset-0 bg-black opacity-20"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-8">
                <div className="max-w-2xl text-white">
                  <div className="mb-6 animate-fadeInUp">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-light mb-6 text-blue-100">
                      {slide.subtitle}
                    </h2>
                    <p className="text-lg md:text-xl leading-relaxed mb-8 text-gray-100">
                      {slide.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp delay-200">
                    <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
                      {slide.buttonText}
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2">
                      <Package className="h-5 w-5" />
                      Xem sản phẩm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
        >
          <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
        >
          <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 -mt-16 relative z-10 border border-gray-100">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm cho thú cưng của bạn..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 transition-all duration-300"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-all duration-300 font-medium"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Filter className="h-6 w-6 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-800">Lọc sản phẩm</h3>
            </div>
            
            {/* Category Filter */}
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-700 mb-4 uppercase tracking-wide">Danh mục sản phẩm</h4>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => handleCategoryFilter('')}
                  className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                    !selectedCategory
                      ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  🏷️ Tất cả
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Pet Type Filter */}
            <div className="text-center">
              <h4 className="text-sm font-medium text-gray-700 mb-4 uppercase tracking-wide">Loại thú cưng</h4>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => handlePetTypeFilter('')}
                  className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                    !selectedPetType
                      ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  🐾 Tất cả
                </button>
                {petTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handlePetTypeFilter(type)}
                    className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                      selectedPetType === type
                        ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {getPetTypeLabel(type)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors duration-300">
                    <Icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Sản phẩm nổi bật</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>
        
        <ProductList products={products} loading={loading} />
      </section>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default Home;