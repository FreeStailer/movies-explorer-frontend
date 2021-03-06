import React from "react";
import { Link, useLocation } from "react-router-dom";
import userIcon from "../../images/icon-main.png";

function Headmovies() {
    const location = useLocation().pathname;

    return(
        <div className="header__menu">
            <div className="header__container_movies">
                <Link to="/movies" className={location === "/movies" ? "header__account header__account_bold" : "header__account"}>Фильмы</Link>
                <Link to="/saved-movies" className={location === "/saved-movies" ? "header__account header__account_bold" : "header__account"}>Сохраненные фильмы</Link>
            </div>
            <div className="header__container_movies">
                <Link to="/profile" className="header__account">Аккаунт</Link>

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
                            <Link to="/" className="menu__item">Главная</Link>
                        </li>
                        <li>
                            <Link to="/movies" className="menu__item">Фильмы{" "}</Link>
                        </li>
                        <li>
                            <Link to="/saved-movies" className="menu__item">{" "}Сохраненные фильмы{" "}</Link>
                        </li>
                        <li>
                            <div className="menu__container">
                                <Link to="/profile" className="menu__link">Аккаунт</Link>
                                <Link to="/profile" className="header__link">
                                    <img src={userIcon} alt="иконка" className="header__icon" />
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Headmovies;