import React from "react";
import Card from "../../../components/Card";
import AfetadosTable from "../AfetadosTable";

export const ListaAfetados = ({ data }) => {
  return (
    <>
      <Card>
        <h4 style={{ fontWeight: "bold" }}>Lista de afetados</h4>
        <br />
        <div className="row">
          <div className="col-md-12" style={{ overflowX: "auto" }}>
            <div className="bs-component">
              <AfetadosTable data={data} />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ListaAfetados;
