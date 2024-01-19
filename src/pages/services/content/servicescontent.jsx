import React, { useEffect } from "react";
import Contact from "../../landingpage/contact/contact";
import Beehive from "../../../assets/beehive.png";
import Beehive2 from "../../../assets/beehive2.png";
import Beehive3 from "../../../assets/beehive3.png";
import AOS from "aos";
import "./servicescontent.css";

const ServicesContent = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });

    // Check if the hash exists in the URL
    const { hash } = window.location;
    if (hash) {
      // Find the element with the corresponding ID and scroll to it
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  return (
    <section id="servicescontent">
      <div className="servicescontent__container">
        <img className="servicesbeehive__logo" src={Beehive} alt="" />
        <img className="servicesbeehive__logo_two" src={Beehive2} alt="" />
        <img className="servicesbeehive__logo_three" src={Beehive3} alt="" />
        <div className="servicescontent__title">
          <div className="top-horizontal-line"></div>
          <h1>BeeHub's Top Tier Services</h1>
        </div>

        <div className="services__con" data-aos="fade-up" data-aos-once="true">
          <div
            id="strategic-workforce-planning"
            className="servicescontent__profile"
          >
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
              <div className="servicescontent__desc">
                <h1 className="servicescontent__title">
                  Strategic Workforce Planning
                </h1>
                <p className="servicescontent__text">
                  Collaborating with clients to gain insight into their business
                  objectives, growth strategies, and workforce needs. This
                  entails creating a plan of action for forming and managing
                  virtual teams that are consistent with the client's
                  objectives.
                </p>
              </div>
            </div>
          </div>
          <div
            id="talent-acquisition-and-recruitment"
            className="servicescontent__profile"
          >
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg"
                alt=""
              ></img>
              <div className="servicescontent__desc">
                <h1 className="servicescontent__title">
                  Talent Acquisition and Recruitment
                </h1>
                <p className="servicescontent__text">
                  Identifying, recruiting, and placing competent staff depending
                  on the needs of the customer. This involves sourcing
                  applicants, background checks, conducting interviews, and
                  ensuring a comprehensive vetting process in order to match the
                  right talent with the objectives of the client.
                </p>
              </div>
            </div>
          </div>
          <div
            id="flexible-staffing-models"
            className="servicescontent__profile"
          >
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
              <div className="servicescontent__desc">
                <h1 className="servicescontent__title">
                  Flexible Staffing Models
                </h1>
                <p className="servicescontent__text">
                  Provide flexible staffing alternatives, such as project-based
                  employment, long-term placements, and interim staffing, to
                  accommodate the diverse demands of enterprises.
                </p>
              </div>
            </div>
          </div>
          <div
            id="management-of-virtual-teams"
            className="servicescontent__profile"
          >
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
              <div className="servicescontent__desc">
                <h1 className="servicescontent__title">
                  Management of Virtual Teams
                </h1>
                <p className="servicescontent__text">
                  Assistance in the management and coordination of virtual
                  teams. Implementing efficient communication techniques,
                  project management tools, and maintaining team participation
                  for maximum efficiency are all part of the process.
                </p>
              </div>
            </div>
          </div>
          <div id="technology-integration" className="servicescontent__profile">
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/12912121/pexels-photo-12912121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
              <div className="servicescontent__desc">
                <h1 className="servicescontent__title">
                  Technology Integration
                </h1>
                <p className="servicescontent__text">
                  Recommendations and integration of virtual collaboration tools
                  and technology to promote smooth communication, project
                  management, and cooperation among remote teams.
                </p>
              </div>
            </div>
          </div>
          <div
            id="hr-and-administrative-support"
            className="servicescontent__profile"
          >
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/5673502/pexels-photo-5673502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
              <div className="servicescontent__desc">
                <h1 className="servicescontent__title">
                  HR and Administrative Support
                </h1>
                <p className="servicescontent__text">
                  Administrative services such as payroll processing, time
                  tracking, and other HR operations to help virtual teams run
                  smoothly
                </p>
              </div>
            </div>
          </div>
          <div
            id="compliance-and-data-security"
            className="servicescontent__profile"
          >
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
              <div className="servicescontent__desc">
                <h1 className="servicescontent__title">
                  Compliance and Data Security
                </h1>
                <p className="servicescontent__text">
                  Ensuring compliance with international labor laws and
                  regulations, as well as putting in place strong data security
                  procedures to secure sensitive information in a virtual work
                  environment.
                </p>
              </div>
            </div>
          </div>
          <div id="customized-solutions" className="servicescontent__profile">
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
              <div className="servicescontent__desc">
                <h1 className="servicescontent__title">Customized Solutions</h1>
                <p className="servicescontent__text">
                  Tailoring services to fit the individual demands of clients.
                  This entails knowing each company's specific difficulties and
                  requirements and delivering tailored virtual workforce
                  solutions.
                </p>
              </div>
            </div>
          </div>
          <div
            id="scalability-and-flexibility"
            className="servicescontent__profile"
          >
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/3183172/pexels-photo-3183172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
              <div className="servicescontent__desc">
                <h1 className="servicescontent__title">
                  Scalability and Flexibility
                </h1>
                <p className="servicescontent__text">
                  Providing scalable solutions that enable organizations to
                  change the number and makeup of their virtual teams in
                  response to changing project needs or business requirements.
                </p>
              </div>
            </div>
          </div>
          <div id="consulting-services" className="servicescontent__profile">
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/7605974/pexels-photo-7605974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
              <div className="servicescontent__desc">
                <h1 className="servicescontent__title">Consulting Services</h1>
                <p className="servicescontent__text">
                  Expert guidance and consulting on remote work techniques,
                  virtual team management, and industry best practices to assist
                  firms in optimizing their virtual workforce.
                </p>
              </div>
            </div>
          </div>
          <div id="global-talent-sourcing" className="servicescontent__profile">
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/6147031/pexels-photo-6147031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
              <div className="servicescontent__desc">
                <h1 className="servicescontent__title">
                  Global Talent Sourcing (Coming Soon)
                </h1>
                <p className="servicescontent__text">
                  Using a worldwide network to source talent from multiple
                  countries, firms may have access to a diversified pool of
                  people with a variety of skill sets and expertise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />
    </section>
  );
};

export default ServicesContent;
