import React from "react";
import { connect } from "react-redux";
import { setEditorValues } from "../actions";
import { GetDateValue, GetStringDate, GetStringDate2 } from "../utils";
import "../assets/styles/Components/Editor.scss";
import FontAwesome from "./FontAwesome";

export const ModeEditTypes = {
  ADD: "ADD",
  UPDATE: "UPDATE",
};

const Editor = ({ EditorValues, ModeEditType, setEditorValues }) => {
  const onChangeValues = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setEditorValues({ key, value });
  };

  const onChangeDeadline = (event) => {
    const date = event.target.value;
    const vDate = GetDateValue(date);
    onChangeValues({
      target: { name: "deadLine", value: vDate },
    });
  };

  const onToggleElement = (name) => {
    if (!!name) {
      onChangeValues({
        target: { name, value: !EditorValues[name] },
      });
    }
  };

  const actualClassCompleted = !EditorValues.completed
    ? "Editor__pinned"
    : "Editor__pinned--active";
  const actualClassPinned = !EditorValues.important
    ? "Editor__pinned"
    : "Editor__pinned--active";

  return (
    <div className="Editor">
      <div className="Editor__section">
        <div className="Editor__input-container">
          <label>Título</label>
          <div className="Editor__input">
            <input
              className="Input--text"
              type="text"
              name="title"
              onInput={onChangeValues}
              placeholder="Título"
              value={EditorValues.title}
            />
          </div>
        </div>
        <FontAwesome
          handleClick={() => onToggleElement("completed")}
          classAdd={actualClassCompleted}
          nameIcon="fas fa-check"
        />
      </div>
      <div className="Editor__section">
        <div className="Editor__input-container">
          <label for="dpFechaLimite">Fecha límite</label>
          <input
            className="Editor__input--date"
            id="dpFechaLimite"
            name="deadLine"
            type="date"
            onInput={onChangeDeadline}
            value={
              EditorValues.deadLine ? GetStringDate2(EditorValues.deadLine) : ""
            }
          />
        </div>
        <FontAwesome
          handleClick={() => onToggleElement("important")}
          classAdd={actualClassPinned}
          nameIcon="fas fa-thumbtack"
        />
      </div>
      <div className="Editor__section">
        <div className="Editor__input-container">
          <label>Descripción</label>
          <div className="Editor__input">
            <textarea
              name="description"
              onInput={onChangeValues}
              placeholder="Descipción"
              value={EditorValues.description}
              className="Input--textarea"
            />
          </div>
        </div>
      </div>
      {ModeEditType === ModeEditTypes.UPDATE && (
        <div className="Editor__section">
          <div className="Editor__info">
            <p>{`Fecha de creación ${GetStringDate(EditorValues.created)}`}</p>
            <p>
              {`Última actualización ${GetStringDate(EditorValues.lastUpdate)}`}
            </p>
          </div>
          {/* <FontAwesome classAdd="Editor__pinned" nameIcon="fas fa-trash" /> */}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  EditorValues: state.Editor.values || {},
  ModeEditType: state.Editor.ModeEditType,
});

const mapDispatchToProps = {
  setEditorValues,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
