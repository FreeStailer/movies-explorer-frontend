import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navigation">
      <ul className="navigation__menu">
        <li>
          <a href="#about" className="navigation__link">О проекте</a>{" "}
        </li>
        <li>
          <a href="#techs" className="navigation__link">Технологии</a>{" "}
        </li>
        <li>
          <a href="#about-me" className="navigation__link">Студент</a>{" "}
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;