import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <div className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <div className="portfolio__menu">
        <p className="portfolio__text">Статичный сайт</p>
        <a href="https://github.com/freestailer/how-to-learn" target="blank" className="portfolio__link">
          ↗
        </a>
      </div>
      <div className="portfolio__line" />
      <div className="portfolio__menu">
        <p className="portfolio__text">Адаптивный сайт</p>
        <a href="https://github.com/freestailer/mesto_functional" target="blank" className="portfolio__link">
          ↗
        </a>
      </div>
      <div className="portfolio__line" />
      <div className="portfolio__menu">
        <p className="portfolio__text">Одностраничное приложение</p>
        <a href="https://github.com/freestailer/russian-travel" target="blank" className="portfolio__link">
          ↗
        </a>
      </div>
    </div>
  );
}

export default Portfolio;