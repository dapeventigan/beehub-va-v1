import React, { useState, useEffect } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PhoneInput from "react-phone-input-2";
import { IoClose } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import vaLogo from "../../assets/Logo v1/Black And White/black2.png";
import ReCAPTCHA from "react-google-recaptcha";
/* Google Sign in */
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import "./clientregister.css";

function ClientRegister({ btnClass, btnTitle }) {
  //Popup Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => toggleClose();

  const toggleClose = () => {
    setMessagePass("");
    setOpen(false);
    setGoogleSignStatus(false);
    setSelectedOption("");
    setFname("");
    setLname("");
    setMobileNumber("");
    setIndustry("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setHearAbout("");
    setIsEmailChecked(false);
    setIsTermsChecked(false);
    setCapVal(null);
  };

  //form details
  const [selectedOption, setSelectedOption] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hearAbout, setHearAbout] = useState("");
  const [othersOption, setOthersOption] = useState("");

  //google sign in

  const [googleSignStatus, setGoogleSignStatus] = useState("");
  const [googleFname, setGoogleFname] = useState("");
  const [googleLname, setGoogleLname] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");

  //reCAPTCHA
  const [capVal, setCapVal] = useState(null);
  console.log(capVal);

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
  const [isLoading, setIsLoading] = useState(true);

  //SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (googleSignStatus === true) {
      const formData = new FormData();

      formData.append("selectedOption", selectedOption);
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("mobileNumber", mobileNumber);
      formData.append("industry", industry);
      formData.append("email", email);
      formData.append("hearAbout", hearAbout);
      formData.append("othersOption", othersOption);
      formData.append("emailSubscribe", isEmailChecked);
      formData.append("googleVerified", googleSignStatus);

      await Axios.post("http://localhost:3001/joinRegister", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        if (res.data.message === "Email Already Exist!") {
          // setIsErrorSubmitLoading(true);
        } else {
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
        formData.append("mobileNumber", mobileNumber);
        formData.append("industry", industry);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("hearAbout", hearAbout);
        formData.append("othersOption", othersOption);
        formData.append("emailSubscribe", isEmailChecked);
        await Axios.post("http://localhost:3001/joinRegister", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
          if (res.data.message === "Email Already Exist!") {
            // setIsErrorSubmitLoading(true);
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

  const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 1000,
    height: 800,
    bgcolor: "background.paper",
    border: "2px solid #bdbdbd",
    borderRadius: "0.5rem",
    boxShadow: 24,
    overflowY: "scroll",
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
          <Box sx={style}>
            <div className="exit__button">
              <IoClose size={25} onClick={toggleClose} />
            </div>
            <div className="clientregister__container">
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
                            console.log(credentialDecoded);
                            console.log(credentialDecoded.email_verified);
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
                          width="400"
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
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        sitekey="6LcoO1opAAAAAFpjXKglTWLRDBsp-2HKtSXo4UjZ"
                        onChange={(value) => setCapVal(value)}
                      />

                      <p className="clientregister__errorMsg">{messagePass}</p>
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
                  <h1>WHY HIRE US</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Inventore culpa perspiciatis officia ut eum, ipsam iusto
                    debitis ipsum esse quisquam aliquid, ullam, quidem doloribus
                    tenetur beatae. Repellendus deleniti, ex tempora molestiae
                    eius at ab praesentium nemo? Numquam, consequuntur amet hic
                    itaque quidem incidunt officiis ad laboriosam sequi quas
                    porro accusamus rem ea nisi ipsum est! Eum qui facilis
                    nostrum. Molestias, temporibus vitae iusto eveniet ratione
                    voluptatem debitis quidem totam soluta, praesentium
                    perferendis tempora? Suscipit nam sunt tenetur cumque
                    debitis. Porro.
                  </p>
                  <img src={vaLogo} alt="" />
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default ClientRegister;
