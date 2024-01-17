import React, { useEffect } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import HoneyComb from "../../../assets/TEST.png";
import Beehive3 from "../../../assets/beehive3.png";
import "./hiring.css";
const Hiring = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section id="hiring">
      <img className="beehive__logo_three" src={Beehive3} alt="" />
      <h1 className="hiring__title">How to start your Business with BeeHub</h1>
      <div className="hiring__container" data-aos="fade" data-aos-once="true">
        <img src={HoneyComb} alt="" />
      </div>
      <div className="title__button">
        <Link to="/joinregister" className="btn btn-primary">
          Start Hiring
        </Link>
      </div>
    </section>
  );
};

export default Hiring;
