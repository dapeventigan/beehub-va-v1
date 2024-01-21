import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PhoneInput from "react-phone-input-2";
import { IoClose } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import "./clientregister.css";

const ClientRegister = () => {
  //Popup Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => toggleClose();

  const toggleClose = () => {
    setOpen(false);
    setSelectedOption('');
    setFname('');
    setLname('');
    setMobileNumber('');
    setIndustry('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setHearAbout('');
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

  //PASSWORD
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

  //SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // ...

    // Clear the input fields
    setSelectedOption('');
    setFname('');
    setLname('');
    setMobileNumber('');
    setIndustry('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setHearAbout('');
  };

  const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 1000,
    height: 700,
    bgcolor: "background.paper",
    border: "2px solid black",
    borderRadius: "1rem",
    boxShadow: 24,
    overflowY: "scroll",
  };

  return (
    <>
      <div className="btn btn-primary" onClick={handleOpen}>
        Start Hiring
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

                  <form action="">
                    <div className="clientregisterform__container">
                      <div className="clientregisterinput__con">
                        <select
                          id="dropdown"
                          value={selectedOption}
                          onChange={handleSelectChange}
                        >
                          <option value="" disabled selected>What do you want to do?</option>
                          <option value="option1">Hire VAs</option>
                          <option value="option2">Post A Job</option>
                          <option value="option3">Talk to us</option>
                        </select>
                      </div>

                      <div className="form__row">
                        <div
                          className={`clientregisterinput__container ${
                            !selectedOption && "disabled"
                          }`}
                        >
                          <input
                            className="clientregisterinput__form"
                            type="text"
                            onChange={(e) => setFname(e.target.value)}
                            placeholder="First Name"
                            required
                            disabled={!selectedOption}
                          />
                        </div>

                        <div
                          className={`clientregisterinput__container ${
                            !selectedOption && "disabled"
                          }`}
                        >
                          <input
                            className="clientregisterinput__form"
                            type="text"
                            onChange={(e) => setLname(e.target.value)}
                            placeholder="Last Name"
                            required
                            disabled={!selectedOption}
                          />
                        </div>
                      </div>

                      <div
                        className={`clientregisterinput__con ${
                          !selectedOption && "disabled"
                        }`}
                      >
                        <PhoneInput
                          country={"us"}
                          value={mobileNumber}
                          inputProps={{ required: true }}
                          name="mobilenum"
                          onChange={handleMobileChange}
                          inputStyle={{
                            maxWidth: "85%",
                          }}
                          disabled={!selectedOption}
                        />
                      </div>

                      <div
                        className={`clientregisterinput__container ${
                          !selectedOption && "disabled"
                        }`}
                      >
                        <input
                          className="clientregisterinput__form"
                          type="text"
                          onChange={(e) => setIndustry(e.target.value)}
                          placeholder="What Industry are you in?"
                          required
                          disabled={!selectedOption}
                        />
                      </div>

                      <div
                        className={`clientregisterinput__container ${
                          !selectedOption && "disabled"
                        }`}
                      >
                        <input
                          className="clientregisterinput__form"
                          type="email"
                          placeholder="Enter Email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={!selectedOption}
                        />
                      </div>

                      <div
                        className={`clientregisterinput__con ${
                          !selectedOption && "disabled"
                        }`}
                      >
                        <div className="password-container">
                          <input
                            className="logininputpass__form "
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            disabled={!selectedOption}
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

                      <div
                        className={`clientregisterinput__con ${
                          !selectedOption && "disabled"
                        }`}
                      >
                        <div className="password-container">
                          <input
                            className="logininputpass__form "
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            disabled={!selectedOption}
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

                      <div className="clientregisterinput__con">
                        <select
                          id="dropdown"
                          value={hearAbout}
                          onChange={handleAboutChange}
                          disabled={!selectedOption}
                          required
                        >
                          <option value="" disabled selected>Where did you hear about us?</option>
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="Facebook">Google</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Friends">Friends/Colleagues</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>

                      <div
                        className={`clientregisterinput__con ${
                          !selectedOption && "disabled"
                        }`}
                      >
                        <label>
                          <input
                            className="clientregistercheckbox__form"
                            type="checkbox"
                            checked={isEmailChecked}
                            onChange={handleEmailCheckboxChange}
                            required
                            disabled={!selectedOption}
                          />
                          Send me promotional emails.
                        </label>
                      </div>

                      <div
                        className={`clientregisterinput__con ${
                          !selectedOption && "disabled"
                        }`}
                      >
                        <label>
                          <input
                            className="clientregistercheckbox__form"
                            type="checkbox"
                            checked={isTermsChecked}
                            onChange={handleTermsCheckboxChange}
                            required
                            disabled={!selectedOption}
                          />
                          I agree to the <a href="#">Terms and Conditions</a>{" "}
                          and <a href="#">Privacy Policy</a>.
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="registerwhyhire__container">
                  <img src="" alt="" />
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
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ClientRegister;
