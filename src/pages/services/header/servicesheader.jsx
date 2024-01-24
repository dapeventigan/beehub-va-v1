import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./servicesheader.css";

const ServicesHeader = () => {

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section id="serviceheader">
      <div className="container serviceheader__container">
        <div className="serviceheader__title" data-aos="fade-down" data-aos-once="true">
          <h1>Our Services</h1>
          <p>
            Our services help to create a smooth and efficient virtual work
            environment, allowing organizations to reap the benefits of remote
            work while ensuring that their virtual teams are productive,
            engaged, and aligned with corporate goals.
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
          fillOpacity="1"
          d="M 0 320 L 301 216 L 1105 216 L 1440 320 Z"
        ></path>
      </svg>
    </section>
  );
};

export default ServicesHeader;
