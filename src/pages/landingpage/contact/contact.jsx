import React from "react";
import { ImLocation } from "react-icons/im";
import { FaPhoneAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { Link } from "react-router-dom";

import "./contact.css";

const Contact = () => {
  return (
    <section id="contact">
      <div className="container contact__container">
        <div className="contact__title">
          <h2>
            LET'S <span className="build__text"> BUILD</span> YOUR BUSINESS
            TOGETHER
          </h2>
          <h1>
            Contact <span className="build__text">Beehub</span>
          </h1>
        </div>

        <div className="contact__card">
          <div className="contact__details">
            <div className="contact__info">
              <ImLocation className="contact__icon" />
              <h3>Address:</h3>
              <h4>Baguio City </h4>
            </div>
            <div className="contact__info">
              <FaPhoneAlt className="contact__icon" />
              <h3>Phone: </h3>
              <h4>+63922021298 </h4>
            </div>
            <div className="contact__info">
              <GrMail className="contact__icon" />
              <h3>Email:</h3>
              <h4>beehubvirtualassistant@gmail.com </h4>
            </div>

            <div className="contact__button">
              <Link to="/joinregister" className="join__button">
                Join Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
