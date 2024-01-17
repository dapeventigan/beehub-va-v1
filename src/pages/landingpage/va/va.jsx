import React, { useEffect } from "react";
import AOS from "aos";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { FaCogs } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./va.css";

const VASection = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section id="va">
      <div className="vas__container">
        <div className="aboutva__container">
          <div className="va__title">
            <h1>Our Services</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque officiis cumque sunt aut excepturi illo harum eligendi!
              Qui accusantium eos deleniti dicta? Perspiciatis porro nam
              reiciendis saepe. Recusandae voluptate laudantium facilis
              reiciendis suscipit inventore delectus voluptas. Temporibus
              incidunt quae commodi.
            </p>
          </div>

          <div className="va__icons" data-aos="fade" data-aos-once="true">
            <div className="virtualassist__container">
              <FaPeopleGroup size={100} />
              <h1>Strategic Workforce Planning</h1>
            </div>
            <div className="virtualassist__container">
              <FaHandshake size={100} />
              <h1>Talent Acquisition and Recruitment</h1>
            </div>
            <div className="virtualassist__container">
              <FaComputer size={100} />
              <h1>Technology Integration</h1>
            </div>
            <div className="virtualassist__container">
              <FaCogs size={100} />
              <h1>Customized Solution</h1>
            </div>
          </div>

          <div className="title__button">
            <a href="/services" className="btn btn-primary">
              See More
            </a>
          </div>
        </div>

        <div className="about__tagline">
          <div className="tagline__details">
            <h1>Empowering Excellence</h1>
            <h2>Unleashing Potential</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VASection;
