import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

const ApplyHome = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);
  const param = useParams();

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("https://server.beehubvas.com/applyuserdashboard").then(async (res) => {
      if (res.data !== "User not found") {
        setUserDetails(res.data);
        await Axios.get(
          `https://server.beehubvas.com/va-bh/${param.username}/${param.id}`
        ).then((res) => {
          if (res.data === "Link Broken") {
            navigate("/");
          }
        });
      } else {
        setViewOnly(true);
        if (viewOnly) {
          Axios.get(
            `https://server.beehubvas.com/va-bh/${param.username}/${param.id}`
          ).then((res) => {
            if (res.data === "Link Broken") {
              navigate("/");
            } else if (res.data !== "Profile doesn't exist") {
              setUserDetails(res.data);
            } else {
              navigate("/");
            }
          });
        }
      }
    });
  }, [viewOnly, param.username, param.id]);

  const handleLogout = (e) => {
    e.preventDefault();

    Axios.post("https://server.beehubvas.com/logout");
    navigate("/");
  };

  return (
    <div>
      <h1>Apply User Dashboard</h1>
      {userDetails && (
        <div>
          <p>Email: {userDetails.email}</p>
          <p>Full Name: {`${userDetails.fname} ${userDetails.lname}`}</p>
          <p>City: {userDetails.skills}</p>
        </div>
      )}

      {viewOnly ? "" : <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default ApplyHome;
