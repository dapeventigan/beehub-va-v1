import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { socket } from "../../../../App";
import vaLogo from "../../../../assets/Logo v1/Black And White/black2.png";
import SyncLoader from "react-spinners/SyncLoader";
import Axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Login from "../../../../pages/login/login";

import VaSetting from "../../../vasetting/vasetting";
import ClientSetting from "../../../clientsetting/clientsetting";

import "../sidebar.css";

const UserSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [loginLocation, setLoginLocation] = useState("");
  const navigate = useNavigate();

  //Popup Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleClose = () => {
    setOpen(false);
  };

  const toggleSidebar = () => {
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
          setIsUserLoggedIn(true);
          setIsLoading(false);
          setUserDetails(res.data);
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
        Axios.post("https://server.beehubvas.com/logout");
        navigate("/");
      }
    });
  }, [navigate]);

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
                  {userDetails.fname} {userDetails.lname}
                  <MdAccountCircle size={25} />
                </div>
              </a>
            ) : (
              <a id="login-btn" className="link__details" onClick={handleOpen}>
                Login
              </a>
            )}
          </div>
          <div className="sidebar__content">
            <a href="/job-boards">Job Boards</a>
          </div>
          <div className="sidebar__content">
            <a style={{ cursor: "pointer" }}>
              {userDetails.role === "virtualassistant" ? (
                <VaSetting data={userDetails} />
              ) : (
                <ClientSetting data={userDetails} />
              )}
            </a>
          </div>
          <div className="sidebar__content">
            <a style={{ cursor: "pointer" }} onClick={handleLogout}>
              Logout
            </a>
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
    </div>
  );
};

export default UserSideBar;
