package com.lucas.lista_tarefas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucas.lista_tarefas.model.Tarefa;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
}