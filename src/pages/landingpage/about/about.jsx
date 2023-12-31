import React, { useState, useEffect, useRef } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { FaCogs } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./about.css";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  const elementRef = useRef(null);
  const [openPhi, setOpenPhi] = useState(false);
  const [openCor, setOpenCor] = useState(false);

  const handleOpenPhi = () => {
    setOpenPhi(true);
  };
  const handleOpenCor = () => {
    setOpenCor(true);
  };
  const handleClose = () => {
    setOpenPhi(false);
    setOpenCor(false);
  };

  useEffect(() => {
    AOS.init({ duration: 1500 });

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          AOS.refresh();
          AOS.init({ duration: 1500 });
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const philoData = [
    {
      title: "Holistic Success",
      desc: "We go beyond the traditional limits of staffing, viewing success as a holistic process. Our objective is to create an ecosystem where both businesses and individuals can succeed. This comprehensive strategy includes strategic workforce planning, cultivation of talent, technology-enabled collaboration, and continuous learning initiatives.",
    },
    {
      title: "Unleashing Global Talent",
      desc: "Opportunity and talent have no boundaries. Our concept is based on maximizing the tremendous potential of the global talent pool. We create an atmosphere where different perspectives collide, stimulating innovation and pushing the frontiers of what is possible by promoting diversity and inclusiveness.",
    },
    {
      title: "Building Trust Through Integrity",
      desc: "The foundation of any successful collaboration is trust. We do business with unshakable integrity, assuring openness, ethical procedures, and a dedication to long-term partnerships. Our clients and virtual workforce can rely on us to uphold the highest levels of professionalism and dependability",
    },
    {
      title: "Elevating Potential Through Continuous Learning",
      desc: "Excellence is a journey, not a destination. We are committed to our virtual workforce's constant growth and development. We guarantee that our staff are prepared to handle the ever-changing business landscape by investing in skill improvement projects, training programs, and establishing an atmosphere that promotes inquiry and growth.",
    },
    {
      title: "Strategic Collaboration",
      desc: "At BeeHub Virtual Assistant Co., we regard our clients as partners on a shared road to success, not as transactions. Our concept is based on strategic cooperation, in which we work as an extension of our customers' teams to accomplish joint goals and solve problems. In essence, our attitude is a dedication to fostering an environment in which excellence is not only encouraged, but also expected. We believe in the transformational potential of linking outstanding individuals with forward-thinking enterprises, and we hope to change the very definition of success in the digital era through this relationship.",
    },
  ];

  const coreData = [
    {
      title: "First and Foremost, There is Innovation.",
      desc: "We value innovation as the foundation of our strategy. We promote a culture of inquiry, innovation, and the never-ending search of new ideas. We encourage our teams to constantly seek innovative methods to bring value to our clients and virtual workforce by embracing innovation.",
    },
    {
      title: "Excellence in People-Centricity",
      desc: "Our dedication to greatness begins with our people. We believe in fostering an atmosphere in which each individual is recognized, respected, and enabled to reach their greatest potential. We secure the greatest levels of cooperation and mutual success for our teams, clients, and virtual workforce by cultivating a people-centric culture.",
    },
    {
      title: "Adaptability on the Fly",
      desc: "Agility is not only an advantage in a world of continual change; it is a must. We welcome change, altering our strategies, processes, and solutions to suit the changing demands of our clients and the ever-changing environment of remote work.",
    },
    {
      title: "Transparency and Honesty",
      desc: "Every effective connection is built on trust. In all of our contacts, we maintain complete transparency and honesty. We promote long-term partnerships by being upfront and honest with our clients, virtual workforce, and stakeholders.",
    },
    {
      title: "Inclusion and Diversity",
      desc: "We value diversity as a driver of innovation and growth. Our dedication to diversity extends beyond words; It is deeply embedded in our culture. We think that varied viewpoints foster innovation and problem-solving, making us a stronger organization and better positioned to serve our worldwide clientele",
    },
    {
      title: "Continuous Learning and Development",
      desc: "Excellence is a journey rather than a destination. Continuous growth and development are important to our teams and virtual workforce. We guarantee that everyone in our ecosystem grows and changes with the industry by investing in skill enhancement projects, training programs, and building a culture of continuous improvement.",
    },
    {
      title: "Client-Centered Collaboration",
      desc: "Our success is inextricably linked to the success of our clients. Every client connection is viewed as a strategic collaboration by us. By matching our aims with theirs, we become more than just a service provider; we become an extension of their team, cooperating to achieve common goals.",
    },
    {
      title: "Environmental Accountability",
      desc: "We understand our environmental responsibilities as global citizens. We are committed to sustainable business methods that reduce our environmental impact. We actively contribute to a healthy world, from remote work practices that decrease transportation to eco-friendly technological solutions.",
    },
    {
      title: "Participation in the Community",
      desc: "We believe in giving back to the communities in which we work. We seek to create a good influence outside the spheres of business through community involvement activities, philanthropic contributions, and support for local causes.",
    },
    {
      title: "Determination and Resilience",
      desc: "Challenges are disguised opportunities. We face challenges with grit and drive. We encourage our teams and virtual workers to overcome hurdles and accomplish their goals by cultivating a culture that views failures as stepping stones to success.",
    },
  ];

  const boxStyle = {
    position: "absolute",
    width: "80%",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "20px",
    maxHeight: "60vh",
    overflowY: "auto",
  };

  const buttonStyle = {
    backgroundColor: "#111111",
    color: "white",
    borderRadius: 2,
    "&:hover": {
      backgroundColor: "#202020",
    },
  };

  return (
    <section id="about">
      <div className="about__container">
        <div className="abouthead__container">
          <div className="va__title">
            <h1>Our Virtual Assistance</h1>
            <h2>This is our talented virtual assistants</h2>
          </div>

          <div className="va__icons">
            <div className="virtualassist__container">
              <FaPeopleGroup size={100} />
              <h1>Strategic Workforce Planning</h1>
            </div>
            <div className="virtualassist__container">
              <FaHandshake size={100} />
              <h1>Talent Acquisition and Recruitment</h1>
            </div>
            <div className="virtualassist__container">
              <FaComputer size={100} />
              <h1>Technology Integration</h1>
            </div>
            <div className="virtualassist__container">
              <FaCogs size={100} />
              <h1>Customized Solution</h1>
            </div>
          </div>

          <div className="title__button">
            <Link to="/applyregister" className="btn btn-primary">
              See More
            </Link>
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

export default About;
