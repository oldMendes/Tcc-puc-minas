import React, { useEffect } from "react";
import Card from "../../../components/Card";
import ManutencaoTable from "../ManutencaoTable";
import ModalGeneric from "../../../components/ModalGeneric";
import FormGroup from "../../../components/FormGroup";
import { Button, InputNumber } from "antd";
import axios from "axios";
import {
  STATUS_MANUTENCAO,
  TIPO_MANUTENCAO,
} from "../../../utils/constants/selects";
import SelectMenu from "../../../components/SelectMenu";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const tipoManutencao = (tipo) => {
  switch (tipo) {
    case "PREVENTIVE":
      return 0;
    case "CORRECTIVE":
      return 1;
    default:
      break;
  }
};

const statusManutencao = (tipo) => {
  switch (tipo) {
    case "OPEN":
      return 0;
    case "PROCESSING":
      return 1;
    case "CLOSED":
      return 2;
    default:
      break;
  }
};

class ListaManutencao extends React.Component {
  state = {
    visible: false,
    title: "",
    params: "",
    maintenanceId: "",
    maintenanceStartDate: "",
    maintenanceEndDate: "",
    maintenanceDescription: "",
    maintenanceStatus: "",
    typeMaintenance: "",
    teste: "",
  };

  onChange(date) {
    console.log(date._d);
  }

  showModal = (acao) => {
    switch (acao) {
      case "cadastrar":
        this.setState({ title: "Cadastrar manutenção" });
        this.setState({
          maintenanceId: "",
          maintenanceStartDate: "",
          maintenanceEndDate: "",
          maintenanceDescription: "",
          maintenanceStatus: "",
          typeMaintenance: "",
        });
        break;
      case "editar":
        this.setState({ title: "Editar manutenção" });
        break;
      default:
        break;
    }
    this.setState({
      visible: true,
    });
  };

