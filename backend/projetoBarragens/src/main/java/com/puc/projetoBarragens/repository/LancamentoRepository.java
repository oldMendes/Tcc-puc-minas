package com.puc.projetoBarragens.repository;


import com.puc.projetoBarragens.model.Lancamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {
}
