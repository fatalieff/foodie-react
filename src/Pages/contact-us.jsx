import MapComponent from "../components/mapComponent";

const contactDetails = [
  { icon: "fa-location-dot", text: "123 Main St, Anytown, USA" },
  { icon: "fa-phone", text: "123-456-7890" },
  { icon: "fa-envelope", text: "info@example.com" },
  { icon: "fa-globe", text: "www.example.com" },
  { icon: "fa-clock", text: "Mon - Fri: 9:00 AM - 5:00 PM" },
];

const socialLinks = [
  { icon: "fa-facebook", href: "#" },
  { icon: "fa-twitter", href: "#" },
  { icon: "fa-instagram", href: "#" },
  { icon: "fa-linkedin", href: "#" },
];

const inputClass =
  "w-full nunito text-[15px] px-[18px] py-3 sm:py-[14px] border border-[#f0e6de] rounded-[14px] bg-[#fff9f5] text-[#2d2d2d] outline-none transition-all placeholder:text-[#aaa] focus:border-[#FF9E0C] focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,158,12,0.15)]";

function ContactUs() {
  return (
    <div className="nunito relative z-[1] py-6 sm:py-8 pb-12 sm:pb-16 min-h-[50vh]">
      <div className="flex flex-col xl:flex-row items-stretch gap-6 lg:gap-7">
        {/* Left — info card */}
        <div className="w-full xl:w-[34%] xl:shrink-0 flex flex-col gap-4 bg-white border border-[#f0e6de] rounded-[20px] p-4 sm:p-5 shadow-[0_4px_24px_rgba(240,51,40,0.06)]">
          <div>
            <h1 className="text-2xl sm:text-[30px] font-bold text-[#2d2d2d] leading-tight">
              Contact Us
              <span className="block w-10 h-[3px] mt-2 rounded bg-gradient-to-r from-[#F03328] to-[#FF9E0C]" />
            </h1>
            <p className="text-sm text-[#666666] leading-snug mt-2 mb-3.5">
              Get in touch with us — we would love to hear from you.
            </p>

            <div className="flex flex-col gap-2">
              {contactDetails.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-[#fff9f5] border border-transparent transition-all hover:border-[rgba(255,158,12,0.25)] hover:bg-[#fff5ee] hover:translate-x-1"
                >
                  <div className="w-8 h-8 shrink-0 rounded-[10px] bg-gradient-to-br from-[#F03328] to-[#FF9E0C] flex items-center justify-center text-white text-[13px] shadow-[0_3px_8px_rgba(240,51,40,0.2)]">
                    <i className={`fa-solid ${item.icon}`} />
                  </div>
                  <span className="text-[13px] sm:text-sm font-medium text-[#2d2d2d] leading-snug">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2.5 pt-1.5 border-t border-[#f0e6de]">
            {socialLinks.map((item) => (
              <a
                key={item.icon}
                href={item.href}
                aria-label={item.icon}
                className="w-9 h-9 rounded-[10px] bg-[#fff9f5] border border-[#f0e6de] flex items-center justify-center text-[#666666] text-lg no-underline transition-all hover:bg-gradient-to-br hover:from-[#F03328] hover:to-[#FF9E0C] hover:text-white hover:border-transparent hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(240,51,40,0.3)]"
              >
                <i className={`fa-brands ${item.icon}`} />
              </a>
            ))}
          </div>
        </div>

        {/* Right — map + form */}
        <div className="flex-1 min-w-0 relative z-0">
          <div className="flex flex-col lg:flex-row gap-5 items-stretch">
            <div className="w-full lg:flex-1 min-h-[280px] sm:min-h-[340px] lg:min-h-[380px] lg:h-auto h-[300px] sm:h-[380px] rounded-[20px] overflow-hidden border border-[#f0e6de] shadow-[0_8px_32px_rgba(45,45,45,0.08)] relative z-0 isolate [&_.leaflet-container]:h-full [&_.leaflet-container]:w-full [&_.leaflet-container]:rounded-[20px]">
              <MapComponent />
            </div>

            <form
              className="w-full lg:w-[300px] lg:shrink-0 flex flex-col gap-3 bg-white border border-[#f0e6de] rounded-[20px] p-4 sm:p-5 shadow-[0_4px_24px_rgba(240,51,40,0.06)]"
              onSubmit={(e) => e.preventDefault()}
            >
              <h2 className="text-xl sm:text-[22px] font-bold text-[#2d2d2d] mb-1">
                Send a Message
              </h2>
              <p className="text-sm text-[#666666] mb-2">
                We&apos;ll get back to you shortly.
              </p>

              <input type="text" name="fullName" placeholder="Full Name" className={inputClass} />
              <input type="email" name="email" placeholder="Email Address" className={inputClass} />
              <textarea
                name="message"
                placeholder="Your message..."
                rows={4}
                className={`${inputClass} min-h-[90px] resize-y`}
              />
              <button
                type="submit"
                className="mt-1 rounded-[38px] px-7 py-3 sm:py-3.5 text-white font-bold text-base cursor-pointer bg-gradient-to-br from-[#F03328] to-[#e85a20] shadow-[0_6px_20px_rgba(240,51,40,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(240,51,40,0.4)] hover:from-[#d42a20] hover:to-[#d58000]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
