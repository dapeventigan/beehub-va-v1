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
  const largeScreenRange = ["50%", "510%"];

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
            Hiring a virtual assistant provides a multitude of advantages to
            individuals or business organizations.
          </p>
        </motion.div>
      </div>
      <svg
        className="wavy-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 180"
      >
        <path
          fill="#f8f8f8"
          fill-opacity="1"
          d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,96C672,85,768,107,864,96C960,85,1056,43,1152,37.3C1248,32,1344,64,1392,80L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default ParallaxEffect;
