import React from "react";

import Logo from "../assets/images/Frame 2.png";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <>
      <div className="header mt-[1%]">
        <div className="header-items  flex justify-between items-center">
          <div className="logo-container flex gap-[20px] items-center">
            <div className="logo w-[44px] h-[44px]">
              <img src={Logo} className="w-[100%] h-[100%]" />
            </div>
            <div className="text">
              <span className="font-[700] nunito text-[40px] text-[#F03328]">
                Foo
              </span>
              <span className="font-[700] nunito text-[40px] text-[#FF9E0C]">
                die
              </span>
            </div>
          </div>
          <div className="navbar gap-[71px] flex">
            <NavLink to={"/home"}>
              <span className="nunito text-[#3A3A3A] text-[20px] font-[500]">
                Home
              </span>
            </NavLink>
            <NavLink to={"/Our-menu"}>
              <span className="nunito text-[#3A3A3A] text-[20px] font-[500]">
                Our Menu
              </span>
            </NavLink>
            <NavLink to={"/Foods"}>
              <span className="nunito text-[#3A3A3A] text-[20px] font-[500]">
                Foods
              </span>
            </NavLink>
            <NavLink to={"/About-Us"}>
              <span className="nunito text-[#3A3A3A] text-[20px] font-[500]">
                About Us
              </span>
            </NavLink>
            <NavLink to={"/Contact-Us"}>
              <span className="nunito text-[#3A3A3A] text-[20px] font-[500]">
                Contact Us
              </span>
            </NavLink>
          </div>
          <div className="login-button">
            <button className="border-[2px] rounded-[38px] px-[43px] py-[17px] border-[#F03328] cursor-pointer "><span className="text-[#F03328] text-[20px] font-[800] nunito">Login</span></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
