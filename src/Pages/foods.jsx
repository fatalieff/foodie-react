import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoods } from '../store/foodSlice';
import { addToCart } from '../store/cartSlice';
import { NavLink } from 'react-router-dom';
import { FoodCardSkeleton } from '../components/Skeletons';

const Foods = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.foods);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  const handleAddToCart = (e, food) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const cart = document.getElementById('cart-icon');
    
    if (cart) {
      const cartRect = cart.getBoundingClientRect();
      const animationId = Date.now();
      
      const newAnimation = {
        id: animationId,
        startPos: { x: rect.left, y: rect.top },
        endPos: { x: cartRect.left, y: cartRect.top },
        image: food.strMealThumb
      };

      setAnimations(prev => [...prev, newAnimation]);

      setTimeout(() => {
        setAnimations(prev => prev.filter(anim => anim.id !== animationId));
      }, 800);
    }

    dispatch(addToCart(food));
  };

  const categories = ['All', ...new Set(items?.map(item => item.strCategory) || [])];
  
  const filteredItems = items?.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.strCategory === selectedCategory;
    const matchesSearch = item.strMeal.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="text-[#F03328] text-5xl mb-4">
          <i className="fa-solid fa-circle-exclamation"></i>
        </div>
        <h2 className="text-2xl font-bold nunito mb-2 text-[#2D2D2D]">Something went wrong</h2>
        <p className="text-[#666666] mb-6">{error}</p>
        <button 
          onClick={() => dispatch(fetchFoods())}
          className="bg-[#F03328] text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-[#d42a20] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      {/* Hero / Header Section */}
      <motion.div 
        className="text-center mb-12 sm:mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <span className="text-[#F03328] font-bold tracking-widest uppercase text-sm mb-3 block">
          Our Menu
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-[60px] font-bold nunito mb-6 bg-gradient-to-br from-[#2d2d2d] to-[#5c4033] bg-clip-text text-transparent">
          Explore Our Delicious <span className="text-[#F03328]">Foods</span>
        </h1>
        <p className="text-[#666666] text-lg max-w-2xl mx-auto px-4 leading-relaxed">
          From traditional classics to modern delights, explore our diverse menu 
          crafted with the finest ingredients and culinary passion.
        </p>
      </motion.div>

      {/* Search & Category Filter Section */}
      <motion.div 
        className="max-w-2xl mx-auto mb-12 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Search Bar */}
        <div className="relative mb-6 group">
          <input
            type="text"
            placeholder="Search meals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-2.5 pl-11 rounded-xl border-2 border-[#f0e6de] focus:border-[#F03328] focus:outline-none transition-all duration-300 shadow-sm text-sm text-[#2D2D2D] placeholder:text-[#999] group-hover:border-[#F03328]/30"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] group-focus-within:text-[#F03328] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#F03328] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${
                selectedCategory === category
                  ? 'bg-[#F03328] border-[#F03328] text-white shadow-[0_8px_20px_rgba(240,51,40,0.3)]'
                  : 'bg-white border-[#f0e6de] text-[#666666] hover:border-[#F03328] hover:text-[#F03328]'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Food Grid */}
      <motion.div 
        key={filteredItems?.length || 0}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4"
        variants={staggerContainer}
        initial="hidden"
        animate={loading ? "hidden" : "show"}
      >
        {loading ? (
          // Skeleton Loading State
          Array.from({ length: 8 }).map((_, index) => (
            <FoodCardSkeleton key={index} />
          ))
        ) : (
          filteredItems && filteredItems.map((food, index) => (
            <motion.div 
              key={food.idMeal}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.03, 
                transition: { duration: 0.3 } 
              }}
              className="group bg-white rounded-3xl border border-[#f0e6de] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(240,51,40,0.1)]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={food.strMealThumb} 
                  alt={food.strMeal} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-[#F03328] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {food.strCategory}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                   <NavLink 
                    to={`/Foods`} 
                    className="w-full bg-white text-[#2D2D2D] py-3 rounded-xl font-bold text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500 hover:bg-[#F03328] hover:text-white"
                  >
                    View Details
                  </NavLink>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold nunito text-[#2D2D2D] line-clamp-1 group-hover:text-[#F03328] transition-colors">
                    {food.strMeal}
                  </h3>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs text-[#999] uppercase font-bold tracking-wider">Price</span>
                    <span className="text-2xl font-bold text-[#F03328]">${food.price}</span>
                  </div>
                  <motion.button 
                    onClick={(e) => handleAddToCart(e, food)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-[#f0e6de] text-[#2D2D2D] p-3 rounded-2xl hover:bg-[#F03328] hover:text-white transition-all duration-300 group/btn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Empty State */}
      {filteredItems?.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-[#666666] nunito">No meals found in this category.</p>
        </div>
      )}

      {/* Flying Animation Elements */}
      {animations.map(anim => (
        <img
          key={anim.id}
          src={anim.image}
          className="animate-fly"
          style={{
            '--start-x': `${anim.startPos.x}px`,
            '--start-y': `${anim.startPos.y}px`,
            '--target-x': `${anim.endPos.x}px`,
            '--target-y': `${anim.endPos.y}px`,
          }}
          alt=""
        />
      ))}
    </div>
  );
};

export default Foods;