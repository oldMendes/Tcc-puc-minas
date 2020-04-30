import React, { useEffect, useState } from "react";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";
import Login from "../views/Login";
import CadastroUsuario from "../views/CadastroUsuario";
import { AuthConsumer } from "../main/provedorAutenticacao";
import Usuarios from "../views/Usuarios";
import Barragens from "../views/Barragens";
import Ativos from "../views/Ativos";
import DetalhesBarragem from "../views/DetalhesBarragem";
import DetalhesAtivo from "../views/DetalhesAtivo";

const RotaAutenticada = ({
  component: Component,
  isUsuarioAutenticado,
  ...props
}) => {
  const [userAtivo, setUserAtivo] = useState();
  useEffect(() => {
    let user = localStorage.getItem("_usuario_logado");
    let usuario = JSON.parse(user);
    setUserAtivo(usuario);
  }, []);
  return (
    <Route
      {...props}
      render={(componentProps) => {
        if (isUsuarioAutenticado || userAtivo !== null) {
          return <Component {...componentProps} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: componentProps.location },
              }}
            />
          );
        }
      }}
    />
  );
};
const Router = (props) => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} exact />
        {/* <Route path="/ativos" component={Ativos} /> */}
        {/* <Route path="/listUsuarios" component={Usuarios} />
        <Route path="/barragens" component={Barragens} />
        <Route path="/cadastrar-usuario" component={CadastroUsuario} /> */}
        {/* <Route path="/detalhes-barragem/:id?" component={DetalhesBarragem} />
        <Route path="/detalhes-ativo/:id?" component={DetalhesAtivo} /> */}
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/barragens"
          component={Barragens}
        />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/ativos"
          component={Ativos}
        />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/listUsuarios"
          component={Usuarios}
        />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/detalhes-barragem/:id?"
          component={DetalhesBarragem}
        />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/detalhes-ativo/:id?"
          component={DetalhesAtivo}
        />
      </Switch>
    </HashRouter>
  );
};

export default () => (
  <AuthConsumer>
    {(context) => <Router isUsuarioAutenticado={context.isAutenticado} />}
  </AuthConsumer>
);
