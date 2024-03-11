import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Axios from "axios";

import "./contactuser.css";

export default function ContactUser({ userID }) {
  const [open, setOpen] = React.useState(false);
  const [userUUID, setUserUUID] = useState();
  const handleOpen = () => {
    setUserUUID(userID);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState();
  const [emailMessage, setEmailMessage] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const buttonStyle = {
    backgroundColor: "#111111",
    color: "white",
    borderRadius: 1,
    "&:hover": {
      backgroundColor: "#202020",
    },
  };

  const handleCloseModal = () => {
    setEmailMessage("");
    setEmailSubject("");
    setErrorMsg("");
    handleClose();
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    handleClose();

    try {
      await Axios.post(`${process.env.REACT_APP_BASE_URL}/contactMessage`, {
        id: userUUID,
        email: email,
        message: emailMessage,
        subject: emailSubject,
      }).then((res) => {
        setErrorMsg(res.data.message);
      });
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getSpecificUser`, {
      params: { userID: userUUID },
    }).then((res) => {
      try {
        setUser(res.data);
        setEmail(res.data[0].email);
      } catch (error) {
        console.log(error);
      }
    });
  }, [userUUID]);

  return (
    <div>
      <Button sx={buttonStyle} onClick={handleOpen}>
        Contact
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box__container">
          {user.map((userinfo) => (
            <div className="userdetails__container" key={userinfo._id}>
              <p>
                Name:{" "}
                <span className="contactuser__title">
                  {userinfo.fname} {userinfo.mname} {userinfo.lname}
                </span>
              </p>
              <p>
                Email:{" "}
                <span className="contactuser__title">{userinfo.email}</span>
              </p>
              <p>
                Mobile Number:{" "}
                <span className="contactuser__title">
                  {userinfo.mobileNumber === "" ? "N/A" : userinfo.mobileNumber}
                </span>
              </p>
              <p>
                Location:{" "}
                <span className="contactuser__title">
                  {userinfo.streetAdd}, {userinfo.cityName},{" "}
                  {userinfo.stateName}
                </span>
              </p>
              <p>
                {userinfo.role === "applyUser"
                  ? "Applying for: "
                  : "Looking for: "}
                <span className="contactuser__title">
                  {userinfo.selectedValues}
                </span>
              </p>
            </div>
          ))}

          <form onSubmit={handleSendEmail}>
            <div className="contant__inputs">
              <div className="subject__input">
                <TextField
                  required
                  id="outlined-required"
                  label="Subject"
                  placeholder="Enter subject here..."
                  onChange={(e) => {
                    setEmailSubject(e.target.value);
                  }}
                />
              </div>

              <TextField
                multiline
                label="Message"
                rows={1}
                fullWidth
                placeholder="Enter message here..."
                onChange={(e) => {
                  setEmailMessage(e.target.value);
                }}
              />
            </div>
            <div className="contactuser__container">
              <button className="btn btn-primary" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
