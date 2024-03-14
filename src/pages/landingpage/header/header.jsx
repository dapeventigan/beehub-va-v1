import React from "react";
import Lottie from "lottie-react";
import HeaderLogo from "../../../assets/header_logo.json";
import ClientRegister from "../../../components/clientregister/clientregister";
import VaRegister from "../../../components/varegister/varegister";

import "./header.css";
const Header = () => {
  return (
    <header id="header">  
      <div className="header__container">
        <div className="title__container">
          <div className="title__contents">
            <h2>Unlock Growth Beyond Borders, Beyond Limits:</h2>
            <h2>Virtual Staffing, Real Results</h2>
          </div>
          <p>
            Your strategic partner in developing high-performing virtual teams,
            virtual staffing, and workforce solutions for the modern age
          </p>

          <div className="title__button-header">
            <VaRegister btnClass={"btn btn-primary"} btnTitle={"Find a Job"} />
            <ClientRegister
              btnClass={"btn btn-primary"}
              btnTitle={"Find a Talent"}
            />
          </div>
        </div>

        <div className="header__logo">
          <Lottie animationData={HeaderLogo} className="animated__logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
