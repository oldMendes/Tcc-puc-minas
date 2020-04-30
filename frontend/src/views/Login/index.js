import React from "react";
import Card from "../../components/Card";
import FormGroup from "../../components/FormGroup";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../main/provedorAutenticacao";
import axios from "axios";
import { Button, notification } from "antd";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    messageError: null,
    errorMessage: "",
  };

  openNotification = () => {
    let placement = "bottomRight";
    notification.open({
      message: "Erro de acesso",
      description: "Senha e/ou email inválido(s)",

      placement,
    });
  };

  entrar = async () => {
    axios
      .post("http://localhost:8080/api/usuarios/autenticar", {
        email: this.state.email,
        senha: this.state.password,
      })
      .then((response) => {
        this.context.iniciarSessao(response.data);
        this.props.history.push("/barragens");
      })
      .catch((erro) => {
        this.openNotification();
        this.setState({ errorMessage: erro.response.data });
      });
  };

  cadastrar = () => {
    this.props.history.push("/cadastrar-usuario");
  };

  render() {
    return (
      <>
        <div className="row" style={{ justifyContent: "center" }}>
          <div
            className="col-md-6"
            style={{ position: "relative", bottom: "15px" }}
          >
            <div className="bs-docs-section">
              <Card title="Login">
                <div className="row">
                  <span> {this.state.messageError} </span>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="bs-component">
                      <fieldset>
                        <FormGroup
                          label="Email: *"
                          htmlFor="exampleInputEmail1"
                        >
                          <input
                            type="email"
                            value={this.state.email}
                            onChange={(e) =>
                              this.setState({ email: e.target.value })
                            }
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Digite seu Email"
                          />
                        </FormGroup>
                        <FormGroup>
                          <input
                            type="password"
                            value={this.state.password}
                            onChange={(e) =>
                              this.setState({ password: e.target.value })
                            }
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                          />
                        </FormGroup>
                        <div
                          className="row"
                          style={{ justifyContent: "center" }}
                        >
                          <div className="col-lg-6">
                            <Button
                              type="primary"
                              style={{ width: "100%" }}
                              onClick={() => this.entrar()}
                            >
                              Entrar
                            </Button>
                          </div>
                        </div>

                        {/* <button
                          style={{ marginRight: "5px" }}
                          onClick={() => this.entrar()}
                          className="btn btn-success"
                        >
                          Entrar
                        </button> */}
                        {/* <button
                          onClick={() => this.cadastrar()}
                          className="btn btn-danger"
                        >
                          Cadastrar
                        </button> */}
                      </fieldset>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Login.contextType = AuthContext;

export default withRouter(Login);
