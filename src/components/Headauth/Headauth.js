import React from "react";
import { Link } from "react-router-dom";

function Headauth() {
    return(
            <div className="header__container_auth">
                <Link to="/signup" className="header__signup">Регистрация</Link>
                <Link to="/signin">
                <button className="header__button">Войти</button>
                </Link>
            </div>
    )
}

export default Headauth;