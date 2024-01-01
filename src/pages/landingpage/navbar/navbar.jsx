import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
// import Axios from "axios";
import { FaAngleDown } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { links } from "../../../assets/data";
// import Cookies from "js-cookie";

import "./navbar.css";

const NavbarHome = () => {
  // const [userDetails, setUserDetails] = useState(null);
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  // const [loginLocation, setLoginLocation] = useState("");
  // const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 800px)");

    const handleMediaChange = (mediaQuery) => {
      if (mediaQuery.matches) {
        setIsOpen(false); // Media screen matches condition
      } else {
        setIsOpen(false);
      }
    };

    handleMediaChange(mediaQuery); // Initial check

    const mediaQueryListener = () => handleMediaChange(mediaQuery);

    // Attach event listener for changes in the media query
    mediaQuery.addEventListener("change", mediaQueryListener);

    // Cleanup function
    return () => {
      // Remove event listener when component unmounts
      mediaQuery.removeEventListener("change", mediaQueryListener);
    };
  }, []);

  // Axios.defaults.withCredentials = true;
  // useEffect(() => {
  //   Axios.get("http://localhost:3001/verifylogin").then((res) => {
  //     try {
  //       if (res.data !== "User not found") {
  //         setUserDetails(res.data);
  //         setIsUserLoggedIn(true);
  //         if (res.data.role === "admin") {
  //           setLoginLocation("/admindashboard");
  //         } else if (res.data.role === "applyUser") {
  //           setLoginLocation("/applyhome");
  //         } else if (res.data.role === "joinUser") {
  //           setLoginLocation("/joinhome");
  //         } else {
  //           Cookies.remove("token");
  //           window.location.reload();
  //           setLoginLocation("/");
  //         }
  //       } else {
  //         setIsUserLoggedIn(false);
  //         navigate("/");
  //       }
  //     } catch (error) {
  //       //TODO: Will add popup error that you've been logged out
  //       console.log(error);
  //       Cookies.remove("token");
  //       window.location.reload();
  //       setLoginLocation("/");
  //     }
  //   });
  // }, [navigate]);

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
                <div class="dropdown">
                  <a class="dropbtn">
                    ABOUT US <FaAngleDown />
                  </a>
                  <div class="dropdown-content-small">
                    <a href="/aboutus/why-work-with-us">
                      Why work with BeeHub
                    </a>
                    <a href="/aboutus/our-team">Our Team</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="dropdown">
                  <a class="dropbtn">
                    OUR SERVICES <FaAngleDown />
                  </a>
                  <div class="dropdown-content">
                    <a href="#">Strategic Workforce Planning</a>
                    <a href="#">Talent Acquisition and Recruitment</a>
                    <a href="#">Flexible Staffing Model</a>
                    <a href="#">Training and Growth Programs</a>
                    <a href="#">Management of Virtual Teams</a>
                    <a href="#">HR and Administrative Support</a>
                    <a href="#">Technology Integration</a>
                    <a href="#">Customized Solutions</a>
                    <a href="#">Scalability and Flexibility</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="dropdown">
                  <a class="dropbtn">
                    OUR VAs <FaAngleDown />
                  </a>
                  <div class="dropdown-content">
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
                  </div>
                </div>
              </li>
              <li>
                <a href="#" className="link__details">
                  PLANS AND PRICING
                </a>
              </li>
              <li>
                <a href="#about" className="link__details">
                  CTA
                </a>
              </li>
              <li>
                <a href="#contact" className="link__details">
                  MENU
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="button__login">
            {isUserLoggedIn ? (
              <Link to={loginLocation} className="button btn-login">
                Coming Soon
              </Link>
            ) : (
              <Link to="/login" className="button btn-login">
                Login
              </Link>
            )}
          </div> */}
      </div>
    </nav>
  );
};

export default NavbarHome;
