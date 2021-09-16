import React from "react";

const FontAwesome = ({ nameIcon, classAdd = "", handleClick }) => {
  const actualClass = `${nameIcon} ${classAdd}`;
  return (
    <span onClick={handleClick}>
      <i className={actualClass}></i>
    </span>
  );
};

export default FontAwesome;
