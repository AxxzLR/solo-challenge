import React, { useEffect, useState } from "react";
import { Api } from "../utils/Api";
import { connect } from "react-redux";
import { setToDos, setEditorConfig, cleanEditorConfig } from "../actions";
import duck from "../assets/static/rubber-duck.svg";
import "../assets/styles/Home.scss";
import Filters from "../components/Filters";
import Modal from "../components/Modal";
import Sorting from "../components/Sorting";
import TaskList from "../components/TaskList";
import ToolBar from "../components/ToolBar";
import Editor, { ModeEditTypes } from "../components/Editor";

const Home = ({
  setToDos,
  ToDos,
  EditorSettings,
  setEditorConfig,
  cleanEditorConfig,
}) => {
  useEffect(async () => {
    //carga inicial de ToDos
    const result = await Api.Todos.GetAll();
    if (!result.hasError) setToDos(result.data);
  }, []);

  //#region Manejo de estado de los Modals
  const [swhoFilters, setShowFilters] = useState(false);
  const [showSorting, setShowSorting] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  //#endregion

  //#region Metodos de administracion ToDos
  const UpdateToDo = async (id = 0, changes = []) => {
    if (!!id && !!changes) {
      let uItem = ToDos.filter((x) => x.id === id)[0];
      if (!!uItem) {
        changes.forEach((x) => {
          if (uItem.hasOwnProperty(x.key))
            uItem = {
              ...uItem,
              [x.key]: x.value,
            };
        });

        const result = await Api.Todos.Update(id, uItem);
        if (!result.hasError) setToDos(result.data);
      }
    }
  };

  const onSaveToDo = async () => {
    console.log("Guardando", EditorSettings);
    if (!EditorSettings.values.title) {
      alert("Escribe un título");
      return;
    }
    switch (EditorSettings.ModeEditType) {
      case ModeEditTypes.ADD:
        //Agregar
        const result = await Api.Todos.Create(EditorSettings.values);
        if (!result.hasError) setToDos(result.data);
        break;
      case ModeEditTypes.UPDATE:
        const arrValues = Object.entries(EditorSettings.values).map((x) => {
          return { key: x[0], value: x[1] };
        });

        UpdateToDo(EditorSettings.values.id, arrValues);

        console.log(arrValues);
        //Guardar
        break;
    }
    CloseEditor();
  };
  //#endregion

  //#region Estado del editor
  const OpenEditor = (modeEdit = ModeEditTypes.ADD, id = null) => {
    console.log(id);
    let values = {
      id,
      title: "",
      description: "",
      completed: false,
      important: false,
      deadLine: null,
      created: null,
      lastUpdate: null,
    };

    //Item a actualizar
    if (modeEdit === ModeEditTypes.UPDATE && !!id)
      values = ToDos.filter((x) => x.id === id)[0];

    setEditorConfig({ modeEdit, values });
    setShowEditor(true);
  };

  const CloseEditor = () => {
    //Saneamiento del editor y del estado
    cleanEditorConfig();
    setShowEditor(false);
  };
  //#endregion

  return (
    <>
      <div className="TitleBar">
        <p className="TitleBar__title">To Duck</p>
        <img src={duck} alt="duck" className="TitleBar__img" />
      </div>
      <ToolBar
        openFilters={() => setShowFilters(true)}
        openSorting={() => setShowSorting(true)}
        openEditor={() => OpenEditor()}
      />
      <TaskList UpdateToDo={UpdateToDo} OpenEditor={OpenEditor} />
      {/* Filtros */}
      <Modal
        show={swhoFilters}
        title="Filtros"
        content={<Filters />}
        handleClose={() => setShowFilters(false)}
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
        content={<Editor />}
        handleClose={CloseEditor}
        confirmTitle="Guardar"
        handleConfirm={onSaveToDo}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  EditorSettings: state.Editor,
  ToDos: state.ToDos,
});

const mapDispatchToProps = {
  setToDos,
  setEditorConfig,
  cleanEditorConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
