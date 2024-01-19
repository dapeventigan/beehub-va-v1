import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "./realators.css";


const Realators = () => {

    useEffect(() => {
      AOS.init({ duration: 1500 });
    }, []);


  return (
    <section id="realtors">
      <div className="container realators__container" data-aos="fade" data-aos-once="true">
        <div className="realators__title">
          <h1>Virtual Assistants for Realtors</h1>
        </div>
        <div className="realators__title-desc">
          <p>
            Real Estate Virtual Assistants (RE VAs) are essential in providing
            support to real estate agents by managing diverse administrative
            responsibilities and facilitating operational efficiency.
          </p>

          <p>
            By leveraging BeeHub’s virtual staffing services, Real Estate
            Brokers can streamline operations, enhance client experiences, and
            stay competitive in an evolving market. Whether it's administrative
            support, marketing assistance, or specialized tasks, virtual
            staffing provides tailored solutions to meet the unique needs of the
            real estate sector.
          </p>
        </div>

        <div className="realators__content">
          <div className="realators__box">
            <div className="realators__img">
              <img
                className="realator__img"
                src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
            </div>
            <div className="realators__desc">
              <h2>Transaction Coordinator</h2>
              <p>
                The Transaction Coordinator will be responsible for ensuring
                that real estate transactions are processed smoothly and
                efficiently from contract to close. They are responsible for
                managing paperwork, communicating with clients and other parties
                involved, and making sure all required paperwork is full and
                accurate are all responsibilities that virtual assistants may
                take on when it comes to transaction coordination.
              </p>
            </div>
          </div>

          <div className="realators__box">
            <div className="realators__desc">
              <h2>Listing Coordinator</h2>
              <p>
                The Listing Coordinator is crucial in creating compelling
                narratives for real estate listings, collaborating with agents,
                creating visually appealing presentations, and executing
                efficient marketing strategies. They plan professional
                photography sessions, manage web listings, and regularly connect
                with sellers for updates and information.
              </p>
            </div>

            <div className="realators__img">
              <img
                className="realator__img"
                src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
            </div>
          </div>

          <div className="realators__box">
            <div className="realators__img">
              <img
                className="realator__img"
                src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
            </div>

            <div className="realators__desc">
              <h2>General Real Estate Virtual Assistant</h2>
              <p>
                Virtual Assistants with administrative duties, appointment
                scheduling, email management, and other routine tasks. This
                enables increased realtors focused on client engagements and
                property transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="generalrealestate__container">
        <div className="generalrealestate__title">
          <h2>General Real Estate Virtual Assistant List</h2>
        </div>
        <div className="generalrealestate__box">
          <div className="realatorsdesc__list">
            <p>Administrative Virtual Assistant</p>
            <div className="realators__list">
              <FaCheckCircle className="realators__icon" />
              <p>
                Handles email management, calendar scheduling, and appointment
                setting.
              </p>
            </div>
            <div className="realators__list">
              <FaCheckCircle className="realators__icon" />
              <p>Manages paperwork and document organization.</p>
            </div>
            <div className="realators__list">
              <FaCheckCircle className="realators__icon" />
              <p>
                Provides general administrative support to keep real estate
                professionals organized.
              </p>
            </div>
          </div>
          <div className="realatorsdesc__list">
            <p>Marketing Virtual Assistant</p>
            <div className="realators__list">
              <FaCheckCircle className="realators__icon" />
              <p>
                Manages social media accounts and creates content to promote
                listings.
              </p>
            </div>
            <div className="realators__list">
              <FaCheckCircle className="realators__icon" />
              <p>
                Assists in the development and execution of marketing
                strategies.
              </p>
            </div>
            <div className="realators__list">
              <FaCheckCircle className="realators__icon" />
              <p>
                Creates and designs marketing materials, such as flyers and
                brochures.
              </p>
            </div>
          </div>
          <div className="realatorsdesc__list">
            <p>Lead Generation Virtual Assistant</p>
            <div className="realators__list">
              <FaCheckCircle className="realators__icon" />
              <p>Researches and identifies potential leads and prospects.</p>
            </div>
            <div className="realators__list">
              <FaCheckCircle className="realators__icon" />
              <p>
                Conducts online research to gather information on potential
                clients.
              </p>
            </div>
            <div className="realators__list">
              <FaCheckCircle className="realators__icon" />
              <p>
                Manages databases and keeps them updated with relevant
                information.
              </p>
            </div>
          </div>
          <div className="realatorsdesc__list">
            <p>Inside Sales Associate</p>
            <div className="realators__list">
              <FaCheckCircle className="realators__icon" />
              <p>
                Initial contact for clients, proactively reaching out,
                qualifying prospects, and cultivating relationships through
                effective communication.
              </p>
            </div>
            <div className="realators__list">
              <FaCheckCircle className="realators__icon" />
              <p>
                Guide clients through the home-buying or selling process,
                possessing interpersonal skills and property listings knowledge.
              </p>
            </div>
          </div>
          <div className="realatorsdesc__list">
            <p>Remote Property Management</p>
            <div className="realators__list">
              <FaCheckCircle className="realators__icon" />
              <p>
                ProvidED remote property management activities such as rent
                collecting, tenant communication, and property maintenance
                coordination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Realators;
