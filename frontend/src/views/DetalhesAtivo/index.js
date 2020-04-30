import React from "react";
import Card from "../../components/Card";
import axios from "axios";
import { Descriptions, Tag, Button, Alert } from "antd";
import { MailOutlined } from "@ant-design/icons";
import ListaManutencao from "./ListaManutencao";

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

class DetalhesAtivo extends React.Component {
  state = {
    data: [],
    visible: false,
    title: "",
    name: "",
    patrimony: "",
    activeType: "",
    description: "",
    maintenance: [],
    params: "",
  };

  componentDidMount() {
    const params = this.props.match.params.id;
    this.setState({ params: params });
    this.listarAtivos(params);
  }
  listarAtivos(params) {
    axios
      .get(`http://localhost:8090/activeById/${params}`)
      .then((reponse) => {
        this.setState({
          name: reponse.data.name,
          patrimony: reponse.data.patrimony,
          activeType: reponse.data.activeType,
          description: reponse.data.description,
          maintenance: reponse.data.maintenance,
        });
      })
      .catch((erro) => {
        alert(erro);
      });
  }

  render() {
    return (
      <>
        <Card title="Detalhes ativo">
          <br />
          <div className="row">
            <div className="col-md-12" style={{ overflowX: "auto" }}>
              <Descriptions style={{ fontWeight: "bold" }}>
                <Descriptions.Item label="Nome">
                  {this.state.name}
                </Descriptions.Item>
                <Descriptions.Item label="Patrimônio">
                  {this.state.patrimony}
                </Descriptions.Item>
                <Descriptions.Item label="Tipo de ativo">
                  {type(this.state.activeType)}
                </Descriptions.Item>
                <Descriptions.Item label="Descrição">
                  {this.state.description}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </Card>
        <br />
        {this.state?.maintenance.length > 0 && (
          <ListaManutencao
            update={() => this.listarAtivos(this.state.params)}
            params={this.state.params}
            data={this.state?.maintenance}
          />
        )}

        <br />
        {/* {this.state?.affecteds.length > 0 && (
          <ListaAfetados data={this.state?.affecteds} />
        )} */}
      </>
    );
  }
}

export default DetalhesAtivo;
