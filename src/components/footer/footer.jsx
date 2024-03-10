import React from "react";

import vaLogo from "../../assets/Logo v1/Black And White/black2.png";
import { FaFacebookSquare } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import Copyright from "./copyright";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer__container">
        <div className="footer__space">
          <div className="footer__contents">
            <div className="footerlogo__container">
              <img src={vaLogo} alt="" className="footer__logo" />
            </div>

            <div className="footer__links">
              <div className="links__content">
                <strong>Support</strong>
                <a href="mailto:beehubvirtualassistant@gmail.com">
                  Customer Support
                </a>
                <a href="mailto:dabeventigan@gmail.com">Technical Support</a>
                <a href="mailto:dabeventigan@gmail.com">Report a Bug</a>
                <a href="#footer">Chat Us</a>
              </div>

              <div className="links__content">
                <strong>Coming soon</strong>
                <a href="#footer">Unknown Link</a>
                <a href="#footer">Unknown Link</a>
              </div>

              <div className="links__content">
                <strong>Follow us</strong>
                <div className="footer__socials">
                  <a
                    href="https://www.facebook.com/beehubvas"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookSquare className="icon__living" size={50}/>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsLinkedin className="icon__living" size={45}/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;
