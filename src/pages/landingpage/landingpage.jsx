import RootNav from "./navbar/navroot.jsx";
import Header from "./header/header.jsx";
import AboutUs from "./about/about.jsx";
import FAQs from "./faqs/faqs.jsx";
import HowIt from "./howit/howit.jsx";
import Hiring from "./hiring/hiring.jsx";
import Choose from "./choose/choose.jsx";
import Contact from "./contact/contact.jsx";
import Footer from "./footer/footer.jsx";

function LandingPage() {

  return (
    <>
      <RootNav />
      <Header />
      <Choose />
      <HowIt/>
      <Hiring/>
      {/* <FAQs /> */}
      <AboutUs />
      <Contact />
      <Footer />
    </>
  );
}

export default LandingPage;
