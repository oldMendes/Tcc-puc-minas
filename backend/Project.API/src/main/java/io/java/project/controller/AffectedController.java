package io.java.project.controller;

import io.java.project.exception.ResourceNotFoundException;
import io.java.project.model.Affected;
import io.java.project.repository.AffectedRepository;
import io.java.project.service.ActiveService;
import io.java.project.service.AffectedService;
import io.java.project.service.DamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class AffectedController {

    @Autowired
    private AffectedRepository affectedRepository;

    @Autowired
    private AffectedService affectedService;

    @Autowired
    private DamService damService;

    @GetMapping("/listAffected")
    public List<Affected> listActive() {
        return affectedRepository.findAll();
    }

    @PostMapping("/saveAffected/{damId}")
    public Affected saveAffected(@PathVariable Integer damId, @Valid @RequestBody Affected affected) {
        return damService.findById(damId).map(dam -> {
            affected.setDam(dam);
            return affectedRepository.save(affected);
        }).orElseThrow(() -> new ResourceNotFoundException("PostId " + damId + " not found"));
    }

    @GetMapping("/affectedById/{affectedId}")
    public Optional<Affected> fetchAffectedById(@PathVariable Integer affectedId) {
        return affectedService.findById(affectedId);
    }

    @PutMapping("/updateAffected/{affectedId}")
    public Affected update(@PathVariable (value = "affectedId") Integer affectedId,
                              @Valid @RequestBody Affected affectedRequest) {
        return affectedService.findById(affectedId).map(affected -> {
            affected.setName(affectedRequest.getName());
            affected.setPhone(affectedRequest.getPhone());
            affected.setEmail(affectedRequest.getEmail());
            affected.setDeletado(affectedRequest.getDeletado());
            return affectedRepository.save(affected);
        }).orElseThrow(() -> new ResourceNotFoundException("CommentId " + affectedId + "not found"));
    }

    //delete
}
