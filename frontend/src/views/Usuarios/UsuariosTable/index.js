import React from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
export const UsuariosTable = ({ data, editar, deletar, ...props }) => {
  const rows = data.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.nome}</td>
        <td>{row.email}</td>
        <td>ADMINISTRADOR</td>
      </tr>
    );
  });

  return (
    <table className="table table-houver">
      <thead>
        <tr>
          <th scope="col"> Nome </th>
          <th scope="col"> Email </th>
          <th scope="col"> Perfil </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default UsuariosTable;
