package com.modulo.monitoramento.repository;

import com.modulo.monitoramento.model.Alerta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlertRepository extends JpaRepository<Alerta, Integer> {
}
