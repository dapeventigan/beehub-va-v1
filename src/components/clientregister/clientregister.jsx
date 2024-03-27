import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PhoneInput from "react-phone-input-2";
import { IoClose } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import ReCAPTCHA from "react-google-recaptcha";
/* Google Sign in */
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import "./clientregister.css";
import "react-phone-input-2/lib/style.css";

function ClientRegister({ btnClass, btnTitle }) {
  //Popup Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => toggleClose();
  const navigate = useNavigate();

  const toggleClose = () => {
    setMessagePass("");
    setOpen(false);
    setGoogleSignStatus(false);
    setSelectedOption("");
    setFname("");
    setLname("");
    setCompanyName("");
    setMobileNumber("");
    setIndustry("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setHearAbout("");
    setIsEmailChecked(false);
    setIsTermsChecked(false);
    setCapVal(null);
    setDivStatus(true);
    setIsLoading(false);
  };

  //form details
  const [selectedOption, setSelectedOption] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hearAbout, setHearAbout] = useState("");
  const [othersOption, setOthersOption] = useState("");
  const roleStatus = "client";

  //google sign in

  const [googleSignStatus, setGoogleSignStatus] = useState("");
  const [googleFname, setGoogleFname] = useState("");
  const [googleLname, setGoogleLname] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");

  //reCAPTCHA
  const [capVal, setCapVal] = useState(null);

  //PASSWORD
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleCornfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [messagePass, setMessagePass] = useState("");

  //What to Do
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  //What to Do
  const handleAboutChange = (e) => {
    setHearAbout(e.target.value);
  };

  //MOBILE NUMBER
  const handleMobileChange = (value) => {
    setMobileNumber(value);
  };

  //Promotional Email Checkbox
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const handleEmailCheckboxChange = () => {
    setIsEmailChecked(!isEmailChecked);
  };

  //Terms and Condition Checkbox
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const handleTermsCheckboxChange = () => {
    setIsTermsChecked(!isTermsChecked);
  };
  
  //Loading spinner
  const [isLoading, setIsLoading] = useState(false);
  const [divStatus, setDivStatus] = useState(true);

  //SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (googleSignStatus === true) {
      const formData = new FormData();

      formData.append("selectedOption", selectedOption);
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("company", companyName);
      formData.append("mobileNumber", mobileNumber);
      formData.append("industry", industry);
      formData.append("email", email);
      formData.append("hearAbout", hearAbout);
      formData.append("othersOption", othersOption);
      formData.append("emailSubscribe", isEmailChecked);
      formData.append("googleVerified", googleSignStatus);
      formData.append("roleStatus", roleStatus);
      setDivStatus(false);
      setIsLoading(true);
      await Axios.post(`${process.env.REACT_APP_BASE_URL}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        setIsLoading(false);

        if (res.data.message === "Email Already Exist!") {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setGoogleSignStatus(false);
          setDivStatus(true);
          setMessagePass(
            "Google email already exist! Please use another email."
          );
        } else {
          setIsLoading(false);
          navigate("/profile-beehub");
          // socket.emit("new_user", {
          //   message: `${fname} is joining using ${email}.`,
          // });
          // setIsSubmitLoading(true);
        }
      });
    } else {
      if (password !== confirmPassword) {
        setMessagePass("Password doesn't match.");
      } else if (!/[A-Z]/.test(password)) {
        setMessagePass("Password must contain at least one uppercase letter.");
      } else if (!/\d/.test(password)) {
        setMessagePass("Password must contain at least one number.");
      } else if (!/[!@#$%^&*]/.test(password)) {
        setMessagePass(
          "Password must contain at least one special character (!@#$%^&*)."
        );
      } else if (password.length < 8) {
        setMessagePass("Password must be at least 8 characters long.");
      } else {
        setMessagePass("");

        const formData = new FormData();

        formData.append("selectedOption", selectedOption);
        formData.append("fname", fname);
        formData.append("lname", lname);
        formData.append("company", companyName);
        formData.append("mobileNumber", mobileNumber);
        formData.append("industry", industry);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("hearAbout", hearAbout);
        formData.append("othersOption", othersOption);
        formData.append("emailSubscribe", isEmailChecked);
        formData.append("roleStatus", roleStatus);
        setDivStatus(false);
        setIsLoading(true);
        await Axios.post(
          `${process.env.REACT_APP_BASE_URL}/register`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        ).then((res) => {
          setIsLoading(false);
          if (res.data.message === "Email Already Exist!") {
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setDivStatus(true);
            setMessagePass("Email already exist! Please use another email.");
          } else {
            // socket.emit("new_user", {
            //   message: `${fname} is joining using ${email}.`,
            // });
            // setIsSubmitLoading(true);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (googleSignStatus === true) {
      setFname(googleFname);
      setLname(googleLname);
      setEmail(googleEmail);
    } else {
      setGoogleSignStatus(false);
      setGoogleFname("");
      setGoogleLname("");
      setGoogleEmail("");
    }
  }, [googleSignStatus]);

  return (
    <>
      <div className={btnClass} onClick={handleOpen}>
        {btnTitle}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          data-aos="fade"
          data-aos-once="true"
        >
          <Box className={!divStatus && !isLoading ? "modal__clientregister_submit-status" : "modal__clientregister"}>
            {isLoading ? (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : (
              <></>
            )}
            <div className="exit__button">
              <IoClose size={25} onClick={toggleClose} />
            </div>

            {isLoading ? (
              <></>
            ) : (
              <div
                className={
                  !divStatus ? "hide__registerdiv" : "clientregister__container"
                }
              >
                <div className="registerbox__container">
                  <div className="registerformbox__container">
                    <h1>Get Started</h1>

                    <form onSubmit={handleSubmit}>
                      <div className="choose__register">
                        <p>Choose what you want to do first:</p>
                        <div>
                          <select
                            id="register-dropdown"
                            value={selectedOption}
                            onChange={handleSelectChange}
                            className="clientregisterdropdown__con"
                            required
                          >
                            <option value="" disabled selected>
                              What do you want to do?
                            </option>
                            <option value="Hire">Hire VAs</option>
                            <option value="PostJob">Post a Job</option>
                            <option value="PDFPresentation">
                              Get a PDF Presentation
                            </option>
                          </select>
                        </div>
                      </div>

                      <div
                        className={
                          selectedOption
                            ? "clientregisterform__container"
                            : "clientregisterform__container-disabled"
                        }
                      >
                        <div className="horizontal-line"></div>

                        <div
                          className={
                            !googleSignStatus
                              ? "google__register"
                              : "hide__registerdiv"
                          }
                        >
                          <GoogleLogin
                            onSuccess={(credentialResponse) => {
                              var credentialDecoded = jwtDecode(
                                credentialResponse.credential
                              );
                              setGoogleSignStatus(
                                credentialDecoded.email_verified
                              );
                              setGoogleEmail(credentialDecoded.email);
                              setGoogleFname(credentialDecoded.given_name);
                              setGoogleLname(credentialDecoded.family_name);
                            }}
                            onError={() => {
                              console.log("Login Failed");
                            }}
                            size="large"
                            text="continue_with"
                            width="280"
                            disabled={true}
                          />

                          <p>or</p>
                        </div>

                        <div
                          className={
                            !googleSignStatus
                              ? "hide__registerdiv"
                              : "google__register"
                          }
                        >
                          <FcGoogle size={40} />
                          <p>
                            You have been successfully signed in using Google.
                            Please fill out the remaining information.
                          </p>
                        </div>

                        <div className="form__row">
                          <div className="clientregisterinput__container">
                            <input
                              className="clientregisterinput__form"
                              type="text"
                              onChange={(e) => setFname(e.target.value)}
                              value={fname}
                              placeholder="First Name"
                              required
                              disabled={!selectedOption}
                            />
                          </div>

                          <div className="clientregisterinput__container">
                            <input
                              className="clientregisterinput__form"
                              type="text"
                              onChange={(e) => setLname(e.target.value)}
                              value={lname}
                              placeholder="Last Name"
                              required
                              disabled={!selectedOption}
                            />
                          </div>
                        </div>

                        <div className="clientregisterinput__container">
                          <input
                            className="clientregisterinput__form"
                            type="text"
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="What is the name of your Company?"
                            required
                            disabled={!selectedOption}
                          />
                        </div>

                        <div className="clientregisterinput__con">
                          <PhoneInput
                            country={"us"}
                            value={mobileNumber}
                            inputProps={{ required: true }}
                            name="mobilenum"
                            onChange={handleMobileChange}
                            inputStyle={{
                              border: "1px solid #f8f8f8",
                              backgroundColor: "#f8f8f8",
                            }}
                            containerStyle={{
                              height: "3rem",
                              padding: "15px 0px 15px 0.5rem",
                              borderRadius: "7px",
                              border: "1.5px solid #353640",
                              backgroundColor: "#f8f8f8",
                              display: "flex",
                              alignItems: "center",
                            }}
                            buttonStyle={{
                              border: "1px solid #f8f8f8",
                            }}
                            required
                            disabled={!selectedOption}
                          />
                        </div>

                        <div className="clientregisterinput__container">
                          <input
                            className="clientregisterinput__form"
                            type="text"
                            onChange={(e) => setIndustry(e.target.value)}
                            placeholder="What Industry are you in?"
                            required
                            disabled={!selectedOption}
                          />
                        </div>

                        <div className="clientregisterinput__container">
                          <input
                            className="clientregisterinput__form"
                            type="email"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            readOnly={googleSignStatus}
                            disabled={!selectedOption}
                          />
                        </div>

                        <div
                          className={
                            !googleSignStatus
                              ? "clientregisterinput__con"
                              : "hide__registerdiv"
                          }
                        >
                          <div className="password-container">
                            <input
                              className="logininputpass__form "
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter Password"
                              disabled={!selectedOption}
                              required={!googleSignStatus}
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

                        <div
                          className={
                            !googleSignStatus
                              ? "clientregisterinput__con"
                              : "hide__registerdiv"
                          }
                        >
                          <div className="password-container">
                            <input
                              className="logininputpass__form "
                              type={showConfirmPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              placeholder="Confirm Password"
                              disabled={!selectedOption}
                              required={!googleSignStatus}
                            />
                            <button
                              type="button"
                              onClick={toggleCornfirmPasswordVisibility}
                              className="password-toggle"
                            >
                              {showConfirmPassword ? (
                                <AiOutlineEye />
                              ) : (
                                <AiOutlineEyeInvisible />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <select
                            id="dropdown"
                            value={hearAbout}
                            onChange={handleAboutChange}
                            disabled={!selectedOption}
                            className="clientregisterdropdown__con"
                            required
                          >
                            <option value="" disabled selected>
                              Where did you hear about us?
                            </option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Facebook">Google</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Friends">Friends/Colleagues</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>

                        <div
                          className={
                            hearAbout === "Others"
                              ? "clientregisterothers__container"
                              : "hide__registerdiv"
                          }
                        >
                          <input
                            className="clientregisterinput__form"
                            type="text"
                            onChange={(e) => setOthersOption(e.target.value)}
                            placeholder="If others, please specify"
                            required={hearAbout === "Others"}
                            disabled={!selectedOption}
                          />
                        </div>

                        <div className="horizontal-line"></div>

                        <div className="clientregisterinput__con">
                          <label>
                            <input
                              className="clientregistercheckbox__form"
                              type="checkbox"
                              checked={isEmailChecked}
                              onChange={handleEmailCheckboxChange}
                              disabled={!selectedOption}
                            />
                            Send me promotional emails.
                          </label>
                        </div>

                        <div className="clientregisterinput__con">
                          <label>
                            <input
                              className="clientregistercheckbox__form"
                              type="checkbox"
                              checked={isTermsChecked}
                              onChange={handleTermsCheckboxChange}
                              required
                              disabled={!selectedOption}
                            />
                            I agree to the{" "}
                            <a href="#" className="terms-link">
                              Terms and Conditions
                            </a>{" "}
                            and{" "}
                            <a href="#" className="terms-link">
                              Privacy Policy
                            </a>
                            .
                          </label>
                        </div>
                        <ReCAPTCHA
                          className="recaptcha-button"
                          sitekey="6LcoO1opAAAAAFpjXKglTWLRDBsp-2HKtSXo4UjZ"
                          onChange={(value) => setCapVal(value)}
                        />

                        <p className="clientregister__errorMsg">
                          {messagePass}
                        </p>
                        <div className="clientregister__buttons">
                          <button
                            className="cancel-btn btn-primary"
                            onClick={toggleClose}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-primary"
                            disabled={capVal ? false : true}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="registerwhyhire__container">
                    <h1>WHY WORK WITH US</h1>
                    <p>
                      Partnering with BeeHub Virtual Assistants Co. can simplify
                      operations, reduce administrative burdens, and contribute
                      to increased overall efficiency for your businesses.
                    </p>
                    <p>
                      Streamlined Processes. We handle all aspects of staffing,
                      from recruitment to onboarding, payroll, and ongoing
                      management.
                    </p>
                    <p>
                      Streamlined Communication and Management: Working with a
                      single provider for multiple services simplifies
                      communication and project management. It eliminates the
                      need to coordinate with multiple vendors, leading to more
                      efficient operations and better outcomes.
                    </p>
                    <p>
                      Time and cost savings. Our services can significantly
                      reduce overhead costs by outsourcing HR, payroll, and
                      administrative tasks, freeing up time for business leaders
                      to focus on core activities and strategic goals.
                    </p>
                    <p>
                      Diverse talent pool and expertise in various industries.
                      We provide clients with access to a wide range of skills
                      and experience. This ensures that businesses can find the
                      right candidates with the specific skills and expertise
                      they need, regardless of geographical boundaries.
                    </p>
                    <p>
                      Centralized Management Approach. We facilitate better
                      coordination and communication, ensuring smooth
                      collaboration between clients and virtual staff.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div
              className={
                !divStatus && !isLoading
                  ? "submit__status"
                  : "hide__registerdiv"
              }
            >
              <div className="submitstatus__content">
                <h1>Your registration is almost complete!</h1>
                <p>
                  We've sent a verification link to you email. Kindly check and
                  verify your email.
                </p>
              </div>

              <button className="btn btn-primary" onClick={toggleClose}>
                Continue
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default ClientRegister;
