import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import JobBoardNavbar from "../../components/navbar/jobboardnavbar/jobboardnavbar";
import { Card, Row, Col, Pagination, Form, FormControl } from "react-bootstrap";
import { MdWork } from "react-icons/md";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";

import Axios from "axios";
import GridLoader from "react-spinners/GridLoader";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import Footer from "../../components/footer/footer";

import "../jobboards/jobboards.css";

const VABoards = () => {
  const [vaData, setVaData] = useState([]);

  // State for pagination and search
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [experienceType, setExperienceType] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(false);

  //params
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchTermFromParams = params.get("search");

  useEffect(() => {
    if (searchTermFromParams) {
      setInputValue(searchTermFromParams);
      setSearchTerm(searchTermFromParams);
    }
  }, [searchTermFromParams]);

  //GOD FILTER
  const filteredJobs = vaData.filter((job) => {
    const jobDate = new Date(job.joinedDate);
    const filterDate = getDateFromChoice(dateFilter);

    return (
      (job.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.industry
          ? job.industry.toLowerCase().includes(searchTerm.toLowerCase())
          : "")) &&
      (selectedType === "" || job.verifiedForJob.toString() === selectedType) &&
      (experienceType === "" || job.education === experienceType) &&
      (!filterDate || jobDate >= filterDate)
    );
  });

  //DATE FILTER
  function getDateFromChoice(choice) {
    const now = new Date();
    switch (choice) {
      case "Past Year":
        now.setFullYear(now.getFullYear() - 1);
        break;
      case "Past Month":
        now.setMonth(now.getMonth() - 1);
        break;
      case "Past Week":
        now.setDate(now.getDate() - 7);
        break;
      case "Past 24 hours":
        now.setDate(now.getDate() - 1);
        break;
      default:
        return null;
    }
    return now;
  }

  // Pagination logic
  const jobsPerPage = 6;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const maxPageNumbersToShow = 5;

  let start = currentPage - Math.floor(maxPageNumbersToShow / 2);
  start = Math.max(start, 1);
  let end = start + maxPageNumbersToShow - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(end - maxPageNumbersToShow + 1, 1);
  } else {
    start = Math.min(start, totalPages - maxPageNumbersToShow + 1);
  }

  useEffect(() => {
    setIsDataLoading(true);
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getVAUsers`).then((res) => {
      setVaData(res.data);
      setIsDataLoading(false);
    });
  }, []);

  return (
    <div>
      <JobBoardNavbar />
      <div className="jobboard__header">
        <h1>Find Virtual Assistants</h1>
        <h4>Thousands of Virtual Assistant are waiting to be deployed.</h4>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima at
          iure accusantium neque corrupti molestias provident dignissimos, quod
          fugit. Molestiae repellendus omnis alias animi libero reprehenderit
          sapiente et at suscipit?
        </p>
      </div>
      <div className="jobboard__container">
        <div className="jobboard__container-all">
          <div className="jobboard__searchnav">
            <HiMiniMagnifyingGlass style={{ marginLeft: "0.8rem" }} />
            <div className="jobboard__searchbar">
              <Form
                inline
                className="mb-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearchTerm(inputValue);
                }}
              >
                <FormControl
                  type="text"
                  placeholder="Search Virtual Assistants..."
                  className="mr-sm-2"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Form>
            </div>
          </div>

          <div className="jobboards__filter-container">
            <Form.Control
              as="select"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="jobboards__filter-select"
            >
              <option value="">Joined Date</option>
              <option value="Past Year">Past Year</option>
              <option value="Past Month">Past Month</option>
              <option value="Past Week">Past Week</option>
              <option value="Past 24 hours">Past 24 hours</option>
            </Form.Control>

            <Form.Control
              as="select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="jobboards__filter-select"
            >
              <option value="">Verification</option>
              <option value="true">Verified</option>
              <option value="false">Unverified</option>
            </Form.Control>

            <Form.Control
              as="select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="jobboards__filter-select"
            >
              <option value="">Employment Status</option>
              <option value="true">Hired</option>
              <option value="false">Unhired</option>
            </Form.Control>

            <Form.Control
              as="select"
              value={experienceType}
              onChange={(e) => setExperienceType(e.target.value)}
              className="jobboards__filter-select"
            >
              <option value="">Education Level</option>
              <option value="High School Diploma">High School Diploma</option>
              <option value="Associate's Degree">Associate's Degree</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="Doctorate (Ph.D. or Ed.D.)">
                Doctorate (Ph.D. or Ed.D.)
              </option>
            </Form.Control>
          </div>

          {isDataLoading ? (
            <GridLoader className="grid-loader" color="#ffd325" />
          ) : (
            <div className="jobboardcard__container">
              {currentJobs.length === 0 ? (
                <h1 className="nojobs__container">No Jobs Found</h1>
              ) : (
                <Row>
                  {currentJobs.map((job) => (
                    <Col md={4} key={job._id}>
                      <Card>
                        <Card.Body className="jobboard__card">
                          <div className="jobcard__first">
                            <div className="jobcard__first-title">
                              <Card.Title className="jobcard__title">
                                {job.fname} {job.lname}
                              </Card.Title>
                              <Card.Text className="jobtype__container">
                                {job.verifiedForJob ? "Verified" : "Unverified"}
                              </Card.Text>
                            </div>
                            <Card.Text className="jobcard__header">
                              <MdWork /> {job.industry}
                            </Card.Text>
                            <Card.Text className="jobcard__header">
                              <RiGraduationCapFill /> {job.education}
                            </Card.Text>
                            <Card.Text className="jobboards__posted-text">
                              <MdOutlineAccessTimeFilled size={17} /> Joined{" "}
                              {new Date(job.joinedDate)
                                .toUTCString()
                                .substring(4, 17)}
                            </Card.Text>
                            <Card.Text style={{ marginTop: "1rem" }}>
                              {/* {truncate(job.jobSummary, 200, job._id)} */}
                            </Card.Text>
                          </div>

                          <div className="jobcard__second">
                            <a
                              href={`https://beehubvas.com/va-bh/${job.fname.toLowerCase()}-${job.lname.toLowerCase()}/${
                                job._id
                              }`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <button className="btn">View Profile</button>
                            </a>
                          </div>
{/* 
                          <div className="jobcard__second">
                            <button className="btn"><AdminHire data={vaData}/></button>
                          </div> */}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}

              <Pagination className="jobboard__pagination">
                {currentPage > 2 && (
                  <Pagination.Item onClick={() => setCurrentPage(1)}>
                    <IoChevronBack
                      style={{ display: "flex", alignItems: "center" }}
                    />
                  </Pagination.Item>
                )}
                {Array.from({ length: totalPages })
                  .slice(start - 1, end)
                  .map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + start === currentPage}
                      onClick={() => setCurrentPage(index + start)}
                      className={
                        index + start === currentPage
                          ? "active-label"
                          : index + start >= 2 && index + start <= 4
                          ? "nonactive-label"
                          : ""
                      }
                      activeLabel=""
                    >
                      {index + start}
                    </Pagination.Item>
                  ))}
                {currentPage < totalPages - 5 && (
                  <Pagination.Item
                    onClick={() => {
                      setCurrentPage(Math.min(currentPage + 5, totalPages));
                    }}
                  >
                    <IoChevronForward
                      style={{ display: "flex", alignItems: "center" }}
                    />
                  </Pagination.Item>
                )}
              </Pagination>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VABoards;
