package com.puc.projetoBarragens.controller;

import com.fasterxml.jackson.core.JsonParser;
import com.puc.projetoBarragens.dto.UsuarioDTO;
import com.puc.projetoBarragens.exceptions.ErroAutenticacao;
import com.puc.projetoBarragens.exceptions.RegraNegocioException;
import com.puc.projetoBarragens.model.Usuario;
import com.puc.projetoBarragens.repository.UsuarioRepository;
import com.puc.projetoBarragens.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioResource {

    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Value("${ativos.server.url}")
    private String serverAtivosUrl;

    public UsuarioResource(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/autenticar")
    public ResponseEntity autenticar(@RequestBody UsuarioDTO dto) {
        try {
            Usuario usuarioAutenticado = usuarioService.autenticar(dto.getEmail(), dto.getSenha());
            return ResponseEntity.ok(usuarioAutenticado);
        } catch (ErroAutenticacao e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/saveUser")
    public ResponseEntity salvar(@RequestBody UsuarioDTO dto) {
        Usuario usuario = Usuario.builder()
                .nome(dto.getNome())
                .email(dto.getEmail())
                .senha(dto.getSenha()).build();
        try {
            Usuario usuarioSalvo = usuarioService.salvarUsuario(usuario);
            return new ResponseEntity(usuarioSalvo, HttpStatus.CREATED);
        }catch (RegraNegocioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/listUsers")
    public List<Usuario> buscarUsuarios() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/test")
    public List<String> listActives() {
        StringBuilder retorno = new StringBuilder("");
        try {
            URL url = new URL(serverAtivosUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                        + conn.getResponseCode());
            }
            BufferedReader br = new BufferedReader(new InputStreamReader(
                    (conn.getInputStream())));
            String output;
            while ((output = br.readLine()) != null) {
                retorno.append(output);
            }
            conn.disconnect();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        List<String> coll = new ArrayList<>();
        coll.add(retorno.toString());
        
        return coll;
    }

}
