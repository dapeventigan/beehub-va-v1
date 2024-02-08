import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PhoneInput from "react-phone-input-2";
import { IoClose } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import vaLogo from "../../assets/Logo v1/Black And White/black2.png";
/* Google Sign in */
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import ReCAPTCHA from "react-google-recaptcha";

import "./varegister.css";
function VaRegister({ btnClass, btnTitle }) {
  //Popup Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => toggleClose();
  const navigate = useNavigate();

  const toggleClose = () => {
    setMessagePass("");
    setOpen(false);
    setGoogleSignStatus(false);
    setFname("");
    setLname("");
    setMobileNumber("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsEmailChecked(false);
    setIsTermsChecked(false);
    setCapVal(null);
    setDivStatus(true);
    setIsLoading(false);
  };

  //form details
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [skills, setSkills] = useState([]);
  const roleStatus = "virtualassistant";

  //MOBILE NUMBER
  const handleMobileChange = (value) => {
    setMobileNumber(value);
  };

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

  //RESUME PARSER VALUES
  const apiUrl = "https://api.apilayer.com/resume_parser/upload";
  const apiKey = "kGkRkLNdq7343NZwxNk1kdOKlc7RNMEf";
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  //RESUME PARSER
  useEffect(() => {
    const uploadResume = async () => {
      try {
        if (!selectedFile) {
          return;
        }

        setIsLoading(true);
        const fileData = await Axios.get(URL.createObjectURL(selectedFile), {
          responseType: "arraybuffer",
        });

        const response = await Axios.post(apiUrl, fileData.data, {
          headers: {
            "Content-Type": "application/octet-stream",
            apikey: apiKey,
          },
        });

        setIsLoading(false);

        setSkills(response.data.skills);
        const parsedName = response.data.name.split(" ");
        setFname(parsedName[0] || ""); // First name
        const lastName = parsedName.slice(-1).join(" ");
        setLname(lastName); // Last name
        setEmail(response.data.email || "");
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    uploadResume();
  }, [apiUrl, apiKey, selectedFile]);

  //geolocation
  const [fromPH, setFromPH] = useState(false);

  const getUserIP = async () => {
    try {
      await Axios.get("https://api.ipify.org/?format=json").then(
        async (res) => {
          const ipInfoResponse = await Axios.get(
            `https://ipinfo.io/${res.data.ip}/json?token=d5ba9203c3bd20`
          );

          console.log(ipInfoResponse.data.country);

          if (ipInfoResponse.data.country === "PH") {
            setFromPH(true);
          } else {
            setFromPH(false);
          }
        }
      );
    } catch (error) {
      console.error("Error fetching IP address or location information", error);
    }
  };

  useEffect(() => {
    getUserIP();
  }, []);
  console.log(fromPH);

  //SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (googleSignStatus === true) {
      const formData = new FormData();

      formData.append("pdfFile", selectedFile);
      formData.append("fname", fname);
      formData.append("lname", lname);
      formData.append("mobileNumber", mobileNumber);
      formData.append("email", email);
      formData.append("skills", skills);
      formData.append("emailSubscribe", isEmailChecked);
      formData.append("googleVerified", googleSignStatus);
      formData.append("roleStatus", roleStatus);
      setDivStatus(false);
      setIsLoading(true);
      await Axios.post("https://server.beehubvas.com/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        setIsLoading(false);

        if (res.data.message === "Email Already Exist!") {
          setFname("");
          setLname("");
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
          navigate("/va-bh/:username/:id");
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

        formData.append("pdfFile", selectedFile);
        formData.append("fname", fname);
        formData.append("lname", lname);
        formData.append("mobileNumber", mobileNumber);
        formData.append("skills", skills);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("emailSubscribe", isEmailChecked);
        formData.append("roleStatus", roleStatus);
        setDivStatus(false);
        setIsLoading(true);
        await Axios.post("https://server.beehubvas.com/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => {
          setIsLoading(false);
          if (res.data.message === "Email Already Exist!") {
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

  const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 1000,
    height: !divStatus ? 500 : 800,
    bgcolor: "background.paper",
    border: "2px solid #bdbdbd",
    borderRadius: "0.5rem",
    boxShadow: 24,
    overflowY: "scroll",
  };

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
            <div className="varegister__container">
              <div className="registerbox__container">
                <div className="registerformbox__container">
                  <h1>Get Started</h1>

                  <form onSubmit={handleSubmit}>
                    <div className="clientregisterform__container">
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

                      <div className="varesume__container">
                        <p>Upload your resume here</p>
                        <div className="resume__container">
                          <input
                            type="file"
                            className="pdf-control"
                            onChange={handleFileChange}
                            accept="application/pdf"
                            required
                          />
                        </div>
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
                          />
                        </div>
                      </div>

                      <div className="clientregisterinput__con">
                        <PhoneInput
                          country={"ph"}
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

                      <div className="clientregisterinput__con">
                        <label>
                          <input
                            className="clientregistercheckbox__form"
                            type="checkbox"
                            checked={isEmailChecked}
                            onChange={handleEmailCheckboxChange}
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
                <div className="registerwhywork__container">
                  <h1>WHY WORK WITH US</h1>
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

export default VaRegister;
