import React from "react";
import { GetStringDate } from "../utils";
import "../assets/styles/Components/TaskItemCard.scss";
import FontAwesome from "./FontAwesome";

const TaskItemCard = ({
  title = "",
  deadline,
  important = false,
  completed = false,
  description = "",
  onComplete,
  onPin,
  onEdit,
  onDelete,
}) => {
  const actualClassPinned = !important
    ? "TaskItemCard__pinned"
    : "TaskItemCard__pinned--active";
  const actualClassCompleted = !completed
    ? "TaskItemCard__pinned"
    : "TaskItemCard__pinned--active";

  const eDescription =
    description.length > 70
      ? `${description.substring(0, 70)} ...`
      : description;

  return (
    <div className="TaskItemCard">
      <div className="TaskItemCard__container">
        <p className="TaskItemCard__title" onClick={onEdit}>
          {title}
        </p>
        <FontAwesome
          handleClick={onComplete}
          classAdd={actualClassCompleted}
          nameIcon="fas fa-check"
        />
      </div>
      <div className="TaskItemCard__container">
        <p>{eDescription}</p>
      </div>
      <div className="TaskItemCard__container">
        <p className="TaskItemCard__date">
          Fecha líimite: {GetStringDate(deadline) || "Sin asignar"}
        </p>
        <div className="TaskItemCard__actions">
          <FontAwesome
            handleClick={onPin}
            classAdd={actualClassPinned}
            nameIcon="fas fa-thumbtack"
          />
          <FontAwesome
            handleClick={onDelete}
            classAdd="TaskItemCard__pinned"
            nameIcon="fas fa-trash"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskItemCard;
