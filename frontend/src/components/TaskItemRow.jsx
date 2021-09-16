import React from "react";
import { GetStringDate } from "../utils";
import "../assets/styles/Components/TaskItemRow.scss";
import FontAwesome from "./FontAwesome";

const TaskItemRow = ({
  title='',
  deadline,
  important=false,
  completed=false,
  onComplete,
  onPin,
  onEdit,
}) => {
  const actualClassPinned = !important
    ? "TaskItemRow__pinned"
    : "TaskItemRow__pinned--active";
  const actualClassCompleted = !completed
    ? "TaskItemRow__pinned"
    : "TaskItemRow__pinned--active";
  return (
    <div className="TaskItemRow" onClick={onEdit}>
      <p className="TaskItemRow__title">{title}</p>
      <div className="TaskItemRow__container">
        <p className="TaskItemRow__date">
          Fecha líimite: {GetStringDate(deadline) || "Sin asignar"}
        </p>
        <FontAwesome
          handleClick={onPin}
          classAdd={actualClassPinned}
          nameIcon="fas fa-thumbtack"
        />
        <FontAwesome
          handleClick={onComplete}
          classAdd={actualClassCompleted}
          nameIcon="fas fa-check"
        />
      </div>
    </div>
  );
};

export default TaskItemRow;
