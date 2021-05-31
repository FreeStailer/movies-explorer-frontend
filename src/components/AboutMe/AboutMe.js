import React from "react";
import "./AboutMe.css";
import myPhoto from "../../images/avatar.png";


function AboutMe() {
  return (
    <div className="about-me"  id="about-me">
      <h2 className="about__title">Студент</h2>
      <div className="about__line" />

      <div className="about-me__info">
        <div className="about-me__text">
          <p className="about-me__name">Алексей</p>
          <p className="about-me__profession">Фронтенд-разработчик, 38 лет</p>
          <p className="about-me__description">
            Образование гуманитарное, но жизненый путь направился в ИТ-сферу.
            В настоящее время работаю в ООО "РН-Карт" в отделе обеспечения
            процессинга (обеспечение бесперебойности обслуживания топливных карт).
            Так же дополнительно тестирую приложение (QA) по оплате топлива.
            Очень много приходится сталкиваться с работой сайтов, но сделать ранее 
            ничего не мог, а Практикум помог сделать невероятное.
          </p>
          <div className="about-me__social">
            <a href="https://www.facebook.com/aleksey.suslin/" className="about-me__link" target="blank">Facebook</a>
            <a href="https://github.com/freestailer" className="about-me__link" target="blank">Github</a>
          </div>
        </div>
        <img className="about-me__avatar" src={myPhoto} alt="аватар"></img>
      </div>
    </div>
  );
}

export default AboutMe;