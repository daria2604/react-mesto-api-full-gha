import React from "react"
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";
import ErrorMessage from "./ErrorMessage";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const avatarRef = React.useRef()
  const { errors, isValid, handleChange, setErrors, setIsValid } = useForm({})

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])

  React.useEffect(() => {
    setErrors({})
    setIsValid(false)
  }, [onClose, setErrors])

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({ avatar: avatarRef.current.value })
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      button={onLoading ? `Сохранение...` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
    >
      <input
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        className={`popup__input ${errors?.avatar && "popup__input_type_error"}`}
        defaultValue=""
        ref={avatarRef}
        onChange={evt => {handleChange(evt)}}
        required
      />
      <ErrorMessage errors={errors}>{errors?.avatar}</ErrorMessage>
    </PopupWithForm>
  )
};

export default EditAvatarPopup;
