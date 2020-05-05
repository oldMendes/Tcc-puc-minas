import React from "react";
import Card from "../../components/Card";
import ModalGeneric from "../../components/ModalGeneric";
import { Button } from "antd";
import BarragensTable from "./BarragensTable";
import axios from "axios";
import FormGroup from "../../components/FormGroup";
import SelectMenu from "../../components/SelectMenu";
import { PlusOutlined } from "@ant-design/icons";
import { AuthContext } from "../../main/provedorAutenticacao";
import {
  TIPO_BARRAGEM,
  STATUS_BARRAGEM,
  POTENTIAL_DAM_DAMAGE,
} from "../../utils/constants/selects";

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

class Barragens extends React.Component {
  state = {
    data: [],
    visible: false,
    title: "",
    damId: "",
    name: "",
    nomeEmpresa: "",
    latitude: "",
    longitude: "",
    damType: "",
    // damStatus: "",
    potentialDamDamage: "",
  };

  componentDidMount() {
    this.listarBarragens();
  }
  listarBarragens() {
    axios
      .get("http://localhost:8090/listDams")
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((erro) => {
        console.log(erro.response);
      });
  }
  showModal = (acao) => {
    switch (acao) {
      case "cadastrar":
        this.setState({ title: "Cadastrar barragem" });
        this.setState({
          name: "",
          nomeEmpresa: "",
          latitude: "",
          longitude: "",
          damType: "",
          // damStatus: "",
          potentialDamDamage: "",
        });
        break;
      case "editar":
        this.setState({ title: "Editar barragem" });
        break;
      default:
        break;
    }
    this.setState({
      visible: true,
    });
  };

  handleOk = (_e) => {
    if (this.state.title === "Cadastrar barragem") {
      axios
        .post("http://localhost:8090/saveDam", {
          name: this.state.name,
          nomeEmpresa: this.state.nomeEmpresa,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          damType: this.state.damType,
          // damStatus: this.state.damStatus,
          potentialDamDamage: this.state.potentialDamDamage,
        })
        .then(() => {
          this.listarBarragens();
        })
        .catch((erro) => {
          console.log(erro.response);
        });
    } else {
      axios
        .put(`http://localhost:8090/updateDam/${this.state.damId}`, {
          name: this.state.name,
          nomeEmpresa: this.state.nomeEmpresa,
          latitude: parseInt(this.state.latitude),
          longitude: parseInt(this.state.longitude),
          damType: parseInt(this.state.damType),
          // damStatus: parseInt(this.state.damStatus),
          potentialDamDamage: parseInt(this.state.potentialDamDamage),
        })
        .then(() => {
          this.listarBarragens();
        })
        .catch((erro) => {
          console.log(erro.response);
        });
    }

    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  deletar = (damId) => {
    axios
      .delete(`http://localhost:8090/deleteDam/${damId}`)
      .then(() => {
        this.listarBarragens();
      })
      .catch((erro) => {
        alert(erro);
      });
  };
  editar = (damId) => {
    this.setState({ damId: damId });
    axios
      .get(`http://localhost:8090/damById/${damId}`)
      .then((reponse) => {
        this.setState({
          name: reponse.data.name,
          nomeEmpresa: reponse.data.nomeEmpresa,
          latitude: reponse.data.latitude,
          longitude: reponse.data.longitude,
          damType: type(reponse.data.damType),
          // damStatus: status(reponse.data.damStatus),
          potentialDamDamage: potentialDamDamage(
            reponse.data.potentialDamDamage
          ),
        });
      })
      .catch((erro) => {
        alert(erro);
      });
    this.showModal("editar");
  };
  render() {
    return (
      <>
        <div className="row" style={{ marginBottom: "15px" }}>
          <div className="col-md-12">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              style={{ float: "right" }}
              onClick={() => this.showModal("cadastrar")}
            >
              Cadastrar barragem
            </Button>
          </div>
        </div>
        <Card title="Barragens">
          <br />
          <div className="row">
            <div className="col-md-12" style={{ overflowX: "auto" }}>
              <div className="bs-component">
                <BarragensTable
                  data={this.state?.data}
                  editar={(id) => this.editar(id)}
                  deletar={(id) => this.deletar(id)}
                  detalhes={(id) =>
                    this.props.history.push(`/detalhes-barragem/${id}`)
                  }
                />
              </div>
            </div>
          </div>
        </Card>
        <div>
          <ModalGeneric
            title={this.state.title}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div className="row">
              <div className="col-md-6">
                <div className="bs-component">
                  <FormGroup htmlFor="name" label="Barragem*">
                    <input
                      value={this.state.name}
                      type="text"
                      className="form-control"
                      id="inputNome"
                      aria-describedby="emailHelp"
                      placeholder="Digite o nome da barragem"
                      onChange={(e) => this.setState({ name: e.target.value })}
                    ></input>
                  </FormGroup>
                  <FormGroup htmlFor="latitude" label="Latitude*">
                    <input
                      value={this.state.latitude}
                      type="number"
                      className="form-control"
                      id="inputNome"
                      aria-describedby="emailHelp"
                      placeholder="Digite a latitude"
                      onChange={(e) =>
                        this.setState({ latitude: e.target.value })
                      }
                    ></input>
                  </FormGroup>
                </div>
              </div>
              <div className="col-md-6">
                <div className="bs-component">
                  <FormGroup htmlFor="nomeEmpresa" label="Nome da empresa*">
                    <input
                      value={this.state.nomeEmpresa}
                      type="text"
                      className="form-control"
                      id="inputNome"
                      aria-describedby="emailHelp"
                      placeholder="Digite o nome da empresa"
                      onChange={(e) =>
                        this.setState({ nomeEmpresa: e.target.value })
                      }
                    ></input>
                  </FormGroup>
                  <FormGroup htmlFor="longitude" label="Longitude*">
                    <input
                      value={this.state.longitude}
                      type="number"
                      className="form-control"
                      id="inputNome"
                      aria-describedby="emailHelp"
                      placeholder="Digite a longitude"
                      onChange={(e) =>
                        this.setState({ longitude: e.target.value })
                      }
                    ></input>
                  </FormGroup>
                </div>
              </div>

              <div className="col-md-6">
                <div className="bs-component">
                  <FormGroup label="Tipo de barragem">
                    <SelectMenu
                      value={this.state.damType}
                      className="form-control"
                      lista={TIPO_BARRAGEM}
                      onChange={(e) =>
                        this.setState({ damType: e.target.value })
                      }
                    />
                  </FormGroup>
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="bs-component">
                  <FormGroup label="Status da barragem">
                    <SelectMenu
                      value={this.state.damStatus}
                      className="form-control"
                      lista={STATUS_BARRAGEM}
                      onChange={(e) =>
                        this.setState({ damStatus: e.target.value })
                      }
                    />
                  </FormGroup>
                </div>
              </div> */}
              <div className="col-md-6">
                <div className="bs-component">
                  <FormGroup label="Dano Potencial">
                    <SelectMenu
                      value={this.state.potentialDamDamage}
                      className="form-control"
                      lista={POTENTIAL_DAM_DAMAGE}
                      onChange={(e) =>
                        this.setState({ potentialDamDamage: e.target.value })
                      }
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
          </ModalGeneric>
        </div>
      </>
    );
  }
}
Barragens.contextType = AuthContext;

export default Barragens;
