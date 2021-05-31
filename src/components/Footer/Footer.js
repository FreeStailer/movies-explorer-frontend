import React from "react";
import "./Footer.css";

function Footer() {
    return(
        <footer className="footer">
            <div className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</div>
            <div className="portfolio__line" />
            <div className="footer__infobox">
                <p className="footer__copyright">© 2021</p>
                <ul className="footer__links">
                <li>
                    <a className="footer__link" href="https://praktikum.yandex.ru/" target="blank">Яндекс.Практикум</a>
                </li>
                <li>
                    <a className="footer__link" href="https://github.com/freestailer" target="blank">Github</a>
                </li>
                <li>
                    <a className="footer__link" href="https://www.facebook.com/aleksey.suslin/" target="blank">Facebook</a>
                </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;