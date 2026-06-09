import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./Pages/Home";
import ContactUs from "./Pages/contact-us";
import AboutUs from "./Pages/aboutUs";
import Foods from "./Pages/foods";

function App() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Contact-Us" element={<ContactUs />} />
          <Route path="/About-Us" element={<AboutUs />} />
          <Route path="/Foods" element={<Foods/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
