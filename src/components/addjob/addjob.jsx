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
import "./addjob.css";

const AddJob = ({ userdata }) => {
  //Popup Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => toggleClose();
  const [isLoading, setIsLoading] = useState(false);

  //forms data

  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [levelExperience, setLevelExperience] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState(null);
  const [companyOverview, setCompanyOverview] = useState(
    userdata.bio ? userdata.bio : ""
  );
  const [jobOverview, setJobOverview] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [skills, setSkills] = useState([]);
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");

  const handleExperienceChange = (e) => {
    setLevelExperience(e.target.value);
  };

  const handleEmploymentChange = (e) => {
    setEmploymentType(e.target.value);
  };

  const removeLastSkill = () => {
    const newSkills = [...skills];
    newSkills.pop();
    setSkills(newSkills);
  };

  const toggleClose = () => {
    setOpen(false);
    setJobTitle("");
    setSalary("");
    setEmploymentType("");
    setLevelExperience("");
    setApplicationDeadline(null);
    setJobOverview("");
    setWorkTime("");
    setSkills([]);
    setResponsibilities("");
    setRequirements("");
    setBenefits("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("companyOverview", companyOverview);
    formData.append("jobTitle", jobTitle);
    formData.append("jobSalary", salary);
    formData.append("jobEmploymentType", employmentType);
    formData.append("jobLevelExperience", levelExperience);
    formData.append("jobDeadline", applicationDeadline);
    formData.append("jobSummary", jobOverview);
    formData.append("jobHours", workTime);
    formData.append("jobSkills", skills);
    formData.append("jobKeyResponsibilities", responsibilities);
    formData.append("jobRequirements", requirements);
    formData.append("jobBenefits", benefits);
    formData.append("jobPostedById", userdata._id);
    setIsLoading(true);
    await Axios.post("https://server.beehubvas.com/addjob", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      if (res.data.message === "Job added successfully") {
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
    maxHeight: 500,
    bgcolor: "background.paper",
    border: "2px solid #bdbdbd",
    borderRadius: "0.5rem",
    boxShadow: 24,
    overflowY: "scroll",
  };

  useEffect(() => {
    if (userdata.bio) {
      setCompanyOverview(userdata.bio);
    }
  }, [userdata.bio]);

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
          <FaPlus /> Post a Job
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
                  <h1>Post a Job</h1>
                </div>
                <div className="vaheader__right">
                  {isLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    <button className="btn">Post</button>
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
                    <h4 className="va__label">Job Overview</h4>
                    <div className="textarea__form">
                      <textarea
                        type="text"
                        onChange={(e) => setJobOverview(e.target.value)}
                        value={jobOverview}
                        placeholder="Job Description"
                        required
                      />
                    </div>
                  </div>

                  <div className="vasettingform__container">
                    <h4 className="va__label">Company Overview</h4>
                    <div className="textarea__form">
                      <textarea
                        type="text"
                        onChange={(e) => setCompanyOverview(e.target.value)}
                        value={companyOverview}
                        placeholder="Company Description"
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

                  <div className="vaform__row">
                    <div>
                      <h4 className="va__label">Level of Experience</h4>
                      <select
                        value={levelExperience}
                        onChange={handleExperienceChange}
                        className="vasettingrdropdown__con"
                      >
                        <option value="" disabled>
                          Choose level of experience
                        </option>
                        <option value="Entry-level">Entry-level</option>
                        <option value="Mid-level">Mid-level</option>
                        <option value="Senior-level">Senior-level</option>
                      </select>
                    </div>

                    <div>
                      <h4 className="va__label">Employement Type</h4>
                      <select
                        value={employmentType}
                        onChange={handleEmploymentChange}
                        className="vasettingrdropdown__con"
                      >
                        <option value="" disabled>
                          Choose your employment type
                        </option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Project-based">Project-based</option>
                      </select>
                    </div>
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

                  <div className="vasettingform__container">
                    <h4 className="va__label">
                      Top (3) Skills required for the Job
                    </h4>
                    <div className="tags__form">
                      <TagsInput
                        type="text"
                        onChange={setSkills}
                        value={skills}
                        placeholder="3 skills required"
                        required
                        disabled={skills.length >= 3}
                      />
                      {skills.length >= 3 ? (
                        <IoClose
                          className="remove__tags"
                          onClick={removeLastSkill}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="vasettingform__container">
                    <h4 className="va__label">
                      Responsibilities of the Virtual Assistant
                    </h4>
                    <div className="textarea__form">
                      <textarea
                        type="text"
                        onChange={(e) => setResponsibilities(e.target.value)}
                        value={responsibilities}
                        placeholder=" - Write a email...
                        - Schedule meetings...
                        - Manage social media accounts..."
                      />
                    </div>
                  </div>

                  <div className="vasettingform__container">
                    <h4 className="va__label">
                      Requirements needed for this Job
                    </h4>
                    <div className="textarea__form">
                      <textarea
                        type="text"
                        onChange={(e) => setRequirements(e.target.value)}
                        value={requirements}
                        placeholder=" - Bachelor Degree...
                        - 2 years Experience...
                        - Fluent in English..."
                      />
                    </div>
                  </div>

                  <div className="vasettingform__container">
                    <h4 className="va__label">
                      Benefits
                    </h4>
                    <div className="textarea__form">
                      <textarea
                        type="text"
                        onChange={(e) => setBenefits(e.target.value)}
                        value={benefits}
                        placeholder=" - 6 Paid Holidays ...
                        - Food Allowance...
                        - Internet Bill Allowance..."
                      />
                    </div>
                  </div>

                  <div className="vasettingform__container">
                    <h4 className="va__label">
                      Application deadline for this job
                    </h4>
                    <div>
                      <DatePicker
                        className="datepicker__container"
                        selected={applicationDeadline}
                        onChange={(date) => setApplicationDeadline(date)}
                        dateFormat="dd/MM/yyyy"
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

export default AddJob;
