import React from "react";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { Link } from "react-router-dom";

import "./contact.css";
const Contact = () => {
  return (
    <section id="contact">
      <div className="contact__container">
        <div className="contact__title">
          <h1>
            LET'S <span className="build__text"> BUILD</span> YOUR BUSINESS
            TOGETHER
          </h1>
          <h2>Interesed? Any Questions?</h2>
          <h2>
            Contact <span className="build__text">Beehub</span>
          </h2>
        </div>

        {/* <div className="contact__card">
          <div className="contact__details">
            <div className="contact__info">
              <FaPhoneAlt className="contact__icon" />
              <h3>Call us at </h3>
              <h4>+63922021298 </h4>
            </div>
            <div className="contact__info">
              <ImLocation className="contact__icon" />
              <h4>#999 Random Location, In Baguio </h4>
              <h4>Baguio City, 2600 </h4>
            </div>
            <div className="contact__info">
              <GrMail className="contact__icon" />
              <h3>Email us at</h3>
              <h4>beehubvirtualassistant@gmail.com </h4>
            </div>
          </div>
        </div> */}

        <div className="contact__container-card">
          <div className="contact__card">
            <div className="card_icon">
              <FaPhoneAlt className="icon__card" size={80} />
            </div>
            <div className="card_content">
              <h2>Call us at</h2>
              <p>+63922021298</p>
            </div>
          </div>
          <div className="contact__card">
            <div className="card_icon">
              <FaFacebookMessenger className="icon__card" size={80} />
            </div>
            <div className="card_content">
              <h2>Message us at</h2>
              <p>BeeHub Virtual Assistants Co.</p>
            </div>
          </div>
          <div className="contact__card">
            <div className="card_icon">
              <GrMail className="icon__card" size={80} />
            </div>
            <div className="card_content">
              <h2>Email us at</h2>
              <p>beehubvirtualassistant@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="title__button">
          <Link to="/applyregister" className="btn-contact btn-primary">
            Apply Now
          </Link>
          <Link to="/joinregister" className="btn-contact btn-primary">
            Join Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
