import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import vaLogo from "../../../assets/navlogo.png";
import { FaArrowLeft } from "react-icons/fa";
import io from "socket.io-client";

import ContactUser from "./contactuser/contactuser";
import ViewPdf from "./viewpdf";
import "./dashboard.css";

// const socket = io.connect("http://localhost:3001");
const socket = io("http://localhost:3001", {
  withCredentials: true,
});

const Dashboard = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [applyUsers, setApplyUsers] = useState([]);
  const [joinUsers, setJoinUsers] = useState([]);
  const [archiveUsers, setArchiveUsers] = useState([]);

  createTheme(
    "dape",
    {
      text: {
        primary: "black",
        secondary: "black",
      },
      background: {
        default: "#E99E00",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#3F404F",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    socket.on("senduser_admin", (data) => {
      window.location.reload();
    });

    Axios.get("http://localhost:3001/admindashboard").then((res) => {
      if (res.data !== "User not found") {
        setUserDetails(res.data);
      } else {
        navigate("/");
      }
    });

    Axios.get("http://localhost:3001/getApplyUsers").then((res) => {
      try {
        setApplyUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    });

    Axios.get("http://localhost:3001/getJoinUsers").then((res) => {
      try {
        setJoinUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    });

    Axios.get("http://localhost:3001/getArchiveUsers").then((res) => {
      try {
        setArchiveUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    });
  }, [navigate, socket]);

  const applycolumns = [
    {
      name: "Name",
      selector: (row) => row.fname + " " + row.mname + " " + row.lname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.cityName + ", " + row.stateName,
      sortable: true,
    },
    {
      name: "Looking for",
      selector: (row) => row.selectedValues,
    },
    {
      name: "View Resume",
      selector: (row) => <ViewPdf filename={row.pdfFile} />,
    },
    {
      name: "Contact",
      selector: (row) => <ContactUser userID={row._id} />,
    },
  ];

  const joincolumns = [
    {
      name: "Name",
      selector: (row) => row.fname + " " + row.mname + " " + row.lname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.cityName + ", " + row.stateName,
      sortable: true,
    },
    {
      name: "Looking for",
      selector: (row) => row.selectedValues,
    },
    {
      name: "Contact",
      selector: (row) => <ContactUser userID={row._id} />,
    },
  ];

  const arhivedcolumns = [
    {
      name: "Name",
      selector: (row) => row.fname + " " + row.mname + " " + row.lname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.cityName + ", " + row.stateName,
      sortable: true,
    },
    {
      name: "Looking for",
      selector: (row) => row.selectedValues,
    },
    {
      name: "Previous Role",
      selector: (row) => (row.role === "applyUser" ? "Applied" : "Joined"),
    },
  ];

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await Axios.post("http://localhost:3001/logout").then(navigate("/"));
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="admindashbody__container">
        <div className="admindash__container">
          <div className="admindashheader__container">
            <div className="adminflex__container">
              <div className="goback__container">
                <a href="/">
                  <button className="goback__button">
                    <FaArrowLeft className="goback__icon" />
                    <span className="goback__text">Go back</span>
                  </button>
                </a>
              </div>
              {userDetails && (
                <div className="dashheader__container">
                  <h1>Admin Dashboard</h1>
                  <p>
                    Hello {userDetails.fname} {userDetails.lname} , you are
                    logged in using {userDetails.email}.
                  </p>
                  <p>
                    {" "}
                    Welcome to BeeHub's Admin Dashboard. If you need any help,
                    please click the bee on the bottom right.
                  </p>
                </div>
              )}
            </div>

            <div className="goback__container">
              <button className="goback__button" onClick={handleLogout}>
                <span className="goback__text">Logout</span>
              </button>
            </div>
          </div>

          <div className="datatable__container">
            <h1>Apply Users</h1>
            <div className="table__container">
              <DataTable
                columns={applycolumns}
                data={applyUsers}
                theme="dape"
              />
            </div>
          </div>

          <div className="datatable__container">
            <h1>Join Users</h1>
            <div className="table__container">
              <DataTable columns={joincolumns} data={joinUsers} theme="dape" />
            </div>
          </div>

          <div className="datatable__container">
            <h1>Archive Users</h1>
            <div className="table__container">
              <DataTable
                columns={arhivedcolumns}
                data={archiveUsers}
                theme="dape"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sticky__button">
        <a href="https://m.me/trashdape" target="_blank" rel="noreferrer">
          <img src={vaLogo} alt="" />
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
