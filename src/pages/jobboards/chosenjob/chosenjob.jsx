import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

import CircularProgress from "@mui/material/CircularProgress";
import GridLoader from "react-spinners/GridLoader";
import BHJobLogo from "../../../assets/Logo v1/Black And White/black2.png";

//icons
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { BiSolidBinoculars } from "react-icons/bi";
import { FaHandsHelping } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { RiHealthBookFill } from "react-icons/ri";

import "./chosenjob.css";

const ChosenJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [userApplied, setUserApplied] = useState(false);
  const [isUserVA, setIsUserVA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const param = useParams();

  //DATE
  const date = new Date(jobData.jobPosted);
  const dateString = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const finalDate = dateString.replace(",", "");

  const dateEnd = new Date(jobData.jobDeadline);
  const dateEndString = dateEnd.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const finalDateEnd = dateEndString.replace(",", "");

  const handleApplyJob = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await Axios.put("https://server.beehubvas.com/applyJob", {
      jobID: jobData._id,
      userID: userDetails._id,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    alert("Please sign up as Virtual Assistant to apply for this job");
  };

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("https://server.beehubvas.com/verifylogin").then((res) => {
      try {
        if (res.data !== "User not found") {
          setUserDetails(res.data);
          if (res.data.role === "virtualassistant") {
            setIsUserVA(true);
          } else {
            setIsUserVA(false);
          }

          Axios.get("https://server.beehubvas.com/getAppliedJob", {
            params: { userID: res.data._id, jobID: param.id },
          }).then((res) => {
            if (res.data !== "User not found") {
              setUserApplied(true);
              setIsLoading(false);
            } else {
              setUserApplied(false);
            }
          });
        }
      } catch (error) {
        //TODO: Will add popup error that you've been logged out
        console.log(error);
        Axios.post("https://server.beehubvas.com/logout");
        navigate("/");
      }
    });
  }, [isLoading, param.username, param.id, navigate]);

  useEffect(() => {
    setIsDataLoading(true);
    Axios.get(`https://server.beehubvas.com/job-boards/bh/${param.id}`).then((res) => {
      if (res.data === "Job doesn't exist") {
        navigate("/job-boards");
      } else {
        setJobData(res.data);
        setIsDataLoading(false);
      }
    });
  }, []);

  return (
    <>
      <div className="chosenjob__container">
        <div className="chosenjob__logo">
          <img src={BHJobLogo} alt="BH Logo" />
        </div>

        {isDataLoading ? (
          <GridLoader className="grid-loader" color="#ffd325" />
        ) : (
          <>
            <h1>{jobData.jobTitle}</h1>

            <div className="chosenjob__header">
              <p>{jobData.jobSalary} | </p>{" "}
              <p>{jobData.jobEmploymentType} | </p>
              <p>{jobData.jobLevelExperience} | </p> <p>{finalDate} </p>
            </div>

            <div className="chosenjob__content">
              <div className="chosenjob__overview">
                <div className="chosenjob__overview-content">
                  <div className="chosenjob__overview-title">
                    <BiSolidBinoculars />
                    <h3>Overview</h3>
                  </div>
                  <div className="chosenjob__overview-details">
                    <div>
                      <h4>Company Overview</h4>
                      <p className="chosenjob__p">
                        {jobData.jobCompanyOverview}
                      </p>
                    </div>
                    <div>
                      <h4>Job Overview</h4>
                      <p className="chosenjob__p">{jobData.jobSummary}</p>
                    </div>
                  </div>
                </div>

                <div className="chosenjob__overview-content">
                  <div className="chosenjob__overview-title">
                    <MdOutlineAccessTimeFilled />
                    <h3>Work Time</h3>
                  </div>
                  <p>{jobData.jobHours}</p>
                </div>

                <div className="chosenjob__overview-content">
                  <div className="chosenjob__overview-title">
                    <MdWork />
                    <h3>Skills needed</h3>
                  </div>
                  <div className="chosenjob__skills">
                    {jobData.jobSkills &&
                      jobData.jobSkills.map((skill, index) => (
                        <span key={index} className="skill-value">
                          {skill}
                          <br />
                        </span>
                      ))}
                  </div>
                </div>

                <div className="chosenjob__overview-content">
                  <div className="chosenjob__overview-title">
                    <FaHandsHelping />
                    <h3>Responsibilities</h3>
                  </div>
                  <p className="chosenjob__p">
                    {jobData.jobKeyResponsibilities}
                  </p>
                </div>

                <div className="chosenjob__overview-content">
                  <div className="chosenjob__overview-title">
                    <FaClipboardCheck />
                    <h3>Requirements</h3>
                  </div>
                  <p className="chosenjob__p">{jobData.jobRequirements}</p>
                </div>

                <div className="chosenjob__overview-content">
                  <div className="chosenjob__overview-title">
                    <RiHealthBookFill />
                    <h3>Benefits</h3>
                  </div>
                  <p className="chosenjob__p">{jobData.jobBenefits}</p>
                </div>
              </div>
            </div>

            {isUserVA ? (
              isLoading ? (
                <CircularProgress />
              ) : (
                <button
                  className="btn-jobs"
                  onClick={handleApplyJob}
                  disabled={!userApplied ? false : true}
                >
                  {!userApplied ? "Apply for this job" : "Applied"}
                </button>
              )
            ) : (
              <button className="btn-jobs" onClick={handleSignUp}>
                Login to apply for this job
              </button>
            )}

            <p>
              Application Deadline: <span>{finalDateEnd}</span>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default ChosenJob;
