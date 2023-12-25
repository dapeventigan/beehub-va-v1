import React from "react";
import { Link } from "react-router-dom";
import "./hiring.css";
const Hiring = () => {
  return (
    <section id="hiring">
      <h1 className="hiring__title">How to start your career on BeeHub</h1>
      <div className="container hiring__container">
        <div className="hiring__contents">
          <div className="hiring__number">1</div>
          <div className="hiring_desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, et
            omnis! Consectetur sequi officia unde dolore nobis accusantium quis
            facere impedit. Culpa officia eius accusamus.
          </div>
        </div>
        <div className="hiring__contents">
          <div className="hiring__number">2</div>
          <div className="hiring_desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, et
            omnis! Consectetur sequi officia unde dolore nobis accusantium quis
            facere impedit. Culpa officia eius accusamus.
          </div>
        </div>
      </div>
      <div className="container hiring__container">
        <div className="hiring__contents">
          <div className="hiring__number">1</div>
          <div className="hiring_desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, et
            omnis! Consectetur sequi officia unde dolore nobis accusantium quis
            facere impedit. Culpa officia eius accusamus.
          </div>
        </div>
        <div className="hiring__contents">
          <div className="hiring__number">2</div>
          <div className="hiring_desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At, et
            omnis! Consectetur sequi officia unde dolore nobis accusantium quis
            facere impedit. Culpa officia eius accusamus.
          </div>
        </div>
      </div>
      <div className="title__button">
        <Link to="/applyregister" className="btn btn-primary">
          Apply Now
        </Link>
      </div>
    </section>
  );
};

export default Hiring;
