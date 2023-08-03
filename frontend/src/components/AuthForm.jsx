import React from "react";
import useForm from "../hooks/useForm";

function AuthForm({ title, button, onSubmit, ...props }) {
  const { values, handleChange, setValues } = useForm({});

  React.useEffect(() => {
    setValues({});
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values.email, values.password);
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h3 className="auth__heading">{title}</h3>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={values.email || ""}
          className="auth__input auth__input_type_email"
          onChange={(evt) => {
            handleChange(evt);
          }}
          autoComplete="off"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          value={values.password || ""}
          className="auth__input auth__input_type_password"
          onChange={(evt) => {
            handleChange(evt);
          }}
          autoComplete="off"
          required
        />
        <button type="submit" className="auth__submit-button">
          {button}
        </button>
      </form>
      {props.children}
    </div>
  );
}

export default AuthForm;
