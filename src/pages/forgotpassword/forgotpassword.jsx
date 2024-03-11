import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import "./forgotpassword.css";

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userID, setUserID] = useState("");
  const [message, setMessage] = useState("");
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setUserID(param.id);
    const fetchData = async () => {
      try {
        const url = `${process.env.REACT_APP_BASE_URL}/reset/${param.id}/${param.token}`;
        const response = await Axios.get(url);

        const responseData = response.data;
        if (responseData.message === "nah") {
          setValidUrl(false);
        } else {
          setValidUrl(true);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setValidUrl(false);
      }
    };

    fetchData();
  }, [param.id, param.token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    //EMAIL AND PASSWORD VALIDATE

    if (newPassword !== confirmPassword) {
      setMessage("Password doesn't match.");
    } else if (!/[A-Z]/.test(newPassword)) {
      setMessage("Password must contain at least one uppercase letter.");
    } else if (!/\d/.test(newPassword)) {
      setMessage("Password must contain at least one number.");
    } else if (!/[!@#$%^&*]/.test(newPassword)) {
      setMessage(
        "Password must contain at least one special character (!@#$%^&*)."
      );
    } else if (newPassword.length < 8) {
      setMessage("Password must be at least 8 characters long.");
    } else {
      setMessage("");

      try {
        const formData = new FormData();

        formData.append("password", newPassword);
        formData.append("userID", userID);
        await Axios.post(`${process.env.REACT_APP_BASE_URL}/resetPassword`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }).then(navigate("/login"));
      } catch (error) {
        setMessage(error.message);
      }
    }
  };

  return (
    <>
      {validUrl ? (
        <div className="login__container">
          <div className="loginmain__container">
            <div className="loginform__container">
              <form onSubmit={handleResetPassword}>
                <div className="logininsideform__container">
                  <h1>Reset your password</h1>
                  <div className="logininput__container">
                    <label htmlFor="password">
                      <strong>Enter New Password</strong>
                    </label>
                    <div className="loginpassword__container">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        name="password"
                        placeholder="Enter New Password"
                        required
                      />
                    </div>
                  </div>
                  <div className="logininput__container">
                    <label htmlFor="password">
                      <strong>Password</strong>
                    </label>
                    <div className="loginpassword__container">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        name="password"
                        placeholder="Verify Password"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="password-toggle"
                      >
                        {showPassword ? (
                          <AiOutlineEye />
                        ) : (
                          <AiOutlineEyeInvisible />
                        )}
                      </button>
                    </div>
                  </div>
                  {message}
                  <div className="loginbutton__container">
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
      ) : (
        <div className="error__container">
          <div className="vaback__container">
            <a href="/">
              <button className="goback__button">
                <FaArrowLeft className="goback__icon" />
                <span className="goback__text">Go back</span>
              </button>
            </a>
          </div>
          <h1 className="error__title">
            Link is broken or already expired. Please try again.
          </h1>
          <h2 className="error__subtitle">
            Please contact Technical Support if you're still experiencing this.
          </h2>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
