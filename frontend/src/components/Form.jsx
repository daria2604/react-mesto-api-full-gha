import React from "react"

function Form({ name, title, onSubmit, button, isValid, children }) {
  return (
    <form
      className={`popup__form popup__form_type_${name}`}
      name={`${name}Form`}
      autoComplete="off"
      onSubmit={onSubmit}
      noValidate
    >
      <h3 className={`popup__heading popup__heading_type_${name}`}>{title}</h3>
      {children}
      <button
        type="submit"
        className={`popup__submit-button ${!isValid && 'popup__submit-button_disabled'} popup__submit-button_type_${name}`}
        disabled={!isValid}
      >
        {button || 'Сохранить'}
      </button>
    </form>
  )
};

export default Form;
