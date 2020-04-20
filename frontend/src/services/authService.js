import LocalStorageService from "./localStorageService";

export const USUARIO_LOGADO = "_usuario_logado";
export default class AuthService {
  static isUsuarioAutenticado = () => {
    // const usuarioLogadoString = localStorage.getItem("_usuario_logado");
    // const usuarioLogado = JSON.parse(usuarioLogadoString);
    // return usuarioLogado && usuarioLogado.id;
    const usuario = LocalStorageService.obterItem(USUARIO_LOGADO);
    return usuario && usuario.id;
  };

  static removerUsuarioLogado() {
    // // const usuarioLogadoString = localStorage.getItem("_usuario_logado");
    // localStorage.removeItem("_usuario_logado");
    LocalStorageService.removerItem(USUARIO_LOGADO);
  }

  static logar(usuario) {
    LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario);
  }

  static obterUsuatioAutenticado() {
    return LocalStorageService.obterItem(USUARIO_LOGADO);
  }
}
