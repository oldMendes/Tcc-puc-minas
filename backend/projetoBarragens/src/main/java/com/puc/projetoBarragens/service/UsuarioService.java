package com.puc.projetoBarragens.service;

import com.puc.projetoBarragens.model.Usuario;

public interface UsuarioService {

    Usuario autenticar(String email, String senha);

    Usuario salvarUsuario(Usuario usuario);

    void validarEmail(String email);
}