  handleOk = (_e) => {
    console.log(this.state);
    this.props.update();
    if (this.state.title === "Cadastrar manutenção") {
      axios
        .post(`http://localhost:8090/saveMaintenance/${this.props.params}`, {
          maintenanceStartDate: moment(
            this.state.maintenanceStartDate
          ).format(),
          maintenanceEndDate: moment(this.state.maintenanceEndDate).format(),
          maintenanceDescription: this.state.maintenanceDescription,
          maintenanceStatus: this.state.maintenanceStatus,
          typeMaintenance: this.state.typeMaintenance,
        })
        .then(() => {
          this.listarBarragens();
        })
        .catch((erro) => {
          console.log(erro.response);
        });
    } else {
      axios.put(
        `http://localhost:8090/updateMaintenance/${this.state.maintenanceId}`,
        {
          maintenanceStartDate: moment(
            this.state.maintenanceStartDate
          ).format(),
          maintenanceEndDate: moment(this.state.maintenanceEndDate).format(),
          maintenanceDescription: this.state.maintenanceDescription,
          maintenanceStatus: parseInt(this.state.maintenanceStatus),
          typeMaintenance: parseInt(this.state.typeMaintenance),
        }
      );
      console
        .log(this.state)
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
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  editar = (maintenanceId) => {
    axios
      .get(`http://localhost:8090/maintenaceById/${maintenanceId}`)
      .then((reponse) => {
        this.setState({
          maintenanceId: reponse.data.maintenanceId,
          maintenanceStartDate: moment(reponse.data.maintenanceStartDate),
          maintenanceEndDate: reponse.data.maintenanceEndDate,
          maintenanceDescription: reponse.data.maintenanceDescription,
          maintenanceStatus: statusManutencao(reponse.data.maintenanceStatus),
          typeMaintenance: tipoManutencao(reponse.data.typeMaintenance),
        });
      })
      .catch((erro) => {
        alert(erro);
      });
    this.showModal("editar");
  };

  deletar = (maintenanceId) => {
    axios
      .get(`http://localhost:8090/maintenaceById/${maintenanceId}`)
      .then((reponse) => {
        this.setState({
          maintenanceId: reponse.data.maintenanceId,
          maintenanceStartDate: moment(reponse.data.maintenanceStartDate),
          maintenanceEndDate: reponse.data.maintenanceEndDate,
          maintenanceDescription: reponse.data.maintenanceDescription,
          maintenanceStatus: statusManutencao(reponse.data.maintenanceStatus),
          typeMaintenance: tipoManutencao(reponse.data.typeMaintenance),
          deletado: reponse.data.deletado,
        });
        axios.put(
          `http://localhost:8090/updateMaintenance/${this.state.maintenanceId}`,
          {
            maintenanceStartDate: this.state.maintenanceStartDate,
            maintenanceEndDate: this.state.maintenanceEndDate,
            maintenanceDescription: this.state.maintenanceDescription,
            maintenanceStatus: this.state.maintenanceStatus,
            typeMaintenance: this.state.typeMaintenance,
            deletado: "deletado",
          }
        );
      })
      .catch((erro) => {
        alert(erro);
      });
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
              Cadastrar manutenção
            </Button>
          </div>
        </div>
        <Card>
          <h4 style={{ fontWeight: "bold" }}>Lista de manutenções</h4>
          <br />
          <div className="row">
            <div className="col-md-12" style={{ overflowX: "auto" }}>
              <div className="bs-component">
                <ManutencaoTable
                  data={this.props.data.filter((data) => {
                    return data.deletado === null;
                  })}
                  editar={(id) => this.editar(id)}
                  deletar={(id) => this.deletar(id)}
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
                  <FormGroup label="Tipo de barragem">
                    <SelectMenu
                      value={this.state.typeMaintenance}
                      className="form-control"
                      lista={TIPO_MANUTENCAO}
                      onChange={(e) =>
                        this.setState({ typeMaintenance: e.target.value })
                      }
                    />
                  </FormGroup>
                  <FormGroup
                    htmlFor="maintenanceDescription"
                    label="Descrição*"
                  >
                    <input
                      value={this.state.maintenanceDescription}
                      type="text"
                      className="form-control"
                      id="inputNome"
                      aria-describedby="emailHelp"
                      placeholder="Digite o nome do usuário"
                      onChange={(e) =>
                        this.setState({
                          maintenanceDescription: e.target.value,
                        })
                      }
                    ></input>
                  </FormGroup>
                </div>
              </div>
              <div className="col-md-6">
                <div className="bs-component">
                  <FormGroup
                    htmlFor="maintenanceStartDate"
                    label="Data inicial*"
                  >
                    <input
                      value={this.state.maintenanceStartDate}
                      type="date"
                      className="form-control"
                      id="inputNome"
                      aria-describedby="emailHelp"
                      placeholder="Digite o nome do usuário"
                      onChange={(e) =>
                        this.setState({ maintenanceStartDate: e.target.value })
                      }
                    ></input>
                    {console.log(this.state?.maintenanceStartDate)}
                    {/* <DatePicker
                      onChange={this.onChange}
                      defaultValue={this.state.maintenanceStartDate}
                      format="DD/MM/YYYY"
                    /> */}
                  </FormGroup>

                  <FormGroup htmlFor="maintenanceEndDate" label="Data final*">
                    <input
                      value={this.state.maintenanceEndDate}
                      type="date"
                      className="form-control"
                      id="inputNome"
                      aria-describedby="emailHelp"
                      placeholder="Digite o nome do usuário"
                      onChange={(e) =>
                        this.setState({ maintenanceEndDate: e.target.value })
                      }
                    ></input>
                  </FormGroup>
                </div>
              </div>

              <div className="col-md-6">
                <div className="bs-component">
                  <FormGroup label="Tipo de barragem">
                    <SelectMenu
                      value={this.state.maintenanceStatus}
                      className="form-control"
                      lista={STATUS_MANUTENCAO}
                      onChange={(e) =>
                        this.setState({ maintenanceStatus: e.target.value })
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

export default ListaManutencao;
