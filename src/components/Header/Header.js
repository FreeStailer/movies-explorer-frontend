import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.png";
import Headmovies from "../Headmovies/Headmovies";
import Headauth from "../Headauth/Headauth";


function Header() {

    const isLogin = true; // стейт true или false для проверки
    const location = useLocation().pathname;

    return(
        <header className={location === "/" ? "header" : "header header_white"}>
            <Link to="/">
                <div className="header__logo">
                    <img alt="Logotip" src={logo} />
                </div>
            </Link>
            {isLogin ? <Headmovies /> : <Headauth />}
        </header>
    );
}

export default Header;
