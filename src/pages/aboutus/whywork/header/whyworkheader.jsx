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
    </section>
  );
};

export default WhyWorkHeader;
