import React from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import "./header.css";
import HeaderLogo from "../../../assets/header_logo.json";

const Header = () => {
  return (
    <header id="header">
      <div className="container header__container">
        <div className="title__container">
          <div className="title__contents">
            <h2>Unlock Growth Beyond Borders, Beyond Limits:</h2>
            <h2>Virtual Staffing, Real Results</h2>
          </div>
          <p>
            Your strategic partner in developing high-performing virtual
            teams, virtual staffing, and workforce solutions for the
            modern age
          </p>

          <div className="header__logo">
            <Lottie animationData={HeaderLogo} className="animated__logo" />
          </div>
          <div className="title__button">
            <Link to="/applyregister" className="btn btn-primary">
              Apply Now
            </Link>
            <Link to="/joinregister" className="btn btn-primary">
              Join Now
            </Link>
          </div>
        </div>



        <div className="title__button mobile">
          <Link to="/applyregister" className="btn btn-primary">
            Apply Now
          </Link>
          <Link to="/joinregister" className="btn btn-primary">
            Join Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
