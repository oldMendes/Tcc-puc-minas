import React from "react";
import Card from "../../components/Card";
import { withRouter } from "react-router-dom";
import FormGroup from "../../components/FormGroup";
import SelectMenu from "../../components/SelectMenu";
import UsuariosTable from "./UsuariosTable";
import { AuthContext } from "../../main/provedorAutenticacao";
import axios from "axios";

class Usuarios extends React.Component {
  state = {
    data: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/api/usuarios/listUsers")
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((erro) => {
        console.log(erro.response);
      });
  }
  render() {
    const lista = [
      { label: "Selecione ...", value: "" },
      { label: "Janeiro", value: 1 },
      { label: "Fevereiro", value: 2 },
      { label: "Março", value: 3 },
    ];

    const editar = (id) => {
      alert(id);
    };

    const deletar = (id) => {
      alert(id);
    };

    return (
      <Card title="Usuários">
        {/* <div className="row">
          <div className="col-md-6">
            <div className="bs-component">
              <FormGroup htmlFor="inputNome" label="Nome*">
                <input
                  type="text"
                  className="form-control"
                  id="inputNome"
                  aria-describedby="emailHelp"
                  placeholder="Digite o nome do usuário"
                ></input>
              </FormGroup>
              <FormGroup>
                <SelectMenu className="form-control" lista={lista} />
              </FormGroup>
              <button
                type="button"
                className="btn btn-success"
                style={{ marginRight: "5px" }}
              >
                Buscar
              </button>
              <button type="button" className="btn btn-danger">
                Cadastrar
              </button>
            </div>
          </div>
        </div>
        <br /> */}
        <div className="row">
          <div className="col-md-12" style={{ overflowX: "auto" }}>
            <div className="bs-component">
              <UsuariosTable
                data={this.state?.data}
                editar={editar}
                deletar={deletar}
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

Usuarios.contextType = AuthContext;

export default withRouter(Usuarios);
