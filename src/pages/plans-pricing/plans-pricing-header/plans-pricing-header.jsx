import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./plans-pricing-header.css";

const PlansPricingHeader = () => {

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section id="planspricingheader">
      <div className="container planspricingheader__container">
        <div className="planspricingheader__title" data-aos="fade-down" data-aos-once="true">
          <h1>Plans and Pricing</h1>
          <div className="planspricing__title">
            <p>
              Our service plans cater to individuals seeking highly skilled
              Virtual Assistants at Competitive Rates, ensuring affordability
              without compromising on exceptional service quality.
            </p>
          </div>
        </div>
        <div className="title__button">
          <Link to="/applyregister" className="btn btn-primary">
            Find Career
          </Link>
          <Link to="/joinregister" className="btn btn-primary">
            Start Hiring
          </Link>
        </div>
        <svg
          className="wavy-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 319"
        >
          <path
            fill="#f8f8f8"
            fillOpacity="1"
            d="M 0 320 L 301 216 L 1105 216 L 1440 320 Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default PlansPricingHeader;
