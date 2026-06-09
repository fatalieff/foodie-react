import { NavLink } from "react-router-dom";
import FoodImg from "../assets/images/e49bc90b540afa51492f09cab54f721dce5fb315.png";
import DeliveryImg from "../assets/images/Frame 35.png";
import BurgerImg from "../assets/images/Frame 35 (2).png";
import RocketImg from "../assets/images/7e5fab5ff76aca0c063ee7aef8926a4b3708bf15.png";

const features = [
  {
    icon: "fa-seedling",
    title: "Fresh Ingredients",
    text: "We source all our ingredients daily from local organic farms to ensure maximum freshness.",
  },
  {
    icon: "fa-truck",
    title: "Super Fast Delivery",
    text: "Your food is packed with thermal bags and delivered hot to your door within 30 minutes.",
  },
  {
    icon: "fa-utensils",
    title: "Experienced Chefs",
    text: "Our meals are prepared by award-winning chefs who care about taste and hygiene.",
  },
];

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Dishes Served" },
  { value: "30min", label: "Avg. Delivery" },
  { value: "4.9", label: "User Rating" },
];

const values = [
  {
    icon: "fa-heart",
    title: "Passion for Food",
    text: "Every dish is crafted with love and attention to the smallest details.",
  },
  {
    icon: "fa-shield-halved",
    title: "Quality & Safety",
    text: "Strict hygiene standards and premium ingredients in every order.",
  },
  {
    icon: "fa-hand-holding-heart",
    title: "Customer First",
    text: "Your satisfaction is our top priority — we listen and improve every day.",
  },
];

function AboutUs() {
  return (
    <div className="nunito relative z-[1] py-6 sm:py-10 pb-12 sm:pb-16">
      {/* Hero */}
      <section className="text-center max-w-2xl mx-auto px-2 mb-10 sm:mb-14">
        <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-[2px] text-[#FF9E0C] mb-3">
          Our Story
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2d2d2d] leading-tight">
          About{" "}
          <span className="bg-gradient-to-r from-[#F03328] to-[#FF9E0C] bg-clip-text text-transparent">
            Foodie
          </span>
        </h1>
        <span className="block w-12 h-1 mx-auto mt-4 rounded bg-gradient-to-r from-[#F03328] to-[#FF9E0C]" />
        <p className="text-sm sm:text-base lg:text-lg text-[#666666] leading-relaxed mt-5">
          Food is what we eat to stay alive and healthy. It comes in many different
          forms and flavors. At Foodie, we bring the best tastes straight to your
          doorstep with warmth, speed, and care.
        </p>
      </section>

      {/* Image + Features */}
      <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-12 sm:mb-16">
        <div className="w-full lg:w-1/2">
          <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(45,45,45,0.08)] border border-[#f0e6de] aspect-[4/3] lg:aspect-auto lg:h-[420px]">
            <img
              src={FoodImg}
              alt="Our Kitchen"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
              <span className="inline-block bg-white/90 backdrop-blur-sm text-[#F03328] text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full">
                Since 2020
              </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2d2d2d] mb-6 text-center lg:text-left">
            Why Choose Us?
          </h2>
          <div className="flex flex-col gap-4">
            {features.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-4 sm:p-5 bg-white border border-[#f0e6de] rounded-2xl shadow-[0_4px_24px_rgba(240,51,40,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(45,45,45,0.08)] hover:border-[rgba(255,158,12,0.25)]"
              >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-[#fff5ee] to-[#ffe8d6] flex items-center justify-center text-[#F03328] text-lg">
                  <i className={`fa-solid ${item.icon}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-[#2d2d2d] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[#666666] leading-snug">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
        {stats.map((item) => (
          <div
            key={item.label}
            className="text-center py-6 sm:py-8 px-4 bg-white border border-[#f0e6de] rounded-2xl shadow-[0_4px_24px_rgba(240,51,40,0.06)]"
          >
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#F03328] to-[#FF9E0C] bg-clip-text text-transparent">
              {item.value}
            </span>
            <span className="block text-xs sm:text-sm font-medium text-[#666666] mt-2">
              {item.label}
            </span>
          </div>
        ))}
      </section>

      {/* Mission + Values */}
      <section className="mb-12 sm:mb-16">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2d2d2d]">
            Our Mission & Values
          </h2>
          <p className="text-sm sm:text-base text-[#666666] mt-3 max-w-xl mx-auto">
            We believe great food brings people together. These values guide everything we do.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {values.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center p-6 sm:p-8 bg-gradient-to-b from-white to-[#fff9f5] border border-[#f0e6de] rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(240,51,40,0.1)]"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F03328] to-[#FF9E0C] flex items-center justify-center text-white text-xl mb-4 shadow-[0_6px_20px_rgba(240,51,40,0.3)]">
                <i className={`fa-solid ${item.icon}`} />
              </div>
              <h3 className="text-lg font-bold text-[#2d2d2d] mb-2">{item.title}</h3>
              <p className="text-sm text-[#666666] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team highlights */}
      <section className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 sm:mb-16">
        <div className="flex-1 flex items-center gap-4 p-5 bg-white border border-[#f0e6de] rounded-2xl shadow-[0_4px_24px_rgba(240,51,40,0.06)]">
          <img src={DeliveryImg} alt="" className="w-16 h-16 object-contain shrink-0" />
          <div>
            <h3 className="font-bold text-[#2d2d2d]">Convenient Service</h3>
            <p className="text-sm text-[#666666]">Dine in, take out, or delivery — always hassle-free.</p>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-4 p-5 bg-white border border-[#f0e6de] rounded-2xl shadow-[0_4px_24px_rgba(240,51,40,0.06)]">
          <img src={BurgerImg} alt="" className="w-16 h-16 object-contain shrink-0" />
          <div>
            <h3 className="font-bold text-[#2d2d2d]">Signature Burgers</h3>
            <p className="text-sm text-[#666666]">Grilled to perfection with juicy patties and fresh toppings.</p>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-4 p-5 bg-white border border-[#f0e6de] rounded-2xl shadow-[0_4px_24px_rgba(240,51,40,0.06)]">
          <img src={RocketImg} alt="" className="w-16 h-16 object-contain shrink-0" />
          <div>
            <h3 className="font-bold text-[#2d2d2d]">Lightning Fast</h3>
            <p className="text-sm text-[#666666]">Hot meals at your door before you know it.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-10 sm:py-14 px-6 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-[#fff5ee] via-[#fff9f5] to-[#ffefe4] border border-[#f0e6de]">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#2d2d2d] mb-3">
          Ready to taste the difference?
        </h2>
        <p className="text-sm sm:text-base text-[#666666] mb-6 max-w-md mx-auto">
          Explore our menu or get in touch — we&apos;d love to serve you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <NavLink
            to="/home"
            className="inline-block rounded-[38px] px-8 py-3.5 text-white font-bold bg-gradient-to-br from-[#F03328] to-[#e85a20] shadow-[0_6px_20px_rgba(240,51,40,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(240,51,40,0.4)]"
          >
            View Menu
          </NavLink>
          <NavLink
            to="/Contact-Us"
            className="inline-block rounded-[38px] px-8 py-3.5 font-bold text-[#F03328] border-2 border-[#F03328] bg-transparent transition-all hover:bg-[#F03328] hover:text-white"
          >
            Contact Us
          </NavLink>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
