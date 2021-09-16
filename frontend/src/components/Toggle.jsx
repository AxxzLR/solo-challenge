import React, { useState } from "react";
import "../assets/styles/Components/Toggle.scss";

const Toggle = ({ initial = false, handleToggle }) => {
  const [toggleState, change] = useState(initial);
  const actualClass = !toggleState ? "Toggle" : "Toggle--active";

  const onToggle = () => {
    if (handleToggle) handleToggle(!toggleState);
    change(!toggleState);
  };
  return (
    <div onClick={onToggle} className={actualClass}>
      <div className="Toggle__dot"></div>
    </div>
  );
};

export default Toggle;
