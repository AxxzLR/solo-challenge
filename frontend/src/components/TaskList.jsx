import React from "react";
import TaskItemRow from "../components/TaskItemRow";
import TaskItemCard from "../components/TaskItemCard";
import { connect } from "react-redux";
import { setToDos } from "../actions";
import "../assets/styles/Components/TaskList.scss";
import { SectionTypes } from "./Filters";
import { SortingTypes, SortDirectionTypes } from "./Sorting";
import Empty from "./Empty";
import { Api } from "../utils/Api";
import { ModeEditTypes } from "../components/Editor";

export const ViewTypes = {
  LIST_VIEW: "LIST_VIEW",
  BOARD_VIEW: "BOARD_VIEW",
};

const TaskList = ({ ToDos, Settings, setToDos, UpdateToDo, OpenEditor }) => {
  //#region Acondicionamiento de información
  const getStatus = (task) => {
    const now = Date.now();
    if (task.completed) return SectionTypes.COMPLETED.name;
    if (!task.deadLine) return SectionTypes.NO_DUE_DATE.name;
    if (now <= task.deadLine) return SectionTypes.NEXT.name;
    else return SectionTypes.OVERUDE.name;
  };

  //Filtrado
  let tasks = ToDos.map((x) => {
    const status = getStatus(x);
    return { ...x, status };
  });

  if (!Settings.Filter.Sections.Completed)
    tasks = tasks.filter((x) => x.status != SectionTypes.COMPLETED.name);
  if (!Settings.Filter.Sections.NoDueDate)
    tasks = tasks.filter((x) => x.status != SectionTypes.NO_DUE_DATE.name);
  if (!Settings.Filter.Sections.Next)
    tasks = tasks.filter((x) => x.status != SectionTypes.NEXT.name);
  if (!Settings.Filter.Sections.Overude)
    tasks = tasks.filter((x) => x.status != SectionTypes.OVERUDE.name);

  //Busqueda
  if (Settings.Search.text)
    tasks = tasks.filter(
      (x) =>
        x.title.toUpperCase().includes(Settings.Search.text.toUpperCase()) ||
        x.description.toUpperCase().includes(Settings.Search.text.toUpperCase())
    );

  //Ordenado
  switch (Settings.Sort.SortingType) {
    case SortingTypes.TITLE.value:
    default:
      tasks.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case SortingTypes.CREATED.value:
      tasks.sort((a, b) => a.created - b.created);
      break;
    case SortingTypes.DEADLINE.value:
      tasks.sort((a, b) => a.deadLine - b.deadLine);
      break;
  }

  if (Settings.Sort.SortDirectionType === SortDirectionTypes.DESC)
    tasks = tasks.reverse();

  //Armado de vistas
  const GetView = (tasks) => {
    switch (Settings.ViewType) {
      case ViewTypes.LIST_VIEW:
        return {
          pending: {
            title: "Pendiente",
            Tasks: tasks.filter((x) => !x.completed),
          },
          completed: {
            title: "Completado",
            Tasks: tasks.filter((x) => x.completed),
          },
        };
        break;
      case ViewTypes.BOARD_VIEW:
        let ret = {
          importants: {
            title: "Importantes",
            Tasks: tasks.filter((x) => x.important && !x.completed),
          },
        };
        Object.entries(SectionTypes).forEach((x) => {
          ret = {
            ...ret,
            [x[1].name]: {
              title: x[1].text,
              Tasks: tasks.filter((p) => p.status === x[1].name),
            },
          };
        });
        return ret;
        break;
    }
  };

  const data = Object.entries(GetView(tasks))
    .map((x) => x[1])
    .filter((x) => x.Tasks.length);
  //#endregion

  //#region Manejo de Tareas
  const DeleteToDo = async (id = 0) => {
    const result = await Api.Todos.Delete(id);
    if (!result.hasError) setToDos(result.data);
  };

  const ChangeCompletedToDo = (id = 0, value = false) => {
    UpdateToDo(id, [{ key: "completed", value }]);
  };

  const ChangePinedToDo = (id = 0, value = false) => {
    UpdateToDo(id, [{ key: "important", value }]);
  };

  //#endregion

  return (
    <div className="TaskList">
      {!data.length ? (
        <Empty />
      ) : (
        data.map((x) => (
          <div key={x.title} className="TaskList__section">
            <div className="Section__title">
              <p>{x.title}</p>
            </div>
            <div className="Section__container">
              {x.Tasks.map((p) => {
                switch (Settings.ViewType) {
                  case ViewTypes.LIST_VIEW:
                    return (
                      <TaskItemRow
                        key={p.id}
                        title={p.title}
                        deadline={p.deadLine}
                        important={p.important}
                        completed={p.completed}
                        onEdit={() => OpenEditor(ModeEditTypes.UPDATE, p.id)}
                        onDelete={() => DeleteToDo(p.id)}
                        onComplete={() =>
                          ChangeCompletedToDo(p.id, !p.completed)
                        }
                        onPin={() => ChangePinedToDo(p.id, !p.important)}
                      />
                    );
                  case ViewTypes.BOARD_VIEW:
                    return (
                      <TaskItemCard
                        key={p.id}
                        title={p.title}
                        deadline={p.deadLine}
                        important={p.important}
                        completed={p.completed}
                        description={p.description}
                        onEdit={() => OpenEditor(ModeEditTypes.UPDATE, p.id)}
                        onDelete={() => DeleteToDo(p.id)}
                        onComplete={() =>
                          ChangeCompletedToDo(p.id, !p.completed)
                        }
                        onPin={() => ChangePinedToDo(p.id, !p.important)}
                      />
                    );
                }
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ToDos: state.ToDos,
  Settings: state.Settings,
});

const mapDispatchToProps = {
  setToDos,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
