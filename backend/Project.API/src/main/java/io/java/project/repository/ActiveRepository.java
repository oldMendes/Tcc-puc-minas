package io.java.project.repository;

import io.java.project.model.Active;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ActiveRepository extends JpaRepository<Active, Integer> {

    List<Active> findByName(String name);

    Optional<Active> findById(Integer activeId);

    void deleteById(Integer activeId);
}
