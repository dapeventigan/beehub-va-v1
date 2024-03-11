import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import Login from "../../pages/login/login.jsx";
import AOS from "aos";
import { IoClose } from "react-icons/io5";
import BHLogo from "../../assets/logo_1.png";
import SyncLoader from "react-spinners/SyncLoader";

import MainSideBar from "./sidebar/mainsidebar/mainsidebar.jsx";

import "./navbar.css";

const NavbarHome = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loginLocation, setLoginLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //Popup Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleClose = () => {
    setOpen(false);
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

  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 150;

      if (scrollPosition > threshold) {
        setShowDiv(true);
      } else {
        setShowDiv(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    setIsLoading(true);
    Axios.get(`${process.env.REACT_APP_BASE_URL}/verifylogin`).then((res) => {
      try {
        if (res.data !== "User not found") {
          setUserDetails(res.data);
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

  const beeHubImg = {
    opacity: showDiv ? "1" : "0",
    transition: "opacity 0.5s ease-in-out",
  };

  return (
    <nav className="navbar">
      <div className="navbar__contents">
        <div className="sidebar__menu">
          <div className="navbar__beehub" style={beeHubImg}>
            <a href="/#">
              <img src={BHLogo} alt="" />
            </a>
          </div>
          <div className="sidebar__button">
            <MainSideBar />
          </div>
        </div>

        <div className="navbar__link">
          <div className={!isOpen ? "navul__container" : "show"}>
            <ul className="navbar__links">
              <div className="navbar__beehub" style={beeHubImg}>
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
                <a
                  id="login-btn"
                  className="link__details"
                  onClick={handleOpen}
                >
                  Login
                </a>
              )}
            </ul>
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
    </nav>
  );
};

export default NavbarHome;
