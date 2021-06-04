import React from "react";
import "./MoviesCard.css";

function MoviesCard({ savedMovies, movie, onBookmarkClick, isSavedMovie }) {
  const { nameRU, duration, trailer, image } = movie;

  let isSaved = isSavedMovie(movie);

  function durationFormat(duration) {
    const hh = Math.trunc(duration / 60);
    const mm = duration % 60;
    return `${hh > 0 ? hh + "ч " : ""}${mm}м`;
  }

  // function handleBookmarkClick(evt) {
  //   evt.preventDefault();
  //   onBookmarkClick(movie, !isSaved);
  // }

  function handleBookmarkClick() {
    onBookmarkClick(movie, !isSaved);
  }

  function handleDelete() {
    onBookmarkClick(movie, false);
  }
  return (
        <li className="grid__item">
            <div className="grid__text-container">
                <div className="grid__name-block">
                    <p className="grid__text">{nameRU}</p>
                </div>
                <p className="grid__duration">{durationFormat(duration)}</p>
            </div>
            <a href={trailer}>
              <img src={image} alt="изображение фильма" className="grid__image" />
            </a>
            {savedMovies ? (
                  <button onClick={handleDelete} className="grid__icon grid__icon_del" />
                  ) : (
                  <button onClick={handleBookmarkClick} className={ isSaved ? "grid__icon grid__icon_saved" : "grid__icon grid__icon_unsaved"}
                />
            )}
            
        </li>
  );
}

export default MoviesCard;