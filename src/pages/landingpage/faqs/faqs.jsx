import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BiDownArrow } from "react-icons/bi";
import AOS from "aos";
import "aos/dist/aos.css";
import "./faqs.css";
const FAQs = () => {
  const faqsData = [
    {
      title: "Strategic Workforce Planning",
      desc: "Collaborating with clients to gain insight into their business objectives, growth strategies, and workforce needs. This entails creating a plan of action for forming and managing virtual teams that are consistent with the client's objectives.",
    },
    {
      title: "Talent Acquisition and Recruitment",
      desc: "Identifying, recruiting, and placing competent staff depending on the needs of the customer involves sourcing applicants, conducting interviews, and ensuring a comprehensive vetting process in order to match the right talent with the objectives of the client.",
    },
    {
      title: "Flexible Staffing Models",
      desc: "Provide flexible staffing alternatives, such as project-based employment, long-term placements, and interim staffing, to accommodate the diverse demands of enterprises.",
    },
    {
      title: "Worldwide Talent Sourcing",
      desc: "Using a worldwide network to source talent from multiple countries, firms may have access to a diversified pool of people with a variety of skill sets and expertise.",
    },
    {
      title: "Management of Virtual Teams",
      desc: "Assistance in the management and coordination of virtual teams. Implementing efficient communication techniques, project management tools, and maintaining team participation for maximum efficiency are all part of the process.",
    },
    {
      title: "Technology Integration",
      desc: "Recommendations and integration of virtual collaboration tools and technology to promote smooth communication, project management, and cooperation among remote teams.",
    },
    {
      title: "Training and growth Programs",
      desc: "Investment in the virtual workforce's constant learning and growth. This includes offering training programs, skill building efforts, and tools to keep virtual teams abreast of market trends.",
    },
    {
      title: "HR and Administrative Support",
      desc: "Administrative services such as payroll processing, time tracking, and other HR operations to help virtual teams run smoothly.",
    },
    {
      title: "Compliance and Data Security",
      desc: "Ensuring compliance with international labor laws and regulations, as well as putting in place strong data security procedures to secure sensitive information in a virtual work environment.",
    },
    {
      title: "Customized Solutions",
      desc: "Tailoring services to fit the individual demands of clients. This entails knowing each company's specific difficulties and requirements and delivering tailored virtual workforce solutions",
    },
    {
      title: "Scalability and Flexibility",
      desc: "Providing scalable solutions that enable organizations to change the number and makeup of their virtual teams in response to changing project needs or business requirements.",
    },
    {
      title: "Consulting Services",
      desc: "Expert guidance and consulting on remote work techniques, virtual team management, and industry best practices to assist firms in optimizing their virtual workforce.",
    },
  ];

  const [isSelected, setIsSelected] = useState();

  const toggleCard = (i) => {
    if (isSelected === i) {
      return setIsSelected();
    }

    setIsSelected(i);
  };

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section id="faqs">
      <div className="service__container">
        <div className="faqs__container">
          <div
            className="faqs__titleheader"
            data-aos="fade"
            data-aos-delay="50"
            data-aos-once="true"
          >
            <h2>Our Services</h2>
            <h5>
              Our services help to create a smooth and efficient virtual work
              environment, allowing organizations to reap the benefits of remote
              work while ensuring that their virtual teams are productive,
              engaged, and aligned with corporate goals
            </h5>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="50"
            data-aos-once="true"
          >
            <div className="faqs__cards">
              <div className="faqs__accordion">
                {faqsData.map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="faqs__content"
                    onClick={() => toggleCard(i)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="faqs__title">
                      <h2>{item.title}</h2>
                      <BiDownArrow className="arrowdown" />
                    </div>

                    <div
                      className={
                        isSelected === i
                          ? "faqs__description show"
                          : "faqs__description"
                      }
                    >
                      {item.desc}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
