import React from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export const AtivosTable = ({ data, editar, deletar }) => {
  const rows = data.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.phone}</td>
        <td>{row.email}</td>
        <td>
          <div style={{ display: "flex", flexDirection: "row", color: "blue" }}>
            <Tooltip title="Editar">
              <EditOutlined
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => editar(row.affectedId)}
              />
            </Tooltip>
            <Tooltip title="Deletar">
              <DeleteOutlined
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => deletar(row.affectedId)}
              />
            </Tooltip>
          </div>
        </td>
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
          <th scope="col"> Ações </th>
        </tr>
      </thead>
      <tbody>{rows || []}</tbody>
    </table>
  );
};
export default AtivosTable;
