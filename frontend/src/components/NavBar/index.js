import React from "react";
import NavbarItem from "../NavbarItem";
import { AuthConsumer } from "../../main/provedorAutenticacao";
import { Menu, Dropdown, Button } from "antd";

const NavBar = (props) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <a href="#/barragens" label="Barragens">
          Barragens
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="#/ativos" label="Ativos">
          Ativos
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="#/listUsuarios" label="Usuários">
          Usuários
        </a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={props.deslogar} href="#/login" label="Sair">
          Sair
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className="navbar navbar-expand-sm fixed-top navbar-dark bg-primary">
        <div className="container">
          <img
            src="data:image/png;base64,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"
            alt="Smiley face"
            width="50"
            height="50"
          />
          {props.isUsuarioAutenticado && (
            <Dropdown overlay={menu} placement="bottomLeft">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </Dropdown>
          )}
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
              <NavbarItem
                render={props.isUsuarioAutenticado}
                href="#/barragens"
                label="Barragens"
              />
              <NavbarItem
                render={props.isUsuarioAutenticado}
                href="#/ativos"
                label="Ativos"
              />
              <NavbarItem
                render={props.isUsuarioAutenticado}
                href="#/listUsuarios"
                label="Usuários"
              />
              <NavbarItem
                render={props.isUsuarioAutenticado}
                onClick={props.deslogar}
                href="#/login"
                label="Sair"
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default () => (
  <AuthConsumer>
    {(context) => (
      <NavBar
        isUsuarioAutenticado={context.isAutenticado}
        deslogar={context.encerrarSessao}
      />
    )}
  </AuthConsumer>
);
