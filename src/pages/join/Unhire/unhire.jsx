import React, { useState } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { IoClose } from "react-icons/io5";

import "../../admin/dashboard/deletejobpost/admindeletejob.css";

const Unhire = ({ jobData }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => toggleClose();
  const [isLoading, setIsLoading] = useState(false);

  const toggleClose = () => {
    setOpen(false);
  };

  const handleDeleteJob = async () => {
    setIsLoading(true);
    await Axios.put("https://server.beehubvas.com/unhire", {
      jobID: jobData._id,
    }).then((res) => {
      if (res.data === "Request sent") {
        setIsLoading(false);
        window.location.reload();
        toggleClose();
      }
    });
  };

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
      {jobData.employmentStatus === "Unhired" ? (
        <p>Unhired</p>
      ) : jobData.employmentStatus === "Unhire Requested" ? (
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

              <div className="canceljob__content" style={{ marginTop: "2rem" }}>
                {/* <h2> Are you done with this job post?</h2> */}
                <div className="canceljob__data">
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
                    <Button sx={buttonStyle3} onClick={handleDeleteJob}>
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
