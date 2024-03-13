import React, { useEffect } from "react";
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
            <div className="registerwhyhire__container">
              <p>
                Partnering with BeeHub Virtual Assistants Co. can simplify
                operations, reduce administrative burdens, and contribute to
                increased overall efficiency for your businesses.
              </p>
              <p>
                Streamlined Processes. We handle all aspects of staffing, from
                recruitment to onboarding, payroll, and ongoing management.
              </p>
              <p>
                Streamlined Communication and Management: Working with a single
                provider for multiple services simplifies communication and
                project management. It eliminates the need to coordinate with
                multiple vendors, leading to more efficient operations and
                better outcomes.
              </p>
              <p>
                Time and cost savings. Our services can significantly reduce
                overhead costs by outsourcing HR, payroll, and administrative
                tasks, freeing up time for business leaders to focus on core
                activities and strategic goals.
              </p>
              <p>
                Diverse talent pool and expertise in various industries. We
                provide clients with access to a wide range of skills and
                experience. This ensures that businesses can find the right
                candidates with the specific skills and expertise they need,
                regardless of geographical boundaries.
              </p>
              <p>
                Centralized Management Approach. We facilitate better
                coordination and communication, ensuring smooth collaboration
                between clients and virtual staff.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkBeeHub;
