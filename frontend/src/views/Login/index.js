import React from "react";
import Card from "../../components/Card";
import FormGroup from "../../components/FormGroup";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../main/provedorAutenticacao";
import axios from "axios";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    messageError: null,
  };

  entrar = async () => {
    axios
      .post("http://localhost:8080/api/usuarios/autenticar", {
        email: this.state.email,
        senha: this.state.password,
      })
      .then((response) => {
        this.context.iniciarSessao(response.data);
        this.props.history.push("/home");
      })
      .catch((erro) => {
        console.log(erro.response);
      });
  };

  cadastrar = () => {
    this.props.history.push("/cadastrar-usuario");
  };

  render() {
    return (
      <>
        <div className="row">
          <div
            className="col-md-6"
            style={{ position: "relative", left: "300px" }}
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
                        <button
                          onClick={() => this.entrar()}
                          className="btn btn-success"
                        >
                          Entrar
                        </button>
                        <button
                          onClick={() => this.cadastrar()}
                          className="btn btn-danger"
                        >
                          Cadastrar
                        </button>
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
