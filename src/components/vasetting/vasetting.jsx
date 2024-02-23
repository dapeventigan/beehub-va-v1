import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Axios from "axios";
import PhoneInput from "react-phone-input-2";
import CircularProgress from "@mui/material/CircularProgress";
import { IoClose } from "react-icons/io5";
import { socket } from "../../App";

import "./vasetting.css";

const VaSetting = ({ data }) => {
  //Popup Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => toggleClose();
  const [isLoading, setIsLoading] = useState(false);

  const toggleClose = () => {
    setOpen(false);
    setFname(data.fname);
  };

  const [userID, setUserID] = useState(data._id);
  const [resumeData, setResumeData] = useState(
    data.pdfFile ? data.pdfFile : ""
  );
  const [fname, setFname] = useState(data.fname);
  const [lname, setLname] = useState(data.lname);
  const [userTitle, setUserTitle] = useState(
    data.userTitle ? data.userTitle : ""
  );
  const [mobileNumber, setMobileNumber] = useState(data.mobileNumber);
  const [educationOption, setEducationOption] = useState(
    data.education ? data.education : ""
  );
  const [bio, setBio] = useState(data.bio ? data.bio : "");
  const [industry, setIndustry] = useState(data.industry ? data.industry : "");
  const [portfolio, setPortfolio] = useState(
    data.portfolio ? data.portfolio : ""
  );
  const [skills, setSkills] = useState(
    data && data.skills ? data.skills.split(",") : []
  );
  const [fbLink, setFbLink] = useState(data.fbLink ? data.fbLink : "");
  const [linkedinLink, setLinkedinLink] = useState(
    data.linkedinLink ? data.linkedinLink : ""
  );
  const [igLink, setIgLink] = useState(data.igLink ? data.igLink : "");

  //PASSWORD
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  //SKILLS
  const handleSkillChange = (index, newSkill) => {
    const newSkills = [...skills];
    newSkills[index] = newSkill;
    setSkills(newSkills);
  };

  //RESUME
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeData(file);
  };

  //Education Option
  const handleEducationChange = (e) => {
    setEducationOption(e.target.value);
  };

  //MOBILE NUMBER
  const handleMobileChange = (value) => {
    setMobileNumber(value);
  };

  //FORM POST
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (!data.googleVerified) {
      formData.append("password", newPassword);
    }

    formData.append("userID", userID);
    formData.append("pdfFile", resumeData);
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("userTitle", userTitle);
    formData.append("mobileNumber", mobileNumber);
    formData.append("education", educationOption);
    formData.append("bio", bio);
    formData.append("industry", industry);
    formData.append("portfolio", portfolio);
    formData.append("skills", skills);
    formData.append("fbLink", fbLink);
    formData.append("linkedinLink", linkedinLink);
    formData.append("igLink", igLink);

    setIsLoading(true);
    Axios.put("https://server.beehubvas.com/accountSettings", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        setIsLoading(false);
        socket.emit("refresh-all", userID);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 600,
    maxHeight: 500,
    bgcolor: "background.paper",
    border: "2px solid #bdbdbd",
    borderRadius: "0.5rem",
    boxShadow: 24,
    overflowY: "scroll",
  };

  return (
    <>
      <div onClick={handleOpen}>Account Settings</div>
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
            <form onSubmit={handleFormSubmit}>
              <div className="vasettings__header">
                <div className="vaheader__left">
                  <IoClose
                    className="exit__button2"
                    size={25}
                    onClick={toggleClose}
                  />
                  <h1>Account Settings</h1>
                </div>
                <div className="vaheader__right">
                  {isLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    <button className="btn">Save</button>
                  )}
                </div>
              </div>

              <div className="vasetting__container">
                <div className="vasettingresume__container">
                  <h4 className="va__label">
                    Resume |{" "}
                    <span>
                      {data && data.pdfFile ? data.pdfFile.substring(13) : ""}
                    </span>
                  </h4>
                  <div className="resume__container">
                    <input
                      type="file"
                      className="pdf-control"
                      onChange={handleFileChange}
                      accept="application/pdf"
                    />
                  </div>
                </div>

                <div className="clientregisterform__container">
                  <div className="vasettingform__container">
                    <h4 className="va__label">Name</h4>
                    <div className="vaform__row">
                      <div className="vasettinginput__container">
                        <input
                          className="clientregisterinput__form"
                          type="text"
                          value={fname}
                          onChange={(e) => setFname(e.target.value)}
                          placeholder="First name"
                        />
                      </div>

                      <div className="vasettinginput__container">
                        <input
                          className="clientregisterinput__form"
                          type="text"
                          onChange={(e) => setLname(e.target.value)}
                          value={lname}
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="vasettingform__container">
                    <h4 className="va__label">Title</h4>
                    <div className="clientregisterinput__container">
                      <input
                        className="clientregisterinput__form"
                        type="text"
                        onChange={(e) => setUserTitle(e.target.value)}
                        value={userTitle}
                        placeholder="Title"
                      />
                    </div>
                  </div>

                  <div className="vasettingform__container">
                    <h4 className="va__label">Bio</h4>
                    <div className="clientregisterinput__container">
                      <input
                        className="clientregisterinput__form"
                        type="text"
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                        placeholder="Bio"
                        maxLength={160}
                      />

                      <div style={{ textAlign: "right", marginLeft: "1rem" }}>
                        {`${bio.length}/160`}
                      </div>
                    </div>
                  </div>

                  <div className="vaform__row">
                    <div className="vasetting__mobilecontainer">
                      <h4 className="va__label">Mobile Number</h4>
                      <PhoneInput
                        country={"ph"}
                        value={mobileNumber}
                        name="mobilenum"
                        onChange={handleMobileChange}
                        inputStyle={{
                          border: "1px solid #f8f8f8",
                          backgroundColor: "#f8f8f8",
                        }}
                        containerStyle={{
                          height: "3rem",
                          padding: "15px 0px 15px 0.5rem",
                          borderRadius: "7px",
                          border: "1.5px solid #353640",
                          backgroundColor: "#f8f8f8",
                          display: "flex",
                          alignItems: "center",
                        }}
                        buttonStyle={{
                          border: "1px solid #f8f8f8",
                        }}
                      />
                    </div>

                    <div>
                      <h4 className="va__label">Education</h4>
                      <select
                        value={educationOption}
                        onChange={handleEducationChange}
                        className="vasettingrdropdown__con"
                      >
                        <option value="" disabled>
                          Choose your highest education level
                        </option>
                        <option value="High School Diploma">
                          High School Diploma
                        </option>
                        <option value="Associate's Degree">
                          Associate's Degree
                        </option>
                        <option value="Bachelor's Degree">
                          Bachelor's Degree
                        </option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="Doctorate (Ph.D. or Ed.D.)">
                          Doctorate (Ph.D. or Ed.D.)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="vasettingform__container">
                    <h4 className="va__label">Field/Industry</h4>
                    <div className="clientregisterinput__container">
                      <input
                        className="clientregisterinput__form"
                        type="text"
                        onChange={(e) => setIndustry(e.target.value)}
                        value={industry}
                        placeholder="Industry"
                      />
                    </div>
                  </div>

                  <div className="vasettingform__container">
                    <h4 className="va__label">Portfolio/Website</h4>
                    <div className="clientregisterinput__container">
                      <input
                        className="clientregisterinput__form"
                        type="text"
                        onChange={(e) => setPortfolio(e.target.value)}
                        value={portfolio}
                        placeholder="Portfolio/Website"
                      />
                    </div>
                  </div>

                  <div className="vasettingform__container">
                    <h4 className="va__label">Top 5 Skills</h4>
                    <div className="vaskillssettings__container">
                      {[...Array(5)].map((_, index) => (
                        <div
                          className="clientregisterinput__container"
                          key={index}
                        >
                          <input
                            className="clientregisterinput__form"
                            type="text"
                            value={skills[index] || ""}
                            onChange={(e) =>
                              handleSkillChange(index, e.target.value)
                            }
                            placeholder={`Skill ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="vasocialmedia__links">
                    <div className="vasettingform__container">
                      <h4 className="va__label">Facebook Profile Link</h4>
                      <div className="clientregisterinput__container">
                        <input
                          className="clientregisterinput__form"
                          type="text"
                          onChange={(e) => setFbLink(e.target.value)}
                          value={fbLink}
                          placeholder="Facebook Link"
                        />
                      </div>
                    </div>

                    <div className="vasettingform__container">
                      <h4 className="va__label">Linkedin Profile Link</h4>
                      <div className="clientregisterinput__container">
                        <input
                          className="clientregisterinput__form"
                          type="text"
                          onChange={(e) => setLinkedinLink(e.target.value)}
                          value={linkedinLink}
                          placeholder="LinkedIn Link"
                        />
                      </div>
                    </div>

                    <div className="vasettingform__container">
                      <h4 className="va__label">Instagram Profile Link</h4>
                      <div className="clientregisterinput__container">
                        <input
                          className="clientregisterinput__form"
                          type="text"
                          onChange={(e) => setIgLink(e.target.value)}
                          value={igLink}
                          placeholder="Instagram Link"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {data.googleVerified ? (
                  ""
                ) : (
                  <>
                    <div className="vasettings-horizontal-line"></div>
                    <div className="vasocialmedia__links">
                      <div className="vasettingform__container">
                        <h4 className="va__label">Current Password</h4>
                        <div className="clientregisterinput__container">
                          <input
                            className="clientregisterinput__form"
                            type="text"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            value={currentPassword}
                            placeholder="Current Password"
                          />
                        </div>
                      </div>

                      <div className="vasettingform__container">
                        <h4 className="va__label">New Password</h4>
                        <div className="clientregisterinput__container">
                          <input
                            className="clientregisterinput__form"
                            type="text"
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                            placeholder="New Password"
                          />
                        </div>
                      </div>

                      <div className="vasettingform__container">
                        <h4 className="va__label">Confirm New Password</h4>
                        <div className="clientregisterinput__container">
                          <input
                            className="clientregisterinput__form"
                            type="text"
                            onChange={(e) =>
                              setConfirmNewPassword(e.target.value)
                            }
                            value={confirmNewPassword}
                            placeholder="Confirm New Password8"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default VaSetting;
