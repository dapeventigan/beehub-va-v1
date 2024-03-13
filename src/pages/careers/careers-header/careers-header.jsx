import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../aboutus/whywork/header/whyworkheader.css";

const CareersHeader = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section id="whyheader">
      <div className="container whyworkheader__container">
        <div
          className="whyworkheader__title"
          data-aos="fade-down"
          data-aos-once="true"
        >
          <h1>Careers</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
            possimus sapiente ipsum similique ratione odit amet illum commodi,
            maxime voluptatem nesciunt libero! Vero autem vel libero sunt
            debitis, nulla esse.
          </p>
        </div>
        <div className="title__button">
          <Link to="/job-boards" className="btn btn-primary">
            Look for Jobs
          </Link>
          <Link to="/joinregister" className="btn btn-primary">
            Start Career
          </Link>
        </div>
      </div>
      {/* <svg className="wavy-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
        <path
          fill="#f8f8f8"
          fillOpacity="1"
          d="M 0 320 L 301 216 L 1105 216 L 1440 320 Z"
        ></path>
      </svg> */}
    </section>
  );
};

export default CareersHeader;
