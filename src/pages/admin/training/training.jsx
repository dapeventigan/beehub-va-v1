import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Button from "@mui/material/Button";
import DataTable from "react-data-table-component";
import vaLogo from "../../../assets/navlogo.png";
import AdminNavbar from "../../../components/navbar/adminnavbar/adminnavbar";
import DatePicker from "react-datepicker";
import { MdOutlineCancel } from "react-icons/md";

import "react-datepicker/dist/react-datepicker.css";
import "../dashboard/dashboard.css";
import "./training.css";

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

const AdminTraining = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [vaUsers, setVAUsers] = useState([]);
  const [selectedVA, setSelectedVA] = useState("");
  const [vaName, setVAName] = useState("");
  const [vaCertificate, setVACertificate] = useState("");
  const [trainingTitle, setTrainingTitle] = useState("");
  const [trainingStart, setTrainingStart] = useState("");
  const [trainingEnd, setTrainingEnd] = useState("");

  const handleSelectedVA = (id, fname, lname) => (e) => {
    e.preventDefault();
    setSelectedVA(id);
    setVAName(`${fname} ${lname}`);
  };

  //certificate
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVACertificate(file);
  };

  const handleTrainingSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("vaID", selectedVA);
    formData.append("vaName", vaName);
    formData.append("trainingTitle", trainingTitle);
    formData.append("trainingStart", trainingStart);
    formData.append("trainingEnd", trainingEnd);
    formData.append("certificate", vaCertificate);
    await Axios.post("https://server.beehubvas.com/addTraining", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      if (res.data === "Success") {
        navigate("/admindashboard");
      } else {
        alert("Error adding training");
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

  const handleCancelTraining = () => {
    setSelectedVA("");
    setVAName("");
    setVACertificate("");
    setTrainingTitle("");
    setTrainingStart("");
    setTrainingEnd("");
    window.location.reload();
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
    Axios.get("https://server.beehubvas.com/getVAUsers").then((res) => {
      try {
        setVAUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    });
  }, [navigate]);

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

  return (
    <div className="dashboard-container">
      <AdminNavbar userData={userDetails} />
      <div className="admindashbody__container">
        <div className="admindash__container">
          <div className="admindashheader__container">
            <div className="adminflex__container">
              {userDetails && (
                <div className="dashheader__container">
                  <h1>Add Traning/Course Data for VA</h1>
                  <p>
                    Hello {userDetails.fname} {userDetails.lname} , you are
                    logged in using <strong>{userDetails.email}</strong>.
                  </p>
                  <p>Create a training/course for VA</p>
                </div>
              )}
            </div>
          </div>

          <div className="horizontal-line"></div>
          <div className="admintraining__container">
            <div className="admintraining__form">
              <form onSubmit={handleTrainingSubmit}>
                <div className="vasetting__container">
                  <div className="clientregisterform__container">
                    <h3 style={{margin: "0 auto"}}>Add Training/Course for {vaName}</h3>
                    <div
                      className="clientregisterinput__container"
                      style={
                        selectedVA ? { border: "1px solid #ffd325" } : {}
                      }
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

                    <div className="vasettingform__container">
                      <h4 className="va__label">Training/Course Title</h4>
                      <div className="clientregisterinput__container">
                        <input
                          className="clientregisterinput__form"
                          type="text"
                          onChange={(e) => setTrainingTitle(e.target.value)}
                          value={trainingTitle}
                          placeholder="Training/Course Title"
                          required
                        />
                      </div>
                    </div>

                    <div className="vaform__row">
                      <div className="vasettingform__container">
                        <h4 className="va__label">Training Started</h4>
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
                        <h4 className="va__label">Training Ended</h4>
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
                    <div className="training__buttons">
                      <div className="btn" onClick={handleCancelTraining}>
                        Cancel
                      </div>
                      <button className="btn">Submit</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="horizontal-line"></div>

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

export default AdminTraining;
