import Navbar from "../components/landing_page/Navbar";
import Carousel from "../components/landing_page/Carousel";
import Section1 from "../components/landing_page/Section1";
import Section3 from "../components/landing_page/Section3";
import ContactUs from "../components/landing_page/Footer";

// import "./route-styles/styles1.module.css";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <Section1 />
      <Carousel />
      <Section3 />
      <ContactUs />
    </div>
  );
}

export default LandingPage;