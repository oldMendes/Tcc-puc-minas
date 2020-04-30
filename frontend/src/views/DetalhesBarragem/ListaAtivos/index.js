import React from "react";
import Card from "../../../components/Card";
import AtivosTable from "../AtivosTable";

export const ListaAtivos = ({ data }) => {
  return (
    <>
      <Card>
        <h4 style={{ fontWeight: "bold" }}>Lista de ativos</h4>
        <br />
        <div className="row">
          <div className="col-md-12" style={{ overflowX: "auto" }}>
            <div className="bs-component">
              <AtivosTable data={data} />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ListaAtivos;
