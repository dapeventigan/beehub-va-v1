import React, { useEffect } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./plans-pricing-content.css";

const PlansPricingContent = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section id="plans-pricing-content">
      <div className="container planspricing__container">
        <div className="top-horizontal-line"></div>
        <div className="planspricingtitle__container">
          <div className="planspricing__title">
            <h1>
              Employing the finest virtual assistant comes at no expense to your
              budget or the typical cost when you choose our services.
            </h1>
          </div>
        </div>

        <div
          className="planspricingcontent__container"
          data-aos="fade-up"
          data-aos-once="true"
        >
          <div className="planspricing__box">
            <div className="planspricing__border">
              <div className="price__title">
                <h1>Flat Fee</h1>
              </div>
              {/* <div className="price__amount">
                <h2>90$</h2>
                <p>per week</p>
              </div> */}
            </div>
            <div className="planspricing__inside">
              <div className="plan__desc">
                <div className="howit__list">
                  <FaCheckCircle className="howitlist__icon" size={20} />
                  <p>Dedicated Virtual Assistant</p>
                </div>
                <div className="howit__list">
                  <FaCheckCircle className="howitlist__icon" size={20} />
                  <p>Pay Per Transaction</p>
                </div>
                <div className="howit__list">
                  <FaCheckCircle className="howitlist__icon" size={20} />
                  <p>Great for Real Estate Agents who are just starting out</p>
                </div>
                <div className="howit__list">
                  <FaCheckCircle className="howitlist__icon" size={20} />
                  <p>Payroll Assistance</p>
                </div>
              </div>
              <Link to="/joinregister" className="plans__button">
                Start Hiring
              </Link>
            </div>
          </div>

          <div className="planspricing__midbox">
            <div className="planspricing__border">
              <div className="price__title">
                <h1>Fully Managed</h1>
              </div>
              {/* <div className="price__amount">
                <h2>120$</h2>
                <p>per week</p>
              </div> */}
            </div>
            <div className="planspricing__inside">
              <div className="plan__desc">
                <div className="howit__list">
                  <FaCheckCircle className="howitlist__icon" size={20} />
                  <p>Dedicated Virtual Assistant (PT/FT)</p>
                </div>
                <div className="howit__list">
                  <FaCheckCircle className="howitlist__icon" size={20} />
                  <p>Suitable for real estate agents constantly on the move</p>
                </div>
                <div className="howit__list">
                  <FaCheckCircle className="howitlist__icon" size={20} />
                  <p>VA Time Tracker</p>
                </div>
                <div className="howit__list">
                  <FaCheckCircle className="howitlist__icon" size={20} />
                  <p>VA Training and Management</p>
                </div>
                <div className="howit__list">
                  <FaCheckCircle className="howitlist__icon" size={20} />
                  <p>Payroll Management</p>
                </div>
              </div>
              <Link to="/joinregister" className="plans__button">
                Start Hiring
              </Link>
            </div>
          </div>

          <div className="planspricing__box">
            <div className="planspricing__border">
              <div className="price__title">
                <h1>Do It Yourself</h1>
              </div>
              {/* <div className="price__amount">
                <h2>100$</h2>
                <p>per week</p>
              </div> */}
            </div>
            <div className="planspricing__inside">
              <div className="plan__desc">
                <div className="howit__list">
                  <FaCheckCircle className="howitlist__icon" size={20} />
                  <p>Dedicated Virtual Assistant (PT/FT)</p>
                </div>
                <div className="howit__list">
                  <FaCheckCircle className="howitlist__icon" size={20} />
                  <p>
                    Ideal for Real Estate Agents seeking to oversee and lead
                    their own team
                  </p>
                </div>
                <div className="howit__list">
                  <FaCheckCircle className="howitlist__icon" size={20} />
                  <p>Time Tracker</p>
                </div>
                <div className="howit__list">
                  <FaCheckCircle className="howitlist__icon" size={20} />
                  <p>Payroll Assitance</p>
                </div>
              </div>
              <Link to="/joinregister" className="plans__button">
                Start Hiring
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansPricingContent;
