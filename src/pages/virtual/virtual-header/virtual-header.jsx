import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./virtual-header.css";

const VirtualHeader = () => {

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section id="virtualheader">
      <div className="container virtualheader__container">
        <div className="virtualheader__title" data-aos="fade-down" data-aos-once="true">
          <h1>Our Virtual Assistants</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos, ab perferendis! Perspiciatis vel sed minus sequi
            similique. Deleniti nostrum eius fuga nobis voluptatum, praesentium,
            veritatis quam sapiente sint quas dolorum.
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

export default VirtualHeader;
