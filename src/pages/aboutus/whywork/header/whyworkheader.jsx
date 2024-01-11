import React from "react";
import { Link } from "react-router-dom";

import "./whyworkheader.css";

const WhyWorkHeader = () => {
  return (
    <section id="whyheader">
      <div className="container whyworkheader__container">
        <div className="whyworkheader__title">
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
            Apply Now
          </Link>
          <Link to="/joinregister" className="btn btn-primary">
            Join Now
          </Link>
        </div>
      </div>
      <svg className="wavy-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#f8f8f8"
          fill-opacity="1"
          d="M0,128L48,122.7C96,117,192,107,288,128C384,149,480,203,576,218.7C672,235,768,213,864,197.3C960,181,1056,171,1152,165.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
};

export default WhyWorkHeader;
