import React from "react";
import { NavLink } from "react-router-dom";
function Footer() {
  return (
    <>
      <div className="footer mt-[10%]">
        <div className="footer-items">
          <div className="newsletter flex justify-between">
            <div className="text-section">
              <span className="nunito text-[28px] text-[#101113] font-[700]">
                Join Our{" "}
                <span className="nunito text-[#F03328] text-[28px]  font-[700]">
                  Newsletter
                </span>
              </span>
              <p className="font-[500] text5-[16] leading-[24px] text-[#5C5F66]">
                Be the first to know about our latest updates, exclusive offers,
                and more.
              </p>
            </div>
            <div className="input-group flex  gap-[12px]">
              <input
                type="text"
                className="w-[320px] h-[44px] rounded-[8px] outline outline-1 outline-[#D6D6D6]
"
                placeholder="Enter your email address"
              />
              <button
                type="submit"
                className="bg-[#F03328] rounded-[8px] px-[20px] py-[12px] h-[44px] text-[14px] text-[#fff] cursor-pointer font-[500] nunito
"
              >
                {" "}
                Subscribe
              </button>
            </div>
          </div>
          <br />
          <hr className="text-[#E6E6E6]" />
          <div className="sections flex justify-between mt-[5%]">
            <div className="product-Service flex flex-col gap-[26px] h-min w-max">
              <span className="satoshi font-[500] tracking-[3px] text-[16px] ">
                Product & Service
              </span>
              <NavLink to="/products">
                <span className="satoshi text-[16px] text-[#00000099] font-[400]">
                  Products
                </span>
              </NavLink>
              <NavLink to="/Services">
                <span className="satoshi text-[16px] text-[#00000099] font-[400]">
                  Services
                </span>
              </NavLink>
              <NavLink to="/Appliances">
                <span className="satoshi text-[16px] text-[#00000099] font-[400]">
                  Appliances
                </span>
              </NavLink>
              <NavLink to="/career">
                <span className="satoshi text-[16px] text-[#00000099] font-[400]">
                  Storage
                </span>
              </NavLink>
            </div>
            <div className="shop-now flex flex-col gap-[26px] h-min w-max">
              <span className="satoshi font-[500] tracking-[3px] text-[16px] ">
                Shop Now
              </span>
              <NavLink to="/offers">
                <span className="satoshi text-[16px] text-[#00000099] font-[400]">
                  Offers
                </span>
              </NavLink>
              <NavLink to="/Promos">
                <span className="satoshi text-[16px] text-[#00000099] font-[400]">
                  Promos
                </span>
              </NavLink>
              <NavLink to="/Online-Shop-FAQ">
                <span className="satoshi text-[16px] text-[#00000099] font-[400]">
                  Online Shop FAQ
                </span>
              </NavLink>
              <NavLink to="/Business-Offer">
                <span className="satoshi text-[16px] text-[#00000099] font-[400]">
                  Business Offer
                </span>
              </NavLink>
            </div>
            <div className="faq flex flex-col gap-[26px] h-min w-max">
              <span className="satoshi font-[500] tracking-[3px] text-[16px] ">
                FAQ
              </span>
              <NavLink to="/account">
                <span className="satoshi text-[16px] text-[#00000099] font-[400]">
                  Account
                </span>
              </NavLink>
              <NavLink to="/manage-deliveries">
                <span className="satoshi text-[16px] text-[#00000099] font-[400]">
                  Manage Deliveries
                </span>
              </NavLink>
              <NavLink to="/orders">
                <span className="satoshi text-[16px] text-[#00000099] font-[400]">
                  Orders
                </span>
              </NavLink>
              <NavLink to="/payments">
                <span className="satoshi text-[16px] text-[#00000099] font-[400]">
                  Payments
                </span>
              </NavLink>
            </div>
            <div className="resources flex flex-col gap-[26px] h-min w-max">
              <span className="satoshi font-[500] tracking-[3px] text-[16px] ">
                RESOURCES
              </span>
              <NavLink to="/free-ebooks">
                <span className="satoshi text-[16px] text-[#00000099] font-[400]">
                  Free eBooks
                </span>
              </NavLink>
              <NavLink to="/development-utorial">
                <span className="satoshi text-[16px] text-[#00000099] font-[400]">
                  Development Tutorial
                </span>
              </NavLink>
              <NavLink to="/blog">
                <span className="satoshi text-[16px] text-[#00000099] font-[400]">
                  How to - Blog
                </span>
              </NavLink>
              <NavLink to="/youtube-playlist">
                <span className="satoshi text-[16px] text-[#00000099] font-[400]">
                  Youtube Playlist
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
