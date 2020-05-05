import React from "react";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export const ManutencaoTable = ({ data, editar, deletar }) => {
  const statusManutencao = (tipo) => {
    switch (tipo) {
      case "OPEN":
        return "Aberta";
      case "PROCESSING":
        return "Em processamento";
      case "CLOSED":
        return "Fechada";
      default:
        break;
    }
  };

  const tipoManutencao = (tipo) => {
    switch (tipo) {
      case "PREVENTIVE":
        return "Preventiva";
      case "CORRECTIVE":
        return "Corretiva";
      default:
        break;
    }
  };

  const rows = data.map((row, index) => {
    return (
      <tr key={index}>
        <td>{tipoManutencao(row.typeMaintenance)}</td>
        <td>{moment(row.maintenanceStartDate).format("L")}</td>
        <td>{moment(row.maintenanceEndDate).format("L")}</td>
        <td>{row.maintenanceDescription}</td>
        <td>{statusManutencao(row.maintenanceStatus)}</td>
        {/* <td>
          <div style={{ display: "flex", flexDirection: "row", color: "blue" }}>
            <Tooltip title="Editar">
              <EditOutlined
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => editar(row.maintenanceId)}
              />
            </Tooltip>
            <Tooltip title="Deletar">
              <DeleteOutlined
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => deletar(row.maintenanceId)}
              />
            </Tooltip>
          </div>
        </td> */}
      </tr>
    );
  });

  return (
    <table className="table table-houver">
      <thead>
        <tr>
          <th scope="col"> Tipo de manutenção </th>
          <th scope="col"> Data inicial </th>
          <th scope="col"> Data final </th>
          <th scope="col"> Descrição </th>
          <th scope="col"> Status </th>
          {/* <th scope="col"> Ações </th> */}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
export default ManutencaoTable;
