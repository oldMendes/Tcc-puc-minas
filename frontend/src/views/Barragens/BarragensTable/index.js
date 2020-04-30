import React from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { Tag } from "antd";

const type = (tipo) => {
  switch (tipo) {
    case "MONTANTE":
      return "Montante";
    case "JUSTANTE":
      return "Jusante";
    case "LINHA_DE_CENTRO":
      return "Linha de centro";
    default:
      break;
  }
};

const status = (tipo) => {
  switch (tipo) {
    case "STABLE":
      return "Estável";
    case "ALERT":
      return "Alerta";
    case "CRITICAL":
      return "Crítico";
    default:
      break;
  }
};

const potentialDamDamage = (tipo) => {
  switch (tipo) {
    case "LOW":
      return "Baixo";
    case "MEDIUM":
      return "Médio";
    case "HIGH":
      return "Alto";
    default:
      break;
  }
};

const colorStyle = (status) => {
  switch (status) {
    case "STABLE":
      return "success";
    case "ALERT":
      return "warning";
    case "CRITICAL":
      return "error";
    default:
      break;
  }
};

export const BarragensTable = ({ data, editar, deletar, detalhes }) => {
  const rows = data.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.nomeEmpresa}</td>
        <td>{row.latitude}</td>
        <td>{row.longitude}</td>
        <td>{type(row.damType)}</td>
        <td>{potentialDamDamage(row.potentialDamDamage)}</td>
        {/* <td>
          <Tag color={colorStyle(row.damStatus)}>{status(row.damStatus)}</Tag>
        </td> */}

        <td>
          <div style={{ display: "flex", flexDirection: "row", color: "blue" }}>
            <Tooltip title="Editar">
              <EditOutlined
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => editar(row.damId)}
              />
            </Tooltip>
            <Tooltip title="Deletar">
              <DeleteOutlined
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => deletar(row.damId)}
              />
            </Tooltip>
            <Tooltip title="Ver detalhes">
              <EyeOutlined
                style={{ cursor: "pointer" }}
                onClick={() => detalhes(row.damId)}
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
          <th scope="col"> Barragem </th>
          <th scope="col"> Nome da empresa </th>
          <th scope="col"> Latitude </th>
          <th scope="col"> Longitude </th>
          <th scope="col"> Tipo de barragem </th>
          <th scope="col"> Dano Potencial </th>
          {/* <th scope="col"> Status </th> */}
          <th scope="col"> Ações </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
export default BarragensTable;
