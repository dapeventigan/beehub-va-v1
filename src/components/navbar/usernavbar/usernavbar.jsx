import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Axios from "axios";
import VaSetting from "../../vasetting/vasetting";
import {socket} from "../../../App"

import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import AOS from "aos";
import BHLogo from "../../../assets/logo_1.png";

import "./usernavbar.css";


const UserNavbar = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    socket.emit('refresh-all', userData._id);
    Axios.post("https://server.beehubvas.com/logout");
    navigate("/");
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

  return (
    <nav>
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
        <ul className="usernavbar__links">
          <div className="navbar__beehub">
            <a href="/#">
              <img src={BHLogo} alt="" />
            </a>
          </div>
          <div className="usernavsearch__container">
            <div className="usernav__searchbar">
              <FaSearch />
              <input type="text" />
            </div>
            <li>
              <a id="login-btn" className="link__details">
                Job Boards
              </a>
            </li>
          </div>
          <div className="userdropdown">
            <a className="dropbtn">
              <MdAccountCircle size={25} /> Account <FaAngleDown />
            </a>
            <div className="userdropdown-content-small">
              <a style={{ cursor: "pointer" }}>
                {" "}
                <VaSetting data={userData} />
              </a>
              <a style={{ cursor: "pointer" }} onClick={handleLogout}>
                Logout
              </a>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default UserNavbar;
