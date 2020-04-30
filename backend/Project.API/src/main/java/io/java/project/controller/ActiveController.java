package io.java.project.controller;

import io.java.project.exception.ResourceNotFoundException;
import io.java.project.model.Active;
import io.java.project.model.Maintenance;
import io.java.project.repository.ActiveRepository;
import io.java.project.repository.MaintenanceRepository;
import io.java.project.service.ActiveService;
import io.java.project.service.DamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class ActiveController {

    @Autowired
    private ActiveRepository activeRepository;

//    @Autowired
//    public MaintenanceRepository maintenanceRepository;

    @Autowired
    private ActiveService activeService;

    @Autowired
    private DamService damService;

    @GetMapping("/listActives")
    public List<Active> listActive() {
        return activeRepository.findAll();
    }

    @PostMapping("/saveActive")
    public Active createActive(@Valid @RequestBody Active active) {
        return activeRepository.save(active);
    }

    @GetMapping("/activeById/{activeId}")
    public Optional<Active> fetchActiveById(@PathVariable Integer activeId) {
        return activeRepository.findById(activeId);
    }

//    @PostMapping("/saveActive/{damId}")
//    public Active saveActive(@PathVariable Integer damId, @Valid @RequestBody Active active) {
//        return damService.findById(damId).map(dam -> {
//            active.setDam(dam);
//            return activeRepository.save(active);
//        }).orElseThrow(() -> new ResourceNotFoundException("PostId " + damId + " not found"));
//    }

    @PutMapping("/updateActive/{activeId}")
    public Active updateActive(@PathVariable Integer activeId, @Valid @RequestBody Active activeRequest) {
        return activeService.findById(activeId).map(active -> {
            active.setName(activeRequest.getName());
            active.setPatrimony(activeRequest.getPatrimony());
            active.setActiveType(activeRequest.getActiveType());
            active.setDescription(activeRequest.getDescription());
            return activeRepository.save(active);
        }).orElseThrow(() -> new ResourceNotFoundException("PostId " + activeId + " not found"));
    }

//    @DeleteMapping("/deleteActive/{damId}/{activeId}")
//    public ResponseEntity<?> deleteActive(@PathVariable("damId") Integer damId, @PathVariable("activeId") Integer activeId) {
//        damService.findById(damId).map(dam -> {
//            deleBy(dam);
//            return activeRepository.save(active);
//        }).orElseThrow(() -> new ResourceNotFoundException("PostId " + damId + " not found"));
//        return new ResponseEntity<>(String.format("Dam %s has been deleted.", damId),
//                HttpStatus.OK);
//    }

    @DeleteMapping("/deleteActive/{activeId}")
    public ResponseEntity<?> deleteActive(@PathVariable Integer activeId){
        activeService.deleteById(activeId);
        return new ResponseEntity<>(String.format("Dam %s has been deleted.", activeId),
                HttpStatus.OK);
    }
//  delete

}