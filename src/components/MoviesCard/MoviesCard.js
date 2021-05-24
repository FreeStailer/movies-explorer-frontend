import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import testpic from "../../images/test.png";
import moviesIconCard from "../../images/save_icon.png";
import moviesSavedCardIcon from "../../images/saved_icon.png";
import deleteCardIcon from "../../images/delete_icon.png";


function MoviesCard() {


  const { pathname } = useLocation();
  const isAdded = false; // Поменять на false для проверки
  //Если фильм добавили в избранное
  const moviesIcon = (isAdded ? moviesIconCard : moviesSavedCardIcon)
  //  В зависимости от страницы карточек отображаем иконку "добавить" или иконку "удалить"
  const cardIcon = (pathname === "/movies" ? moviesIcon : deleteCardIcon)



  return (
    <>
        <li className="grid__item">
            <div className="grid__text-container">
                <div className="grid__name-block">
                    <p className="grid__text">Мужик сидит</p>
                </div>
                <p className="grid__duration">12 часов уже</p>
            </div>
            <img src={testpic} alt="изображение фильма" className="grid__image" />
            <img alt="иконка карточки" className="grid__icon" src={cardIcon} />
        </li>
    </>
  );
}

export default MoviesCard;