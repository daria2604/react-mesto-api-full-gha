import React from "react"

function Popup({ name, isOpen, onClose, children }) {
  React.useEffect(() => {
    if(!isOpen) return;

    const closeByEscape = (evt) => {
      evt.key === 'Escape' && onClose();
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [isOpen, onClose])

  const handleOverlay = (evt) => {
    evt.target === evt.currentTarget && onClose();
  }

  return (
    <div
      className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}
      onMouseDown={handleOverlay}
    >
      <div className="popup__container">
        <button
          className="button button_action_close"
          type="button"
          onClick={onClose}
        />
       {children}
      </div>
    </div>
  )
};

export default Popup;
