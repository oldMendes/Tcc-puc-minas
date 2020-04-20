package com.puc.projetoBarragens.exceptions;

public class ErroAutenticacao extends RuntimeException {

    public ErroAutenticacao(String mensagem) {
        super(mensagem);
    }
}
