import React from "react";
import { useState } from "react";
import vaLogo from "../../assets/logo_sample.png";
import { NavLink, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

import "./navbar.css";
import { links } from "../../assets/data";

const Navbar = () => {
  const [isNavOpen, setisNavOpen] = useState(false);

  return (
    <nav>
      <div className="container navbar__container">
        <div className="navbar__contents">
          <div className="navbar__logo">
            <Link to="/" onClick={() => setisNavOpen(false)}>
              <img src={vaLogo} alt="" />
            </Link>
          </div>
          <div className="navbar__link">
            <ul
              className={`navbar__links ${
                isNavOpen ? "show__nav" : "hide__nav"
              }`}
            >
              {links.map(({ name, path }, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        isActive ? "active-nav" : ""
                      }
                      onClick={() => setisNavOpen((prev) => !prev)}
                    >
                      {name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="navbar__button">
            <button className="btn btn-primary">Login</button>
          </div>
          <button
            className="btn__bars"
            onClick={() => setisNavOpen((prev) => !prev)}
          >
            {isNavOpen ? <MdOutlineClose /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
