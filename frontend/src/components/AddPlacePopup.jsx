import React from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";
import ErrorMessage from "./ErrorMessage";

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const { values, errors, isValid, handleChange, setValues, setErrors, setIsValid } = useForm({});

  React.useEffect(() => {
    setValues({});
  }, [isOpen, setValues]);

  React.useEffect(() => {
    setErrors({});
    setIsValid(false)
  }, [onClose, setErrors, setIsValid]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      button={onLoading ? `Сохранение...` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
    >
      <input
        type="text"
        placeholder="Название"
        className={`popup__input ${errors?.title && "popup__input_type_error"}`}
        name="title"
        minLength={2}
        maxLength={30}
        value={values.title || ""}
        onChange={(evt) => {
          handleChange(evt);
        }}
        required
      />
      <ErrorMessage errors={errors}>{errors?.title}</ErrorMessage>
      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        className={`popup__input ${errors?.link && "popup__input_type_error"}`}
        value={values.link || ""}
        onChange={(evt) => {
          handleChange(evt);
        }}
        required
      />
      <ErrorMessage errors={errors}>{errors?.link}</ErrorMessage>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
