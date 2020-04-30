import React from "react";
import Card from "../../../components/Card";
import MonitoramentoTable from "../MonitoramentoTable";

const sensores = [
  { nomeSensor: "bla", notiticacao: "deu ruim", nivelCritico: 2 },
  { nomeSensor: "sds", notiticacao: "ta de boa", nivelCritico: 1 },
];
export const ListaMonitoramento = ({ data }) => {
  return (
    <>
      <Card>
        <h4 style={{ fontWeight: "bold" }}>Alertas</h4>
        <br />
        <div className="row">
          <div className="col-md-12" style={{ overflowX: "auto" }}>
            <div className="bs-component">
              <MonitoramentoTable data={data} />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ListaMonitoramento;
