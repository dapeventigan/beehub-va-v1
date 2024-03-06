import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { socket } from "../../App";
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
      await Axios.post("https://server.beehubvas.com/login", {
        email,
        password,
      }).then(async (res) => {
        if (res.data.status === "ok") {
          socket.emit("authenticate", res.data._id);
          socket.emit("refresh-all", res.data._id);
          if (res.data.role === "admin") {
            navigate("/admindashboard");
          } else if (res.data.role === "virtualassistant") {
            const userId = res.data.userId;
            const fname = res.data.userfname;
            const lname = res.data.userlname;
            const username = `${fname.toLowerCase()}-${lname.toLowerCase()}`;

            navigate(`/va-bh/${username}/${userId}`);
          } else {
            navigate(`/profile-beehub`);
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

  const [googleSignStatus, setGoogleSignStatus] = useState();

  useEffect(() => {
    if (googleSignStatus === true) {
      Axios.defaults.withCredentials = true;
      const googleSignIn = async () => {
        try {
          await Axios.post("https://server.beehubvas.com/login", {
            email,
            googleSignStatus,
          }).then(async (res) => {
            if (res.data.status === "ok") {
              socket.emit("authenticate", res.data._id);
              socket.emit("refresh-all", res.data._id);
              if (res.data.role === "admin") {
                navigate("/admindashboard");
              } else if (res.data.role === "virtualassistant") {
                const userId = res.data.userId;
                const fname = res.data.userfname;
                const lname = res.data.userlname;
                const username = `${fname.toLowerCase()}-${lname.toLowerCase()}`;

                navigate(`/va-bh/${username}/${userId}`);
              } else {
                navigate(`/profile-beehub`);
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

      googleSignIn();
    } else {
      setGoogleSignStatus(false);
    }
  }, [googleSignStatus, email, navigate]);

  return (
    <div className="login__container">
      <div className="login__main">
        <div className="loginmain__container">
          <div className="loginform__container">
            <form onSubmit={handleLogin}>
              <div className="logininsideform__container">
                <h2>
                  Login to <span className="lgn-title">BeeHub</span>
                </h2>
                <div className="logininput__container">
                  <div className="password-container">
                    <input
                      className="logininput__form"
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
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
                    Forgot Password?
                  </Link>
                </div>
                {error && <div>{error}</div>}

                <button id="lg-btn">LOGIN</button>

                <div className="googlesign__container">
                  <p className="googleloginborder">Or sign in with</p>

                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      var credentialDecoded = jwtDecode(
                        credentialResponse.credential
                      );
                      console.log(credentialDecoded);
                      console.log(credentialDecoded.email_verified);
                      setGoogleSignStatus(credentialDecoded.email_verified);
                      setEmail(credentialDecoded.email);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />

                  {/* <p className="login__noaccount">
                    Don't have an account? 
                    <a href="/joinregister">
                      <span className="signuplogin__text"> Sign Up</span>
                    </a>
                  </p> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
