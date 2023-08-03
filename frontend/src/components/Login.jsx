import React from "react";
import AuthForm from "./AuthForm";

function Login(props) {
  function handleSubmit(email, password) {
    props.onLogin(email, password)
  }

  return <AuthForm
    title="Вход"
    button="Войти"
    onSubmit={handleSubmit}
  />;
}

export default Login;
