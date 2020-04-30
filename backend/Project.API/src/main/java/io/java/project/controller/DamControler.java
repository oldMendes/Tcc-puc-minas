package io.java.project.controller;

import io.java.project.exception.ResourceNotFoundException;
import io.java.project.model.Dam;
import io.java.project.repository.DamRepository;
import io.java.project.service.DamService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.interfaces.DSAPrivateKey;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class DamControler {

    @Autowired
    private DamRepository damRepository;

    @Autowired
    private DamService damService;

    @GetMapping("/listDams")
    public List<Dam> listDam() {
        return damRepository.findAll();
    }

    @PostMapping("/saveDam")
    public Dam createDam(@Valid @RequestBody Dam dam) {
        return damRepository.save(dam);
    }

    @GetMapping("/damById/{damId}")
    public Optional<Dam> fetchDamById(@PathVariable Integer damId) {
        return damRepository.findById(damId);
    }

    @PutMapping("/updateDam/{damId}")
    public Dam updateActive(@PathVariable Integer damId, @Valid @RequestBody Dam damRequest) {
        return damService.findById(damId).map(dam -> {
           dam.setName(damRequest.getName());
           dam.setNomeEmpresa(damRequest.getNomeEmpresa());
           dam.setLatitude(damRequest.getLatitude());
           dam.setLongitude(damRequest.getLongitude());
           dam.setDamType(damRequest.getDamType());
           dam.setDamStatus(damRequest.getDamStatus());
           dam.setPotentialDamDamage((damRequest.getPotentialDamDamage()));
            return damRepository.save(dam);
        }).orElseThrow(() -> new ResourceNotFoundException("PostId " + damId + " not found"));
    }

    @DeleteMapping("/deleteDam/{damId}")
    public ResponseEntity<?> deleteDam(@PathVariable Integer damId){
        damService.deleteById(damId);
        return new ResponseEntity<>(String.format("Dam %s has been deleted.", damId),
                HttpStatus.OK);
    }

    @RabbitListener(queues = "${queue.name}")
    private void reader(String text) {
        // json
        // conferir os valores
        // trazer email da barragem

        System.out.println("Consumer: " + text);
        //
    }


}
