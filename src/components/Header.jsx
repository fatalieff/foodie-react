import { useState } from "react";
import Logo from "../assets/images/Frame 2.png";
import { NavLink } from "react-router-dom";

const navLinks = [
 { to: "/home", label: "Home" },
  { to: "/Our-menu", label: "Our Menu" },
  { to: "/Foods", label: "Foods" },
  { to: "/users", label: "Coming Soon" },
  { to: "/About-Us", label: "About Us" },
  { to: "/Contact-Us", label: "Contact Us" },
];

const navLinkClass = ({ isActive }) =>
  `relative font-nunito text-sm lg:text-base font-medium transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:rounded-sm after:bg-gradient-to-r after:from-[#F03328] after:to-[#FF9E0C] after:transition-all ${
    isActive
      ? "text-[#F03328] after:w-full"
      : "text-[#3A3A3A] after:w-0 hover:text-[#F03328] hover:after:w-full"
  }`;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-[1100] mt-1 bg-[rgba(255,253,251,0.92)] backdrop-blur-md border-b border-[#f0e6de] rounded-b-2xl lg:rounded-b-3xl px-4 py-2 sm:px-6 -mx-4 sm:-mx-5">
      <div className="flex justify-between items-center gap-4">
        <NavLink to="/home" className="flex gap-2 sm:gap-3 items-center shrink-0" onClick={closeMenu}>
          <div className="w-7 h-7 sm:w-9 sm:h-9">
            <img src={Logo} alt="Foodie logo" className="w-full h-full" />
          </div>
          <div className="flex">
            <span className="font-bold font-nunito text-xl sm:text-2xl lg:text-[28px] text-[#F03328]">Foo</span>
            <span className="font-bold font-nunito text-xl sm:text-2xl lg:text-[28px] text-[#FF9E0C]">die</span>
          </div>
        </NavLink>

        <nav className="hidden lg:flex gap-6 xl:gap-12">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex group border-2 border-[#F03328] rounded-[38px] px-5 lg:px-8 py-1.5 lg:py-2 cursor-pointer bg-transparent transition-all duration-300 hover:bg-gradient-to-br hover:from-[#F03328] hover:to-[#FF9E0C] hover:border-transparent hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(240,51,40,0.25)]">
            <span className="text-[#F03328] text-sm lg:text-base font-bold font-nunito transition-colors group-hover:text-white">
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
