import React from "react";
import "../assets/styles/Components/SearchBar.scss";
import FontAwesome from "./FontAwesome";

const SearchBar = ({
  handleInput,
  handleClose,
  handleClean,
  enabled = false,
  searchValue = "",
}) => {
  const actualClass = !enabled ? "SearchBar" : "SearchBar--active";

  return (
    <div className={actualClass}>
      <div className="SearchBar__container">
        <div onClick={handleClose} className="SearchBar__icon">
          <FontAwesome nameIcon="fas fa-arrow-circle-left" />
        </div>
        <input
          className="SearchBar__input"
          placeholder="Buscar..."
          onInput={handleInput}
          value={searchValue}
        />
        <div onClick={handleClean} className="SearchBar__icon">
          <FontAwesome nameIcon="fas fa-trash-alt" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
