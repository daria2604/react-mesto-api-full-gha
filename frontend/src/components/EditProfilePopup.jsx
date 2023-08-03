import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";
import ErrorMessage from "./ErrorMessage";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    values,
    errors,
    handleChange,
    setValues,
    setIsValid,
    setErrors,
    isValid,
  } = useForm({});

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    });
    setIsValid(true);
  }, [currentUser, isOpen, setIsValid, setValues]);

  React.useEffect(() => {
    setErrors({});
  }, [onClose, setErrors]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      button={onLoading ? `Сохранение...` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
    >
      <input
        type="text"
        placeholder="Имя"
        className={`popup__input ${errors?.name && "popup__input_type_error"}`}
        name="name"
        minLength={2}
        maxLength={40}
        value={values.name || ""}
        onChange={(evt) => {
          handleChange(evt);
        }}
        required
      />
      <ErrorMessage errors={errors}>{errors?.name}</ErrorMessage>
      <input
        type="text"
        placeholder="О себе"
        className={`popup__input ${errors?.about && "popup__input_type_error"}`}
        name="about"
        minLength={2}
        maxLength={200}
        value={values.about || ""}
        onChange={(evt) => {
          handleChange(evt);
        }}
        required
      />
      <ErrorMessage errors={errors}>{errors?.about}</ErrorMessage>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
