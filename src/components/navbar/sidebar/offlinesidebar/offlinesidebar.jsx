import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import vaLogo from "../../../../assets/Logo v1/Black And White/black2.png";

import "../sidebar.css";

const OfflineSideBar = ({ phData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <div>
      <FaBars
        size={30}
        onClick={toggleSidebar}
        className="sidebar__toggle-btn"
      />
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <MdOutlineClose
          size={30}
          onClick={toggleSidebar}
          className="sidebar__toggle-btn-close"
        />
        <div className="sidebar__header">
          <img src={vaLogo} alt="" />
        </div>
        <div className="sidebar__contents">
          <div className="sidebar__content">
            <a href="/">HOME</a>
          </div>

          <div className="sidebar__content">
            <a href="/#hiring"> HOW IT WORKS</a>
          </div>

          <div className="sidebar__content">
            <a
              onClick={toggleDropdown}
              className={
                !isDropdown ? "sidebar__dropbtn-show" : "sidebar__dropbtn"
              }
            >
              ABOUT US <FaAngleDown />
            </a>

            <div
              className={
                !isDropdown ? "sidebar__dropdown" : "sidebar__dropdown-show"
              }
            >
              <a href="/aboutus">About Us</a>
              <a href="/aboutus/#why-work-beehub">Why work with BeeHub</a>
              <a href="/aboutus/our-team">Our Team</a>
            </div>
          </div>
          <div className="sidebar__content">
            <a href="/virtual-assistant">OUR VAs</a>
          </div>
          <div className="sidebar__content">
            <a href="/plans-and-pricing" className="link__details">
              PLANS AND PRICING
            </a>
          </div>
          {phData ? (
            <div className="sidebar__content">
              <a href="/" className="link__details">
                CAREERS
              </a>
            </div>
          ) : (
            <></>
          )}

          <a id="login-btn" className="link__details" href="/">
            Visit BeeHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default OfflineSideBar;
