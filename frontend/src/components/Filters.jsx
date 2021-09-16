import React from "react";
import "../assets/styles/Components/Filters.scss";
import { connect } from "react-redux";
import { setEnabledSection, setDeadlineFilter } from "../actions";
import Toggle from "./Toggle";

export const SectionTypes = {
  OVERUDE: { name: "Overude", text: "Atrsado" },
  NEXT: { name: "Next", text: "Próximo" },
  NO_DUE_DATE: { name: "NoDueDate", text: "Sin asignar" },
  COMPLETED: { name: "Completed", text: "Completado" },
};

const Filters = ({
  FilterSections,
  FilterDeadline,
  setEnabledSection,
  setDeadlineFilter,
}) => {
  const arrFilters = Object.entries(SectionTypes);

  const toggleSection = (key, value) => {
    setEnabledSection({ key, value });
  };

  return (
    <div className="Filters">
      {arrFilters.map((x) => {
        const key = x[0];
        const item = x[1];
        return (
          <div key={key} className="Filters__toggle">
            <p>{item.text}</p>
            <Toggle
              initial={FilterSections[item.name]}
              handleToggle={(value) => toggleSection(item.name, value)}
            />
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  FilterSections: state.Settings.Filter.Sections,
  FilterDeadline: state.Settings.Filter.Deadline,
});

const mapDispatchToProps = {
  setEnabledSection,
  setDeadlineFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
