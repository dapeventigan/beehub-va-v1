import React, { useEffect, useState } from "react";
import "./beehubtag.css";

const BeeHubTag = () => {
  const words = ["Awesome", "Good", "Nice"];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="beehubtag">
      <div className="beehubtag__maincontainer">
        <h1 className="beehubtag__title">BeeHub can help your Business </h1>
        <h1 className="beehubtag__roller">
          <span id="beehubtag__rolltext">
            SUCCESSFUL
            <br />
            THRIVE
            <br />
            GROW
            <br />
            ELEVATE
          </span>
        </h1>
      </div>
    </section>
  );
};

export default BeeHubTag;
