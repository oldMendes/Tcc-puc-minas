package io.java.project.repository;

import io.java.project.model.Affected;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AffectedRepository extends JpaRepository<Affected, Integer> {

    Optional<Affected> findById(Integer affectedId);
}
