import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import testpic from "../../images/test.png";
import moviesIconCard from "../../images/save_icon.svg";
import moviesSavedCardIcon from "../../images/saved_icon.svg";
import deleteCardIcon from "../../images/delete_icon.svg";


function MoviesCard() {
  const isAdded = false; // стейт true или false для проверки кнопочки
  const moviesIcon = (isAdded ? moviesIconCard : moviesSavedCardIcon)
  //отследим адресную строку и если в сохраненном вместо галки крестик сделаем
  const { pathname } = useLocation();
  const cardIcon = (pathname === "/movies" ? moviesIcon : deleteCardIcon)



  return (
    <>
        <li className="grid__item">
            <div className="grid__text-container">
                <div className="grid__name-block">
                    <p className="grid__text">Мужик сидит</p>
                </div>
                <p className="grid__duration">158мин</p>
            </div>
            <img src={testpic} alt="изображение фильма" className="grid__image" />
            <img alt="иконка карточки" className="grid__icon" src={cardIcon} />
        </li>
    </>
  );
}

export default MoviesCard;