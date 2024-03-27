import React, { useState, useEffect } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { IoClose } from "react-icons/io5";

import "../deletejobpost/admindeletejob.css";

const UnhireVA = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => toggleClose();
  const [isLoading, setIsLoading] = useState(false);

  const toggleClose = () => {
    setOpen(false);
  };

  const handleCancelUnhire = async () => {
    await Axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteUnhire`, {
      data: { unhireID: data._id },
    })
      .then((res) => {
        if (res.data === "Success") {
          toggleClose();
          window.location.reload();
        }
      })
      .catch((err) => alert(err));
  };

  const handleAcceptUnhire = async () => {
    await Axios.put(`${process.env.REACT_APP_BASE_URL}/acceptUnhire`, {
      unhireID: data._id,
    })
      .then((res) => {
        if (res.data === "Success") {
          toggleClose();
          window.location.reload();
        }
      })
      .catch((err) => alert(err));
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
    backgroundColor: "#111111",
    color: "white",
    borderRadius: 1,
    "&:hover": {
      backgroundColor: "#202020",
    },
  };
  const buttonStyle2 = {
    color: "#808080",
    border: "1px solid #808080",
    borderRadius: 1,
    "&:hover": {
      backgroundColor: "red",
      color: "white",
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
      <Button sx={buttonStyle} onClick={handleOpen}>
        View
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
            <div className="canceljob__container">
              <IoClose
                className="exit__button-top-left"
                size={25}
                onClick={toggleClose}
              />

              <div>
                <h2 className="modal-title">Unhire</h2>
                <div className="vasettingform__container">
                  <h4>Reason for Unhire</h4>
                  <p>{data.message}</p>
                </div>
                <div className="canceljob__data" style={{ marginTop: "1rem" }}>
                  <p>
                    Unhire <strong>{data.vaName}</strong> from:
                  </p>
                  <p>{data.jobName}</p>
                  <p>
                    This is requested by <strong>{data.clientName}</strong>
                  </p>
                </div>
                <div className="canceljob__buttons">
                  <Button sx={buttonStyle2} onClick={handleCancelUnhire}>
                    Unapprove Unhire
                  </Button>
                  {isLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    <Button sx={buttonStyle3} onClick={handleAcceptUnhire}>
                      Yes, Unhire VA!
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

export default UnhireVA;
