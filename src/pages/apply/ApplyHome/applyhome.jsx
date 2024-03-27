import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Avatar from "react-avatar";
import Axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import ViewPdf from "../../../components/viewpdf/viewpdf";
import Button from "@mui/material/Button";

import UserNavbar from "../../../components/navbar/usernavbar/usernavbar";
import OfflineNavbar from "../../../components/navbar/offlinenavbar/offlinenavbar";
import Footer from "../../../components/footer/footer";

import { MdVerified } from "react-icons/md";
import { FaFacebookSquare, FaLinkedin, FaInstagram } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import BHLogo from "../../../assets/logo_1.png";
import AddCertificates from "../AddCertificates/addcertificates";

import "./applyhome.css";

const ApplyHome = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [manatalDetails, setManatalDetails] = useState([]);

  const [mainData, setMainData] = useState([]);
  const [manatalData, setManatalData] = useState([]);

  const [viewOnly, setViewOnly] = useState(true);
  const [skill, setSkill] = useState([]);

  const [joinedDate, setJoinedDate] = useState();
  const convertedDate = new Date(joinedDate).toString().substring(3, 15);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const param = useParams();

  const buttonStyle = {
    backgroundColor: "#111111",
    color: "white",
    borderRadius: 1,
    "&:hover": {
      backgroundColor: "#202020",
    },
  };

  const buttonStyleRed = {
    backgroundColor: "#ca4c4c",
    color: "white",
    borderRadius: 1,
    "&:hover": {
      backgroundColor: "#ec2929",
    },
  };

  //copy to clipboard
  const [copied, setCopied] = useState(false);
  const url = `https://beehubvas.com/va-bh/${param.username}/${param.id}`;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      alert("Profile URL copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDeleteCertificate = async (id, file) => {
    await Axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteCertificate`, {
      data: {
        id: id,
        file: file,
      },
    }).then((res) => {
      if (res.data === "Success") {
        window.location.reload();
      } else {
        alert("Failed to delete certificate");
      }
    });
  };

  //edit profile
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("profilePicture", file);
    formData.append("userId", userDetails._id);

    await Axios.put(
      `${process.env.REACT_APP_BASE_URL}/editProfilePicture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).then((res) => {
      if (res.data.valid === true) {
        window.location.reload();
      }
    });
  };

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_BASE_URL}/va-bh/${param.username}/${param.id}`
    ).then(async (res) => {
      if (res.data === "Link Broken") {
        navigate("/");
      } else if (res.data !== "Profile doesn't exist") {
        const { user, candidates } = res.data;
        setViewOnly(true);
        setUserDetails(user);
        setManatalDetails(candidates);
        setJoinedDate(candidates.created_at);
        if (!user.skills) {
          setSkill([]);
        } else {
          setSkill(user.skills.split(","));
        }

        await Axios.get(
          `${process.env.REACT_APP_BASE_URL}/applyuserdashboard`
        ).then((res) => {
          const { user, candidates } = res.data;
          if (res.data !== "User not found" && user._id === param.id) {
            setMainData(user);
            setManatalData(candidates);
            setViewOnly(false);
            setIsLoading(false);
          } else if (res.data !== "User not found") {
            setisLoggedIn(true);
            setMainData(user);
            setManatalData(candidates);
            setIsLoading(false);
          } else {
            setisLoggedIn(false);
            setIsLoading(false);
          }
        });
      } else {
        navigate("/");
      }
    });

    Axios.get(`${process.env.REACT_APP_BASE_URL}/getJobHistory`, {
      params: {
        userID: param.id,
      },
    }).then((res) => {
      setJobHistory(res.data);
    });

    Axios.get(`${process.env.REACT_APP_BASE_URL}/getTraining`, {
      params: {
        userID: param.id,
      },
    }).then((res) => {
      setTraining(res.data);
    });

    Axios.get(`${process.env.REACT_APP_BASE_URL}/getCertificate`, {
      params: {
        userID: param.id,
      },
    }).then((res) => {
      setCertificate(res.data);
    });
  }, [param.username, param.id, navigate]);

  //DATATABLE

  //JOB HISTORY
  const [jobHistory, setJobHistory] = useState([]);
  const historyColumn = [
    {
      name: "Date Hired",
      selector: (row) => {
        if (!row.hired_at) {
          return "Not yet hired";
        }
        const date = new Date(row.hired_at);
        const options = { month: "long", day: "numeric", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
      },
      sortable: true,
    },
    {
      name: "Employment Status",
      selector: (row) => {
        return !row.hired_at && row.dropped_at !== null
          ? "Dropped"
          : row.job_pipeline_stage.name;
      },
    },
    {
      name: "Job",
      selector: (row) => row.jobmanataldata.position_name,
      sortable: true,
    },
    {
      name: "Employment Type",
      selector: (row) =>
        row.jobmanataldata.contract_details === "part_time"
          ? "Part time"
          : row.jobmanataldata.contract_details === "full_time"
          ? "Full time"
          : row.jobmanataldata.contract_details === "temporary"
          ? "Temporary"
          : row.jobmanataldata.contract_details === "freelance"
          ? "Freelance"
          : row.jobmanataldata.contract_details === "internship"
          ? "Internship"
          : row.jobmanataldata.contract_details === "apprenticeship"
          ? "Apprenticeship"
          : row.jobmanataldata.contract_details === "contractor"
          ? "Contractor"
          : row.jobmanataldata.contract_details === "consultancy"
          ? "Consultancy"
          : "",
      sortable: true,
    },
    {
      name: "Date Ended",
      selector: (row) => {
        if (!row.dropped_at) {
          return "Ongoing";
        }
        const date = new Date(row.dropped_at);
        const options = { month: "long", day: "numeric", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
      },
      sortable: true,
    },
  ];

  //Training Course
  const [training, setTraining] = useState([]);
  const trainingColumn = [
    {
      name: "Training/Course Taken",
      selector: (row) => row.trainingTitle,
    },
    {
      name: "Date Started",
      selector: (row) => {
        const date =
          row.trainingStart instanceof Date
            ? row.trainingStart
            : new Date(row.trainingStart);
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
      name: "Date Ended",
      selector: (row) => {
        const date =
          row.trainingEnd instanceof Date
            ? row.trainingEnd
            : new Date(row.trainingEnd);
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
      name: "View Certificate",
      selector: (row) => (
        <a
          href={`${process.env.REACT_APP_BASE_URL}/certificates/${row.certificate}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button sx={buttonStyle}>VIEW</Button>
        </a>
      ),
      sortable: true,
    },
  ];

  //Training Course
  const [certificate, setCertificate] = useState([]);
  const certificateColumn = [
    {
      name: "Certificate Title",
      selector: (row) => row.certificateTitle,
    },
    {
      name: "Date Started",
      selector: (row) => {
        const date =
          row.certificateStart instanceof Date
            ? row.certificateStart
            : new Date(row.certificateStart);
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
      name: "Date Ended",
      selector: (row) => {
        const date =
          row.certificateEnd instanceof Date
            ? row.certificateEnd
            : new Date(row.certificateEnd);
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
      name: "Action",
      selector: (row) => (
        <div className="admineditjobbtn__container">
          {viewOnly && !isLoggedIn ? (
            <></>
          ) : (
            <Button
              sx={buttonStyleRed}
              onClick={() => handleDeleteCertificate(row._id, row.certificate)}
            >
              DELETE
            </Button>
          )}
          <a
            href={`${process.env.REACT_APP_BASE_URL}/certificates/${row.certificate}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button sx={buttonStyle}>VIEW</Button>
          </a>
        </div>
      ),
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
      {isLoading ? (
        <nav className="navbar">
          <div className="navbar__beehub">
            <a href="/#">
              <img src={BHLogo} alt="" style={{ opacity: "0" }} />
            </a>
          </div>
        </nav>
      ) : viewOnly && !isLoggedIn ? (
        <OfflineNavbar />
      ) : (
        <UserNavbar userData={mainData} manatalData={manatalData} />
      )}

      <div className="userprofile__container">
        <div className="account__title">
          <h1>My Account</h1>
          <div className="profileuri__container profileuri-mobile">
            <p>Copy Profile Url</p>
            <div className="vertical-line" />
            <IoCopyOutline onClick={handleCopy} style={{ cursor: "pointer" }} />
          </div>
          <div className="profileuri__container profileuri-not_mobile">
            <p>{`https://beehubvas.com/va-bh/${param.username}/${param.id}`}</p>
            <div className="vertical-line" />
            <IoCopyOutline onClick={handleCopy} style={{ cursor: "pointer" }} />
          </div>
        </div>

        <div className="profile__container">
          <div className="userprofile__banner" />
          {userDetails && manatalDetails && (
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
                        {!manatalDetails.picture ? (
                          <>
                            <Avatar
                              size="200"
                              name={`${manatalDetails.full_name}`}
                              round={true}
                              color="#e5ac3f"
                            />
                          </>
                        ) : (
                          <>
                            <Avatar
                              size="200"
                              src={`${manatalDetails.picture}`}
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
                    <div className="profiletitle__container profilename-desktop">
                      <h2>{`${manatalDetails.full_name}`}</h2>
                      <p>{manatalDetails.current_position || "None"}</p>
                      <p>
                        {!userDetails.verifiedForJob
                          ? "Not Verified"
                          : "Verified"}
                        <MdVerified
                          color={!userDetails.verifiedForJob ? "red" : "green"}
                        />
                      </p>
                    </div>
                  </div>

                  <div className="profiletitle__container-mobile">
                    <div className="profiletitle__container profilename-mobile">
                      <h2>{`${manatalDetails.full_name}`}</h2>
                      <p>{manatalDetails.current_position || "None"}</p>
                      <p>
                        {!userDetails.verifiedForJob
                          ? "Not Verified"
                          : "Verified"}
                        <MdVerified
                          color={!userDetails.verifiedForJob ? "red" : "green"}
                        />
                      </p>
                    </div>

                    <p>{`Joined date: ${convertedDate}`}</p>
                  </div>
                </div>
                <div className="profile-horizontal-line"></div>
              </div>

              <div className="profile__row">
                <div className="profilecontent__container">
                  <div className="profile__firstrow">
                    <div className="aboutme__profile">
                      <h4>Bio</h4>
                      <p>{`${userDetails.description || "None"}`}</p>
                    </div>
                  </div>
                  <div className="profile__secondrow">
                    <h4>Education</h4>

                    <p>{manatalData.latest_university || "None"}</p>
                  </div>
                  <div className="profile__thirdrow">
                    <h4>Field/Industry</h4>

                    <p>{userDetails.industry || "None"}</p>
                  </div>
                  <div className="profile__fourthrow">
                    <h4>Portfolio/Website</h4>
                    <a
                      href={userDetails.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {userDetails.portfolio || "None"}
                    </a>
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
                    <IoMdMail /> {manatalDetails.email}
                  </p>
                  <p>
                    <FaPhone /> +{manatalDetails.phone_number}
                  </p>

                  <div className="profile__social">
                    {userDetails.fbLink ? (
                      <a
                        href={userDetails.fbLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        <FaFacebookSquare size={25} />{" "}
                      </a>
                    ) : (
                      <></>
                    )}
                    {userDetails.linkedinLink ? (
                      <a
                        href={userDetails.linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        <FaLinkedin size={25} />{" "}
                      </a>
                    ) : (
                      <></>
                    )}
                    {userDetails.igLink ? (
                      <a
                        href={userDetails.igLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram size={25} />{" "}
                      </a>
                    ) : (
                      <></>
                    )}
                  </div>

                  <ViewPdf filename={manatalDetails.resume} />
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
                    pagination
                  />
                </div>
              </div>

              <div className="profile__seventhrow">
                <div className="profile__table">
                  <div className="profiletable__title">
                    <h4>Training/Courses taken with BeeHub</h4>
                  </div>

                  <DataTable
                    columns={trainingColumn}
                    data={training}
                    theme="dape"
                    pagination
                  />
                </div>
              </div>

              <div className="profile__eightrow">
                <div className="profile__table">
                  <div className="profiletable__title">
                    <h4>Certifications</h4>
                    {viewOnly && !isLoggedIn ? (
                      <></>
                    ) : (
                      <AddCertificates userdata={userDetails} />
                    )}
                  </div>

                  <DataTable
                    columns={certificateColumn}
                    data={certificate}
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

export default ApplyHome;
