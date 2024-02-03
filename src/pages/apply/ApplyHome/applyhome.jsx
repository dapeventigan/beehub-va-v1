import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Avatar from "react-avatar";
import Axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";

import UserNavbar from "../../../components/navbar/usernavbar/usernavbar";
import OfflineNavbar from "../../../components/navbar/offlinenavbar/offlinenavbar";
import Footer from "../../../components/footer/footer";

import { MdVerified } from "react-icons/md";
import { FaFacebookSquare, FaLinkedin, FaInstagram } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";

import "./applyhome.css";

const ApplyHome = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [viewOnly, setViewOnly] = useState(false);
  const [skill, setSkill] = useState([]);
  const [jobHistory, setJobHistory] = useState([]);

  const param = useParams();

  //profile state

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
    Axios.get("https://server.beehubvas.com/applyuserdashboard").then(async (res) => {
      if (res.data !== "User not found") {
        setUserDetails(res.data);
        setJobHistory(res.data.jobHistory);
        if (!res.data.skills) {
          setSkill([]);
        } else {
          setSkill(res.data.skills.split(","));
        }
        await Axios.get(
          `https://server.beehubvas.com/va-bh/${param.username}/${param.id}`
        ).then((res) => {
          if (res.data === "Link Broken") {
            navigate("/");
          }
        });
      } else {
        setViewOnly(true);
        if (viewOnly) {
          Axios.get(
            `https://server.beehubvas.com/va-bh/${param.username}/${param.id}`
          ).then((res) => {
            if (res.data === "Link Broken") {
              navigate("/");
            } else if (res.data !== "Profile doesn't exist") {
              setUserDetails(res.data);
              if (!res.data.skills) {
                setSkill([]);
              } else {
                setSkill(res.data.skills.split(","));
              }
            } else {
              navigate("/");
            }
          });
        }
      }
    });
  }, [viewOnly, param.username, param.id]);

  //DATATABLE

  const historyColumn = [
    {
      name: "Date Hired",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Business/Company Name",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "# of hours per week",
      selector: (row) => row.jobName,
      sortable: true,
    },
    // {
    //   name: "Hourly Rate",
    //   selector: (row) => row.selectedValues,
    // },
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
      {viewOnly ? <OfflineNavbar /> : <UserNavbar userData={userDetails} />}

      <div className="userprofile__container">
        <div className="account__title">
          <h1>My Account</h1>
          <div className="profileuri__container">
            <a
              href={`https://beehubvas.com/va-bh/${param.username}/${param.id}`}
            >{`https://beehubvas.com/va-bh/${param.username}/${param.id}`}</a>
            <div className="vertical-line"/>
            <IoCopyOutline />
          </div>
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
                        className={
                          viewOnly ? "offline__avatar" : "avatar-label"
                        }
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
                        {viewOnly ? (
                          <></>
                        ) : (
                          <input
                            type="file"
                            id="profilePictureInput"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                          />
                        )}

                        <span className="change-avatar-text">
                          Change avatar
                        </span>
                      </label>
                    </div>
                    <div className="profiletitle__container">
                      <h2>{`${userDetails.fname} ${userDetails.lname}`}</h2>
                      <p>Full stack Developer</p>
                      <p>
                        Not Verified <MdVerified color="red" />
                      </p>
                    </div>
                  </div>

                  <div>
                    <p>{`Current Employment: ${
                      userDetails.employment || "None"
                    }`}</p>
                  </div>
                </div>
                <div className="profile-horizontal-line"></div>
              </div>

              <div className="profile__row">
                <div className="profilecontent__container">
                  <div className="profile__firstrow">
                    <div className="aboutme__profile">
                      <h4>About Me</h4>
                      <p>{`${userDetails.aboutme || "None"}`}</p>
                    </div>
                  </div>
                  <div className="profile__secondrow">
                    <h4>Education</h4>

                    <p>Bachelors Degree</p>
                  </div>
                  <div className="profile__thirdrow">
                    <h4>Field/Industry</h4>

                    <p>Information Technology</p>
                  </div>
                  <div className="profile__fourthrow">
                    <h4>Portfolio/Website</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                  </div>
                  <div className="profile__fifthrow">
                    <h4>Top 5 Skills</h4>
                    <div className="skills__container">
                      {[...Array(5)].map((_, index) => (
                        <div className="skill-value" key={index}>
                          {skill[index] || "Empty"}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="contact__profile">
                  <h4>Contact</h4>
                  <p>
                    <IoMdMail /> {userDetails.email}
                  </p>
                  <p>
                    <FaPhone /> +{userDetails.mobileNumber}
                  </p>
                  <div className="profile__social">
                    <FaFacebookSquare size={25} />
                    <FaLinkedin size={25} />
                    <FaInstagram size={25} />
                  </div>
                </div>
              </div>
              <div className="profile__sixthrow">
                <div className="profile__table">
                  <div className="profiletable__title">
                    <h4>Job History with BeeHub</h4>
                  </div>

                  <DataTable
                    columns={historyColumn}
                    data={jobHistory}
                    theme="dape"
                  />
                </div>
              </div>

              <div className="profile__seventhrow">
                <div className="profile__table">
                  <div className="profiletable__title">
                    <h4>Training/Courses taken with BeeHub</h4>
                  </div>

                  <DataTable
                    columns={historyColumn}
                    // data={jobHistory}
                    theme="dape"
                  />
                </div>
              </div>

              <div className="profile__eightrow">
                <div className="profile__table">
                  <div className="profiletable__title">
                    <h4>Certifications</h4>
                  </div>

                  <DataTable
                    columns={historyColumn}
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

export default ApplyHome;
