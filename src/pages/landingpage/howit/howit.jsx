import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./howit.css";

const HowIt = () => {
  return (
    <section id="howit">
      <div className="container howit__container">
        <div className="howit__contents">
          <div className="howit__desc">
            <h1 className="howit__title">Our Virtual Assistants</h1>
            <p className="howit__text">
              Partnering with our team of Filipino virtual assistants means
              unlocking a world of efficiency, professionalism, and reliability.
              Experience the difference they can make in streamlining your
              operations, allowing you to focus on core aspects of your
              business.
            </p>
            <div className="howit__bulletlist">
              <div className="howit__list">
              <FaCheckCircle className="howitlist__icon" size={25}/>  
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="howit__list">
              <FaCheckCircle className="howitlist__icon" size={25}/>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="howit__list">
              <FaCheckCircle className="howitlist__icon" size={25}/>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="howit__list">
              <FaCheckCircle className="howitlist__icon" size={25}/>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
          <div className="howit__img">
            <img
              className="how__img"
              src="https://images.pexels.com/photos/4132403/pexels-photo-4132403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            ></img>
          </div>
        </div>
        <div className="howit__contents">
          <div className="howit__img">
            <img
              className="how__img"
              src="https://images.pexels.com/photos/4064640/pexels-photo-4064640.jpeg"
              alt=""
            ></img>
          </div>
          <div className="howit__desc">
            <h1 className="howit__title">We'll take care your business for you</h1>
            <p className="howit__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              aliquid enim ab quibusdam eveniet eos voluptates facere eaque,
              magni tempore.
            </p>
          </div>
        </div>
        <div className="howit__contents">
          <div className="howit__desc">
            <h1 className="howit__title">TITLE</h1>
            <p className="howit__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              aliquid enim ab quibusdam eveniet eos voluptates facere eaque,
              magni tempore.
            </p>
            <div className="howit__list">
              <FaCheckCircle className="howitlist__icon" size={25}/>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className="howit__list">
              <FaCheckCircle className="howitlist__icon" size={25}/>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
          </div>
          <div className="howit__img">
            <img
              className="how__img"
              src="https://images.pexels.com/photos/5712043/pexels-photo-5712043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            ></img>
          </div>
        </div>

        <div className="title__button">
            <Link to="/joinregister" className="btn btn-primary">
              Join Now
            </Link>
          </div>
      </div>
    </section>
  );
};

export default HowIt;
