import React from "react";
import Card from "../../components/Card";
import axios from "axios";
import { Descriptions, Button, Alert } from "antd";
import { MailOutlined } from "@ant-design/icons";
import ListaAfetados from "./ListaAfetados";

const type = (tipo) => {
  switch (tipo) {
    case "MONTANTE":
      return 0;
    case "JUSTANTE":
      return 1;
    case "LINHA_DE_CENTRO":
      return 2;
    default:
      break;
  }
};

const status = (tipo) => {
  switch (tipo) {
    case "STABLE":
      return 0;
    case "ALERT":
      return 1;
    case "CRITICAL":
      return 2;
    default:
      break;
  }
};
const potentialDamDamage = (tipo) => {
  switch (tipo) {
    case "LOW":
      return 0;
    case "MEDIUM":
      return 1;
    case "HIGH":
      return 2;
    default:
      break;
  }
};

const potentialDamDamageFormat = (tipo) => {
  switch (tipo) {
    case 0:
      return "Baixo";
    case 1:
      return "Médio";
    case 2:
      return "Alto";
    default:
      break;
  }
};

class DetalhesBarragem extends React.Component {
  state = {
    data: [],
    visible: false,
    title: "",
    name: "",
    nomeEmpresa: "",
    latitude: "",
    longitude: "",
    damType: "",
    damStatus: "",
    potentialDamDamage: "",
    actives: [],
    affecteds: [],
    alert: [],
    damId: "",
  };

  componentDidMount() {
    const params = this.props.match.params.id;
    this.setState({ damId: this.props.match.params.id });
    this.listarBarragens(params);
    // this.listarAlertas();
  }
  listarBarragens(params) {
    axios
      .get(`http://localhost:8090/damById/${params}`)
      .then((reponse) => {
        this.setState({
          name: reponse.data.name,
          nomeEmpresa: reponse.data.nomeEmpresa,
          latitude: reponse.data.latitude,
          longitude: reponse.data.longitude,
          damType: type(reponse.data.damType),
          damStatus: status(reponse.data.damStatus),
          potentialDamDamage: potentialDamDamage(
            reponse.data.potentialDamDamage
          ),
          actives: reponse.data.actives,
          affecteds: reponse.data.affecteds,
        });
      })
      .catch((erro) => {
        alert(erro);
      });
  }

  listarAlertas() {
    axios
      .get(`http://localhost:8070/listAlerts`)
      .then((reponse) => {
        this.setState({
          alert: reponse.data,
        });
      })
      .catch((erro) => {
        alert(erro);
      });
  }

  render() {
    return (
      <>
        {this.state?.alert[this.state?.alert.length - 1]?.criticalLevel ===
          "CRITICAL" && (
          <div className="row" style={{ marginBottom: "15px" }}>
            <div className="col-md-6">
              <Alert
                message={this.state?.alert[0].notification}
                type="info"
                showIcon
              />
            </div>
            <div className="col-md-6">
              <Button
                type="danger"
                icon={<MailOutlined />}
                size="large"
                style={{
                  float: "right",
                  marginBottom: "5px",
                  marginTop: "2px",
                }}
                onClick={() => alert("enviar emails")}
              >
                Emitir alerta
              </Button>
            </div>
          </div>
        )}
        <Card title="Detalhes barragem">
          <br />
          <div className="row">
            <div className="col-md-12" style={{ overflowX: "auto" }}>
              <Descriptions style={{ fontWeight: "bold" }}>
                <Descriptions.Item label="Nome">
                  {this.state.name}
                </Descriptions.Item>
                <Descriptions.Item label="Latitude">
                  {this.state.latitude}
                </Descriptions.Item>
                <Descriptions.Item label="Longitude">
                  {this.state.longitude}
                </Descriptions.Item>
                <Descriptions.Item label="Empresa">
                  {this.state.nomeEmpresa}
                </Descriptions.Item>
                <Descriptions.Item label="Tipo de barragem">
                  {this.state.damType}
                </Descriptions.Item>
                {/* <Descriptions.Item label="Status">
                  <Tag color={colorStyle(this.state.damStatus)}>
                    {statusDamFormat(this.state.damStatus)}
                  </Tag>
                </Descriptions.Item> */}
                <Descriptions.Item label="Dano Potencial">
                  {potentialDamDamageFormat(this.state.potentialDamDamage)}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </Card>
        <br />
        <ListaAfetados
          data={this.state.affecteds}
          damId={this.state.damId}
          listDams={() => this.listarBarragens(this.state.damId)}
        />
      </>
    );
  }
}

export default DetalhesBarragem;
