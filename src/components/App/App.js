import React from 'react';
import { Route, Switch } from 'react-router-dom';
import "./App.css";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
// import Movies from "../Movies/Movies.js";
// import Login from "../Login/Login.js";
// import Register from "../Register/Register.js";
// import Profile from "../Profile/Profile.js";
// import NotFoundPage from "../NotFoundPages/NotFoundPages.js";

function App() {

    return (
        <div className="page">
            <div className="page__content">
            <Switch>
                <Route path="/">
                    <Header />
                    <Main />
                    <Footer />
                </Route>
            </Switch>
                {/* <Switch>
                    <Route path={'/'}>
                        <Header />
                        <Main />
                        <Footer />
                    </Route>
                    <Route path={'/movies'}>
                        <Header />
                        <Movies />
                        <Footer />
                    </Route>
                    <Route path={'/saved-movies'}>
                        <Header />
                        <Movies />
                        <Footer />
                    </Route>
                    <Route path={'/profile'}>
                        <Header />
                        <Profile />
                    </Route>
                    <Route path={'/signin'}>
                        <Login />
                    </Route>
                    <Route path={'/signup'}>
                        <Register />
                    </Route>
                    <Route path={'*'}>
                        <NotFoundPage />
                    </Route>
                </Switch> */}
            </div>
        </div>
    );
}

export default App;