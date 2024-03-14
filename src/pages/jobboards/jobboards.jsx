import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import JobBoardNavbar from "../../components/navbar/jobboardnavbar/jobboardnavbar";
import { Card, Row, Col, Pagination, Form, FormControl } from "react-bootstrap";
import { formatDistanceToNow, set } from "date-fns";
import { MdWork } from "react-icons/md";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import Axios from "axios";
import GridLoader from "react-spinners/GridLoader";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import Footer from "../../components/footer/footer";

import "./jobboards.css";

const JobBoards = () => {
  // const [jobData, setJobData] = useState([]);

  // // State for pagination and search
  // const [currentPage, setCurrentPage] = useState(1);
  // const [inputValue, setInputValue] = useState("");
  // const [searchTerm, setSearchTerm] = useState("");
  // const [selectedType, setSelectedType] = useState("");
  // const [experienceType, setExperienceType] = useState("");
  // const [dateFilter, setDateFilter] = useState("");
  // const [isDataLoading, setIsDataLoading] = useState(false);

  // //params
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const searchTermFromParams = params.get("search");

  // useEffect(() => {
  //   if (searchTermFromParams) {
  //     setInputValue(searchTermFromParams);
  //     setSearchTerm(searchTermFromParams);
  //   }
  // }, [searchTermFromParams]);

  // //GOD FILTER
  // const filteredJobs = jobData.filter((job) => {
  //   const jobDate = new Date(job.jobPosted);
  //   const filterDate = getDateFromChoice(dateFilter);

  //   return (
  //     job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     (selectedType === "" || job.jobEmploymentType === selectedType) &&
  //     (experienceType === "" || job.jobLevelExperience === experienceType) &&
  //     (!filterDate || jobDate >= filterDate)
  //   );
  // });
  // //DATE FILTER
  // function getDateFromChoice(choice) {
  //   const now = new Date();
  //   switch (choice) {
  //     case "Past Month":
  //       now.setMonth(now.getMonth() - 1);
  //       break;
  //     case "Past Week":
  //       now.setDate(now.getDate() - 7);
  //       break;
  //     case "Past 24 hours":
  //       now.setDate(now.getDate() - 1);
  //       break;
  //     default:
  //       return null;
  //   }
  //   return now;
  // }

  // //SEE MORE
  // function truncate(str, num, id) {
  //   if (str.length <= num) {
  //     return str;
  //   }
  //   return (
  //     <span>
  //       {str.slice(0, num)}
  //       <a
  //         href={`https://beehubvas.com/job-boards/bh/${id}`}
  //         target="_blank"
  //         rel="noreferrer"
  //       >
  //         ...see more
  //       </a>
  //     </span>
  //   );
  // }

  // // Pagination logic
  // const jobsPerPage = 6;
  // const indexOfLastJob = currentPage * jobsPerPage;
  // const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  // const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  // const maxPageNumbersToShow = 5;

  // let start = currentPage - Math.floor(maxPageNumbersToShow / 2);
  // start = Math.max(start, 1);
  // let end = start + maxPageNumbersToShow - 1;

  // if (end > totalPages) {
  //   end = totalPages;
  //   start = Math.max(end - maxPageNumbersToShow + 1, 1);
  // } else {
  //   start = Math.min(start, totalPages - maxPageNumbersToShow + 1);
  // }

  // useEffect(() => {
  //   setIsDataLoading(true);
  //   Axios.get(`${process.env.REACT_APP_BASE_URL}/getJobData`).then((res) => {
  //     setJobData(res.data);
  //     setIsDataLoading(false);
  //   });
  // }, []);

  return (
    <div>
      <JobBoardNavbar />
      <div className="manatal__container">
        <iframe
          className="manatal__iframe"
          src="https://www.careers-page.com/beehub-virtual-assistants-co"
        ></iframe>
      </div>

      {/* <div className="jobboard__header">
        <h1>
          Find your <span>new Remote Job</span> today!
        </h1>
        <h4>Thousands of Virtual Assistant Jobs are waiting for you.</h4>
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
                  placeholder="Search jobs..."
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
              <option value="">Any time</option>
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
              <option value="">Employment Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </Form.Control>

            <Form.Control
              as="select"
              value={experienceType}
              onChange={(e) => setExperienceType(e.target.value)}
              className="jobboards__filter-select"
            >
              <option value="">Experience Level</option>
              <option value="Entry-level">Entry-level</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior-level">Senior-level</option>
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
                                {job.jobTitle}
                              </Card.Title>
                              <Card.Text className="jobtype__container">
                                {job.jobEmploymentType}
                              </Card.Text>
                            </div>
                            <Card.Text className="jobcard__header">
                              <MdWork /> {job.jobSalary} •{" "}
                              {job.jobLevelExperience}
                            </Card.Text>
                            <Card.Text className="jobboards__posted-text">
                              <MdOutlineAccessTimeFilled size={17} /> Posted{" "}
                              {formatDistanceToNow(job.jobPosted)} ago
                            </Card.Text>
                            <Card.Text style={{ marginTop: "1rem" }}>
                              {truncate(job.jobSummary, 200, job._id)}
                            </Card.Text>
                          </div>

                          <div className="jobcard__second">
                            <a
                              href={`https://beehubvas.com/job-boards/bh/${job._id}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <button className="btn">View Job</button>
                            </a>
                          </div>
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
      </div>*/}
      <Footer />
    </div>
  );
};

export default JobBoards;
