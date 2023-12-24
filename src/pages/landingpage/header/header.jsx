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
            <h1>BeeHub</h1>

            <h2>Virtual Assistant Co.</h2>
            <h2 className="animate-charcter"> Service Beyond Borders</h2>
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

        <div className="header__logo">
          <Lottie animationData={HeaderLogo} className="animated__logo" />
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
