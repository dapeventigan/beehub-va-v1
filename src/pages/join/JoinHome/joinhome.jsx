import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

const JoinHome = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);
  const param = useParams();

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("https://server.beehubvas.com/joinuserdashboard").then((res) => {
      if (res.data !== "User not found") {
        setUserDetails(res.data);
      } else {
        setViewOnly(true);
        if (viewOnly) {
          Axios.get(
            `https://server.beehubvas.com/profile-bh/${param.username}/${param.id}`
          ).then((res) => {
            if (res.data !== "Profile doesn't exist") {
              setUserDetails(res.data);
              
            } else {
              navigate("/")
            }
          });
        }
      }
    });
  }, [viewOnly,param.username,param.id]);

  const handleLogout = (e) => {
    e.preventDefault();

    Axios.post("https://server.beehubvas.com/logout");
    navigate("/");
  };

  return (
    <div>
      <h1>Join User Dashboard</h1>
      {userDetails && (
        <div>
          <p>Email: {userDetails.email}</p>
          <p>Full Name: {`${userDetails.fname} ${userDetails.lname}`}</p>
          <p>City: {userDetails.industry}</p>
        </div>
      )}

      {viewOnly ? "" : <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default JoinHome;
