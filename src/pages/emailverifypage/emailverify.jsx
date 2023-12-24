import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import BeeAbout from "../../assets/bee__about.png";
import "./emailverify.css";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:3001/verify/${param.id}/${param.token}`;
        const data = await Axios.get(url);

        if (data.data.message === "Link expired or Invalid token. Please try again by logging in.") {
          setValidUrl(false);
          setErrorMsg(data.data.message);
        } else {
          setValidUrl(true);
        }
        
      } catch (error) {
        console.error("Fetch Error:", error);
        setValidUrl(false);
      }
    };

    verifyEmailUrl();

    const redirectTimer = setTimeout(() => {
      window.location.href = "/login";
    }, 5000);

    return () => clearTimeout(redirectTimer);
    
  }, [param.id, param.token]);

  return validUrl ? (
    <div className="container emailverify__container">
      <div className="emailverifymain__container">
        <div className="welcomemessage__container">
          <div className="about__beeimg">
            <img className="bee__verify" src={BeeAbout} alt="" />
          </div>
          <h2>Your email has been verified!</h2>
          <h1>
            Welcome to
            <span className="build__text">BeeHub Virtual Assistant!</span>
          </h1>
        </div>
        <p>Redirecting to the login page in 5 seconds...</p>
      </div>
    </div>
  ) : (
    <div className="emailverifymain__container">
      <div className="welcomemessage__container">
        <div className="about__beeimg">
          <img className="bee__verify" src={BeeAbout} alt="" />
        </div>
        <h3>{errorMsg}</h3>
      </div>
      <p>Redirecting to the login page in 5 seconds...</p>
    </div>
  );
};

export default EmailVerify;
