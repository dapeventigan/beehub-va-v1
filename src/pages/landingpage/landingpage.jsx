import React from "react";
import RootNav from "./navbar/navroot.jsx";
import Header from "./header/header.jsx";
import ParallaxEffect from "./parallax/parallax.jsx";
import HowIt from "./howit/howit.jsx";
import BeeHubTag from "./beehubtag/beehubtag.jsx";
import Hiring from "./hiring/hiring.jsx";
import VASection from "./va/va.jsx";
import Contact from "./contact/contact.jsx";
import Footer from "./footer/footer.jsx";
import About from "./about/about.jsx";
import Choose from "./choose/choose.jsx";

function LandingPage() {
  return (
    <>
      <RootNav />
      <Header />
      <ParallaxEffect />
      <HowIt />
      <Choose />
      <Hiring />
      <BeeHubTag />
      <VASection />
      <Contact />
      <Footer />
    </>
  );
}

export default LandingPage;
