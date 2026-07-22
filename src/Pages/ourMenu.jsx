import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoods } from '../store/foodSlice';
import { MenuItemSkeleton } from '../components/Skeletons';

const OurMenu = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.foods);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchFoods());
  }, [dispatch, items]);

  // if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading Menu...</div>;

  // API verilerini kategorilere ayırıp ilk 4'er tanesini alıyoruz
  const beefDishes = items?.filter(item => item.strCategory === 'Beef').slice(0, 4);
  const chickenDishes = items?.filter(item => item.strCategory === 'Chicken').slice(0, 4);
  const dessertDishes = items?.filter(item => item.strCategory === 'Dessert').slice(0, 4);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const MenuSection = ({ title, icon, dishes }) => (
    <motion.div 
      className="mb-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex items-center gap-4 mb-10">
        <motion.div 
          initial={{ scale: 0, rotate: -10 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F03328] to-[#FF9E0C] flex items-center justify-center text-white text-2xl shadow-lg shadow-red-200/50"
        >
          <i className={`fa-solid ${icon}`}></i>
        </motion.div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold nunito text-[#2D2D2D] tracking-tight">{title}</h2>
          <div className="h-1 w-12 bg-[#F03328] mt-1 rounded-full"></div>
        </div>
      </div>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <MenuItemSkeleton key={index} />
          ))
        ) : (
          dishes?.map(food => (
            <motion.div 
              key={food.idMeal} 
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -4, 
                transition: { duration: 0.3 } 
              }}
              className="group flex items-center gap-6 p-4 rounded-3xl hover:bg-white hover:shadow-2xl hover:shadow-red-100/50 transition-all duration-500 border border-transparent hover:border-red-50"
            >
              {/* Food Image */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-2xl shadow-md group-hover:rotate-3 transition-transform duration-500">
                <img 
                  src={food.strMealThumb} 
                  alt={food.strMeal} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg font-bold nunito text-[#2D2D2D] group-hover:text-[#F03328] transition-colors duration-300 truncate">
                    {food.strMeal}
                  </h4>
                  <div className="flex-1 border-b border-dotted border-gray-300 mb-1 hidden sm:block"></div>
                  <span className="text-xl font-bold text-[#2D2D2D] group-hover:text-[#F03328] transition-colors">${food.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-[#888] italic font-light truncate">
                    Premium {food.strCategory.toLowerCase()} selection
                  </p>
                  <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider bg-green-50 px-2 py-0.5 rounded">Organic</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );

  return (
    <div className="py-12 sm:py-16 lg:py-24 px-4 max-w-6xl mx-auto">
      <motion.div 
        className="text-center mb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <span className="text-[#F03328] font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
          Taste the Excellence
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold nunito mb-6 text-[#2D2D2D]">
          Our Signature <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F03328] to-[#FF9E0C]">Menu</span>
        </h1>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#F03328] to-[#FF9E0C] mx-auto rounded-full mb-8"></div>
        <p className="text-[#666666] text-lg max-w-2xl mx-auto leading-relaxed font-light">
          Crafted with passion and the finest seasonal ingredients. 
          Experience a culinary journey like no other.
        </p>
      </motion.div>

      <MenuSection title="Steaks & Beef" icon="fa-utensils" dishes={beefDishes} />
      <MenuSection title="Poultry & Chicken" icon="fa-drumstick-bite" dishes={chickenDishes} />
      <MenuSection title="Sweet Temptations" icon="fa-ice-cream" dishes={dessertDishes} />
    </div>
  );
};

export default OurMenu;