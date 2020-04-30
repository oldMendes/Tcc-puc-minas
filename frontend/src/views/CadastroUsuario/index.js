import React from "react";
import Card from "../../components/Card";
import FormGroup from "../../components/FormGroup";
import { withRouter } from "react-router-dom";

export const CadastroUsuario = ({ history }) => {
  const newUser = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const criarUsuario = () => {
    console.log(newUser);
  };

  const cancelar = () => {
    history.push("/login");
  };

  return (
    <>
      {/* <Card title="Cadastro de Usuário">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome: *" htmlFor="inputName">
                <input
                  type="text"
                  id="inputName"
                  className="form-control"
                  name="name"
                  onChange={(e) => (newUser.name = e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Email: *" htmlFor="inputEmail">
                <input
                  type="email"
                  id="inputEmail"
                  className="form-control"
                  name="email"
                  onChange={(e) => (newUser.email = e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Senha: *" htmlFor="inputPassword">
                <input
                  type="password"
                  id="inputPassword"
                  className="form-control"
                  name="password"
                  onChange={(e) => (newUser.password = e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label="Confirme a senha: *"
                htmlFor="inputConfirmPassword"
              >
                <input
                  type="password"
                  id="inputConfirmPassword"
                  className="form-control"
                  name="confirmPassword"
                  onChange={(e) => (newUser.confirmPassword = e.target.value)}
                />
              </FormGroup>
              <button
                onClick={() => criarUsuario()}
                className="btn btn-success"
              >
                Salvar
              </button>
              <button onClick={() => cancelar()} className="btn btn-danger">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Card> */}
      <Card title="Lista de uduários">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto sahshashashasuahsua</td>
              <td>Otto sahshashashasuahsua</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default withRouter(CadastroUsuario);
