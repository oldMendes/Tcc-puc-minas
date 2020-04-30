import React from "react";

const type = (tipo) => {
  switch (tipo) {
    case "EQUIPMENT":
      return "Equipamento";
    case "MACHINE":
      return "Máquina";
    case "INPUT":
      return "Insumo";
    default:
      break;
  }
};

export const AtivosTable = ({ data }) => {
  const rows = data.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.patrimony}</td>
        <td>{type(row.activeType)}</td>
        <td>{row.description}</td>
      </tr>
    );
  });

  return (
    <table className="table table-houver">
      <thead>
        <tr>
          <th scope="col"> Ativo </th>
          <th scope="col"> Patrimônio </th>
          <th scope="col"> Tipo de ativo </th>
          <th scope="col"> Descrição </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
export default AtivosTable;
