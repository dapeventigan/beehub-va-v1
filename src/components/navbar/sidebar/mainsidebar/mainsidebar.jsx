import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import vaLogo from "../../../../assets/Logo v1/Black And White/black2.png";
import SyncLoader from "react-spinners/SyncLoader";
import Axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Login from "../../../../pages/login/login";

import "../sidebar.css";

const MainSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loginLocation, setLoginLocation] = useState("");
  const navigate = useNavigate();

  //Popup Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setIsOpen(!isOpen);
  };
  const handleClose = () => setOpen(false);

  const toggleClose = () => {
    setOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    setIsLoading(true);
    Axios.get(`${process.env.REACT_APP_BASE_URL}/verifylogin`).then((res) => {
      try {
        if (res.data !== "User not found") {
          setIsUserLoggedIn(true);
          setIsLoading(false);
          if (res.data.role === "admin") {
            setLoginLocation("/admindashboard");
          } else if (res.data.role === "virtualassistant") {
            const userId = res.data._id;
            const fname = res.data.fname;
            const lname = res.data.lname;
            const username = `${fname.toLowerCase()}-${lname.toLowerCase()}`;

            setLoginLocation(`/va-bh/${username}/${userId}`);
          } else {
            setLoginLocation(`/profile-beehub`);
          }
        } else {
          setIsUserLoggedIn(false);
          setIsLoading(false);
        }
      } catch (error) {
        //TODO: Will add popup error that you've been logged out
        console.log(error);
        Axios.post(`${process.env.REACT_APP_BASE_URL}/logout`);
        navigate("/");
      }
    });
  }, [navigate]);

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
          <a href="/#">
            <img src={vaLogo} alt="" />
          </a>
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
              <a href="/aboutus/our-team">About Us</a>
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
          <div className="sidebar__content">
            {isLoading ? (
              <SyncLoader color="#000000" />
            ) : isUserLoggedIn ? (
              <a href={loginLocation} className="login-btn">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <MdAccountCircle size={25} />
                  PROFILE
                </div>
              </a>
            ) : (
              <a id="login-btn" className="link__details" onClick={handleOpen}>
                Login
              </a>
            )}
          </div>
        </div>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          data-aos="fade"
          data-aos-once="true"
        >
          <Box className="modal__login">
            <div className="exit__button">
              <IoClose size={25} onClick={toggleClose} />
            </div>
            <Login />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default MainSideBar;
