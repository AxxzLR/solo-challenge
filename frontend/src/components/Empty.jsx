import React from "react";

const Empty = () => {
  return (
    <div className="TaskList__empty">
      <p className="Empty__main">¡Esto parece estar vacio!</p>
      <p className="Empty__secondary">
        Empieza a crear una nueva tarea o cambia tu configuración de filtros
      </p>
    </div>
  );
};

export default Empty;
