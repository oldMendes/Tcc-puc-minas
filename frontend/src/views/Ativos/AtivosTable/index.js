import React from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

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

export const AtivosTable = ({ data, editar, deletar, detalhes }) => {
  const rows = data.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.patrimony}</td>
        <td>{type(row.activeType)}</td>
        <td>{row.description}</td>

        <td>
          <div style={{ display: "flex", flexDirection: "row", color: "blue" }}>
            <Tooltip title="Editar">
              <EditOutlined
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => editar(row.activeId)}
              />
            </Tooltip>
            <Tooltip title="Deletar">
              <DeleteOutlined
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => deletar(row.activeId)}
              />
            </Tooltip>
            <Tooltip title="Ver detalhes">
              <EyeOutlined
                style={{ cursor: "pointer" }}
                onClick={() => detalhes(row.activeId)}
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
          <th scope="col"> Ativo </th>
          <th scope="col"> Patrimônio </th>
          <th scope="col"> Tipo de ativo </th>
          <th scope="col"> Descrição </th>
          <th scope="col"> Ações </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
export default AtivosTable;
