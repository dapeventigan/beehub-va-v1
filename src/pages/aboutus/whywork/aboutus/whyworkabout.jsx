import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import AOS from "aos";
import "./whyworkabout.css";

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

const WhyWorkAbout = () => {
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

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section id="whyabout">
      <div className="whyworkabout__container">
        <div
          className="whyworkabout__title"
        >
          <div className="top-horizontal-line"></div>
          <h1 className="howit__title">About Us</h1>
          <p>
            BeeHub Virtual Assistants Co. was founded on the idea of
            establishing a workforce that defies traditional constraints. We
            were founded in 2023 with the goal of redefining the future of work
            by effortlessly linking businesses with a vast talent network. We at
            BeeHub Virtual Assistants Co. believe in breaking down barriers and
            maximizing the potential of a diverse, competent, and remote
            workforce.
          </p>
        </div>

        <div className="horizontal-line"></div>

        <div className="whyworkabout__profile">
          <div className="howit__contents">
            <div
              className="howit__desc"
              data-aos="fade"
              data-aos-once="true"
            >
              <h1 className="howit__title">Our Mission</h1>
              <p className="howit__text">
                Our mission is simple but powerful: to bridge the
                talent-opportunity gap, to transcend geographical constraints,
                and to unlock the full potential of a diverse and competent
                virtual workforce by enabling individuals to achieve greatness
                and reach their full potential by providing the tools,
                resources, and support they need to excel while fostering a work
                environment that not only drives productivity but also empowers
                individuals to lead fulfilling and balanced lives.
              </p>

              <p className="howit__text">
                We want to live in a world where excellence, not geography,
                defines work.
              </p>
            </div>
            <div
              className="howit__img"
              data-aos="fade"
              data-aos-once="true"
            >
              <img
                className="how__img"
                src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
            </div>
          </div>
          <div className="howit__contents-reverse">
            <div
              className="howit__img"
              data-aos="fade"
              data-aos-once="true"
            >
              <img
                className="how__img"
                src="https://images.pexels.com/photos/3767172/pexels-photo-3767172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
            </div>
            <div
              className="howit__desc"
              data-aos="fade"
              data-aos-once="true"
            >
              <h1 className="howit__title">Our Philosophy</h1>
              <p className="howit__text">
                Our concept at BeeHub Virtual Assistant Co. is based on the
                belief that the true potential of a company is greatest when
                individuals are enabled to grow and succeed. We regard ourselves
                not solely as a virtual staffing option but as bridge builders,
                developing and connecting outstanding individuals with
                progressive businesses.
              </p>
              {/* <Button sx={buttonStyle} onClick={handleOpenPhi}>
                View Company's Philosophy
              </Button> */}
              <Modal
                open={openPhi}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Grid container justifyContent="center">
                  <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Box sx={boxStyle} className="box__container">
                      <h1>Company's Philosophy</h1>
                      {philoData.map((item, i) => (
                        <div key={item.title} className="philo__container">
                          <div className="philo__details">
                            <h1>{item.title}</h1>
                            <p>{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Modal>
            </div>
          </div>
          <div className="howit__contents">
            <div
              className="howit__desc"
              data-aos="fade"
              data-aos-once="true"
            >
              <h1 className="howit__title">Our Core Values</h1>
              <p className="howit__text">
                These basic principles define our company's culture, driving our
                decisions, activities, and relationships. They symbolize not
                just what we do, but also who we are as a corporation dedicated
                to quality, ethics, and a future where work has no limits.
              </p>
              {/* <Button sx={buttonStyle} onClick={handleOpenCor}>
                View Company's Core Values
              </Button> */}
              <Modal
                open={openCor}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Grid container justifyContent="center">
                  <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Box sx={boxStyle} className="box__container">
                      <h1>Company's Core Values</h1>
                      {coreData.map((item, i) => (
                        <div key={item.title} className="philo__container">
                          <div className="philo__details">
                            <h1>{item.title}</h1>
                            <p>{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Modal>
            </div>
            <div
              className="howit__img"
              data-aos="fade"
              data-aos-once="true"
            >
              <img
                className="how__img"
                src="https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              ></img>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWorkAbout;
