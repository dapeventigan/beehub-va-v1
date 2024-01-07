import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //PASSWORD
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  Axios.defaults.withCredentials = true;
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await Axios.post("http://localhost:3001/login", {
        email,
        password,
      }).then(async (res) => {
        if (res.data.status === "ok") {
          if (res.data.role === "admin") {
            navigate("/admindashboard");
          } else if (res.data.role === "applyUser") {
            navigate("/applyhome");
          } else {
            navigate("/joinhome");
          }
        } else {
        }
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="login__container">
      <div className="login-design"></div>
      <div className="login__main">
        <div className="loginmain__container">
          <div className="loginform__container">
            <form onSubmit={handleLogin}>
              <div className="logininsideform__container">
                <h2>
                  Login to <span className="lgn-title">BeeHub</span>
                </h2>
                <div className="logininput__container">
                  <input
                    className="logininput__form"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="logininput__container">
                  <div className="password-container">
                    <input
                      className="logininputpass__form "
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      placeholder="Password"
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
                <div className="forgotpassword__container">
                  <Link to="/resetpasswordverify" className="forgot__password">
                    Forgot Password
                  </Link>
                </div>
                {error && <div>{error}</div>}
                <div className="loginbutton__container">
                  <button id="lg-btn">Login</button>
                </div>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    var credentialDecoded = jwtDecode(
                      credentialResponse.credential
                    );
                    console.log(credentialDecoded);
                    console.log(credentialDecoded.email_verified);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
