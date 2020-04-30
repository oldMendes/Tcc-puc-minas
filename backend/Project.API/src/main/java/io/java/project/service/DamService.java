package io.java.project.service;

import io.java.project.model.Dam;
import io.java.project.repository.DamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DamService {

    @Autowired
    private DamRepository damRepositoty;

    public Optional<Dam> findById(Integer damId) {
        return damRepositoty.findById(damId);
    }

    public void deleteById(Integer damId){
        damRepositoty.deleteById(damId);
    }
}
