import React from "react";
import { ImLocation } from "react-icons/im";
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
        
        <div className="contact__card">
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
        </div>

        {/* <div className="acontainer">
          <div className="card">
            <div className="icon">
              <ImLocation className="diamond-outline" />
            </div>
            <div className="content">
              <h2>Card One</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam debitis numquam, alias laborum eaque natus dolor totam
                perspiciatis adipisci ipsum rem amet nobis commodi placeat!
              </p>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <ImLocation className="diamond-outline" />
            </div>
            <div className="content">
              <h2>Card Two</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam debitis numquam, alias laborum eaque natus dolor totam
                perspiciatis adipisci ipsum rem amet nobis commodi placeat!
              </p>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <ImLocation className="diamond-outline" />
            </div>
            <div className="content">
              <h2>Card Three</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam debitis numquam, alias laborum eaque natus dolor totam
                perspiciatis adipisci ipsum rem amet nobis commodi placeat!
              </p>
            </div>
          </div>
        </div> */}

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
