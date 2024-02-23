import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Axios from "axios";
import VaSetting from "../../vasetting/vasetting";
import { socket } from "../../../App";

import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

import BHLogo from "../../../assets/logo_1.png";
import SyncLoader from "react-spinners/SyncLoader";
import "./jobboardnavbar.css";

const JobBoardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loginLocation, setLoginLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    socket.emit("refresh-all", userDetails._id);
    Axios.post("https://server.beehubvas.com/logout");
    navigate("/");
  };

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    setIsLoading(true);
    Axios.get("https://server.beehubvas.com/verifylogin").then((res) => {
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
        }
      } catch (error) {
        //TODO: Will add popup error that you've been logged out
        console.log(error);
        Axios.post("https://server.beehubvas.com/logout");
        navigate("/");
      }
    });
  }, [navigate]);

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
              <a href="/job-boards" id="login-btn" className="link__details">
                Job Boards
              </a>
            </li>
          </div>

          {isLoading ? (
            <SyncLoader color="#000000"/>
          ) : isUserLoggedIn ? (
            <div className="userdropdown">
              <a className="dropbtn">
                <MdAccountCircle size={25} /> Account <FaAngleDown />
              </a>
              <div className="userdropdown-content-small">
                <a href={loginLocation} className="login-btn">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    Your Profile
                  </div>
                </a>
                <a style={{ cursor: "pointer" }} onClick={handleLogout}>
                  Logout
                </a>
              </div>
            </div>
          ) : (
            <a id="login-btn" className="link__details" href="/">
              Visit BeeHub
            </a>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default JobBoardNavbar;