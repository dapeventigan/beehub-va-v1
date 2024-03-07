import React, { useState, useEffect } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { TagsInput } from "react-tag-input-component";
import DatePicker from "react-datepicker";

import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

import "react-datepicker/dist/react-datepicker.css";
import "../../../components/addjob/addjob.css";

const AddCertificates = ({ userdata }) => {
  //Popup Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => toggleClose();
  const [isLoading, setIsLoading] = useState(false);

  //forms data
  const [vaCertificate, setVACertificate] = useState("");
  const [certificateTitle, setCertificateTitle] = useState("");
  const [trainingStart, setTrainingStart] = useState("");
  const [trainingEnd, setTrainingEnd] = useState("");

  //certificate
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB
  
      if (file.size > maxSize) {
        alert("File is too large, please select a file smaller than 5MB.");
        e.target.value = null;
        setVACertificate("");
      } else {
        setVACertificate(file);
      }
    }
  };

  const toggleClose = () => {
    setOpen(false);
    setVACertificate("");
    setCertificateTitle("");
    setTrainingStart("");
    setTrainingEnd("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("vaID", userdata._id);
    formData.append("certificateTitle", certificateTitle);
    formData.append("certificateStart", trainingStart);
    formData.append("certificateEnd", trainingEnd);
    formData.append("certificate", vaCertificate);
    await Axios.post("https://server.beehubvas.com/addCertificate", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      if (res.data === "Success") {
        setIsLoading(false);
        toggleClose();
        window.location.reload();
      }
    });
  };

  const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 600,
    height: 500,
    bgcolor: "background.paper",
    border: "2px solid #bdbdbd",
    borderRadius: "0.5rem",
    boxShadow: 24,
    overflowY: "scroll",
  };

  return (
    <>
      <div className="jobpost-btn" onClick={handleOpen}>
        <button
          className="btn"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <FaPlus /> Add Certificate
        </button>
      </div>
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
                  <h1>Add Certificate</h1>
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
                    <h4 className="va__label">Certificate Title</h4>
                    <div className="clientregisterinput__container">
                      <input
                        className="clientregisterinput__form"
                        type="text"
                        onChange={(e) => setCertificateTitle(e.target.value)}
                        value={certificateTitle}
                        placeholder="Certificate Title"
                        required
                      />
                    </div>
                  </div>

                  <div className="vaform__row">
                    <div className="vasettingform__container">
                      <h4 className="va__label">Start Date</h4>
                      <div>
                        <DatePicker
                          className="datepicker__container"
                          selected={trainingStart}
                          onChange={(date) => setTrainingStart(date)}
                          dateFormat="dd/MM/yyyy"
                          required
                        />
                      </div>
                    </div>

                    <div className="vasettingform__container">
                      <h4 className="va__label">End Date</h4>
                      <div>
                        <DatePicker
                          className="datepicker__container"
                          selected={trainingEnd}
                          onChange={(date) => setTrainingEnd(date)}
                          dateFormat="dd/MM/yyyy"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="vasettingresume__container">
                    <h4 className="va__label">Certificate File</h4>
                    <div className="resume__container">
                      <input
                        type="file"
                        className="pdf-control"
                        onChange={handleFileChange}
                        accept="*/*"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default AddCertificates;
