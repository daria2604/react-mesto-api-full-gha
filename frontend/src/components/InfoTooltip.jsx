import React from "react";
import successIcon from "../images/approve-icon.svg";
import failureIcon from "../images/disapprove-icon.svg";
import Popup from "./Popup";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <Popup name={"tooltip"} isOpen={isOpen} onClose={onClose}>
      <div className="popup__info">
        {isSuccess ? (
          <img
            src={successIcon}
            alt="Черный крест в черном круге"
            className="popup__info-icon"
          />
        ) : (
          <img
            src={failureIcon}
            alt="Красный крест в красном круге"
            className="popup__info-icon"
          />
        )}
        <div className="popup__info-container">
          {isSuccess ? (
            <p className="popup__info-text">Вы успешно зарегистрировались!</p>
          ) : (
            <p className="popup__info-text">
              Что-то пошло не так! Попробуйте ещё раз.
            </p>
          )}
        </div>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
