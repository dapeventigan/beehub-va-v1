import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { FaArrowLeft } from "react-icons/fa";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";


import "react-phone-input-2/lib/style.css";

const InitalJoinRegister = () => {
  const navigate = useNavigate();
  // VALUES
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mname, setMname] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [streetAdd, setStreetAdd] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);

  //MOBILE NUMBER

  const handleMobileChange = (value) => {
    setMobileNumber(value);
  };

  // CHECKBOX
  const options = [
    { label: "Data Entry", value: "Data Entry" },
    { label: "Video Editing", value: "Video Editing" },
    { label: "Appointment Setter", value: "Appointment Setter" },
  ];

  //Loading spinner
  const [isLoading, setIsLoading] = useState(false);
  const [isSumbitLoading, setIsSubmitLoading] = useState(false);
  const [isErrorSumbitLoading, setIsErrorSubmitLoading] = useState(false);
  const handleClose = () => {
    setIsSubmitLoading(false);
    navigate("/");
  };

  const handleErrorClose = () => {
    setIsErrorSubmitLoading(false);
    window.location.reload();
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;

    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((item) => item !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  //Submit Button
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("mname", mname);
    formData.append("mobileNumber", mobileNumber);
    formData.append("streetAdd", streetAdd);
    formData.append("cityName", cityName);
    formData.append("stateName", stateName);
    formData.append("zipCode", zipCode);
    formData.append("email", email);
    formData.append("selectedValues", selectedValues);
    setIsLoading(true);
    await Axios.post("https://server.beehubvas.com/joinRegister", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setIsLoading(false);
      if (res.data.message === "Email Already Exist!") {
        setIsErrorSubmitLoading(true);
      } else {
        // socket.emit("new_user", {
        //   message: `${fname} is joining using ${email}.`,
        // });
        // setIsSubmitLoading(true);
      }
    });
  };

  const boxStyle = {
    position: "absolute",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "20px",
    maxHeight: "60vh",
    overflowY: "auto",
  };

  const buttonStyle = {
    backgroundColor: "#111111",
    color: "white",
    borderRadius: 2,
    "&:hover": {
      backgroundColor: "#202020",
    },
  };

  return (
    <div className="applyregister__container">
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <></>
      )}

      <Modal
        open={isSumbitLoading}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle} className="box__container">
          <div className="submit__container">
            <h1>
              Thank you for joining the BeeHub Virtual Assistant Co. Experience!
            </h1>
            <p>We have sent an email. Kindly check your inbox!</p>
            <p>If you can't see our email, check your spam folder.</p>
            <p>Thank you!</p>
            <Button sx={buttonStyle} onClick={handleClose}>
              Go Back to Home Page
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={isErrorSumbitLoading}
        onClose={handleErrorClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle} className="box__container">
          <div className="submit__container">
            <h1>You have already joined using this email</h1>
            <p>
              You already have submitted a form looking for virtual assistants
              using <strong>{email}</strong>. Check your email if you have been
              contacted by the BeeHub Team.
            </p>
            <p>
              If you want to look for another virtual assistant or if you have
              any concerns, you can email us at{" "}
              <strong>beehubvirtualassistant@gmail.com</strong>. Thank you!
            </p>
            <Button sx={buttonStyle} onClick={handleErrorClose}>
              Go back
            </Button>
          </div>
        </Box>
      </Modal>

      <div className="main__container">
        <div className="goback__container">
          <a href="/">
            <button className="goback__button">
              <FaArrowLeft className="goback__icon" />
              <span className="goback__text">Go back</span>
            </button>
          </a>
        </div>
        <div className="form__container">
          {/* INFORMATION */}
          <form onSubmit={handleSubmit}>
            <div className="insideform__container">
              <h2>Information</h2>
              <div className="merge__container">
                <div className="input__container">
                  <label htmlFor="fname">
                    <strong>First Name</strong>
                  </label>
                  <input
                    className="input__form"
                    type="text"
                    name="fname"
                    onChange={(e) => setFname(e.target.value)}
                    required
                  />
                </div>

                <div className="input__container">
                  <label htmlFor="lname">
                    <strong>Last Name</strong>
                  </label>
                  <input
                    className="input__form"
                    type="text"
                    name="lname"
                    onChange={(e) => setLname(e.target.value)}
                    required
                  />
                </div>

                <div className="input__container">
                  <label htmlFor="mname">
                    <strong>M.I</strong>
                  </label>
                  <input
                    className="input__form mname"
                    type="text"
                    name="mname"
                    onChange={(e) => setMname(e.target.value)}
                  />
                </div>
              </div>

              <div className="input__container">
                <label htmlFor="email">
                  <strong>Email</strong>
                </label>
                <input
                  className="input__form"
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input__container">
                <label htmlFor="mobilenum">
                  <strong>Mobile Number</strong>

                  <PhoneInput
                    country={"ph"}
                    value={mobileNumber}
                    inputProps={{ required: true }}
                    name="mobilenum"
                    onChange={handleMobileChange}
                    inputStyle={{
                      maxWidth: "85%",
                    }}
                  />
                </label>
              </div>
              {/* ADDRESS */}
              <h2>Address</h2>

              <div className="input__container">
                <label htmlFor="streetadd">
                  <strong>Street Address</strong>
                </label>
                <input
                  className="input__form"
                  type="text"
                  placeholder="Enter Street Address"
                  autoComplete="auto"
                  name="streetadd"
                  onChange={(e) => setStreetAdd(e.target.value)}
                  required
                />
              </div>
              <div className="merge__container">
                <div className="input__container">
                  <label htmlFor="cityname">
                    <strong>City</strong>
                  </label>
                  <input
                    className="input__form"
                    type="text"
                    placeholder="Enter City"
                    name="cityname"
                    onChange={(e) => setCityName(e.target.value)}
                  />
                </div>

                <div className="input__container">
                  <label htmlFor="statename">
                    <strong>State</strong>
                  </label>
                  <input
                    className="input__form"
                    type="text"
                    placeholder="Enter State"
                    name="statename"
                    onChange={(e) => setStateName(e.target.value)}
                    required
                  />
                </div>

                <div className="input__container">
                  <label htmlFor="zipcode">
                    <strong>Zip Code</strong>
                  </label>
                  <input
                    className="input__form zipcode"
                    type="text"
                    name="zipcode"
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* VA POSITIONS */}
              <h2>Available Virtual Assistants</h2>
              <p>Assistant you're looking for</p>
              <div className="roles__container">
                {options.map((option) => (
                  <label key={option.value} htmlFor="checkboxname">
                    <input
                      className="roles__checkbox"
                      type="checkbox"
                      value={option.value}
                      checked={selectedValues.includes(option.value)}
                      onChange={handleCheckboxChange}
                      name="checkboxname"
                    />
                    {option.label}
                  </label>
                ))}
              </div>

              <div className="button__container">
                <Link to="/" className="btn btn-primary">
                  Cancel
                </Link>
                <button className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InitalJoinRegister;
