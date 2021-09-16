import React from "react";
import "../assets/styles/Components/Modal.scss";

const Modal = ({
  show = false,
  title = "",
  content,
  handleClose,
  secondaryTitle = "",
  handleSecondary,
}) => {
  const actualClass = !show ? "Modal" : "Modal--active";
  return (
    <div className={actualClass}>
      <div className="Modal__container">
        <div className="Modal__header">
          <p className="Modal__title">{title}</p>
        </div>
        <div className="Modal__body">{content}</div>
        <div className="Modal__footer">
          {!!secondaryTitle && (
            <button className="Modal__close" onClick={handleSecondary}>
              {secondaryTitle}
            </button>
          )}
          <button className="Modal__close" onClick={handleClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
