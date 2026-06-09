import { useState } from "react";
import Logo from "../assets/images/Frame 2.png";
import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/home", label: "Home" },
  { to: "/Our-menu", label: "Our Menu" },
  { to: "/Foods", label: "Foods" },
  { to: "/About-Us", label: "About Us" },
  { to: "/Contact-Us", label: "Contact Us" },
];

const navLinkClass = ({ isActive }) =>
  `relative nunito text-base lg:text-[20px] font-medium transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:rounded-sm after:bg-gradient-to-r after:from-[#F03328] after:to-[#FF9E0C] after:transition-all ${
    isActive
      ? "text-[#F03328] after:w-full"
      : "text-[#3A3A3A] after:w-0 hover:text-[#F03328] hover:after:w-full"
  }`;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-[1100] mt-1 bg-[rgba(255,253,251,0.92)] backdrop-blur-md border-b border-[#f0e6de] rounded-b-2xl lg:rounded-b-3xl px-4 py-3 sm:px-6 -mx-4 sm:-mx-5">
      <div className="flex justify-between items-center gap-4">
        <NavLink to="/home" className="flex gap-3 sm:gap-5 items-center shrink-0" onClick={closeMenu}>
          <div className="w-9 h-9 sm:w-11 sm:h-11">
            <img src={Logo} alt="Foodie logo" className="w-full h-full" />
          </div>
          <div>
            <span className="font-bold nunito text-2xl sm:text-3xl lg:text-[40px] text-[#F03328]">Foo</span>
            <span className="font-bold nunito text-2xl sm:text-3xl lg:text-[40px] text-[#FF9E0C]">die</span>
          </div>
        </NavLink>

        <nav className="hidden lg:flex gap-8 xl:gap-[71px]">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex group border-2 border-[#F03328] rounded-[38px] px-6 lg:px-[43px] py-2.5 lg:py-[17px] cursor-pointer bg-transparent transition-all duration-300 hover:bg-gradient-to-br hover:from-[#F03328] hover:to-[#FF9E0C] hover:border-transparent hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(240,51,40,0.25)]">
            <span className="text-[#F03328] text-base lg:text-[20px] font-extrabold nunito transition-colors group-hover:text-white">
              Login
            </span>
          </button>

          <button
            type="button"
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-[#f0e6de] bg-white text-[#2d2d2d] text-xl"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden mt-4 pt-4 border-t border-[#f0e6de] flex flex-col gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nunito text-base font-medium px-3 py-3 rounded-xl transition-colors ${
                  isActive ? "text-[#F03328] bg-[#fff5ee]" : "text-[#3A3A3A] hover:bg-[#fff9f5]"
                }`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
          <button className="sm:hidden mt-2 w-full border-2 border-[#F03328] rounded-[38px] py-3 cursor-pointer bg-transparent">
            <span className="text-[#F03328] text-base font-extrabold nunito">Login</span>
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
