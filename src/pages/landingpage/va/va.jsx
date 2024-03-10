import React, { useEffect } from "react";
import AOS from "aos";
import ClientRegister from "../../../components/clientregister/clientregister";

import "./va.css";

const VASection = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section id="va">
      <div className="vas__container">
        <div className="aboutva__container">
          <div className="va__title">
            <h1>Our Services</h1>
            <p>
              Our services help to create a smooth and efficient virtual work
              environment, allowing organizations to reap the benefits of remote
              work while ensuring that their virtual teams are productive,
              engaged, and aligned with corporate goals.
            </p>
          </div>

          <div
            className="services__con"
            data-aos="fade-up"
            data-aos-once="true"
          >
            <div
              id="strategic-workforce-planning"
              className="servicescontent__profile"
            >
              <div className="servicescontent__contents">
                <img
                  className="servicescontent__img"
                  src="https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1s"
                  alt=""
                ></img>
                <div className="servicescontent__desc">
                  <h1 className="servicescontent__title">
                    Talent Matching Powered by AI
                  </h1>
                  <p className="servicescontent__text">
                    Our AI algorithms go beyond conventional talent matching. We
                    examine work styles, personality attributes, and project
                    preferences to find the best matches for companies and
                    virtual workers, resulting in productive, amicable, and
                    long-term partnerships.
                  </p>
                </div>
              </div>
            </div>

            <div
              id="strategic-workforce-planning"
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
                    We offer competent talent identification, recruitment, and
                    placement in response to client needs. Our service includes
                    candidate recruitment, background checks, interview
                    facilitation, and a detailed evaluation approach to ensure
                    that suitable individuals correspond with the client's
                    objectives.
                  </p>
                </div>
              </div>
            </div>

            <div
              id="strategic-workforce-planning"
              className="servicescontent__profile"
            >
              <div className="servicescontent__contents">
                <img
                  className="servicescontent__img"
                  src="https://images.pexels.com/photos/8867190/pexels-photo-8867190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                ></img>
                <div className="servicescontent__desc">
                  <h1 className="servicescontent__title">
                    HR Management, Payroll Services and Administrative Support
                  </h1>
                  <p className="servicescontent__text">
                    Our comprehensive HR, Payroll, and Administrative Support
                    services to help businesses streamline operations, ensure
                    compliance, and reduce overhead costs. By leveraging our
                    expert team and cutting-edge technology, we provide
                    customizable solutions that include talent acquisition,
                    payroll processing, benefits administration, and
                    administrative tasks management. This allows you to focus on
                    growing your business while we efficiently handle your
                    back-end operations, offering flexibility and scalability to
                    meet your unique needs.
                  </p>
                </div>
              </div>
            </div>

            <div
              id="strategic-workforce-planning"
              className="servicescontent__profile"
            >
              <div className="servicescontent__contents">
                <img
                  className="servicescontent__img"
                  src="https://images.pexels.com/photos/4050469/pexels-photo-4050469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                ></img>
                <div className="servicescontent__desc">
                  <h1 className="servicescontent__title">
                    Management of Virtual Assistants and Virtual Teams
                  </h1>
                  <p className="servicescontent__text">
                    The assistance we provide in overseeing virtual assistants
                    provides businesses with increased flexibility, and
                    productivity, enabling them to concentrate on their core
                    capabilities while professionals manage team coordination,
                    risk mitigation, and quality control. Businesses generally
                    gain from increased output, fresh concepts, and
                    round-the-clock operations, establishing a strategic and
                    effective framework for telecommuting that nurtures staff
                    satisfaction and sustained project success.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* 
          <div className="va__icons">
            <div className="virtualassist__container">
              <FaPeopleGroup size={100} className="va-icon" />
              <img
                className="vaicon__img"
                src="https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
              <h1>Strategic Workforce Planning</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>

            <div className="virtualassist__container">
              <FaHandshake size={100} className="va-icon" />

              <img
                className="vaicon__img"
                src="https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg"
                alt=""
              ></img>
              <h1>Talent Acquisition and Recruitment</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="virtualassist__container">
              <FaComputer size={100} className="va-icon" />
              <img
                className="vaicon__img"
                src="https://images.pexels.com/photos/12912121/pexels-photo-12912121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
              <h1>Technology Integration</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div> */}

          <div className="title__button-service">
            <a href="/" className="btn btn-primary">
              Book a Call
            </a>
            <ClientRegister
              btnClass={"btn btn-primary"}
              btnTitle={"Get Started"}
            />
          </div>
        </div>

        <div className="about__tagline">
          <div className="tagline__details">
            <h1>Empowering Excellence</h1>
            <h2>Unleashing Potential</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VASection;
