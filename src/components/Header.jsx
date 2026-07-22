import { useState, useEffect } from "react";
import Logo from "../assets/images/Frame 2.png";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../store/cartSlice";

const navLinks = [
  { to: "/home", label: "Home" },
  { to: "/Our-menu", label: "Our Menu" },
  { to: "/Foods", label: "Foods" },
  { to: "/Community", label: "Community" },
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
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    // Function to ensure user has a profile
    const ensureProfileExists = async (user) => {
      if (!user) return;
      
      try {
        // Upsert profile
        const { error: upsertError } = await supabase
          .from('profiles')
          .upsert([
            {
              id: user.id,
              username: user.user_metadata?.username || user.email.split('@')[0],
              full_name: user.user_metadata?.username || user.email.split('@')[0],
              avatar_url: null
            }
          ], { onConflict: 'id' });

        if (upsertError) {
          console.error('Error ensuring profile exists:', upsertError);
        }
      } catch (err) {
        console.error('Error in ensureProfileExists:', err);
      }
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        ensureProfileExists(session.user);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        ensureProfileExists(currentUser);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfileOpen(false);
    navigate("/home");
  };

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
          {/* Basket Icon */}
          <button 
            id="cart-icon"
            onClick={() => dispatch(toggleCart())}
            className="relative p-2 rounded-xl hover:bg-[#fff5ee] transition-all duration-300 border border-transparent hover:border-[#f0e6de] group"
          >
            <i className="fa-solid fa-basket-shopping text-xl text-[#2d2d2d] group-hover:text-[#F03328] transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F03328] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in duration-300">
                {totalItems}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1.5 sm:p-2 rounded-full hover:bg-[#fff5ee] transition-all duration-300 border border-transparent hover:border-[#f0e6de]"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#F03328] to-[#FF9E0C] flex items-center justify-center text-white shadow-md">
                  <span className="text-sm sm:text-base font-bold uppercase">
                    {user.user_metadata?.username?.charAt(0) || user.email?.charAt(0)}
                  </span>
                </div>
                <div className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="text-sm font-bold text-[#2d2d2d] font-nunito">
                    {user.user_metadata?.username || "User"}
                  </span>
                  <span className="text-[10px] text-[#666666] font-nunito">View Profile</span>
                </div>
                <i className={`fa-solid fa-chevron-down text-[10px] text-[#666666] transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-[-1]" 
                    onClick={() => setProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#f0e6de] py-2 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-2 border-b border-[#f0e6de] mb-1">
                      <p className="text-xs text-[#666666] font-nunito">Signed in as</p>
                      <p className="text-sm font-bold text-[#2d2d2d] font-nunito truncate">{user.email}</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-[#2d2d2d] hover:bg-[#fff5ee] hover:text-[#F03328] transition-colors font-nunito flex items-center gap-2">
                      <i className="fa-regular fa-user" /> Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-[#2d2d2d] hover:bg-[#fff5ee] hover:text-[#F03328] transition-colors font-nunito flex items-center gap-2">
                      <i className="fa-solid fa-clock-rotate-left" /> My Orders
                    </button>
                    <div className="border-t border-[#f0e6de] mt-1 pt-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-[#F03328] hover:bg-[#fff5ee] transition-colors font-nunito flex items-center gap-2"
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket" /> Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden sm:flex group border-2 border-[#F03328] rounded-[38px] px-5 lg:px-8 py-1.5 lg:py-2 cursor-pointer bg-transparent transition-all duration-300 hover:bg-gradient-to-br hover:from-[#F03328] hover:to-[#FF9E0C] hover:border-transparent hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(240,51,40,0.25)]"
            >
              <span className="text-[#F03328] text-sm lg:text-base font-bold font-nunito transition-colors group-hover:text-white">
                Login
              </span>
            </button>
          )}

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
          {!user && (
            <button
              onClick={() => {
                navigate("/login");
                closeMenu();
              }}
              className="sm:hidden mt-2 w-full border-2 border-[#F03328] rounded-[38px] py-3 cursor-pointer bg-transparent"
            >
              <span className="text-[#F03328] text-base font-extrabold nunito">Login</span>
            </button>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
