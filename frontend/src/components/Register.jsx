import React from "react";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";

function Register(props) {
  function handleSubmit(email, password) {
    props.onRegister(email, password)
  }

  return (
    <AuthForm
      title="Регистрация"
      button="Зарегистрироваться"
      onSubmit={handleSubmit}
    >
      <div className="auth__signin">
        <p className="auth__caption">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="auth__link"> Войти</Link>
      </div>
    </AuthForm>
  );
}

export default Register;
