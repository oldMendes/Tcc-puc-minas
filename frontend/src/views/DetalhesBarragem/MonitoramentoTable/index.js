import React from "react";
import { Tag } from "antd";

const statusDamFormat = (tipo) => {
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

export const MonitoramentoTable = ({ data }) => {
  const rows = data.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.sensorName}</td>
        <td>{row.notification}</td>
        <td>
          <Tag color={colorStyle(row.criticalLevel)}>
            {statusDamFormat(row.criticalLevel)}
          </Tag>
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-houver">
      <thead>
        <tr>
          <th scope="col"> Sensor </th>
          <th scope="col"> Notificação </th>
          <th scope="col"> Status </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
export default MonitoramentoTable;
