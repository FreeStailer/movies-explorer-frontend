import React from "react";
// eslint-disable-next-line
import { Link } from "react-router-dom";
import "./Header.css";
// eslint-disable-next-line
import logo from "../../images/logo.png";
// eslint-disable-next-line
import userIcon from "../../images/icon-main.png";

function Header() {
    return(
        <header className="header header_white">
            <Link to="/">
                <div className="header__logo">
                    <img alt="Logotip" src={logo} />
                </div>
            </Link>

            <div className="header__menu">
                <div className="header__container">
                    <Link to="/movies" className="header__account">Коллекция фильмов</Link>
                    <Link to="/saved-movies" className="header__account">Моя библиотека</Link>
                </div>
            </div>

            <div className="header__container">
                <Link to="/profile" className="header__account">Account</Link>

                <Link to="/profile" className="header__link">
                    <img src={userIcon} alt="Account icon" className="header__icon" />
                </Link>
                <div className="header__hamburger-menu">
                    <input id="menu__toggle" type="checkbox" />
                    <label className="menu__btn" htmlFor="menu__toggle">
                        <span></span>
                    </label>
                    <ul className="menu__box">
                        <li>
                        <Link to="/" className="menu__item">
                            Главная
                        </Link>
                        </li>
                        <li>
                        <Link to="/movies" className="menu__item">
                            Фильмы{" "}
                        </Link>
                        </li>
                        <li>
                        <Link to="/saved-movies" className="menu__item">
                            {" "}
                            Сохраненные фильмы{" "}
                        </Link>
                        </li>
                        <li>
                        <div className="menu__container">
                            <Link to="/profile" className="menu__link">
                            Аккаунт
                            </Link>
                            <Link to="/profile" className="header__link">
                            <img src={userIcon} alt="иконка" className="header__icon" />
                            </Link>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;