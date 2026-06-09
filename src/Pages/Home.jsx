import { NavLink } from "react-router-dom";
import DeliveryImg from "../assets/images/Frame 35.png";
import VarietyOptionsImg from "../assets/images/Frame 35 (1).png";
import BurgerImg from "../assets/images/Frame 35 (2).png";
import mainImg from "../assets/images/right.png";
import FoodImg from "../assets/images/e49bc90b540afa51492f09cab54f721dce5fb315.png";
import Sertifcate from "../assets/images/01.png";
import BestSeller from "../components/BestSeller";
import RocketImg from "../assets/images/7e5fab5ff76aca0c063ee7aef8926a4b3708bf15.png";

const serviceCardClass =
  "flex flex-col items-center gap-2 sm:gap-3 min-w-0 bg-white p-4 sm:p-5 border border-[#f0e6de] rounded-[20px] shadow-[0px_2px_4px_0px_#00000013] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(240,51,40,0.12)] hover:border-[rgba(255,158,12,0.3)]";

const iconWrapClass =
  "w-16 h-16 sm:w-20 sm:h-20 lg:w-[100px] lg:h-[100px] bg-gradient-to-br from-[#fff5ee] to-[#ffe8d6] rounded-[20px] p-2 sm:p-3 flex items-center justify-center";

const featureCardClass =
  "w-full bg-white py-3 px-4 sm:py-3.5 sm:px-[18px] border border-[#f0e6de] rounded-2xl shadow-[0_2px_4px_0_#00000013] transition-all duration-300 hover:translate-x-1.5 hover:shadow-[0_8px_32px_rgba(45,45,45,0.08)] hover:border-[rgba(240,51,40,0.15)]";

const services = [
  { img: Sertifcate, title: "Quality Food" },
  { img: RocketImg, title: "Fast Delivery" },
  { img: Sertifcate, title: "Quality Food" },
  { img: RocketImg, title: "Fast Delivery" },
];

const features = [
  {
    img: DeliveryImg,
    title: "Convenient and Reliable",
    text: "Whether you dine in, take out, or order delivery, our service is convenient, fast, and reliable.",
  },
  {
    img: VarietyOptionsImg,
    title: "Variety of Options",
    text: "From hearty meals to light snacks, we offer a wide range of options to suit every taste.",
  },
  {
    img: BurgerImg,
    title: "Eat Burger",
    text: "Our burgers are grilled to perfection, with juicy patties and flavorful toppings.",
  },
];

function Home() {
  return (
    <>
      <div className="pt-6 sm:pt-8 lg:pt-12">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="font-nunito text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#2D2D2D]">
              Desire{" "}
              <span className="inline-block bg-gradient-to-r from-[#FF9E0C] to-[#D58000] text-white px-3 sm:px-4 py-1 rounded-full -rotate-[11deg] shadow-[0_6px_20px_rgba(213,128,0,0.35)] text-2xl sm:text-3xl lg:text-5xl">
                Food
              </span>
              <br />
              for Your Taste
            </h1>
            <p className="font-nunito text-base sm:text-lg lg:text-xl text-[#666666] leading-relaxed mt-3 sm:mt-4 max-w-xl mx-auto lg:mx-0">
              Food is what we eat to stay alive and healthy. It comes in many
              different forms and flavors, from fruits and vegetables to meats
              and grains.
            </p>
          </div>
          <div className="relative w-full lg:w-1/2 max-w-md lg:max-w-none mx-auto">
            <div className="absolute inset-[10%_-5%_-5%_15%] rounded-full bg-[radial-gradient(circle,rgba(255,158,12,0.15)_0%,transparent_70%)] -z-10" />
            <img src={mainImg} alt="" className="w-full h-auto drop-shadow-lg" />
          </div>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12 lg:mt-16">
          {services.map((item, i) => (
            <div key={i} className={serviceCardClass}>
              <div className={iconWrapClass}>
                <img src={item.img} alt="" className="w-full h-full" />
              </div>
              <span className="font-nunito font-semibold text-lg sm:text-xl lg:text-2xl text-[#2D2D2D] text-center">
                {item.title}
              </span>
              <p className="font-nunito font-medium text-sm sm:text-base text-[#666666] text-center">
                Contrary to popular belief, Lorem Ipsum is not simply random text
              </p>
              <NavLink to="/LearnMore" className="mt-2 sm:mt-4">
                <span className="text-[#2D2D2D] text-sm sm:text-base font-bold font-nunito hover:text-[#F03328] transition-colors">
                  Learn More
                </span>
              </NavLink>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 sm:mt-16 lg:mt-24 flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 relative z-[1]">
        <div className="w-full lg:w-1/2">
          <img
            src={FoodImg}
            alt=""
            className="w-full max-w-lg mx-auto lg:max-w-none aspect-square object-cover rounded-2xl lg:rounded-[30px] shadow-[0_8px_32px_rgba(45,45,45,0.08)] transition-transform duration-400 hover:scale-[1.02]"
          />
        </div>
        <div className="w-full lg:w-1/2 min-h-0 flex flex-col justify-between gap-6">
          <span className="font-nunito font-bold text-2xl sm:text-3xl lg:text-4xl text-center shrink-0 bg-gradient-to-br from-[#2d2d2d] to-[#5c4033] bg-clip-text text-transparent">
            Why People Choose us?
          </span>
          <div className="flex flex-col gap-3 flex-1 justify-center min-h-0">
            {features.map((item) => (
              <div key={item.title} className={featureCardClass}>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 shrink-0">
                    <img src={item.img} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="font-nunito font-semibold text-base sm:text-lg lg:text-xl leading-tight">
                      {item.title}
                    </span>
                    <p className="font-nunito font-medium text-xs sm:text-sm text-[#404040] leading-snug">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BestSeller />
    </>
  );
}

export default Home;
