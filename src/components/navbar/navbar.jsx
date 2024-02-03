import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import Login from "../../pages/login/login.jsx";
import AOS from "aos";
import { IoClose } from "react-icons/io5";
import BHLogo from "../../assets/logo_1.png";

import "./navbar.css";

const NavbarHome = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loginLocation, setLoginLocation] = useState("");
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
    Axios.get("https://server.beehubvas.com/verifylogin").then((res) => {
      try {
        if (res.data !== "User not found") {
          setUserDetails(res.data);
          setIsUserLoggedIn(true);
          if (res.data.role === "admin") {
            setLoginLocation("/admindashboard");
          } else if (res.data.role === "virtualassistant") {
            const userId = res.data._id;
            const fname = res.data.fname;
            const lname = res.data.lname;
            const username = `${fname.toLowerCase()}-${lname.toLowerCase()}`;

            setLoginLocation(`/va-bh/${username}/${userId}`);
          } else if (res.data.role === "client") {
            const userId = res.data._id;
            const fname = res.data.fname;
            const lname = res.data.lname;
            const username = `${fname.toLowerCase()}-${lname.toLowerCase()}`;

            setLoginLocation(`/profile-bh/${username}/${userId}`);
          } else {
            Axios.post("https://server.beehubvas.com/logout");
            navigate("/");
          }
        } else {
          setIsUserLoggedIn(false);
          navigate("/");
        }
      } catch (error) {
        //TODO: Will add popup error that you've been logged out
        console.log(error);
        Axios.post("https://server.beehubvas.com/logout");
        navigate("/");
      }
    });
  }, [navigate]);

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

  const beeHubImg = {
    opacity: showDiv ? "1" : "0",
    transition: "opacity 0.5s ease-in-out",
  };

  return (
    <nav>
      <div className="navbar__contents">
        <div className="navbar__link">
          <div className="simple__menu">
            <Button
              sx={{
                color: "black",
                border: "2px solid black",
                "&:hover": {
                  border: "3px solid black",
                },
              }}
              variant="outlined"
              aria-controls="simple__menu"
              aria-haspopup="true"
              onClick={toggleMenu}
            >
              {isOpen ? <MdOutlineClose /> : <FaBars />}
            </Button>
          </div>
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
                  <a href="/services" className="dropbtn">
                    OUR SERVICES
                  </a>
                  {/* <FaAngleDown /> */}
                  {/* <div class="dropdown-content">
                    <a href="/services/#strategic-workforce-planning">
                      Strategic Workforce Planning
                    </a>
                    <a href="/services/#talent-acquisition-and-recruitment">
                      Talent Acquisition and Recruitment
                    </a>
                    <a href="/services/#flexible-staffing-models">
                      Flexible Staffing Model
                    </a>
                    <a href="/services/#management-of-virtual-teams">
                      Management of Virtual Teams
                    </a>
                    <a href="/services/#technology-integration">
                      Technology Integration
                    </a>
                    <a href="/services/#hr-and-administrative-support">
                      HR and Administrative Support
                    </a>
                    <a href="/services/#compliance-and-data-security">
                      Compliance and Data Security
                    </a>
                    <a href="/services/#customized-solutions">
                      Customized Solutions
                    </a>
                    <a href="/services/#scalability-and-flexibility">
                      Scalability and Flexibility
                    </a>
                    <a href="/services/#consulting-services">
                      Consulting Services
                    </a>
                    <a href="/services/#global-talent-sourcing">
                      {" "}
                      Global Talent Sourcing (Coming Soon)
                    </a>
                  </div> */}
                </div>
              </li>
              <li>
                <div className="dropdown">
                  <a href="/virtual-assistant" className="dropbtn">
                    OUR VAs
                  </a>
                  {/* <div class="dropdown-content">
                    <p className="dropdown-title">
                      Virtual Assistants for Realtors
                    </p>
                    <a href="#">Transaction Coordinator</a>
                    <a href="#">Listing Coordinator</a>
                    <a href="#">General Real Estate VA/ISA</a>
                    <p className="dropdown-title">
                      Specialized Virtual Assistants
                    </p>
                    <a href="#">Tier 1 (Newbies)</a>
                    <a href="#">Tier 2 (Has relevant experience)</a>
                    <a href="#">Tier 3 (SMEs/Managers)</a>
                    <p className="dropdown-title">
                      Virtual Call Center (Coming Soon)
                    </p>
                  </div> */}
                </div>
              </li>
              <li>
                <a href="/plans-and-pricing" className="link__details">
                  PLANS AND PRICING
                </a>
              </li>
              {isUserLoggedIn ? (
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
                  Log In or Sign Up
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
          <Box sx={style}>
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
