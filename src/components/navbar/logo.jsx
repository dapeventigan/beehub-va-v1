import React from 'react'
import vaLogo from "../../assets/Logo v1/Black And White/black2.png";

const LogoNav = () => {
    return (
        <div className="navbar__container">
            <div className="nav__container">
                <div className="navbarlogo__container">
                    <div>
                        <a href="/">
                            <img className="navbar__logo" src={vaLogo} alt="" />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LogoNav