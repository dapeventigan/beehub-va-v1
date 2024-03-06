import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Button from "@mui/material/Button";
import DataTable from "react-data-table-component";
import vaLogo from "../../../assets/navlogo.png";
import ContactUser from "./contactuser/contactuser";
import AdminEditJob from "./editjobpost/admineditjob";
import AdminDeleteJob from "./deletejobpost/admindeletejob";
import AdminViewJob from "./viewjobpost/adminviewjob";
import AdminNavbar from "../../../components/navbar/adminnavbar/adminnavbar";
import AdminCloseJob from "./closejobpost/adminclosejobpost";

import "./dashboard.css";

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

const Dashboard = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [applyUsers, setApplyUsers] = useState([]);
  const [joinUsers, setJoinUsers] = useState([]);
  const [archiveUsers, setArchiveUsers] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  const [unhireReqData, setUnhireReqData] = useState([]);

  const buttonStyle = {
    backgroundColor: "#111111",
    color: "white",
    borderRadius: 1,
    "&:hover": {
      backgroundColor: "#202020",
    },
  };

  const buttonStyleRed = {
    backgroundColor: "#ca4c4c",
    color: "white",
    borderRadius: 1,
    "&:hover": {
      backgroundColor: "#ec2929",
    },
  };

  const handleUserVerification = async (e, userID) => {
    e.preventDefault();
    await Axios.put("https://server.beehubvas.com/verifyUserForJob", {
      userID: userID,
    }).then((res) => {
      if (res.data.valid === true) {
        window.location.reload();
      } else {
        alert("Error verifying user");
      }
    });
  };

  const handleCancelUnhire = async (id) => {
    await Axios.put("https://server.beehubvas.com/adminUnhire", {
      id: id,
      action: "Active",
    }).then((res) => {
      if (res.data.valid === true) {
        window.location.reload();
      } else {
        window.location.reload();
      }
    });
  };

  const handleAcceptUnhire = async (id) => {
    await Axios.put("https://server.beehubvas.com/adminUnhire", {
      id: id,
      action: "Unhired",
    }).then((res) => {
      if (res.data.valid === true) {
        window.location.reload();
      } else {
        window.location.reload();
      }
    });
  };

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("https://server.beehubvas.com/admindashboard").then((res) => {
      if (res.data !== "User not found") {
        setUserDetails(res.data);
      } else {
        navigate("/");
      }
    });
  }, [navigate]);

  useEffect(() => {
    // socket.on("senduser_admin", (data) => {
    //   window.location.reload();
    // });
    Axios.get("https://server.beehubvas.com/getUnverifiedUsers").then((res) => {
      try {
        setApplyUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    });

    Axios.get("https://server.beehubvas.com/getJoinUsers").then((res) => {
      try {
        setJoinUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    });

    Axios.get("https://server.beehubvas.com/getArchiveUsers").then((res) => {
      try {
        setArchiveUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    });

    Axios.get("https://server.beehubvas.com/getPendingJobData").then((res) => {
      try {
        setPendingJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    });

    Axios.get("https://server.beehubvas.com/getAllJobData").then((res) => {
      try {
        setActiveJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    });

    Axios.get("https://server.beehubvas.com/getUnhireRequest").then((res) => {
      try {
        setUnhireReqData(res.data);
      } catch (error) {
        console.log(error);
      }
    });
  }, [navigate]);

  // socket

  const applycolumns = [
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
    {
      name: "Verification Status",
      selector: (row) => (
        <Button
          sx={buttonStyle}
          onClick={(e) => handleUserVerification(e, row._id)}
        >
          Verify VA
        </Button>
      ),
    },
  ];

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

  //---------------------------------

  const arhivedcolumns = [
    {
      name: "Name",
      selector: (row) => row.fname + " " + row.mname + " " + row.lname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.cityName + ", " + row.stateName,
      sortable: true,
    },
    {
      name: "Looking for",
      selector: (row) => row.selectedValues,
    },
    {
      name: "Previous Role",
      selector: (row) => (row.role === "applyUser" ? "Applied" : "Joined"),
    },
  ];

  const activejobscolumns = [
    {
      name: "Job Posted",
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
      name: "Job Posted by",
      selector: (row) => row.jobPostedBy,
      sortable: true,
    },
    {
      name: "Job Title",
      selector: (row) => row.jobTitle,
      sortable: true,
    },
    {
      name: "Users Applied",
      selector: (row) => row.usersApplied.length,
      sortable: true,
    },
    {
      name: "Application Deadline",
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
    {
      name: "Job Status",
      selector: (row) => row.jobVerified,
      sortable: true,
    },
    {
      name: "Applied Users",
      selector: (row) => (
        <div className="admineditjobbtn__container">
          <AdminViewJob jobData={row} />
        </div>
      ),
    },
    {
      name: "Close Job",
      selector: (row) => (
        <div className="admineditjobbtn__container">
          <AdminCloseJob jobData={row} />
        </div>
      ),
    },
  ];

  const pendingjobscolumns = [
    {
      name: "Job Posted",
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
      name: "Job Title",
      selector: (row) => row.jobTitle,
      sortable: true,
    },
    {
      name: "Salary",
      selector: (row) => row.jobSalary,
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
    {
      name: "Actions for pending jobs",
      selector: (row) => (
        <div className="admineditjobbtn__container">
          <AdminDeleteJob jobData={row} /> <AdminEditJob jobData={row} />
        </div>
      ),
      sortable: true,
    },
  ];

  const unhirecolumns = [
    {
      name: "Requested By",
      selector: (row) => row.clientName,
      sortable: true,
    },
    {
      name: "VA getting Unhired",
      selector: (row) => row.vaName,
      sortable: true,
    },
    {
      name: "Job",
      selector: (row) => row.jobTitle,
      sortable: true,
    },
    {
      name: "Actions for pending jobs",
      selector: (row) => (
        <div className="admineditjobbtn__container">
          <Button
            sx={buttonStyle}
            onClick={() => handleCancelUnhire(row._id)}
          >
            Cancel
          </Button>
          <Button
            sx={buttonStyleRed}
            onClick={() => handleAcceptUnhire(row._id)}
          >
            Unhire
          </Button>
        </div>
      ),
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
                  <h1>Admin Dashboard</h1>
                  <p>
                    Hello {userDetails.fname} {userDetails.lname} , you are
                    logged in using <strong>{userDetails.email}</strong>.
                  </p>
                  <p>
                    {" "}
                    Welcome to BeeHub's Admin Dashboard. If you need any help,
                    please click the bee on the bottom right.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="horizontal-line"></div>

          <div className="datatable__container">
            <h1>Active Jobs</h1>
            <div className="table__container">
              <DataTable
                columns={activejobscolumns}
                data={activeJobs}
                pagination
              />
            </div>
          </div>

          <div className="datatable__container">
            <h1>Pending Jobs</h1>
            <div className="table__container">
              <DataTable
                columns={pendingjobscolumns}
                data={pendingJobs}
                pagination
              />
            </div>
          </div>

          <div className="datatable__container">
            <h1>Unhire Request</h1>
            <div className="table__container">
              <DataTable
                columns={unhirecolumns}
                data={unhireReqData}
                pagination
              />
            </div>
          </div>


          <div className="horizontal-line"></div>

          <div className="datatable__container">
            <h1>Unverified Virtual Assistants</h1>
            <div className="table__container">
              <DataTable columns={applycolumns} data={applyUsers} pagination />
            </div>
          </div>

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

export default Dashboard;
