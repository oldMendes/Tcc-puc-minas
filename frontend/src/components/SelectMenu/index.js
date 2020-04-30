import React from "react";

export const SelectMenu = ({ lista, ...props }) => {
  const options = lista.map((option, index) => {
    return (
      <option key={index} value={option.value}>
        {" "}
        {option.label}{" "}
      </option>
    );
  });
  return <select {...props}>{options}</select>;
};

export default SelectMenu;
