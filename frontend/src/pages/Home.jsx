import React, { useState } from "react";
import duck from "../assets/static/rubber-duck.svg";
import "../assets/styles/Home.scss";
import Filters from "../components/Filters";
import Modal from "../components/Modal";
import Sorting from "../components/Sorting";
import TaskList from "../components/TaskList";
import ToolBar from "../components/ToolBar";

const Home = () => {
  const [swhoFilters, setShowFilters] = useState(false);
  const [showSorting, setShowSorting] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  // const cleanFilters = () => {
  //   console.log("LimpiarFiltros");
  // };
  return (
    <>
      <div className="TitleBar">
        <p className="TitleBar__title">To Duck</p>
        <img src={duck} alt="duck" className="TitleBar__img" />
      </div>
      <ToolBar
        openFilters={() => setShowFilters(true)}
        openSorting={() => setShowSorting(true)}
        openEditor={() => setShowEditor(true)}
      />
      <TaskList />
      {/* Filtros */}
      <Modal
        show={swhoFilters}
        title="Filtros"
        content={<Filters />}
        handleClose={() => setShowFilters(false)}
        // secondaryTitle="Limpiar"
        // handleSecondary={cleanFilters}
      />
      {/* Ordenar */}
      <Modal
        show={showSorting}
        title="Ordenar"
        content={<Sorting />}
        handleClose={() => setShowSorting(false)}
      />
      {/* Editor */}
      <Modal
        show={showEditor}
        title="To Do"
        content={<p>editor</p>}
        handleClose={() => setShowEditor(false)}
      />
    </>
  );
};

export default Home;
