import React, { useState, useEffect } from "react";
import Axios from "axios";
import VaSetting from "../../vasetting/vasetting";
import ClientSetting from "../../clientsetting/clientsetting";
import { socket } from "../../../App";

import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import AOS from "aos";
import BHLogo from "../../../assets/logo_1.png";
import UserSideBar from "../sidebar/usersidebar/usersidebar";

import "./usernavbar.css";

const UserNavbar = ({ userData, manatalData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginLocation, setLoginLocation] = useState("");
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    socket.emit("refresh-all", userData._id);
    Axios.post(`${process.env.REACT_APP_BASE_URL}/logout`);
    navigate("/");
  };

  useEffect(() => {
    if (userData.role === "admin") {
      setLoginLocation("/admindashboard");
    } else if (userData.role === "virtualassistant") {
      const userId = userData._id;
      const fname = userData.fname;
      const lname = userData.lname;
      const username = `${fname.toLowerCase()}-${lname.toLowerCase()}`;

      setLoginLocation(`/va-bh/${username}/${userId}`);
    } else {
      setLoginLocation(`/profile-beehub`);
    }

  }, [manatalData]);

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
    <nav className="navbar">
      <div className="sidebar__menu">
        <div className="navbar__beehub">
          <a href="/#">
            <img src={BHLogo} alt="" />
          </a>
        </div>
        <div className="usernavsearch__container" style={{marginRight: "2rem"}}>
          <div className="usernav__searchbar">
            <FaSearch />
            <input
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/job-boards?search=${inputValue}`);
                }
              }}
            />
          </div>
        </div>
        <div className="sidebar__button">
          <UserSideBar />
        </div>
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
              <input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/job-boards?search=${inputValue}`);
                  }
                }}
              />
            </div>
            <li>
              <a href="/job-boards" id="login-btn" className="link__details">
                Job Boards
              </a>
            </li>
          </div>
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
              <a style={{ cursor: "pointer" }}>
                {userData.role === "virtualassistant" ? (
                  <VaSetting data={userData} manatal={manatalData}/>
                ) : (
                  <ClientSetting data={userData} manatal={manatalData}/>
                )}
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
