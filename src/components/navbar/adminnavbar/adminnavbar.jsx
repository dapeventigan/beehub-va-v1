import React, { useState, useEffect } from "react";
import Axios from "axios";
import VaSetting from "../../vasetting/vasetting";
import ClientSetting from "../../clientsetting/clientsetting";
import { socket } from "../../../App";

import AdminSideBar from "../sidebar/adminsidebar/adminsidebar";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import AOS from "aos";
import BHLogo from "../../../assets/logo_1.png";

const AdminNavbar = ({ userData }) => {
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
    Axios.post("https://server.beehubvas.com/logout");
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
  }, [userData.role]);

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
            <img src={BHLogo} alt="" style={{ marginLeft: "2rem" }} />
          </a>
        </div>
        <div
          className="usernavsearch__container"
          style={{ marginRight: "2rem" }}
        >
          {/* <div className="usernav__searchbar">
            <FaSearch />
            <input
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/clients-boards?search=${inputValue}`);
                }
              }}
            />
          </div> */}
        </div>
        <div className="sidebar__button">
       <AdminSideBar/>
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
            {/* <div className="usernav__searchbar">
              <FaSearch />
              <input type="text" />
            </div> */}
            {/* <li>
              <a href="/va-boards" id="login-btn" className="link__details">
                Virtual Assistants
              </a>
            </li> */}
            <li>
              <a href="/job-boards" id="login-btn" className="link__details">
                Job Boards
              </a>
            </li>
            <li>
              <a href="/admindashboard/hire" id="login-btn" className="link__details">
                + Hire VA
              </a>
            </li>
            <li>
              <a href="/admindashboard/training" id="login-btn" className="link__details">
                 + Add Trainings/Course for VA
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
                  <VaSetting data={userData} />
                ) : (
                  <ClientSetting data={userData} />
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

export default AdminNavbar;
