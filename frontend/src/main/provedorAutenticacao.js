import React from "react";
import AuthService from "../services/authService";
export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class ProvedorAutenticao extends React.Component {
  state = {
    usuarioAutenticado: null,
    isAutenticado: false,
  };

  componentDidMount() {
    let user = localStorage.getItem("_usuario_logado");
    let usuario = JSON.parse(user);
    if (usuario !== null) this.iniciarSessao(usuario);
  }

  iniciarSessao = (usuario) => {
    // console.log(usuario);
    AuthService.logar(usuario);
    this.setState({ isAutenticado: true, usuarioAutenticado: usuario });
    // console.log(this.state);
  };

  encerrarSessao = () => {
    AuthService.removerUsuarioLogado();
    this.setState({ isAutenticado: false, usuarioAutenticado: null });
  };

  render() {
    const contexto = {
      usuarioAutenticado: this.state.usuarioAutenticado,
      isAutenticado: this.state.isAutenticado,
      iniciarSessao: this.iniciarSessao,
      encerrarSessao: this.encerrarSessao,
    };
    return <AuthProvider value={contexto}>{this.props.children}</AuthProvider>;
  }
}

export default ProvedorAutenticao;
