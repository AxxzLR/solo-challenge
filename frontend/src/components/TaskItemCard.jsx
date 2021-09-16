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
    <div className="TaskItemCard" onClick={onEdit}>
      <div className="TaskItemCard__container">
        <p className="TaskItemCard__title">{title}</p>
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
        <FontAwesome
          handleClick={onPin}
          classAdd={actualClassPinned}
          nameIcon="fas fa-thumbtack"
        />
      </div>
    </div>
  );
};

export default TaskItemCard;
