import React from "react";
import Popup from "./Popup";

function ImagePopup({ card, onClose }) {
  return (
    <Popup name={"image"} isOpen={card.link} onClose={onClose}>
      <div className="popup__wrap">
        <img className="popup__image" alt={card.name} src={card.link} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </Popup>
  );
}

export default ImagePopup;
