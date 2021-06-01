import React from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import "./Movies.css";
import Preloader from "../Preloader/Preloader.js";

import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";


function Movies({isLogin, savedMovies, onSubmitSearch, onBookmarkClick, movies, isLoading, loadingError, isSavedMovie}) {

    const [shortFilm, setShortFilm] = React.useState(false);

    function onFilterShort(filterOn) {
        setShortFilm(filterOn);
    }

    function filterShortFilm(movies) {
        return movies.filter((item) => {
            return item.duration < 40;
        })
    }

    return(
        <>
            <Header isLogin={isLogin} />

            <SearchForm onSubmitSearch={onSubmitSearch} onFilterShort={onFilterShort} isLoading={isLoading} />

            {isLoading && <Preloader />}

            {!isLoading && loadingError === '' &&
                <MoviesCardList savedMovies={savedMovies} isSavedMovie={isSavedMovie} onBookmarkClick={onBookmarkClick}
                                movies={shortFilm ? filterShortFilm(movies) : movies} />
            }
            
            {!isLoading && loadingError === '' && <div className="movies__info">{loadingError}</div>}

            <Footer />
            
        </>
    );
}

export default Movies;