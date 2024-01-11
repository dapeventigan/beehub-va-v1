import React, { useEffect } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import {
  TbHexagonNumber1,
  TbHexagonNumber2,
  TbHexagonNumber3,
  TbHexagonNumber4,
} from "react-icons/tb";
import "./hiring.css";
const Hiring = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section id="hiring">
      <h1 className="hiring__title" data-aos="fade" data-aos-once="true">
        How to start your career on BeeHub
      </h1>
      <div
        className="container hiring__container"
        data-aos="fade"
        data-aos-once="true"
      >
        <div className="hiring__box">
          <div className="hiring__contents">
            <div className="hiring__number">
              <TbHexagonNumber1 size={40} />
            </div>
            <div className="hiring_desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At, et
              omnis! Consectetur sequi officia unde dolore nobis accusantium
              quis facere impedit. Culpa officia eius accusamus.
            </div>
          </div>
        </div>

        <div className="hiring__box">
          <div className="hiring__contents">
            <div className="hiring__number">
              <TbHexagonNumber2 size={40} />
            </div>
            <div className="hiring_desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At, et
              omnis! Consectetur sequi officia unde dolore nobis accusantium
              quis facere impedit. Culpa officia eius accusamus.
            </div>
          </div>
        </div>
      </div>
      <div
        className="container hiring__container"
        data-aos="fade"
        data-aos-once="true"
      >
        <div className="hiring__box">
          <div className="hiring__contents">
            <div className="hiring__number">
              <TbHexagonNumber3 size={40} />
            </div>
            <div className="hiring_desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At, et
              omnis! Consectetur sequi officia unde dolore nobis accusantium
              quis facere impedit. Culpa officia eius accusamus.
            </div>
          </div>
        </div>
        <div className="hiring__box">
          <div className="hiring__contents">
            <div className="hiring__number">
              <TbHexagonNumber4 size={40} />
            </div>
            <div className="hiring_desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At, et
              omnis! Consectetur sequi officia unde dolore nobis accusantium
              quis facere impedit. Culpa officia eius accusamus.
            </div>
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
