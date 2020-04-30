package io.java.project.repository;

import io.java.project.model.Dam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DamRepository extends JpaRepository<Dam, Integer> {
    Optional<Dam> findById(Integer damId);
    void deleteById(Integer damId);
}
