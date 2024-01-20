import React, {useEffect} from "react";
import BeeHubMan from "../../../../assets/about-man.png";
import { FaCheckCircle } from "react-icons/fa";
import "./whyworkbeehub.css";

const WhyWorkBeeHub = () => {

  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
  
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    
  }, []);


  return (
    <section id="why-work-beehub">
      <div className="whyworkbeehub__container">
        <div className="whyworkbeehub__content">
          <div className="whyworkbeehub__man">
            <img className="whybeehub__man" src={BeeHubMan} alt="" />
          </div>
          <div className="whyworkbeehub__details">
            <h1>Why Work with Us</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
              maiores laboriosam, nulla amet accusamus culpa, dolore qui
              similique cupiditate, ex officia dolores quae eaque recusandae
              officiis dignissimos est ipsa obcaecati?
            </p>
            <div className="whyworkbeehub__list">
              <div className="whybeehub__list">
                <FaCheckCircle className="whybeehub__icon" size={20} />
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="whybeehub__list">
                <FaCheckCircle className="whybeehub__icon" size={20} />
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="whybeehub__list">
                <FaCheckCircle className="whybeehub__icon" size={20} />
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkBeeHub;
