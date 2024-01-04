import React, { useEffect, useRef } from "react";
import AOS from "aos";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import "./servicescontent.css";

const ServicesContent = () => {
  const ref = useRef();
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  return (
    <section id="servicescontent">
      <div className="container servicescontent__container">
        <div
          className="servicescontent__title"
          data-aos="fade"
          data-aos-once="true"
        >
          <h1>BeeHub's Top Tier Services</h1>
        </div>

    

        <div className="services__con">
          <div className="servicescontent__profile">
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
          <div className="servicescontent__profile">
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
          <div className="servicescontent__profile">
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
          <div className="servicescontent__profile">
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
          <div className="servicescontent__profile">
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
          <div className="servicescontent__profile">
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
          <div className="servicescontent__profile">
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
          <div className="servicescontent__profile">
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
          <div className="servicescontent__profile">
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
          <div className="servicescontent__profile">
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
          <div className="servicescontent__profile">
            <div className="servicescontent__contents">
              <img
                className="servicescontent__img"
                src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
    </section>
  );
};

export default ServicesContent;
