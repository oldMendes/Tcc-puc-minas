import React from "react";
import Card from "../../components/Card";
import { Button } from "antd";
import MonitoramentoTable from "./MonitoramentoTable";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { AuthContext } from "../../main/provedorAutenticacao";

class Monitoramento extends React.Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this.listarAlertas();
  }
  listarAlertas() {
    axios
      .get("http://localhost:8070/listAlerts")
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((erro) => {
        console.log(erro.response);
      });
  }

  render() {
    return (
      <>
        {this.state?.data[this.state?.data.length - 1]?.criticalLevel ===
          "CRITICAL" && (
          <div className="row" style={{ marginBottom: "15px" }}>
            <div className="col-md-12">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                style={{ float: "right" }}
                onClick={() => this.showModal("cadastrar")}
              >
                Emitir alerta
              </Button>
            </div>
          </div>
        )}
        <Card title="Alertas">
          <br />
          <div className="row">
            <div className="col-md-12" style={{ overflowX: "auto" }}>
              <div className="bs-component">
                <MonitoramentoTable data={this.state.data} />
              </div>
            </div>
          </div>
        </Card>
      </>
    );
  }
}
Monitoramento.contextType = AuthContext;

export default Monitoramento;
