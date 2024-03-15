import React, { useEffect } from "react";
import AOS from "aos";
import ClientRegister from "../../../components/clientregister/clientregister";
import HoneyComb from "../../../assets/hiring.png";
import HoneyCombMobile from "../../../assets/hiring-mobile.png";
import BgVideo from "../../../assets/bgvideobeeS.mp4";

import "./hiring.css";
const Hiring = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });

    const { hash } = window.location;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <section id="hiring">
      <video
        className="video-bg"
        autoPlay
        loop
        muted
        poster={HoneyComb}
      >
        <source src="../../../assets/bgvideobeeS.mp4" type="video/mp4" />
      </video>
      <div className="hiring__content">
        <h1 className="hiring__title">
          How to start your Business with BeeHub
        </h1>
        <div className="hiring__container" data-aos="fade" data-aos-once="true">
          <img className="hiring__img" src={HoneyComb} alt="" />
          <img className="hiring__img-mobile" src={HoneyCombMobile} alt="" />
        </div>
        <div className="title__button">
          <a href="/" className="cnt-btn">
            Book a Call
          </a>
          <ClientRegister btnClass={"cnt-btn"} btnTitle={"Get Started"} />
        </div>
      </div>
    </section>
  );
};

export default Hiring;
