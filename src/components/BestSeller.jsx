import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "../store/foodSlice";

function BestSellerSection() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.foods);

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-[10%]">
      <h1 className="text-[55px] font-[700] nunito text-center">
        Our best Seller Dishes🔥🔥
      </h1>
      <p className="text-[25px] font-[500] text-[#5C5C5C] text-center">
        Our fresh garden salad is a light and refreshing option. It features a
        mix of
        <br />
        crisp lettuce, juicy tomatoe all tossed in your choice of dressing.
      </p>
      <div className="boxs grid grid-cols-3 gap-[40px] mt-[10%]">
        {items.slice(1, 7).map((item) => (
          <div
            className="box w-[380px] h-[486px] shadow-[0_2px_4px_0_#00000013] rounded-b-[16px] transition-transform duration-300 hover:scale-101 hover:shadow-[0_4px_12px_0_#00000026] hover:-translate-y-1  "
            key={items.idMeal}
          >
            <div className="img-container w-[100%] h-[50%]">
              <img
                src={item.strMealThumb}
                alt=""
                className="w-[100%] h-[100%] object-cover"
              />
            </div>
            <div className="text-area flex flex-col gap-[20px] mt-[40px]">
              <div className="top-section flex justify-between">
                <span className="text-[30px] nunito font-[500]">
                  {item.strMeal}
                </span>
                <button className="text-[#fff] text-[20px] font-[500] bg-[#F03328] rounded-[38px] py-[10px] px-[24px] cursor-pointer">
                  Buy Now
                </button>
              </div>
              <div className="bottom-area flex justify-between">
                <span className="text-[30px] nunito font-[600]">
                  Cuisine : {item.strArea}
                </span>
                <span className="font-[700] text-[34px]">$230</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSellerSection;
