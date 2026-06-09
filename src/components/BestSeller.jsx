import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "../store/foodSlice";

function BestSellerSection() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.foods);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="mt-12 sm:mt-[10%] text-center">
        <p className="nunito text-base sm:text-[20px] text-[#666666] animate-pulse">
          Loading delicious dishes...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-[#F03328] nunito text-center mt-12 sm:mt-[10%] px-4">
        Error: {error}
      </p>
    );
  }

  return (
    <div className="relative z-[1] mt-12 sm:mt-16 lg:mt-[10%]">
      <h1 className="text-2xl sm:text-4xl lg:text-[55px] font-bold nunito text-center px-4 bg-gradient-to-br from-[#2d2d2d] to-[#5c4033] bg-clip-text text-transparent">
        Our best Seller Dishes 🔥
      </h1>
      <p className="text-base sm:text-lg lg:text-[25px] font-medium text-[#5C5C5C] text-center mt-3 sm:mt-4 px-4 max-w-3xl mx-auto">
        Our fresh garden salad is a light and refreshing option. It features a mix of
        crisp lettuce, juicy tomatoe all tossed in your choice of dressing.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-8 sm:mt-12 lg:mt-[10%]">
        {items.slice(1, 7).map((item) => (
          <div
            key={item.idMeal}
            className="group w-full min-w-0 flex flex-col bg-white border border-[#f0e6de] rounded-2xl shadow-[0_2px_4px_0_#00000013] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(240,51,40,0.12)] hover:border-[rgba(255,158,12,0.25)]"
          >
            <div className="w-full aspect-[4/3] overflow-hidden rounded-t-2xl shrink-0">
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-6 flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3">
                <span className="text-lg sm:text-xl lg:text-2xl nunito font-medium text-[#2D2D2D] line-clamp-2 min-w-0">
                  {item.strMeal}
                </span>
                <button className="text-white text-sm sm:text-base font-medium bg-[#F03328] rounded-[38px] py-2 sm:py-2.5 px-4 sm:px-5 cursor-pointer shrink-0 whitespace-nowrap shadow-[0_4px_14px_rgba(240,51,40,0.3)] transition-all hover:scale-105 hover:shadow-[0_6px_20px_rgba(240,51,40,0.4)] w-full sm:w-auto text-center">
                  Buy Now
                </button>
              </div>
              <div className="flex justify-between items-center gap-2 mt-auto">
                <span className="text-sm sm:text-lg nunito font-semibold text-[#666666] truncate">
                  Cuisine : {item.strArea}
                </span>
                <span className="font-bold text-xl sm:text-2xl lg:text-[28px] text-[#F03328] shrink-0">
                  $230
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSellerSection;
