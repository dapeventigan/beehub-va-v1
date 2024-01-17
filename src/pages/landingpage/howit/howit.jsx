import React, { useEffect } from "react";
import AOS from "aos";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./howit.css";

const HowIt = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section id="howit">
      <div className="container howit__container">
        <div className="howit__contents">
          <div
            className="howit__desc"
            data-aos="fade-right"
            data-aos-once="true"
          >
            <h1 className="howit__title">It is...</h1>
            <h1 className="howit__title">Cost-effective</h1>
            <p className="howit__text">
              Virtual employment reduces the need for real office space,
              lowering overhead expenditures like utilities, rent, and staffing.
              Businesses can enjoy considerable cost reductions while still
              retaining access to top-tier personnel.
            </p>
          </div>
          <div className="howit__img" data-aos="fade-left" data-aos-once="true">
            <img
              className="how__img"
              src="https://images.pexels.com/photos/47344/dollar-currency-money-us-dollar-47344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            ></img>
          </div>
        </div>
        <div className="howit__contents">
          <div
            className="howit__img"
            data-aos="fade-right"
            data-aos-once="true"
          >
            <img
              className="how__img"
              src="https://images.pexels.com/photos/5989931/pexels-photo-5989931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            ></img>
          </div>
          <div
            className="howit__desc"
            data-aos="fade-left"
            data-aos-once="true"
          >
            <h1 className="howit__title">Saves in Recruitment Time</h1>
            <p className="howit__text">
              We simplify the hiring process by developing networks and methods
              for locating, evaluating, and placing eligible individuals, saving
              businesses significant time throughout the recruiting process.
            </p>
          </div>
        </div>
        <div className="howit__contents">
          <div
            className="howit__desc"
            data-aos="fade-right"
            data-aos-once="true"
          >
            <h1 className="howit__title">Improves Work-Life Balance</h1>
            <p className="howit__text">
              Hiring virtual assistants improves work-life balance by reducing
              workload, minimizing stress, and freeing time for personal and
              professional activities, fostering strategic thinking, creativity,
              and overall well-being.
            </p>
          </div>
          <div className="howit__img" data-aos="fade-left" data-aos-once="true">
            <img
              className="how__img"
              src="https://images.pexels.com/photos/3747446/pexels-photo-3747446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            ></img>
          </div>
        </div>
        <div className="howit__contents">
          <div
            className="howit__img"
            data-aos="fade-right"
            data-aos-once="true"
          >
            <img
              className="how__img"
              src="https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            ></img>
          </div>
          <div
            className="howit__desc"
            data-aos="fade-left"
            data-aos-once="true"
          >
            <h1 className="howit__title">Concentrates on Core Competencies</h1>
            <p className="howit__text">
              Businesses can focus on their core capabilities by outsourcing
              staffing activities to a virtual staffing provider. This frees
              time and resources for strategic projects, innovation, and
              corporate development.
            </p>
          </div>
        </div>
        <div className="howit__contents">
          <div
            className="howit__desc"
            data-aos="fade-right"
            data-aos-once="true"
          >
            <h1 className="howit__title">and you'll have</h1>
            <h1 className="howit__title">access to a Talent Pool</h1>
            <p className="howit__text">
              Access to a varied talent pool allows businesses to tap into a
              plethora of experience and abilities from across the globe,
              ensuring they select the most suitable people for their unique
              needs.
            </p>
          </div>
          <div className="howit__img" data-aos="fade-left" data-aos-once="true">
            <img
              className="how__img"
              src="https://images.pexels.com/photos/3184358/pexels-photo-3184358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            ></img>
          </div>
        </div>

        <div className="title__button">
          <Link to="/joinregister" className="btn btn-primary">
            Start Hiring
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowIt;
