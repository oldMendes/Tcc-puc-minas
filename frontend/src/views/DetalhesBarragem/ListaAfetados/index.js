import React from "react";
import Card from "../../../components/Card";
import AfetadosTable from "../AfetadosTable";
import { PlusOutlined } from "@ant-design/icons";
import ModalGeneric from "../../../components/ModalGeneric";
import { Button } from "antd";
import FormGroup from "../../../components/FormGroup";
import axios from "axios";

class ListaAfetados extends React.Component {
  state = {
    data: [],
    visible: false,
    affectedId: "",
    name: "",
    phone: "",
    email: "",
  };

  componentDidMount() {}

  showModal = (acao) => {
    switch (acao) {
      case "cadastrar":
        this.setState({ title: "Cadastrar afetado" });
        this.setState({
          name: "",
          phone: "",
          email: "",
        });
        break;
      case "editar":
        this.setState({ title: "Editar afetado" });
        break;
      default:
        break;
    }
    this.setState({
      visible: true,
    });
  };

  handleOk = (_e) => {
    if (this.state.title === "Cadastrar afetado") {
      axios
        .post(`http://localhost:8090/saveAffected/${this.props.damId}`, {
          name: this.state.name,
          phone: this.state.phone,
          email: this.state.email,
        })
        .then(() => {
          this.props.listDams();
        })
        .catch((erro) => {
          console.log(erro.response);
        });
    } else {
      axios
        .put(`http://localhost:8090/updateAffected/${this.state.affectedId}`, {
          name: this.state.name,
          phone: this.state.phone,
          email: this.state.email,
          deletado: this.state.deletado,
        })
        .then(() => {
          this.props.listDams();
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

  deletar = (affectedId) => {
    axios
      .get(`http://localhost:8090/affectedById/${affectedId}`)
      .then((reponse) => {
        this.setState({
          name: reponse.data.name,
          phone: reponse.data.phone,
          email: reponse.data.email,
          deletado: reponse.data.deletado,
        });
        axios
          .put(`http://localhost:8090/updateAffected/${affectedId}`, {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            deletado: "deletado",
          })
          .then(() => {
            this.props.listDams();
          });
      })
      .catch((erro) => {
        alert(erro);
      });
  };

  editar = (affectedId) => {
    axios
      .get(`http://localhost:8090/affectedById/${affectedId}`)
      .then((reponse) => {
        this.setState({
          affectedId: reponse.data.affectedId,
          name: reponse.data.name,
          phone: reponse.data.phone,
          email: reponse.data.email,
          deletado: reponse.data.deletado,
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
              Cadastrar afetado
            </Button>
          </div>
        </div>
        <Card>
          <h4 style={{ fontWeight: "bold" }}>Lista de afetados</h4>
          <br />
          <div className="row">
            <div className="col-md-12" style={{ overflowX: "auto" }}>
              <div className="bs-component">
                <AfetadosTable
                  data={this.props.data.filter((data) => {
                    return data.deletado === null;
                  })}
                  editar={(affectedId) => this.editar(affectedId)}
                  deletar={(affectedId) => this.deletar(affectedId)}
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
                  <FormGroup htmlFor="name" label="Nome do afetado*">
                    <input
                      value={this.state.name}
                      type="text"
                      className="form-control"
                      id="inputNome"
                      aria-describedby="emailHelp"
                      placeholder="Digite o nome do afetado"
                      onChange={(e) => this.setState({ name: e.target.value })}
                    ></input>
                  </FormGroup>
                  <FormGroup htmlFor="phone" label="Telefone*">
                    <input
                      value={this.state.phone}
                      type="text"
                      className="form-control"
                      id="inputNome"
                      aria-describedby="emailHelp"
                      placeholder="Digite o telefone do afetado"
                      onChange={(e) => this.setState({ phone: e.target.value })}
                    ></input>
                  </FormGroup>
                </div>
              </div>
              <div className="col-md-6">
                <div className="bs-component">
                  <FormGroup htmlFor="email" label="E-mail*">
                    <input
                      value={this.state.email}
                      type="text"
                      className="form-control"
                      id="inputNome"
                      aria-describedby="emailHelp"
                      placeholder="Digite o nome do usuário"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    ></input>
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

export default ListaAfetados;
