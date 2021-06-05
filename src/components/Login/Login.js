import React from "react";
import "./Login.css";
import mainLogo from "../../images/logo.png";
import { Link } from "react-router-dom";
import Validation from "../../utils/Validation.js";
import Form from "../Form/Form.js";

function Login({ handleLogin }) {

  const formValidation = Validation();
  const { email, password } = formValidation.values;
  const { values, onFocus, handleChange, isFocused, errors } = formValidation;


  const submitHandle = (event) => {
    event.preventDefault();
    handleLogin(email, password);
    formValidation.resetForm();
  }

  return (
    <section className="login">
      <div className="login__form">
        <Link to="/">
          <img alt="лого" src={mainLogo} className="login__logo" />
        </Link>

        <p className="login__header">Рады видеть!</p>

        <Form submitText={{ buttonText: "Войти", promt: "Ещё не зарегистрированы?",
                            route: "/signup", linkText: "Регистрация",
                          }}
              submitHandle={submitHandle} validation={formValidation} formName="login"
              children={
                <>
                  <label htmlFor="email">
                    <p className="login__label">E-mail</p>
                  </label>

                  <input name="email" type="email" required value={values.email || ""}
                         className={`login__input ${errors.email && 'login__error'}`}
                         onFocus={onFocus} onChange={handleChange} minLength="6" />
                  <span className="login__error">{isFocused && errors.email}</span>

                  <label htmlFor="password">
                    <p className="login__label">Пароль</p>
                  </label>

                  <input name="password" type="password" required minLength="2"
                    className={`login__input ${errors.password && 'login__error'}`}
                    value={values.password || ''} onFocus={onFocus} onChange={handleChange} />
                  <span className="login__error">{isFocused && errors.password}</span>
                </>
              }
        />
      </div>
    </section>
  );
}

export default Login;