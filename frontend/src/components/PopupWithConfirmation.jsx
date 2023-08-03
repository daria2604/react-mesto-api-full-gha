import React from "react"
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function PopupWithConfirmation({ card, isOpen, onClose, onConfirm  }) {
  const { isValid, setIsValid } = useForm({})

  React.useEffect(() => {
    setIsValid(true)
  }, [isOpen])

  function handleSubmit(evt) {
    evt.preventDefault()
    onConfirm(card)
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      button="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
    />
  )
};

export default PopupWithConfirmation;
