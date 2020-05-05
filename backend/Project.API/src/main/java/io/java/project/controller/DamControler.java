package io.java.project.controller;

import io.java.project.exception.ResourceNotFoundException;
import io.java.project.model.Affected;
import io.java.project.model.Dam;
import io.java.project.repository.DamRepository;
import io.java.project.service.DamService;
import io.java.project.service.EmailSender;
import io.java.project.util.StringUtils;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
    public ResponseEntity<?> deleteDam(@PathVariable Integer damId) {
        damService.deleteById(damId);
        return new ResponseEntity<>(String.format("Dam %s has been deleted.", damId),
                HttpStatus.OK);
    }

    @RabbitListener(queues = "${queue.name}")
    private void reader(String text) {
        System.out.println(String.format("**********Message received : %s", text));
        Map<String, String> parameters = StringUtils.parseMessageData(text);
        String sensorName, criticalLevel, notification, damId;
        sensorName = parameters.containsKey("sensorName") ?
                parameters.get("sensorName") : "";
        criticalLevel = parameters.containsKey("criticalLevel") ?
                parameters.get("criticalLevel") : "";
        notification = parameters.containsKey("notification") ?
                parameters.get("notification") : "";
        damId = parameters.containsKey("damId") ?
                parameters.get("damId") : "";
        if (!StringUtils.isDataMissing(sensorName, criticalLevel, notification, damId)){
            System.out.println("********Data received is correct.");
            Optional<Dam> dam = damService.findById(Integer.parseInt(damId));
            if (dam.isPresent()) {
                if ("Crítico".equalsIgnoreCase(parameters.get("criticalLevel"))){
                    List<String> emails = new ArrayList<>();
                    for (Affected recipient : dam.get().getAffecteds())
                        emails.add(recipient.getEmail());
                    if (!emails.isEmpty()) {
                        System.out.println("*****Sending e-mail to recipients");
                        EmailSender.sendMail(parameters, emails);
                    }
                }
            }
        }
    }
}
