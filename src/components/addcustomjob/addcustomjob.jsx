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
import "../addjob/addjob.css";

const AddCustomJob = ({ handleCustomJob }) => {
  //Popup Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => toggleClose();
  const [isLoading, setIsLoading] = useState(false);

  //forms data

  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [workTime, setWorkTime] = useState("");

  const handleEmploymentChange = (e) => {
    setEmploymentType(e.target.value);
  };

  const handleFormSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    handleCustomJob({
      jobTitle: jobTitle,
      salary: salary,
      employmentType: employmentType,
      workTime: workTime,
    });
    setIsLoading(false);
    toggleClose();
  };

  const toggleClose = () => {
    setOpen(false);
    setJobTitle("");
    setSalary("");
    setEmploymentType("");
    setWorkTime("");
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
      <div className="jobpost-btn" onClick={handleOpen}>
        <button
          className="btn"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <FaPlus /> Add Custom Job
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
                  <h1>Add a Custom Job</h1>
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
                    <h4 className="va__label">Job Title</h4>
                    <div className="clientregisterinput__container">
                      <input
                        className="clientregisterinput__form"
                        type="text"
                        onChange={(e) => setJobTitle(e.target.value)}
                        value={jobTitle}
                        placeholder="Job Title"
                        required
                      />
                    </div>
                  </div>

                  <div className="vasettingform__container">
                    <h4 className="va__label">Salary</h4>
                    <div className="clientregisterinput__container">
                      <input
                        className="clientregisterinput__form"
                        type="text"
                        onChange={(e) => setSalary(e.target.value)}
                        value={salary}
                        placeholder="Salary range (e.g. $30,000 - $40,000)"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="va__label">Employement Type</h4>
                    <select
                      value={employmentType}
                      onChange={handleEmploymentChange}
                      className="vasettingrdropdown__con"
                      required
                    >
                      <option value="" disabled>
                        Choose your employment type
                      </option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Project-based">Project-based</option>
                    </select>
                  </div>

                  <div className="vasettingform__container">
                    <h4 className="va__label">
                      Expected No. of working hours per week
                    </h4>
                    <div className="clientregisterinput__container">
                      <input
                        className="clientregisterinput__form"
                        type="text"
                        onChange={(e) => setWorkTime(e.target.value)}
                        value={workTime}
                        placeholder="Eg. 40 hours per week"
                        required
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

export default AddCustomJob;
