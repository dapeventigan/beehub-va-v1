import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

//beehubteam
import DabeVentigan from "../../../../../src/assets/beehubteam/dabe.png";
import "./beehubteam.css";

const BeehubTeam = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section id="beehubteam">
      <div className="container beehubteam__container">
        <div className="beehubteam__title" data-aos="fade" data-aos-once="true">
          <div className="top-horizontal-line"></div>
          <h1>Meet the BeeHub Team</h1>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>

        <div
          className="beehubteam__content"
          data-aos="fade"
          data-aos-once="true"
        >
          <div className="beehubteam__details">
            <img src={DabeVentigan} alt="" />
            <h2>Dabe Ventigan</h2>
            <p>Lorem, ipsum dolor.</p>
          </div>
          <div className="beehubteam__details">
            <img src={DabeVentigan} alt="" />
            <h2>Christopher Breaux</h2>
            <p>Lorem, ipsum dolor.</p>
          </div>
          <div className="beehubteam__details">
            <img src={DabeVentigan} alt="" />
            <h2>Tyler Okonma</h2>
            <p>Lorem, ipsum dolor.</p>
          </div>
          <div className="beehubteam__details">
            <img src={DabeVentigan} alt="" />
            <h2>Killua Zoldyck</h2>
            <p>Lorem, ipsum dolor.</p>
          </div>
          <div className="beehubteam__details">
            <img src={DabeVentigan} alt="" />
            <h2>Kang Kong Chips</h2>
            <p>Lorem, ipsum dolor.</p>
          </div>
          <div className="beehubteam__details">
            <img src={DabeVentigan} alt="" />
            <h2>Chipi chipi chapa chapa</h2>
            <p>Dubi dubi daba daba</p>
          </div>
        </div>

        <div className="title__button">
          <Link to="/applyregister" className="btn btn-primary">
            Join Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BeehubTeam;
