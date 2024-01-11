import React from "react";
import { Link } from "react-router-dom";
import "./servicesheader.css";

const ServicesHeader = () => {
  return (
    <section id="serviceheader">
      <div className="container serviceheader__container">
        <div className="serviceheader__title">
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
            Apply Now
          </Link>
          <Link to="/joinregister" className="btn btn-primary">
            Join Now
          </Link>
        </div>
      </div>
      <svg
        className="wavy-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#f8f8f8"
          fill-opacity="1"
          d="M0,96L48,122.7C96,149,192,203,288,234.7C384,267,480,277,576,261.3C672,245,768,203,864,165.3C960,128,1056,96,1152,90.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
};

export default ServicesHeader;
