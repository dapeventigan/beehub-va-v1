import React, { useEffect } from "react";
import ParallaxEffect from "./parallax/parallax";
import ParallaxImgDown from "../../../assets/parallax-down.png";
import { Carousel } from "react-responsive-carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./choose.css";

const Choose = () => {
  const gridOneData = [
    {
      title: "Access to a Talent Pool",
      desc: "Access to a varied talent pool that allows businesses to tap into a plethora of experience and abilities from across the globe, ensuring they select the most suitable people for their unique needs.",
    },
    {
      title: "Cost-Efficiency",
      desc: "Virtual employment reduces the need for real office space, lowering overhead expenditures like utilities, rent, and staffing. Businesses can enjoy considerable cost reductions while still retaining access to top-tier personnel.",
    },
    {
      title: "Scalability and Adaptability",
      desc: "We proved a virtual workforce allows you scalability and flexibility. Businesses may simply scale up or down their teams based on project demands, ensuring they have the proper personnel when they need them without being bound to long-term commitments.",
    },
    {
      title: "Specialized Knowledge",
      desc: "We specialize in a variety of areas, giving clients access to highly qualified and experienced people. This enables businesses to rapidly establish teams with the precise expertise needed for their projects.",
    },
    {
      title: "Workforce Strategic Planning",
      desc: "We collaborate closely with customers to understand their company goals and difficulties. This results in strategic personnel planning that is tailored to the specific needs of the company, ensuring the right people are in place to guarantee success.",
    },
    {
      title: "Solutions for Integrated Technology",
      desc: "We make use of modern virtual collaboration tools and technology. This enables continuous communication, effective project management, and a virtual workspace that promotes productivity and cooperation.",
    },
    {
      title: "Risk Management and Compliance",
      desc: "We place a premium on data security and compliance with international legislation. This reduces the hazards of remote work while also providing enterprises with a safe and compliant virtual work environment",
    },
    {
      title: "Concentrate on Core Competencies",
      desc: "Businesses can focus on their core capabilities by outsourcing staffing activities to a virtual staffing provider. This allows up time and resources for strategic projects, innovation, and corporate development.",
    },
    {
      title: "Savings in Recruitment Time",
      desc: "We simplify the hiring process by developing networks and methods for locating, evaluating, and placing eligible individuals, which saves firms a significant amount of time throughout the recruiting process.",
    },
    {
      title: "Improved Work-Life Balance",
      desc: "The staff benefit from a better work-life balance when they work from home. This may lead to enhanced work satisfaction, morale, and higher retention rates, all of which help organizations in terms of production and stability.",
    },
    {
      title: "Practices that are Environmentally Friendly and Sustainable",
      desc: "By decreasing the need for daily transportation and the related carbon footprint, virtual staffing accords with sustainable and eco-friendly practices. By adopting remote labor, businesses may help with environmental conservation.",
    },
  ];

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section id="choose">
      <ParallaxEffect />
      <div className="choose__container">
        <div className="choose__content">
          <div
            className="choose__title"
            data-aos="fade-down"
            data-aos-once="true"
          >
            <p>
              BeeHub Virtual Assistants Co. allows organizations to benefit on
              the following advantages, resulting in a more agile,
              cost-effective, and internationally competitive workforce that
              adapts to the needs of the current business landscape.
            </p>
          </div>

          <div
            className="carousel__container"
            data-aos="fade-down"
            data-aos-once="true"
          >
            <Carousel
              className="carousel__class"
              emulateTouch={true}
              autoPlay={true}
              infiniteLoop={true}
              width="100%"
              showThumbs={false}
            >
              {gridOneData.map((item, i) => (
                <div className="choose__details" key={item.title}>
                  <div className="details__container">
                    <h1 className="desc__title">{item.title}</h1>
                    <p className="desc__details">{item.desc}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Choose;
