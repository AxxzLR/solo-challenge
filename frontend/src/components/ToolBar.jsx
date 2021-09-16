import React from "react";
import { connect } from "react-redux";
import "../assets/styles/Components/ToolBar.scss";
import ToolBarItem from "../components/ToolBarItem";
import { ItemTypes } from "../components/ToolBarItem";
import { ViewTypes } from "../components/TaskList";
import { setViewType, setEnabledSearch, setSearchText } from "../actions";
import SearchBar from "./SearchBar";

const ToolBar = ({
  openFilters,
  openSorting,
  openEditor,
  ViewType,
  SearchEnabled,
  SearchText,
  setViewType,
  setEnabledSearch,
  setSearchText,
}) => {
  let iconView = "";
  let titleView = "";
  switch (ViewType) {
    case ViewTypes.BOARD_VIEW:
    default:
      iconView = "fas fa-th-large";
      titleView = "Tablero";
      break;
    case ViewTypes.LIST_VIEW:
      iconView = "fas fa-list-ul";
      titleView = "Lista";
      break;
  }

  const toggleView = () => {
    switch (ViewType) {
      case ViewTypes.BOARD_VIEW:
        setViewType(ViewTypes.LIST_VIEW);
        break;
      case ViewTypes.LIST_VIEW:
        setViewType(ViewTypes.BOARD_VIEW);
        break;
    }
  };

  const enableSearch = () => {
    setEnabledSearch(true);
  };

  const disableSearch = () => {
    setEnabledSearch(false);
  };

  const cleanSearch = () => {
    setSearchText("");
  };

  const onInputSearch = (event) => {
    const text = event.target.value;
    setSearchText(text);
  };

  return (
    <div className="ToolBar">
      <ToolBarItem
        nameIcon="fas fa-search"
        title="Buscar"
        handleClick={enableSearch}
      />
      <ToolBarItem
        nameIcon="fas fa-sort"
        title="Ordenar"
        handleClick={openSorting}
      />
      <ToolBarItem
        nameIcon="fas fa-plus-circle"
        title="Agregar"
        active={true}
        handleClick={openEditor}
      />
      <ToolBarItem
        nameIcon="fas fa-sliders-h"
        title="Filtrar"
        handleClick={openFilters}
      />
      <ToolBarItem
        nameIcon={iconView}
        title={titleView}
        handleClick={toggleView}
      />
      <SearchBar
        enabled={SearchEnabled}
        handleClose={disableSearch}
        handleInput={onInputSearch}
        handleClean={cleanSearch}
        searchValue={SearchText}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  ViewType: state.Settings.ViewType,
  SearchEnabled: state.Settings.Search.enabled,
  SearchText: state.Settings.Search.text,
});

const mapDispatchToProps = {
  setViewType,
  setEnabledSearch,
  setSearchText,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
