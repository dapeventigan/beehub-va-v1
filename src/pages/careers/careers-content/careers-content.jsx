import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import AOS from "aos";
import "../../aboutus/whywork/aboutus/whyworkabout.css";

const CareersContent = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section id="whyabout">
      <div className="whyworkabout__container">
        <div className="whyworkabout__title">
          <div className="top-horizontal-line"></div>
          <h1 className="howit__title">About Us</h1>
          <p>
            BeeHub Virtual Assistants Co. was founded on the idea of
            establishing a workforce that defies traditional constraints. We
            were founded in 2023 with the goal of redefining the future of work
            by effortlessly linking businesses with a vast talent network. We at
            BeeHub Virtual Assistants Co. believe in breaking down barriers and
            maximizing the potential of a diverse, competent, and remote
            workforce.
          </p>
        </div>

        <div className="horizontal-line"></div>

        <div className="whyworkabout__profile" style={{marginBottom: "5rem"}}>
          <div className="howit__contents">
            <div className="howit__desc" data-aos="fade" data-aos-once="true">
              <h1 className="howit__title">Our Mission</h1>
              <p className="howit__text">
                Our mission is simple but powerful: to bridge the
                talent-opportunity gap, to transcend geographical constraints,
                and to unlock the full potential of a diverse and competent
                virtual workforce by enabling individuals to achieve greatness
                and reach their full potential by providing the tools,
                resources, and support they need to excel while fostering a work
                environment that not only drives productivity but also empowers
                individuals to lead fulfilling and balanced lives.
              </p>

              <p className="howit__text">
                We want to live in a world where excellence, not geography,
                defines work.
              </p>
            </div>
            <div className="howit__img" data-aos="fade" data-aos-once="true">
              <img
                className="how__img"
                src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
            </div>
          </div>
          <div className="howit__contents-reverse">
            <div className="howit__img" data-aos="fade" data-aos-once="true">
              <img
                className="how__img"
                src="https://images.pexels.com/photos/3767172/pexels-photo-3767172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
            </div>
            <div className="howit__desc" data-aos="fade" data-aos-once="true">
              <h1 className="howit__title">Our Philosophy</h1>
              <p className="howit__text">
                Our concept at BeeHub Virtual Assistant Co. is based on the
                belief that the true potential of a company is greatest when
                individuals are enabled to grow and succeed. We regard ourselves
                not solely as a virtual staffing option but as bridge builders,
                developing and connecting outstanding individuals with
                progressive businesses.
              </p>
            </div>
          </div>
          <div className="howit__contents">
            <div className="howit__desc" data-aos="fade" data-aos-once="true">
              <h1 className="howit__title">Our Core Values</h1>
              <p className="howit__text">
                These basic principles define our company's culture, driving our
                decisions, activities, and relationships. They symbolize not
                just what we do, but also who we are as a corporation dedicated
                to quality, ethics, and a future where work has no limits.
              </p>
            </div>
            <div className="howit__img" data-aos="fade" data-aos-once="true">
              <img
                className="how__img"
                src="https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default CareersContent;
