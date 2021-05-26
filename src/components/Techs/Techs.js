import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <div className="techs" id="techs">
      <h2 className="about__title">Технологии</h2>
      <div className="about__line" />
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили<br /> в
        дипломном проекте.
      </p>
      <ul className="techs__list techs__list_item">
        <li className="techs__item">HTML</li>
        <li className="techs__item">CSS</li>
        <li className="techs__item">JS</li>
        <li className="techs__item">React</li>
        <li className="techs__item">Git</li>
        <li className="techs__item">Express.js</li>
        <li className="techs__item">mongoDB</li>
      </ul>
    </div>
  );
}

export default Techs;