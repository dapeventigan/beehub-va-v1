import React from "react";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import ClientRegister from "../../../components/clientregister/clientregister";
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
          <h2>
            We'll find you the best <span className="build__text">BeeHub</span>{" "}
            Virtual Assistant
          </h2>
        </div>

        {/* <div className="contact__container-card">
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
        </div> */}

        <div className="title__button">
          <ClientRegister />
          <Link to="/joinregister" className="cnt-btn">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
