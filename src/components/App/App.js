import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import "./App.css";
import apiMain from "../../utils/MainApi";
import apiMovies from "../../utils/MoviesApi";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import Movies from "../Movies/Movies.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import Profile from "../Profile/Profile.js";
import NotFoundPage from "../NotFoundPages/NotFoundPages.js";

//попап надо попробовать сделать, 
//дизайн так и требует сообщения зарегались или нет,
//но вроде не нужен по фигме
//сделаем по образцу проекта МЕСТО
import Popup from "../Popup/Popup.js";
import successLogin from "../../images/nice.svg";
import failedLogin from "../../images/error.svg";


function App() {

    const history = useHistory();
    let location = useLocation();

    const [isLogin, setIsLogin] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});

    const [isPopupOpen, setIsPopupOpen] = React.useState(false); //status popupa
    const [message, setMessage] = React.useState({ icon: "", text: ""}); //text popupa

    function closeAllPopups() {
        setIsPopupOpen(false);
    }

    const handlePopupContent = ({ icon, text}) => {
        setMessage({ icon: icon, text: text})
    }

    //preloader
    const [isLoading, setIsLoading] = React.useState(false);
    //oshibka uploada c servera
    const [loadingError, setLoadingError] = React.useState("");

    // get user data
    function getCurrentUser() {
        const token = localStorage.getItem("token");
        apiMain.getCurrentUser(token)
        .then((res) => {
            if (res) {
                setCurrentUser(res);
                localStorage.setItem("currentUser", JSON.stringify(res));
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    //validatcia tokena
    React.useEffect(() => {
        const token = localStorage.getItem("token");
        const path = location.pathname;
        if (token) {
            apiMain.checkToken(token)
            .then((res) => {
                if (res) {
                    setIsLogin(true);
                    getCurrentUser();
                    history.push(path);
                }
            })
            .catch((err) => {
                console.log("Ошибка токена" + err);
                localStorage.removeItem("token");
                history.push("/");
            });
        }
    }, []);

     // регистрация пользователя
  function handleRegister(name, email, password) {
    apiMain
      .register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(email, password);
          setIsPopupOpen(true);
          handlePopupContent({
            iconPath: successLogin,
            text: "Вы успешно зарегистрировались!",
          });
          setTimeout(closeAllPopups, 2500);
        }
      })
      .catch((err) => {
        if (err.status === 409) {
          setIsPopupOpen(true);
          handlePopupContent({
            iconPath: failedLogin,
            text: "Такой email уже существует",
          });
        } else {
          setIsPopupOpen(true);
          handlePopupContent({
            iconPath: failedLogin,
            text: "Что-то пошло не так! Попробуйте ещё раз.",
          });
          setTimeout(closeAllPopups, 2500);
        }
      });
  }

  function handleLogin(email, password) {
    apiMain
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setIsLogin(true);
          getCurrentUser();
          history.push("/movies");
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          setIsPopupOpen(true);
          handlePopupContent({
            iconPath: failedLogin,
            text: "Неверный email или пароль",
          });
          setTimeout(closeAllPopups, 2500);
        } else {
          setIsPopupOpen(true);
          handlePopupContent({
            iconPath: failedLogin,
            text: "Что-то пошло не так!",
          });
          setTimeout(closeAllPopups, 2500);
        }
      });
  }

  // Выход
  function handleLogout() {
    setIsLogin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("initialMovies");
    localStorage.removeItem("savedMovies");
    setInitialMovies([]);
    setSavedMovies([]);
    setFilterMovies([]);
    setFilterSavedMovies([]);
    history.push("/");
  }

  // обновление информации о юзере
  function handleEditProfile(data) {
    apiMain
      .editProfile(data)
      .then((profile) => {
        setCurrentUser(profile);
        setIsPopupOpen(true);
        handlePopupContent({
          iconPath: successLogin,
          text: "Информация обновлена",
        });
        setTimeout(history.push, 3000, "/profile");
        setTimeout(closeAllPopups, 2500);
      })
      .catch((err) => {
        if (err.status === 409) {
          handlePopupContent({
            iconPath: failedLogin,
            text: "Такой email уже зарегистрирован",
          });
        } else {
          handlePopupContent({
            iconPath: failedLogin,
            text: "Что-то пошло не так!",
          });
        }
        setIsPopupOpen(true);
        setTimeout(closeAllPopups, 2500);
      });
  }

