import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import ParallaxImg from "../../../../assets/parallax-up.png";
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
  const largeScreenRange = ["150%", "2000%"];

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
      <div className="reusable__boxspace"></div>
      <div ref={ref} className="parallax__container">
        <div className="parallax__header">
          <motion.h1 style={{ y: textY }} className="parallax__title">
            Why Choose BeeHub Virtual Assistants Co.
          </motion.h1>
        </div>

        <img className="parallax__image" src={ParallaxImg} alt="" />
      </div>
    </div>
  );
};

export default ParallaxEffect;
