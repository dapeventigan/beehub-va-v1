import React, { useState, useEffect } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { IoClose } from "react-icons/io5";

import "../../admin/dashboard/deletejobpost/admindeletejob.css";

const Unhire = ({ jobData, user }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => toggleClose();
  const [isLoading, setIsLoading] = useState(false);
  const [unhireStatus, setUnhireStatus] = useState();
  const [message, setMessage] = useState("");

  const toggleClose = () => {
    setOpen(false);
    setMessage("");
  };

  const handleDeleteJob = async () => {
    setIsLoading(true);
    await Axios.post(`${process.env.REACT_APP_BASE_URL}/unhire`, {
      vaID: jobData.candidate,
      vaName: jobData.matcheddata.full_name,
      matchID: jobData.id,
      jobID: jobData.job,
      jobName: jobData.matchedjob.position_name,
      clientID: user.manatalID,
      clientName: user.fname + " " + user.lname,
      message: message,
    }).then((res) => {
      if (res.data === "Request sent") {
        setIsLoading(false);
        window.location.reload();
        toggleClose();
      }
    });
  };

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/unhireStatus`, {
      params: {
        clientID: user.manatalID,
        vaID: jobData.candidate,
        matchID: jobData.id,
      },
    })
      .then((res) => setUnhireStatus(res.data[0].status))
      .catch((err) => console.log(err));
  }, []);

  //DATE

  const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    maxHeight: 500,
    bgcolor: "background.paper",
    border: "2px solid #bdbdbd",
    borderRadius: "0.5rem",
    boxShadow: 24,
  };

  const buttonStyle = {
    backgroundColor: "#ca4c4c",
    color: "white",
    borderRadius: 1,
    "&:hover": {
      backgroundColor: "#ec2929",
    },
  };

  const buttonStyle2 = {
    backgroundColor: "#111111",
    color: "white",
    borderRadius: 1,
    "&:hover": {
      backgroundColor: "#202020",
    },
  };

  const buttonStyle3 = {
    backgroundColor: "#008000",
    color: "white",
    borderRadius: 1,
    "&:hover": {
      backgroundColor: "#006400",
    },
  };

  return (
    <>
      {unhireStatus === "request" ? (
        <p>In Process</p>
      ) : (
        <Button sx={buttonStyle} onClick={handleOpen}>
          Unhire
        </Button>
      )}

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
            <div className="canceljob__container">
              <IoClose
                className="exit__button-top-left"
                size={25}
                onClick={toggleClose}
              />

              <div style={{ marginTop: "2rem" }}>
                <div className="vasettingform__container">
                  <h4 className="va__label">Reason:</h4>
                  <div className="clientregisterinput__container">
                    <input
                      className="clientregisterinput__form"
                      type="text"
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      placeholder="Why do you want to unhire this VA?"
                      required
                    />
                  </div>
                </div>
                <div className="canceljob__data" style={{ marginTop: "1rem" }}>
                  <p>
                    This will notify <strong>{jobData.vaName}</strong> that you
                    are going to unhire them. Are you sure you want to proceed
                    with this request?
                  </p>
                </div>
                <div className="canceljob__buttons">
                  <Button sx={buttonStyle2} onClick={toggleClose}>
                    No
                  </Button>
                  {isLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    <Button
                      sx={buttonStyle3}
                      onClick={handleDeleteJob}
                      disabled={!message}
                    >
                      Yes
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Unhire;
