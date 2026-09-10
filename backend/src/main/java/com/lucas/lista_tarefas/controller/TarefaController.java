package com.lucas.lista_tarefas.controller;

import com.lucas.lista_tarefas.model.Tarefa;
import com.lucas.lista_tarefas.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tarefas")
@CrossOrigin(origins = "*")
public class TarefaController {

    @Autowired
    private TarefaRepository tarefaRepository;

    // Listar todas as tarefas
    @GetMapping
    public List<Tarefa> listarTodas() {
        return tarefaRepository.findAll();
    }

    // Buscar uma tarefa por ID
    @GetMapping("/{id}")
    public Tarefa buscarPorId(@PathVariable Long id) {
        return tarefaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
    }

    // Criar uma nova tarefa
    @PostMapping
    public Tarefa criar(@RequestBody Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    // Atualizar uma tarefa existente
    @PutMapping("/{id}")
    public Tarefa atualizar(@PathVariable Long id, @RequestBody Tarefa tarefaAtualizada) {
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));

        tarefa.setTitulo(tarefaAtualizada.getTitulo());
        tarefa.setDescricao(tarefaAtualizada.getDescricao());
        tarefa.setConcluida(tarefaAtualizada.isConcluida());

        return tarefaRepository.save(tarefa);
    }

    // Deletar uma tarefa
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        tarefaRepository.deleteById(id);
    }
}