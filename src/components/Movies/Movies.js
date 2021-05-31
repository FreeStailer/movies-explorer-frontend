import React from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import More from "../More/More.js";
import Preloader from "../Preloader/Preloader.js";


function Movies() {
    return(
        <>
            <SearchForm />
            <MoviesCardList />
            <More />
            <Preloader />
        </>
    );
}

export default Movies;