import React from "react";
import "../assets/styles/Components/Sorting.scss";
import { connect } from "react-redux";
import { setSortDirection, setSortingType } from "../actions";
import FontAwesome from "./FontAwesome";

export const SortingTypes = {
  DEADLINE: { value: "DEADLINE", text: "Fecha límite" },
  TITLE: { value: "TITLE", text: "Título" },
  CREATED: { value: "CREATED", text: "Fecha de creación" },
};

export const SortDirectionTypes = {
  ASC: "ASC",
  DESC: "DESC",
};

const Sorting = ({
  SortingType,
  SortDirectionType,
  setSortDirection,
  setSortingType,
}) => {
  const arrSort = Object.entries(SortingTypes);
  let iconDirection = "";
  switch (SortDirectionType) {
    case SortDirectionTypes.ASC:
      iconDirection = "fas fa-sort-alpha-down";
      break;
    case SortDirectionTypes.DESC:
      iconDirection = "fas fa-sort-alpha-up";
      break;
  }

  const toggleDirection = () => {
    switch (SortDirectionType) {
      case SortDirectionTypes.ASC:
        setSortDirection(SortDirectionTypes.DESC);
        break;
      case SortDirectionTypes.DESC:
        setSortDirection(SortDirectionTypes.ASC);
        break;
    }
  };

  const changeType = (event) => {
    const text = event.target.value;
    setSortingType(text);
  };

  return (
    <div className="Sorting">
      <select
        onChange={changeType}
        className="Sorting__select"
        value={SortingType}
      >
        {arrSort.map((x) => {
          const sortingItem = SortingTypes[x[0]];
          return (
            <option key={x[0]} value={sortingItem.value}>
              {sortingItem.text}
            </option>
          );
        })}
      </select>
      <FontAwesome
        handleClick={toggleDirection}
        classAdd="Sorting__direction"
        nameIcon={iconDirection}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  SortingType: state.Settings.Sort.SortingType,
  SortDirectionType: state.Settings.Sort.SortDirectionType,
});

const mapDispatchToProps = {
  setSortDirection,
  setSortingType,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
