import React from "react";
import BeehubLogo from "../../assets/Logo v1/Black And White/black.png"
import "./comingsoon.css";
const ComingSoon = () => {
  return (
    <div className="comingsoon">
      <div className="comingsoon__content">
        <h1>COMING SOON</h1>
        <img src={BeehubLogo} alt="" />
      </div>
    </div>
  );
};

export default ComingSoon;
