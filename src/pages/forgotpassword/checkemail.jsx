import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import "./checkemail.css";

const CheckEmail = () => {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCheckEmail = async (e) => {
    e.preventDefault();

    try {
      await Axios.post("http://localhost:3001/getEmail", { email }).then(
        (res) => {
          setErrorMsg(res.data.message);
        }
      );
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="container checkemail__container">
      <div className="checkmain__container">
        <h2>Reset Password</h2>
        <div className="checkform__container">
          <form onSubmit={handleCheckEmail}>
            <div className="logininput__container">
              <label htmlFor="email">
                <strong>Input email</strong>
              </label>
              <input
                className="logininput__form"
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {errorMsg}
            <div className="checkbutton__container">
              <Link to="/login" className="btn btn-primary">
                Cancel
              </Link>
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
