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

  iniciarSessao = (usuario) => {
    alert("aqui");
    AuthService.logar(usuario);
    this.setState({ isAutenticado: true, usuarioAutenticado: usuario });
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
