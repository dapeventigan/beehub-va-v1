import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./whyworkheader.css";

const WhyWorkHeader = () => {
  
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);


  return (
    <section id="whyheader">
      <div className="container whyworkheader__container">
        <div className="whyworkheader__title" data-aos="fade-down" data-aos-once="true">
          <h1>Welcome to BeeHub Virtual Assistants Co.</h1>
          <p>
            We specialize in connecting businesses with top-tier remote
            specialists, delivering a seamless and flexible solution for today's
            modern workplace. We are committed to transforming the future of
            work by connecting businesses with the right talent, regardless of
            geographic location.
          </p>
        </div>
        <div className="title__button">
          <Link to="/applyregister" className="btn btn-primary">
            Find Career
          </Link>
          <Link to="/joinregister" className="btn btn-primary">
            Start Hiring
          </Link>
        </div>
      </div>
      <svg className="wavy-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
        <path
          fill="#f8f8f8"
          fill-opacity="1"
          d="M 0 320 L 301 216 L 1105 216 L 1440 320 Z"
        ></path>
      </svg>
    </section>
  );
};

export default WhyWorkHeader;
