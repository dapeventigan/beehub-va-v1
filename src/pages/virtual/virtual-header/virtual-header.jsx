import React from "react";
import { Link } from "react-router-dom";
import "./virtual-header.css";

const VirtualHeader = () => {
  return (
    <section id="virtualheader">
      <div className="container virtualheader__container">
        <div className="virtualheader__title">
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
          d="M0,64L1440,320L1440,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
};

export default VirtualHeader;
