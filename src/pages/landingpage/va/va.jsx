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

  const vaiconstyle = { zIndex: 2 };
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

          <div className="va__icons">
            <div className="virtualassist__container">
              <FaPeopleGroup size={100} className="va-icon"/>
              <img
                className="vaicon__img"
                src="https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
              <h1>Strategic Workforce Planning</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>

            <div className="virtualassist__container">
              <FaHandshake size={100} className="va-icon"/>
              <img
                className="vaicon__img"
                src="https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg"
                alt=""
              ></img>
              <h1>Talent Acquisition and Recruitment</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="virtualassist__container">
              <FaComputer size={100} className="va-icon"/>
              <img
                className="vaicon__img"
                src="https://images.pexels.com/photos/12912121/pexels-photo-12912121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
              <h1>Technology Integration</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>

          <div className="title__button">
            <a href="/services" className="btn btn-primary">
              View All Services
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
