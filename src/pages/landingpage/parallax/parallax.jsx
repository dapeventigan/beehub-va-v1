import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import "./parallax.css";

const ParallaxEffect = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smallScreenRange = ["150%", "1000%"];
  const mediumScreenRange = ["70%", "800%"];
  const medLargeScreenRange = ["40%", "1000%"];
  const largeScreenRange = ["50%", "400%"];

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    windowWidth < 418
      ? smallScreenRange
      : windowWidth < 703
      ? mediumScreenRange
      : windowWidth < 1380
      ? medLargeScreenRange
      : largeScreenRange
  );
  return (
    <div className="parallax">
      <div className="top-horizontal-line-header"></div>
      <div ref={ref} className="parallax__container">
        <motion.div style={{ y: textY }} className="parallax__header">
          <h1 className="parallax__title">
            Why Should You Consider Hiring a Virtual Assistant?
          </h1>

          <p className="parallax__p">
            Our one-stop virtual staffing hub provides top-tier virtual
            assistants to businesses worldwide, utilizing an intelligent
            matching algorithm for seamless hiring and job alignment,
            transforming staffing into a dynamic solution, and driving
            businesses to new heights in the digital world.
          </p>
        </motion.div>
      </div>
      <svg className="wavy-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
        <path
          fill="#f8f8f8"
          fill-opacity="1"
          d="M 0 320 L 301 216 L 1105 216 L 1440 320 Z"
        ></path>
      </svg>
    </div>
  );
};

export default ParallaxEffect;
