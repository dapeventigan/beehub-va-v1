import React, { useEffect } from "react";
import Beehive from "../../../assets/beehive.png";
import Beehive2 from "../../../assets/beehive2.png";
import { FaCheckCircle } from "react-icons/fa";
import ClientRegister from "../../../components/clientregister/clientregister";
import AOS from "aos";
import "aos/dist/aos.css";
import "./choose.css";

const Choose = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section id="choose">
      <div className="choose__container">
        <img className="beehive__logo" src={Beehive} alt="" />
        <img className="beehive__logo_two" src={Beehive2} alt="" />
        <div className="choose__content">
          <div className="choose__title">
            <h1>Why Choose BeeHub Virtual Assistants Co.?</h1>
          </div>
          <div
            className="choosecontent__container"
            data-aos="fade-up"
            data-aos-once="true"
          >
            <div className="choose__box">
              <div className="choosebox__title">
                <h1>All-In-One Virtual Staffing Solutions</h1>
              </div>
              <div className="choose__list">
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>
                    Cost-effective and flexible approach to staffing needs,
                    including job board selection
                  </p>
                </div>
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>
                    AI-assisted hiring and HR-assisted hiring: choose from
                    pre-vetted Virtual Assistants
                  </p>
                </div>
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>
                    Help businesses establish customized virtual teams with
                    flexibility, scalability, expertise, cost-effectiveness, and
                    quality assurance
                  </p>
                </div>
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>
                    Provides specialized virtual assistants to meet the specific
                    needs of your business
                  </p>
                </div>
              </div>
            </div>
            <div className="choose__box">
              <div className="choosebox__title">
                <h1>All-Inclusive Staffing Advantage</h1>
              </div>
              <div className="choose__list">
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>Provides precise time tracking and streamlined payroll</p>
                </div>
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>
                    Offers comprehensive training, dedicated support, and
                    proactive management
                  </p>
                </div>
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>
                    Allows businesses to focus on their growth and innovation
                  </p>
                </div>
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>Provides a stress-free staffing experience</p>
                </div>
              </div>
            </div>
            <div className="choose__box">
              <div className="choosebox__title">
                <h1>Talent Matching Powered by AI</h1>
              </div>
              <div className="choose__list">
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>Efficient Screening and Matching</p>
                </div>
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>Leads to time and cost savings</p>
                </div>
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>Improved quality of hires reduces bias</p>
                </div>
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>Aids in strategic workforce planning</p>
                </div>
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>Secures the best talents in a competitive market</p>
                </div>
              </div>
            </div>
            <div className="choose__box">
              <div className="choosebox__title">
                <h1>Customized Staffing Solutions</h1>
              </div>
              <div className="choose__list">
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>Tailored management and service packages for businesses</p>
                </div>
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>Delivers entry-level to executive roles</p>
                </div>
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>
                    Ensures appropriate Virtual Assistants for the right
                    functions
                  </p>
                </div>
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>Customizable service packages expand with organization</p>
                </div>
                <div className="choosebox__list">
                  <FaCheckCircle className="choosecheck__icon" size={20} />
                  <p>
                    Aims to realize the company's full potential with people
                    designed for success
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="title__button">
          <a href="/" className="btn btn-primary">
            Book a Call
          </a>
          <ClientRegister
            btnClass={"btn btn-primary"}
            btnTitle={"Get Started"}
          />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Choose;
