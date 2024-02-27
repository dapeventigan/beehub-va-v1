import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import DataTable from "react-data-table-component";
import vaLogo from "../../../assets/navlogo.png";
import ContactUser from "./contactuser/contactuser";
import ViewPdf from "../../../components/viewpdf/viewpdf";
import UserNavbar from "../../../components/navbar/usernavbar/usernavbar";
import AdminEditJob from "./editjobpost/admineditjob";
import AdminDeleteJob from "./deletejobpost/admindeletejob";

import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [applyUsers, setApplyUsers] = useState([]);
  const [joinUsers, setJoinUsers] = useState([]);
  const [archiveUsers, setArchiveUsers] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);

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
    Axios.get("https://server.beehubvas.com/getApplyUsers").then((res) => {
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

    Axios.get("https://server.beehubvas.com/getJobData").then((res) => {
      try {
        setActiveJobs(res.data);
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
      name: "View Resume",
      selector: (row) => <ViewPdf filename={row.pdfFile} />,
    },
    {
      name: "Contact",
      selector: (row) => <ContactUser userID={row._id} />,
    },
  ];

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
    {
      name: "Contact",
      selector: (row) => <ContactUser userID={row._id} />,
    },
  ];

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
          <AdminDeleteJob jobData={row} />
        </div>
      ),
      sortable: true,
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

  return (
    <div className="dashboard-container">
      <UserNavbar userData={userDetails} />
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
              <DataTable columns={activejobscolumns} data={activeJobs} />
            </div>
          </div>

          <div className="datatable__container">
            <h1>Pending Jobs</h1>
            <div className="table__container">
              <DataTable columns={pendingjobscolumns} data={pendingJobs} />
            </div>
          </div>

          <div className="horizontal-line"></div>

          <div className="datatable__container">
            <h1>Virtual Assistants</h1>
            <div className="table__container">
              <DataTable columns={applycolumns} data={applyUsers} />
            </div>
          </div>

          <div className="datatable__container">
            <h1>Clients</h1>
            <div className="table__container">
              <DataTable columns={joincolumns} data={joinUsers} />
            </div>
          </div>

          <div className="datatable__container">
            <h1>Archive Accounts</h1>
            <div className="table__container">
              <DataTable columns={arhivedcolumns} data={archiveUsers} />
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
