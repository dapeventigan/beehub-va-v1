import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Avatar from "react-avatar";
import Axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import AddJob from "../../../components/addjob/addjob";

import UserNavbar from "../../../components/navbar/usernavbar/usernavbar";
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

    await Axios.put("https://server.beehubvas.com/editProfilePicture", formData, {
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
    Axios.get("https://server.beehubvas.com/joinuserdashboard").then((res) => {
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
    Axios.get("https://server.beehubvas.com/getClientJobData", {
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
          : "Verified",
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
                    <div className="profile_picture">
                      <label
                        htmlFor="profilePictureInput"
                        className="avatar-label"
                      >
                        {!userDetails.profilePicture ? (
                          <>
                            <Avatar
                              size="200"
                              name={`${userDetails.fname} ${userDetails.lname}`}
                              round={true}
                              color="#e5ac3f"
                            />
                          </>
                        ) : (
                          <>
                            <Avatar
                              size="200"
                              src={`https://server.beehubvas.com/profilepicture/${userDetails.profilePicture}`}
                              round={true}
                            />
                          </>
                        )}

                        <input
                          type="file"
                          id="profilePictureInput"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: "none" }}
                        />

                        <span className="change-avatar-text">
                          Change avatar
                        </span>
                      </label>
                    </div>
                    <div className="profiletitle__container">
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
                  />
                </div>
              </div>

              <div className="profile__seventhrow">
                <div className="profile__table">
                  <div className="profiletable__title">
                    <h4>Your BeeHub Virtual Assistants</h4>
                  </div>

                  <DataTable
                    // columns={historyColumn}
                    // data={jobHistory}
                    theme="dape"
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
