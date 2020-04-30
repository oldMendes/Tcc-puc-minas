import React from "react";

export const AtivosTable = ({ data }) => {
  const rows = data.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.phone}</td>
        <td>{row.email}</td>
      </tr>
    );
  });

  return (
    <table className="table table-houver">
      <thead>
        <tr>
          <th scope="col"> Nome </th>
          <th scope="col"> Telefone </th>
          <th scope="col"> E-mail </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
export default AtivosTable;
