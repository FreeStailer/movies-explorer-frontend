import React from "react";
import { Link } from "react-router-dom";

function Headauth() {
    return(
            <div className="header__container_auth">
                <Link to="/signup" className="header__signup">Регистрация</Link>
                <button className="header__button">Войти</button>
            </div>
    )
}

export default Headauth;