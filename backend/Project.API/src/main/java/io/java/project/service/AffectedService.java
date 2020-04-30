package io.java.project.service;

import io.java.project.model.Affected;
import io.java.project.repository.AffectedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AffectedService {

    @Autowired
    private AffectedRepository affectedRepository;

    public Optional<Affected> findById(Integer affectedId) {
        return affectedRepository.findById(affectedId);
    }
}
