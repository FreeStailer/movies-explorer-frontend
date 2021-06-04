import React from "react";
import "../Register/Register.css";
import mainLogo from "../../images/logo.png";
import { Link } from "react-router-dom";
import Validation from "../../utils/Validation.js";
import Form from "../Form/Form.js";

function Register({ handleRegister }) {
  const formValidation = Validation();
  const { name, email, password } = formValidation.values;
  const { values, onFocus, handleChange, isFocused, errors } = formValidation;

  const submitHandle = (event) => {
    event.preventDefault();
    handleRegister(name, email, password);
    formValidation.resetForm();
  };

  return (
    <section className="register">
      <div className="register__form">
        <Link to="/">
          <img alt="лого" src={mainLogo} className="register__logo" />
        </Link>

        <p className="register__header">Добро пожаловать!</p>

        <Form submitText={{buttonText: "Зарегистрироваться", promt: "Уже зарегистрированны?",
              route: "/signin", linkText: "Войти"}}
              submitHandle={submitHandle} validation={formValidation} formName="register"
              children={
                <>
                  <label htmlFor="name">
                    <p className="register__label">Имя</p>
                  </label>

                  <input name="name" type="text" required minLength="2"
                    className={`register__input ${errors.name && "register__error"}`}
                    value={values.name || ""} onFocus={onFocus} onChange={handleChange}
                  />
                  <span className="register__error">{isFocused && errors.name}</span>

                  <label htmlFor="email">
                    <p className="register__label">E-mail</p>
                  </label>

                  <input name="email" type="email" required minLength="6"
                    className={`register__input ${errors.email && "register__error"}`}
                    value={values.email || ""} onFocus={onFocus} onChange={handleChange}
                  />
                  <span className="register__error">{isFocused && errors.email}</span>

                  <label htmlFor="password">
                    <p className="register__label">Пароль</p>
                  </label>
                  <input name="password" type="password" required minLength="2"
                    className={`register__input ${errors.password && "register__error"}`}
                    value={values.password || ""} onFocus={onFocus} onChange={handleChange}
                  />
                  <span className="register__error">{isFocused && errors.password}</span>
                </>
              }
        >
        </Form>  
      </div>
    </section>
  );
}

export default Register;