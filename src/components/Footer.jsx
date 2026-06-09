import { NavLink } from "react-router-dom";

const footerSections = [
  {
    title: "Product & Service",
    links: [
      ["/products", "Products"],
      ["/Services", "Services"],
      ["/Appliances", "Appliances"],
      ["/career", "Storage"],
    ],
  },
  {
    title: "Shop Now",
    links: [
      ["/offers", "Offers"],
      ["/Promos", "Promos"],
      ["/Online-Shop-FAQ", "Online Shop FAQ"],
      ["/Business-Offer", "Business Offer"],
    ],
  },
  {
    title: "FAQ",
    links: [
      ["/account", "Account"],
      ["/manage-deliveries", "Manage Deliveries"],
      ["/orders", "Orders"],
      ["/payments", "Payments"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["/free-ebooks", "Free eBooks"],
      ["/development-utorial", "Development Tutorial"],
      ["/blog", "How to - Blog"],
      ["/youtube-playlist", "Youtube Playlist"],
    ],
  },
];

function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 lg:mt-[10%] bg-gradient-to-b from-[#fff5ee] to-[#ffefe4] border-t border-[#f0e6de] rounded-t-2xl lg:rounded-t-[32px] px-4 sm:px-8 lg:px-10 pt-8 sm:pt-12 pb-8 sm:pb-10 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-8">
        <div className="text-center lg:text-left">
          <span className="nunito text-xl sm:text-2xl lg:text-[28px] text-[#101113] font-bold">
            Join Our <span className="text-[#F03328]">Newsletter</span>
          </span>
          <p className="nunito font-medium text-sm sm:text-base leading-6 text-[#5C5F66] mt-2 max-w-md mx-auto lg:mx-0">
            Be the first to know about our latest updates, exclusive offers, and more.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto max-w-md lg:max-w-none mx-auto lg:mx-0">
          <input
            type="text"
            className="w-full sm:flex-1 lg:w-80 h-11 rounded-xl bg-white border border-[#f0e6de] px-4 transition-all focus:outline-none focus:border-[#FF9E0C] focus:shadow-[0_0_0_3px_rgba(255,158,12,0.15)]"
            placeholder="Enter your email address"
          />
          <button
            type="submit"
            className="bg-[#F03328] rounded-xl px-5 h-11 text-sm text-white cursor-pointer font-medium nunito shadow-[0_4px_14px_rgba(240,51,40,0.25)] transition-all hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(240,51,40,0.35)] hover:bg-[#d42a20] shrink-0"
          >
            Subscribe
          </button>
        </div>
      </div>

      <hr className="border-[#E6E6E6] mt-6 sm:mt-8" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6 mt-8 sm:mt-[5%]">
        {footerSections.map((section) => (
          <div key={section.title} className="flex flex-col gap-4 sm:gap-[26px]">
            <span className="nunito font-bold tracking-[1px] sm:tracking-[2px] text-xs sm:text-sm uppercase text-[#2D2D2D]">
              {section.title}
            </span>
            {section.links.map(([to, label]) => (
              <NavLink key={to} to={to} className="group">
                <span className="nunito text-sm sm:text-base text-[#00000099] transition-colors group-hover:text-[#F03328]">
                  {label}
                </span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
