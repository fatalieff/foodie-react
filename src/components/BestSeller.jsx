import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "../store/foodSlice";
import { addToCart as addToCartAction } from "../store/cartSlice";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const BestSeller = () => {
  const dispatch = useDispatch();
  const { items: foods, loading, error } = useSelector((state) => state.foods);
  const addToCart = (food) => dispatch(addToCartAction(food));

  useEffect(() => {
    if (foods.length === 0) {
      dispatch(fetchFoods());
    }
  }, [dispatch, foods.length]);

  const bestSellerFoods = foods.slice(0, 4);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="font-nunito font-bold text-2xl sm:text-3xl lg:text-4xl text-[#2d2d2d]">Our Best Sellers</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-[#f0e6de] rounded-[30px] overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-gray-200" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded-lg w-3/4" />
                <div className="flex justify-between items-end pt-2">
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-12" />
                    <div className="h-6 bg-gray-200 rounded w-20" />
                  </div>
                  <div className="w-12 h-12 bg-gray-200 rounded-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-[#F03328] font-nunito text-lg">Error loading best sellers: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
      <motion.div 
        className="text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-nunito font-bold text-2xl sm:text-3xl lg:text-4xl text-[#2d2d2d]">Our Best Sellers</h2>
        <p className="font-nunito text-[#666666] mt-2 max-w-2xl mx-auto">
          Check out our most popular and delicious dishes loved by our customers!
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {bestSellerFoods.map((food) => (
          <motion.div
            key={food.idMeal}
            variants={fadeUpItem}
            className="bg-white border border-[#f0e6de] rounded-[30px] overflow-hidden shadow-[0_2px_4px_0_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(240,51,40,0.12)] hover:border-[rgba(255,158,12,0.3)]"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={food.strMealThumb} 
                alt={food.strMeal} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="font-nunito font-bold text-lg sm:text-xl text-[#2d2d2d]">
                {food.strMeal}
              </h3>
              <div className="flex justify-between items-end pt-4">
                <div>
                  <span className="text-xs font-nunito text-[#666666] uppercase tracking-wider">
                    Price
                  </span>
                  <p className="font-nunito font-bold text-xl sm:text-2xl text-[#F03328]">
                    ${food.price}
                  </p>
                </div>
                <button
                  onClick={() => addToCart(food)}
                  className="w-12 h-12 bg-gradient-to-br from-[#F03328] to-[#FF9E0C] rounded-2xl flex items-center justify-center text-white shadow-[0_4px_14px_rgba(240,51,40,0.3)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(240,51,40,0.4)] hover:scale-105 active:scale-95"
                >
                  <i className="fa-solid fa-plus text-lg" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="text-center mt-8 sm:mt-12"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <NavLink 
          to="/Foods"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-br from-[#F03328] to-[#FF9E0C] text-white font-nunito font-bold rounded-full shadow-[0_4px_14px_rgba(240,51,40,0.3)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(240,51,40,0.4)] hover:-translate-y-0.5"
        >
          View All Menu
          <i className="fa-solid fa-arrow-right" />
        </NavLink>
      </motion.div>
    </div>
  );
};

export default BestSeller;
