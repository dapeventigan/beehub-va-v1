import React from "react";
import { Link } from "react-router-dom";
import "./plans-pricing-header.css";

const PlansPricingHeader = () => {
  return (
    <section id="planspricingheader">
      <div className="container planspricingheader__container">
        <div className="planspricingheader__title">
          <h1>Plans and Pricing</h1>
          <div className="planspricing__title">
       
            <p>
              Our service plans cater to individuals seeking highly skilled
              Virtual Assistants at Competitive Rates, ensuring
              affordability without compromising on exceptional service quality.
            </p>
          </div>
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
    </section>
  );
};

export default PlansPricingHeader;
