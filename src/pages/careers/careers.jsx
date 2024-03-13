import React, {useState,useEffect} from "react";
import RootNav from "../../components/navbar/navroot.jsx";
import CareersHeader from "./careers-header/careers-header.jsx";
import CareersContent from "./careers-content/careers-content.jsx";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer.jsx";

function Careers() {
  const navigate = useNavigate();

  //geolocation
  const [fromPH, setFromPH] = useState(false);

  const getUserIP = async () => {
    try {
      const request = await fetch(
        `https://ipinfo.io/json?token=${process.env.REACT_APP_IPINFO_TOKEN}`
      );
      const jsonResponse = await request.json();

      if (jsonResponse.country === "PH") {
        setFromPH(true);
      } else {
        setFromPH(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching IP address or location information", error);
    }
  };

  useEffect(() => {
    getUserIP();
  }, []);

  return (
    <>
      {fromPH ? (
        <>
          <RootNav />
          <CareersHeader />
          <CareersContent />
          <Footer />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Careers;
