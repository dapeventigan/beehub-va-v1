import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Axios from "axios";
import PhoneInput from "react-phone-input-2";
import CircularProgress from "@mui/material/CircularProgress";
import { IoClose } from "react-icons/io5";
import { socket } from "../../App";

import "../vasetting/vasetting.css";

const ClientSetting = ({ data }) => {
  //Popup Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => toggleClose();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleClose = () => {
    setOpen(false);
  };

  const [userID, setUserID] = useState(data._id);
  const [fname, setFname] = useState(data.fname);
  const [lname, setLname] = useState(data.lname);
  const [mobileNumber, setMobileNumber] = useState(data.mobileNumber);
  const [bio, setBio] = useState(data.bio ? data.bio : "");
  const [industry, setIndustry] = useState(data.industry ? data.industry : "");

  //PASSWORD
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  //MOBILE NUMBER
  const handleMobileChange = (value) => {
    setMobileNumber(value);
  };

  //FORM POST
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (!data.googleVerified) {
      if (!currentPassword) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        formData.append("userID", userID);
        formData.append("fname", fname);
        formData.append("lname", lname);
        formData.append("mobileNumber", mobileNumber);
        formData.append("bio", bio);
        formData.append("industry", industry);

        setIsLoading(true);
        Axios.put(`${process.env.REACT_APP_BASE_URL}/accountSettings`, formData, {
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
      } else {
        Axios.post(`${process.env.REACT_APP_BASE_URL}/verifyPassword`, {
          currentPassword: currentPassword,
          userID: userID,
        }).then((res) => {
          if (res.data === true) {
            if (newPassword === confirmNewPassword) {
              if (!/[A-Z]/.test(newPassword)) {
                setErrorMessage(
                  "Password must contain at least one uppercase letter."
                );
              } else if (!/\d/.test(newPassword)) {
                setErrorMessage("Password must contain at least one number.");
              } else if (!/[!@#$%^&*]/.test(newPassword)) {
                setErrorMessage(
                  "Password must contain at least one special character (!@#$%^&*)."
                );
              } else if (newPassword.length < 8) {
                setErrorMessage("Password must be at least 8 characters long.");
              } else {
                setErrorMessage("");
                formData.append("password", newPassword);
                formData.append("userID", userID);
                formData.append("fname", fname);
                formData.append("lname", lname);
                formData.append("mobileNumber", mobileNumber);
                formData.append("bio", bio);
                formData.append("industry", industry);

                setIsLoading(true);
                Axios.put(`${process.env.REACT_APP_BASE_URL}/accountSettings`, formData, {
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
              }
            } else {
              setErrorMessage("Passwords do not match");
            }
          } else {
            setErrorMessage("Password is incorrect");
          }
        });
      }
    } else {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      formData.append("userID", userID);
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("mobileNumber", mobileNumber);
      formData.append("bio", bio);
      formData.append("industry", industry);

      setIsLoading(true);
      Axios.put(`${process.env.REACT_APP_BASE_URL}/accountSettings`, formData, {
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
    }
  };

  useEffect(() => {
    if (data) {
      setUserID(data._id);
      setFname(data.fname);
      setLname(data.lname);
      setBio(data.bio ? data.bio : "");
      setMobileNumber(data.mobileNumber ? data.mobileNumber : "");
      setIndustry(data.industry ? data.industry : "");
    }
  }, [data]);

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
                          required
                        />
                      </div>

                      <div className="vasettinginput__container">
                        <input
                          className="clientregisterinput__form"
                          type="text"
                          onChange={(e) => setLname(e.target.value)}
                          value={lname}
                          placeholder="Last Name"
                          required
                        />
                      </div>
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
                        required
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
                            placeholder="Confirm New Password"
                          />
                        </div>
                      </div>

                      <p style={{textAlign:"center", color:"red", fontWeight: "bold"}}>{errorMessage}</p>
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

export default ClientSetting;