// Поиск фильма
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filterMovies, setFilterMovies] = React.useState([]);
  const [filterSavedMovies, setFilterSavedMovies] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const hasQuery = query.length !== 0;

  function getInitialMovies() {
    apiMovies
      .getAllMovies()
      .then((data) => {
        const initialArray = data.map((item) => {
          const imageURL = item.image ? item.image.url : "";
          return {
            ...item,
            image: `https://api.nomoreparties.co${imageURL}`,
            trailer: item.trailerLink,
          };
        });

        localStorage.setItem("initialMovies", JSON.stringify(initialArray));
        setInitialMovies(initialArray);
      })
      .catch(() => {
        localStorage.removeItem("initialMovies");
        setLoadingError(
          "Проблема с соединением или сервер недоступен. Пожалуйста, попробуйте ещё раз"
        );
      });
  }

  function getSavedMovies() {
    apiMain
      .getMovies()
      .then((data) => {
        const savedArray = data.map((item) => {
          return { ...item, id: item.movieId };
        });
        localStorage.setItem("savedMovies", JSON.stringify(savedArray));
        setSavedMovies(savedArray);
      })
      .catch(() => {
        localStorage.removeItem("savedMovies");
        setLoadingError(
          "Проблема с соединением или сервер недоступен. Пожалуйста, попробуйте ещё раз"
        );
      });
  }

  React.useEffect(() => {
    const initial = JSON.parse(localStorage.getItem("initialMovies"));
    if (initial) {
      setInitialMovies(initial);
    } else {
      getInitialMovies();
    }

    const saved = JSON.parse(localStorage.getItem("savedMovies"));
    if (saved) {
      setSavedMovies(saved);
    } else {
      getSavedMovies();
    }
  }, []);

  React.useEffect(() => {
    if (isLogin) {
      //после авторизации обновим данные для текущего пользователя
      getInitialMovies();
      getSavedMovies();
    }
  }, [isLogin]);

  function isSavedMovie(movie) {
    return savedMovies.some((item) => item.id === movie.id);
  }

  function filter(data, query) {
    if (query) {
      const regex = new RegExp(query, "gi");
      const filterData = data.filter((item) => {
        return regex.test(item.nameRU) || regex.test(item.nameEN);
      });
      if (filterData.length === 0) {
        setLoadingError("Ничего не найдено");
      } else {
        setLoadingError("");
      }
      return filterData;
    }
    return [];
  }

  function onSubmitSearch(query) {
    setIsLoading(true);
    setTimeout(() => {
      setQuery(query);
      setFilterMovies(filter(initialMovies, query));
      setIsLoading(false);
    }, 500);

  }

  function onSubmitSearchSaved(query) {
    setIsLoading(true);
    setTimeout(() => {
      setQuery(query);
      setFilterSavedMovies(filter(savedMovies, query));
      setIsLoading(false);
    }, 500);
  }

  //избранное
  function onBookmarkClick(movie, isMarked) {
    if (isMarked) {
      addMovie(movie);
    } else {
      deleteMovie(movie);
    }
  }

  //удаление из избранного
  function deleteMovie(movie) {
    const movieId = savedMovies.find((item) => item.id === movie.id)._id;
    console.log(movieId);
    apiMain
      .deleteMovies(movieId)
      .then(() => {
          setSavedMovies(savedMovies.filter(
            (item) => item._id !== movieId
          ));
      })
      .catch(() => {
        setIsPopupOpen(true);
        handlePopupContent({
          iconPath: failedLogin,
          text: "На сервере произошла ошибка",
        });
        setTimeout(closeAllPopups, 2500);
      });
  }

  //добавление в избранное
  function addMovie(movie) {
    apiMain
      .createMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res, id: res.movieId }]);
      })
      .catch(() => {
        setIsPopupOpen(true);
        handlePopupContent({
          iconPath: failedLogin,
          text: "На сервере произошла ошибка",
        });
        setTimeout(closeAllPopups, 2500);
      });
  }

  React.useEffect(() => {
    setFilterSavedMovies(filter(savedMovies, query));
    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  }, [savedMovies]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__content">
                <Switch>
                    <Route path='/' exact>
                        <Header isLogin={isLogin}/>
                        <Main />
                        <Footer />
                    </Route>

                    <ProtectedRoute path='/movies' exact component ={Movies} isLogin={isLogin} savedMovies={false}
                                    movies={hasQuery ? filterMovies : initialMovies} isLoading={isLoading}
                                    loadingError={loadingError} isSavedMovie={isSavedMovie} onSubmitSearch={onSubmitSearch}
                                    onBookmarkClick={onBookmarkClick}>
                    </ProtectedRoute>

                    <ProtectedRoute path='/saved-movies' exact>
                        <Header />
                        <Movies />
                        <Footer />
                    </ProtectedRoute>

                    <ProtectedRoute path='/profile' exact>
                        <Header />
                        <Profile />
                    </ProtectedRoute>

                    <Route path='/signin' exact>
                        <Login handleLogin={handleLogin}/>
                    </Route>
                    <Route path='/signup' exact>
                        <Register handleRegister={handleRegister} />
                    </Route>
                    <Route path='*'>
                        <NotFoundPage />
                    </Route>
                </Switch>

                <Popup isOpen = {isPopupOpen} onClose = {closeAllPopups} message = {message} />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;