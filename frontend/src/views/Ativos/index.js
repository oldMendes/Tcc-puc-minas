import React from "react";
import Card from "../../components/Card";
import ModalGeneric from "../../components/ModalGeneric";
import { Button } from "antd";
import AtivosTable from "./AtivosTable";
import axios from "axios";
import FormGroup from "../../components/FormGroup";
import SelectMenu from "../../components/SelectMenu";
import { PlusOutlined } from "@ant-design/icons";
import { TIPO_ATIVO } from "../../utils/constants/selects";

const type = (tipo) => {
  switch (tipo) {
    case "EQUIPMENT":
      return 0;
    case "MACHINE":
      return 1;
    case "INPUT":
      return 2;
    default:
      break;
  }
};

class Ativos extends React.Component {
  state = {
    data: [],
    activeId: "",
    visible: false,
    title: "",
    name: "",
    patrimony: "",
    activeType: "",
    description: "",
  };

  componentDidMount() {
    this.listarBarragens();
  }
  listarBarragens() {
    axios
      .get("http://localhost:8090/listActives")
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
        this.setState({ title: "Cadastrar ativo" });
        this.setState({
          name: "",
          patrimony: "",
          activeType: "",
          description: "",
        });
        break;
      case "editar":
        this.setState({ title: "Editar ativo" });
        break;
      default:
        break;
    }
    this.setState({
      visible: true,
    });
  };

  handleOk = (_e) => {
    if (this.state.title === "Cadastrar ativo") {
      axios
        .post("http://localhost:8090/saveActive", {
          name: this.state.name,
          patrimony: this.state.patrimony,
          activeType: parseInt(this.state.activeType),
          description: this.state.description,
        })
        .then(() => {
          this.listarBarragens();
        })
        .catch((erro) => {
          console.log(erro.response);
        });
    } else {
      axios
        .put(`http://localhost:8090/updateActive/${this.state.activeId}`, {
          name: this.state.name,
          patrimony: this.state.patrimony,
          activeType: this.state.activeType,
          description: this.state.description,
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

  handleCancel = (_e) => {
    this.setState({
      visible: false,
    });
  };

  deletar = (activeId) => {
    axios
      .delete(`http://localhost:8090/deleteActive/${activeId}`)
      .then(() => {
        this.listarBarragens();
      })
      .catch((erro) => {
        alert(erro);
      });
  };
  editar = (activeId) => {
    axios
      .get(`http://localhost:8090/activeById/${activeId}`)
      .then((reponse) => {
        this.setState({
          name: reponse.data.name,
          patrimony: reponse.data.patrimony,
          activeType: type(reponse.data.activeType),
          description: reponse.data.description,
          activeId: reponse.data.activeId,
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
              Cadastrar ativo
            </Button>
          </div>
        </div>
        <Card title="Ativos">
          <br />
          <div className="row">
            <div className="col-md-12" style={{ overflowX: "auto" }}>
              <div className="bs-component">
                <AtivosTable
                  data={this.state?.data}
                  editar={(id) => this.editar(id)}
                  deletar={(id) => this.deletar(id)}
                  detalhes={(id) =>
                    this.props.history.push(`/detalhes-ativo/${id}`)
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
                  <FormGroup htmlFor="name" label="Nome do ativo*">
                    <input
                      value={this.state.name}
                      type="text"
                      className="form-control"
                      id="inputNome"
                      aria-describedby="emailHelp"
                      placeholder="Digite o nome do usuário"
                      onChange={(e) => this.setState({ name: e.target.value })}
                    ></input>
                  </FormGroup>
                  <FormGroup htmlFor="description" label="Descrição*">
                    <input
                      value={this.state.description}
                      type="text"
                      className="form-control"
                      id="inputNome"
                      aria-describedby="emailHelp"
                      placeholder="Digite o nome do usuário"
                      onChange={(e) =>
                        this.setState({ description: e.target.value })
                      }
                    ></input>
                  </FormGroup>
                </div>
              </div>
              <div className="col-md-6">
                <div className="bs-component">
                  <FormGroup htmlFor="patrimony" label="Patrimônio*">
                    <input
                      value={this.state.patrimony}
                      type="text"
                      className="form-control"
                      id="inputNome"
                      aria-describedby="emailHelp"
                      placeholder="Digite o nome do usuário"
                      onChange={(e) =>
                        this.setState({ patrimony: e.target.value })
                      }
                    ></input>
                  </FormGroup>
                  <FormGroup label="Tipo de ativo">
                    <SelectMenu
                      value={this.state.activeType}
                      className="form-control"
                      lista={TIPO_ATIVO}
                      onChange={(e) =>
                        this.setState({ activeType: e.target.value })
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

export default Ativos;
