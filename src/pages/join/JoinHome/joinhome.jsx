import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import AddJob from "../../../components/addjob/addjob";

import UserNavbar from "../../../components/navbar/usernavbar/usernavbar";
import Unhire from "../Unhire/unhire";
import Footer from "../../../components/footer/footer";

import "./joinhome.css";

const JoinHome = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);

  //edit profile
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("profilePicture", file);
    formData.append("userId", userDetails._id);

    await Axios.put(`${process.env.REACT_APP_BASE_URL}/editProfilePicture`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      if (res.data.valid === true) {
        window.location.reload();
      }
    });
  };

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/joinuserdashboard`).then((res) => {
      if (res.data !== "User not found") {
        setUserDetails(res.data);
      } else {
        navigate("/");
      }
    });
  }, []);

  //DATATABLE
  const [jobHistory, setJobHistory] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getClientJobData`, {
      params: {
        userID: userDetails._id,
      },
    }).then((res) => {
      setJobHistory(res.data);
    });
  }, [userDetails]);

  const jobHistoryColumn = [
    {
      name: "Job Posted",
      selector: (row) => {
        const date =
          row.jobPosted instanceof Date
            ? row.jobPosted
            : new Date(row.jobPosted);
        return date
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
          .replace(",", "");
      },
      sortable: true,
    },
    {
      name: "Job Title",
      selector: (row) => row.jobTitle,
      sortable: true,
    },
    {
      name: "# of hours per week",
      selector: (row) => row.jobHours,
      sortable: true,
    },
    {
      name: "Post Status",
      selector: (row) =>
        row.jobVerified === "Pending"
          ? "Pending"
          : row.jobVerified === "Declined"
          ? "Declined"
          : row.jobVerified === "Expired"
          ? "Finished"
          : row.jobVerified === "Closed"
          ? "Finished"
          : "Failed",
      sortable: true,
    },
  ];

  createTheme("dape", {
    text: {
      primary: "black",
      secondary: "black",
    },
    background: {
      default: "white",
    },
    divider: {
      default: "#3F404F",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  });

  const [myVA, setMyVA] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getHiredVA`, {
      params: {
        userID: userDetails._id,
      },
    }).then((res) => {
      setMyVA(res.data);
    });
  }, [userDetails]);

  const MyVAColumn = [
    {
      name: "Unhire a VA",
      selector: (row) => <Unhire jobData={row} />,
    },
    {
      name: "Date Hired",
      selector: (row) => {
        const date =
          row.dateHired instanceof Date
            ? row.dateHired
            : new Date(row.dateHired);
        return date
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
          .replace(",", "");
      },
      sortable: true,
    },
    {
      name: "Virtual Assistant",
      selector: (row) => row.vaName,
      sortable: true,
    },
    {
      name: "Job Assigned",
      selector: (row) => row.jobTitle,
      sortable: true,
    },
    {
      name: "Date Ended",
      selector: (row) => row.dateEnded ? (() => {
        const date =
        row.dateEnded instanceof Date
            ? row.dateEnded 
            : new Date(row.dateEnded);
        return date
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
          .replace(",", "");
      })(): "Ongoing",
      sortable: true,
    },
    {
      name: "View Profile",
      selector: (row) => (
        <a
          href={`https://beehubvas.com/va-bh/${row.vaName
            .toLowerCase()
            .split(" ")
            .join("-")}/${row.vaID}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button sx={buttonStyle}>View Profile</Button>
        </a>
      ),
    },
  ];

  const buttonStyle = {
    backgroundColor: "#111111",
    color: "white",
    borderRadius: 1,
    "&:hover": {
      backgroundColor: "#202020",
    },
  };

  return (
    <div>
      <UserNavbar userData={userDetails} />

      <div className="userprofile__container">
        <div className="account__title">
          <h1>My Business Account</h1>
        </div>

        <div className="profile__container">
          <div className="userprofile__banner" />
          {userDetails && (
            <div className="profiledesc__container">
              <div className="profiletop__container">
                <div className="profileheader__row">
                  <div className="profiletitleheader__container">
                    <div
                      className="profiletitle__container"
                      style={{ margin: "3rem" }}
                    >
                      <h2>{`${userDetails.fname} ${userDetails.lname}`}</h2>
                    </div>
                  </div>

                  <div></div>
                </div>
                <div className="profile-horizontal-line"></div>
              </div>

              <div className="profile__row">
                <div className="profilecontent__container">
                  <div className="profile__firstrow">
                    <div className="company__overview">
                      <h4>Company/Business Overview</h4>
                      <p>{`${userDetails.bio || "None"}`}</p>
                    </div>
                  </div>
                </div>

                <div className="contact__profile">
                  <h4>Company/Business Name</h4>
                  <p>{userDetails.industry || "None"}</p>
                </div>
              </div>
              <div className="profile__sixthrow">
                <div className="profile__table">
                  <div className="profiletable__title">
                    <h4>Your Job Posts with BeeHub</h4>
                    <AddJob userdata={userDetails} />
                  </div>

                  <DataTable
                    columns={jobHistoryColumn}
                    data={jobHistory}
                    theme="dape"
                    pagination
                  />
                </div>
              </div>

              <div className="profile__seventhrow">
                <div className="profile__table">
                  <div className="profiletable__title">
                    <h4>Your BeeHub Virtual Assistants</h4>
                  </div>

                  <DataTable
                    columns={MyVAColumn}
                    data={myVA}
                    theme="dape"
                    pagination
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JoinHome;
