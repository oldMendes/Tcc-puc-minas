import React from "react";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";
import Login from "../views/Login";
import CadastroUsuario from "../views/CadastroUsuario";
import Home from "../views/Home";
import { AuthConsumer } from "../main/provedorAutenticacao";

const RotaAutenticada = ({
  component: Component,
  isUsuarioAutenticado,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={(componentProps) => {
        if (isUsuarioAutenticado) {
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
        <Route path="/login" component={Login} />
        <Route path="/cadastrar-usuario" component={CadastroUsuario} />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path="/home"
          component={Home}
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
