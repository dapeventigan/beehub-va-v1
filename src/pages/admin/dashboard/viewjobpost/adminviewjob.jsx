import React, { useState, useEffect } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { IoClose } from "react-icons/io5";

import "./adminviewjob.css";

const AdminViewJob = ({ jobData }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => toggleClose();
  const [isLoading, setIsLoading] = useState(false);
  const userIDs = jobData.usersApplied.map((user) => user.userID);

  const toggleClose = () => {
    setOpen(false);
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

  const buttonStyle = {
    backgroundColor: "#111111",
    color: "white",
    borderRadius: 1,
    "&:hover": {
      backgroundColor: "#202020",
    },
  };

  return (
    <>
      <Button sx={buttonStyle} onClick={handleOpen}>
        View Applied VAs
      </Button>

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
            <div className="vasettings__header">
              <div className="vaheader__left">
                <IoClose
                  className="exit__button2"
                  size={25}
                  onClick={toggleClose}
                />
                <h1>Applied Users for {jobData.jobTitle}</h1>
              </div>
              <div className="vaheader__right"></div>
            </div>

            <div className="canceljob__container">
              <div className="userapplied__container">
                {jobData.usersApplied.map((user, index) => (
                  <div className="appliedusers__container" key={index}>
                    <p>
                      {index + 1}.){" "}
                      <strong>{user.userName.toUpperCase()}</strong>
                    </p>

                    <a
                      href={`https://beehubvas.com/va-bh/${user.userName}/${user.userID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="btn">View Profile</button>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default AdminViewJob;
