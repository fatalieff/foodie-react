import { BrowserRouter, NavLink } from "react-router-dom";
import "./App.css";
import DeliveryImg from "./assets/images/Frame 35.png";
import VarietyOptionsImg from "./assets/images/Frame 35 (1).png";
import BurgerImg from "./assets/images/Frame 35 (2).png";
import Header from "./components/Header";
import mainImg from "./assets/images/right.png";
import Footer from "./components/Footer";
import FoodImg from "./assets/images/e49bc90b540afa51492f09cab54f721dce5fb315.png";
import Sertifcate from "./assets/images/01.png";
import BestSeller from "./components/BestSeller";
import RocketImg from "./assets/images/7e5fab5ff76aca0c063ee7aef8926a4b3708bf15.png";

function App() {
  return (
    <>
      <div className="container mx-auto max-w-[calc(100%-120px)] px-[20px] ">
        <BrowserRouter>
          <Header />
          <div className="hero-content flex items-center relative">
            <div className="text-area h-max w-[50%]">
              <h1 className="nunito text-[61px] font-[700] tracking-[0px] leading-[120%]">
                Desire {" "}
                <span className="inline-block bg-gradient-to-r from-[#FF9E0C] to-[#D58000] text-white px-4 py-1 rounded-full rotate-[-11deg] nunito">
                  Food
                </span>{" "}
                <br />
                for Your Taste
              </h1>
              <p className="nunito font-[400] text-[25px] text-[#666666] leading-[120%]">
                Food is what we eat to stay alive and healthy. It <br /> comes
                in many different forms and flavors, from <br /> fruits and
                vegetables to meats and grains.
              </p>
            </div>
            <div className="right-section w-[50%] h-max">
              <img src={mainImg} alt="" className="w-[100%] h-[100%]" />
            </div>
            <div className="services-sections absolute bottom-[-70%] flex justify-between w-[100%]">
              <div
                className="box w-max h-max flex flex-col items-center rounded-[20px] shadow-[0px_2px_4px_0px_#00000013]
"
              >
                <div className="img-container w-[100px] h-[100px]">
                  <img src={Sertifcate} alt="" className="w-[100%] h-[100%]" />
                </div>
                <span className="nunito font-[600] text-[30px] ">
                  Quality Food
                </span>
                <p className="nunito font-[500] text-[20px] text-[#666666] text-center">
                  Contrary to popular belief,
                  <br />
                  Lorem Ipsum is not simply
                  <br />
                  random text
                </p>{" "}
                <br />
                <NavLink to={"/LearnMore"}>
                  <span className="text-[#2D2D2D]  text-[20px] font-[700] nunito hover:text-[#F03328] transition-colors">
                    Learn More
                  </span>
                </NavLink>
              </div>
              <div
                className="box w-max h-max flex flex-col items-center rounded-[20px] shadow-[0px_2px_4px_0px_#00000013]
"
              >
                <div className="img-container w-[100px] h-[100px]">
                  <img src={RocketImg} alt="" className="w-[100%] h-[100%]" />
                </div>
                <span className="nunito font-[600] text-[30px] ">
                  Quality Food
                </span>
                <p className="nunito font-[500] text-[20px] text-[#666666] text-center">
                  Contrary to popular belief,
                  <br />
                  Lorem Ipsum is not simply
                  <br />
                  random text
                </p>{" "}
                <br />
                <NavLink to={"/LearnMore"}>
                  <span className="text-[#2D2D2D]  text-[20px] font-[700] nunito hover:text-[#F03328] transition-colors">
                    Learn More
                  </span>
                </NavLink>
              </div>
              <div
                className="box w-max h-max flex flex-col items-center rounded-[20px] shadow-[0px_2px_4px_0px_#00000013]
"
              >
                <div className="img-container w-[100px] h-[100px]">
                  <img src={Sertifcate} alt="" className="w-[100%] h-[100%]" />
                </div>
                <span className="nunito font-[600] text-[30px] ">
                  Quality Food
                </span>
                <p className="nunito font-[500] text-[20px] text-[#666666] text-center">
                  Contrary to popular belief,
                  <br />
                  Lorem Ipsum is not simply
                  <br />
                  random text
                </p>{" "}
                <br />
                <NavLink to={"/LearnMore"}>
                  <span className="text-[#2D2D2D]  text-[20px] font-[700] nunito hover:text-[#F03328] transition-colors">
                    Learn More
                  </span>
                </NavLink>
              </div>
              <div
                className="box w-max h-max flex flex-col items-center rounded-[20px] shadow-[0px_2px_4px_0px_#00000013]
"
              >
                <div className="img-container w-[100px] h-[100px]">
                  <img src={RocketImg} alt="" className="w-[100%] h-[100%]" />
                </div>
                <span className="nunito font-[600] text-[30px] ">
                  Quality Food
                </span>
                <p className="nunito font-[500] text-[20px] text-[#666666] text-center">
                  Contrary to popular belief,
                  <br />
                  Lorem Ipsum is not simply
                  <br />
                  random text
                </p>{" "}
                <br />
                <NavLink to={"/LearnMore"}>
                  <span className="text-[#2D2D2D]  text-[20px] font-[700] nunito hover:text-[#F03328] transition-colors">
                    Learn More
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="people-chose mt-[35%] flex">
            <div className="left-section w-[50%]">
              <div className="img-container w-[578px] h-[574px]">
                <img
                  src={FoodImg}
                  alt=""
                  className="w-[100%] h-[100%] object-cover rounded-[30px]"
                />
              </div>
            </div>
            <div className="right-section w-[50%] flex flex-col items-center gap-[41px]">
              <span className="nunito font-[700] text-[50px] text-[#2D2D2D]">
                Why People Choose us?
              </span>
              <div className="box     shadow-[0_2px_4px_0_#00000013] rounded-[16px] ">
                <div className="box-items flex items-center gap-5">
                  <div className="img-container w-[90px] h-[90px]">
                    <img
                      src={DeliveryImg}
                      alt=""
                      className="w-[100%] h-[100%] object-cover"
                    />
                  </div>
                  <div className="text-area flex flex-col">
                    <span className="nunito font-semibold text-[31px]">
                      Convenient and Reliable
                    </span>
                    <p className="nunito font-medium text-[20px] text-[#404040]">
                      Whether you dine in, take out, or order delivery, our
                      <br />
                      service is convenient, fast, and reliable, making
                      <br /> mealtime hassle-free.
                    </p>
                  </div>
                </div>
              </div>
              <div className="box     shadow-[0_2px_4px_0_#00000013] rounded-[16px] ">
                <div className="box-items flex items-center gap-5">
                  <div className="img-container w-[90px] h-[90px]">
                    <img
                      src={VarietyOptionsImg}
                      alt=""
                      className="w-[100%] h-[100%] object-cover"
                    />
                  </div>
                  <div className="text-area flex flex-col">
                    <span className="nunito font-semibold text-[31px]">
                      Variety of Options{" "}
                    </span>
                    <p className="nunito font-medium text-[20px] text-[#404040]">
                      From hearty meals to light snacks, we offer a wide <br />{" "}
                      range of options to suit every taste and craving.
                    </p>
                  </div>
                </div>
              </div>
              <div className="box     shadow-[0_2px_4px_0_#00000013] rounded-[16px] ">
                <div className="box-items flex items-center gap-5">
                  <div className="img-container w-[90px] h-[90px]">
                    <img
                      src={BurgerImg}
                      alt=""
                      className="w-[100%] h-[100%] object-cover"
                    />
                  </div>
                  <div className="text-area flex flex-col ">
                    <span className="nunito font-semibold text-[31px]">
                      Eat Burger
                    </span>
                    <p className="nunito font-medium text-[20px] text-[#404040]">
                      Our burgers are grilled to perfection, with juicy
                      <br />
                      patties and flavorful toppings that make every bite a{" "}
                      <br /> delicious experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BestSeller/>
          <Footer/>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
