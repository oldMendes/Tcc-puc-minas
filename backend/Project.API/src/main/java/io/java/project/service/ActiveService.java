package io.java.project.service;

import io.java.project.model.Active;
import io.java.project.repository.ActiveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ActiveService{

    @Autowired
    private ActiveRepository activeRepository;

    public Optional<Active> findById(Integer activeId) {
        return activeRepository.findById(activeId);
    }

    public void deleteById(Integer activeId){
        activeRepository.deleteById(activeId);
    }
}
