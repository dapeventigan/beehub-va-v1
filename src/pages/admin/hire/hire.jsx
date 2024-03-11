import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Button from "@mui/material/Button";
import DataTable from "react-data-table-component";
import vaLogo from "../../../assets/navlogo.png";
import AdminNavbar from "../../../components/navbar/adminnavbar/adminnavbar";
import AddCustomJob from "../../../components/addcustomjob/addcustomjob";
import { MdOutlineCancel } from "react-icons/md";

import "../dashboard/dashboard.css";
import "./hire.css";

const FilterComponent = ({ onFilter, onClear, filterText }) => (
  <div className="filterdatasearch__container">
    <input
      type="text"
      placeholder="Filter by name"
      value={filterText}
      onChange={onFilter}
      className="filterdatasearch__input"
    />
    <button className="filterdatasearch__button" onClick={onClear}>
      Clear
    </button>
  </div>
);

const AdminHire = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [joinUsers, setJoinUsers] = useState([]);
  const [vaUsers, setVAUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  //SELECTED
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedVA, setSelectedVA] = useState("");
  const [selectedJob, setSelectedJob] = useState("");

  //Name
  const [clientName, setClientName] = useState("");
  const [vaName, setVAName] = useState("");
  const [jobName, setJobName] = useState("");

  //Couple data needed
  const [clientCompany, setClientCompany] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [jobEmploymentType, setJobEmploymentType] = useState("");
  const [jobWorkHours, setJobWorkHours] = useState("");

  const handleSelectedClient = (id, fname, lname, industry) => (e) => {
    e.preventDefault();
    setSelectedClient(id);
    setClientName(`${fname} ${lname}`);
    setClientCompany(industry);
  };

  const handleSelectedVA = (id, fname, lname) => (e) => {
    e.preventDefault();
    setSelectedVA(id);
    setVAName(`${fname} ${lname}`);
  };

  const handleSelectedJob =
    (id, title, salary, employmentType, hours) => (e) => {
      e.preventDefault();
      setSelectedJob(id);
      setJobName(title);
      setJobSalary(salary);
      setJobEmploymentType(employmentType);
      setJobWorkHours(hours);
    };

  const handleCustomJob = (data) => {
    setSelectedJob("CUSTOM__BEEHUB__JOB");
    setJobName(data.jobTitle);
    setJobSalary(data.salary);
    setJobEmploymentType(data.employmentType);
    setJobWorkHours(data.workTime);
  };

  const handleHire = async (e) => {
    e.preventDefault();
    console.log(selectedClient, selectedVA, selectedJob);
    console.log(clientName, vaName, jobName);
    console.log(clientCompany, jobSalary, jobEmploymentType, jobWorkHours);

    const formData = new FormData();
    formData.append("clientID", selectedClient);
    formData.append("clientName", clientName);
    formData.append("clientCompany", clientCompany);
    formData.append("vaID", selectedVA);
    formData.append("vaName", vaName);
    formData.append("jobID", selectedJob);
    formData.append("jobTitle", jobName);
    formData.append("jobSalary", jobSalary);
    formData.append("jobEmploymentType", jobEmploymentType);
    formData.append("jobWorkHours", jobWorkHours);

    await Axios.post(`${process.env.REACT_APP_BASE_URL}/hire`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      if (res.data === "Success") {
        alert("Hired Successfully");
        setSelectedClient("");
        setSelectedVA("");
        setSelectedJob("");
        setClientName("");
        setVAName("");
        setJobName("");
        setClientCompany("");
        setJobSalary("");
        setJobEmploymentType("");
        setJobWorkHours("");
      } else {
        alert("Error: Failed to Hire");
      }
    });
  };

  const buttonStyle = {
    backgroundColor: "#111111",
    color: "white",
    borderRadius: 1,
    "&:hover": {
      backgroundColor: "#202020",
    },
  };

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/admindashboard`).then((res) => {
      if (res.data !== "User not found") {
        setUserDetails(res.data);
      } else {
        navigate("/");
      }
    });
  }, [navigate]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getJoinUsers`).then((res) => {
      try {
        setJoinUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    });

    Axios.get(`${process.env.REACT_APP_BASE_URL}/getVAUsers`).then((res) => {
      try {
        setVAUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    });

    Axios.get(`${process.env.REACT_APP_BASE_URL}/getHireJobData`).then((res) => {
      try {
        setJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    });
  }, [navigate]);

  //CLIENT FILTER---------------

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = joinUsers.filter(
    (item) =>
      item.fname.toLowerCase().includes(filterText.toLowerCase()) ||
      item.lname.toLowerCase().includes(filterText.toLowerCase()) ||
      item.email.toLowerCase().includes(filterText.toLowerCase()) ||
      (item.mobileNumber &&
        item.mobileNumber.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.industry &&
        item.industry.toLowerCase().includes(filterText.toLowerCase()))
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const joincolumns = [
    {
      name: "Select a Client",
      selector: (row) => (
        <Button
          sx={buttonStyle}
          onClick={handleSelectedClient(
            row._id,
            row.fname,
            row.lname,
            row.industry
          )}
        >
          Select Client
        </Button>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.fname + " " + row.lname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: (row) =>
        !row.mobileNumber ? "Not Provided" : "+" + row.mobileNumber,
      sortable: true,
    },
    {
      name: "Industry/Company Name",
      selector: (row) => row.industry,
    },
  ];

  //VA FILTER---------------

  const [filterVAText, setFilterVAText] = useState("");
  const [resetVAPaginationToggle, setResetVAPaginationToggle] = useState(false);

  const filteredVAItems = vaUsers.filter(
    (item) =>
      item.fname.toLowerCase().includes(filterVAText.toLowerCase()) ||
      item.lname.toLowerCase().includes(filterVAText.toLowerCase()) ||
      item.email.toLowerCase().includes(filterVAText.toLowerCase()) ||
      (item.mobileNumber &&
        item.mobileNumber.toLowerCase().includes(filterVAText.toLowerCase())) ||
      (item.industry &&
        item.industry.toLowerCase().includes(filterVAText.toLowerCase()))
  );

  const subHeaderVAComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterVAText) {
        setResetVAPaginationToggle(!resetVAPaginationToggle);
        setFilterVAText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterVAText(e.target.value)}
        onClear={handleClear}
        filterText={filterVAText}
      />
    );
  }, [filterVAText, resetVAPaginationToggle]);

  const vacolumns = [
    {
      name: "Select a Client",
      selector: (row) => (
        <Button
          sx={buttonStyle}
          onClick={handleSelectedVA(row._id, row.fname, row.lname)}
        >
          Select VA
        </Button>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.fname + " " + row.lname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: (row) =>
        !row.mobileNumber ? "Not Provided" : "+" + row.mobileNumber,
      sortable: true,
    },
    {
      name: "Industry/Company Name",
      selector: (row) => row.industry,
    },
    {
      name: "View Profile",
      selector: (row) => (
        <a
          href={`https://beehubvas.com/va-bh/${row.fname.toLowerCase()}-${row.lname.toLowerCase()}/${
            row._id
          }`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button sx={buttonStyle}>View Profile</Button>
        </a>
      ),
    },
  ];

  //JOB FILTER---------------

  const [filterJobText, setFilterJobText] = useState("");
  const [resetJobPaginationToggle, setResetJobPaginationToggle] =
    useState(false);

  const filteredJobItems = jobs.filter(
    (item) =>
      item.jobTitle.toLowerCase().includes(filterJobText.toLowerCase()) ||
      item.jobPostedBy.toLowerCase().includes(filterJobText.toLowerCase())
  );

  const subHeaderJobComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterJobText) {
        setResetJobPaginationToggle(!resetJobPaginationToggle);
        setFilterJobText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterJobText(e.target.value)}
        onClear={handleClear}
        filterText={filterJobText}
      />
    );
  }, [filterJobText, resetJobPaginationToggle]);

  const jobcolumns = [
    {
      name: "Select a Job",
      selector: (row) => (
        <Button
          sx={buttonStyle}
          onClick={handleSelectedJob(
            row._id,
            row.jobTitle,
            row.jobSalary,
            row.jobEmploymentType,
            row.jobHours
          )}
        >
          Select Job
        </Button>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.jobTitle,
      sortable: true,
    },
    {
      name: "Job Posted By",
      selector: (row) => row.jobPostedBy,
      sortable: true,
    },
    {
      name: "Job Posted On",
      selector: (row) => {
        const date =
          row.jobPosted instanceof Date
            ? row.jobPosted
            : new Date(row.jobPosted);
        return date
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
          .replace(",", "");
      },
      sortable: true,
    },
    {
      name: "Job Deadline",
      selector: (row) => {
        const date =
          row.jobPosted instanceof Date
            ? row.jobPosted
            : new Date(row.jobDeadline);
        return date
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
          .replace(",", "");
      },
      sortable: true,
    },
  ];

  return (
    <div className="dashboard-container">
      <AdminNavbar userData={userDetails} />
      <div className="admindashbody__container">
        <div className="admindash__container">
          <div className="admindashheader__container">
            <div className="adminflex__container">
              {userDetails && (
                <div className="dashheader__container">
                  <h1>Hire a VA</h1>
                  <p>
                    Hello {userDetails.fname} {userDetails.lname} , you are
                    logged in using <strong>{userDetails.email}</strong>.
                  </p>
                  <p>Create a new employment</p>
                </div>
              )}
            </div>
          </div>
          <div className="horizontal-line"></div>
          <div className="hireview__container">
            <div className="hireview__input">
              <h4>Step 1: Select a Client</h4>

              <div
                className="clientregisterinput__container"
                style={selectedClient ? { border: "1px solid #ffd325" } : {}}
              >
                <input
                  className="clientregisterinput__form"
                  type="text"
                  placeholder={clientName ? clientName : "Client"}
                  required
                  disabled
                />
                {selectedClient ? (
                  <MdOutlineCancel
                    size={23}
                    onClick={(e) => {
                      e.preventDefault();
                      setClientName("");
                      setSelectedClient("");
                      setClientCompany("");
                    }}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="hireview__input">
              <h4>Step 2: Select a Virtual Assistant</h4>

              <div
                className="clientregisterinput__container"
                style={selectedVA ? { border: "1px solid #ffd325" } : {}}
              >
                <input
                  className="clientregisterinput__form"
                  type="text"
                  placeholder={vaName ? vaName : "Virtual Assistant"}
                  required
                  disabled
                />
                {selectedVA ? (
                  <MdOutlineCancel
                    size={23}
                    onClick={(e) => {
                      e.preventDefault();
                      setVAName("");
                      setSelectedVA("");
                    }}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="hireview__input">
              <h4>Step 3: Select a Job</h4>

              <div
                className="clientregisterinput__container"
                style={selectedJob ? { border: "1px solid #ffd325" } : {}}
              >
                <input
                  className="clientregisterinput__form"
                  type="text"
                  placeholder={jobName ? jobName : "Job"}
                  required
                  disabled
                />
                {selectedJob ? (
                  <MdOutlineCancel
                    size={23}
                    onClick={(e) => {
                      e.preventDefault();
                      setJobName("");
                      setSelectedJob("");
                      setJobSalary("");
                      setJobEmploymentType("");
                      setJobWorkHours("");
                    }}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="hireview__input">
              <h4>Step 4: Click Hire to Finish</h4>
              <div>
                <p>
                  <button
                    className="btn"
                    onClick={handleHire}
                    disabled={
                      selectedClient && selectedJob && selectedVA ? false : true
                    }
                  >
                    Hire
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="horizontal-line"></div>
          {selectedClient ? (
            <></>
          ) : (
            <div className="datatable__container">
              <h1>Clients</h1>
              <div className="table__container">
                <DataTable
                  columns={joincolumns}
                  data={filteredItems}
                  pagination
                  paginationResetDefaultPage={resetPaginationToggle}
                  subHeader
                  subHeaderComponent={subHeaderComponentMemo}
                />
              </div>
            </div>
          )}

          {selectedVA ? (
            <></>
          ) : (
            <div className="datatable__container">
              <h1>Virtual Assistants</h1>
              <div className="table__container">
                <DataTable
                  columns={vacolumns}
                  data={filteredVAItems}
                  pagination
                  paginationResetDefaultPage={resetVAPaginationToggle}
                  subHeader
                  subHeaderComponent={subHeaderVAComponentMemo}
                />
              </div>
            </div>
          )}

          {selectedJob ? (
            <></>
          ) : (
            <div className="datatable__container">
              <div className="profiletable__title">
                <h4>Job Post</h4>
                <AddCustomJob handleCustomJob={handleCustomJob} />
              </div>
              <div className="table__container">
                <DataTable
                  columns={jobcolumns}
                  data={filteredJobItems}
                  pagination
                  paginationResetDefaultPage={resetJobPaginationToggle}
                  subHeader
                  subHeaderComponent={subHeaderJobComponentMemo}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sticky__button">
        <a href="https://m.me/trashdape" target="_blank" rel="noreferrer">
          <img src={vaLogo} alt="" />
        </a>
      </div>
    </div>
  );
};

export default AdminHire;
