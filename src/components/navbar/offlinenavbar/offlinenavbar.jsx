import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import AOS from "aos";
import BHLogo from "../../../assets/logo_1.png";
import OfflineSideBar from "../sidebar/offlinesidebar/offlinesidebar";

import "../navbar.css";

const OfflineNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    AOS.init({ duration: 500 });

    const mediaQuery = window.matchMedia("(max-width: 800px)");

    const handleMediaChange = (mediaQuery) => {
      if (mediaQuery.matches) {
        setIsOpen(false);
      } else {
        setIsOpen(false);
      }
    };

    handleMediaChange(mediaQuery);

    const mediaQueryListener = () => handleMediaChange(mediaQuery);

    mediaQuery.addEventListener("change", mediaQueryListener);

    return () => {
      mediaQuery.removeEventListener("change", mediaQueryListener);
    };
  }, []);

  const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid black",
    borderRadius: "1rem",
    boxShadow: 24,
  };

  return (
    <nav className="navbar">
      <div className="navbar__contents">
      <div className="sidebar__menu">
          <div className="navbar__beehub">
            <a href="/#">
              <img src={BHLogo} alt="" />
            </a>
          </div>
          <div className="sidebar__button">
            <OfflineSideBar />
          </div>
        </div>
        <div className="navbar__link">
          <div className={!isOpen ? "navul__container" : "show"}>
            <ul className="navbar__links">
              <div className="navbar__beehub">
                <a href="/#">
                  <img src={BHLogo} alt="" />
                </a>
              </div>
              <li>
                <a href="/#" className="link__details">
                  HOME
                </a>
              </li>
              <li>
                <a href="/#hiring" className="link__details">
                  HOW IT WORKS
                </a>
              </li>
              <li>
                <div className="dropdown">
                  <a href="/aboutus" className="dropbtn">
                    ABOUT US <FaAngleDown />
                  </a>
                  <div className="dropdown-content-small">
                    <a href="/aboutus/#why-work-beehub">Why work with BeeHub</a>
                    <a href="/aboutus/our-team">Our Team</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="dropdown">
                  <a href="/services" className="dropbtn">
                    OUR SERVICES
                  </a>
                </div>
              </li>
              <li>
                <div className="dropdown">
                  <a href="/virtual-assistant" className="dropbtn">
                    OUR VAs
                  </a>
                </div>
              </li>
              <li>
                <a href="/plans-and-pricing" className="link__details">
                  PLANS AND PRICING
                </a>
              </li>
              <a id="login-btn" className="link__details" href="/">
                Visit BeeHub
              </a>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default OfflineNavbar;
