package com.puc.projetoBarragens.service.impl;

import com.puc.projetoBarragens.exceptions.ErroAutenticacao;
import com.puc.projetoBarragens.exceptions.RegraNegocioException;
import com.puc.projetoBarragens.model.Usuario;
import com.puc.projetoBarragens.repository.UsuarioRepository;
import com.puc.projetoBarragens.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class UsuarioServiceimpl implements UsuarioService {

    private UsuarioRepository repository;

    public UsuarioServiceimpl(UsuarioRepository repository) {
        super();
        this.repository = repository;
    }

    @Override
    public Usuario autenticar(String email, String senha) {
        Optional<Usuario> usuario = repository.findByEmail(email);

        if(!usuario.isPresent()) {
            throw new ErroAutenticacao("Usuário não encontrado");
        }
        if(!usuario.get().getSenha().equals(senha)) {
            throw new ErroAutenticacao("Senha inválida");
        }
        return usuario.get();
    }

    @Override
    @Transactional
    public Usuario salvarUsuario(Usuario usuario) {
        validarEmail(usuario.getEmail());
        return repository.save(usuario);
    }

    @Override
    public void validarEmail(String email) {
        boolean existe = repository.existsByEmail(email);
        if(existe) {
            throw new RegraNegocioException("Email já existente");
        }
    }

}
