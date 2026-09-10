const API_URL = 'http://localhost:8080/tarefas';

const form = document.getElementById('form-tarefa');
const inputId = document.getElementById('tarefa-id');
const inputTitulo = document.getElementById('titulo');
const inputDescricao = document.getElementById('descricao');
const listaTarefas = document.getElementById('lista-tarefas');
const btnSalvar = document.getElementById('btn-salvar');
const btnCancelar = document.getElementById('btn-cancelar');

// Carrega as tarefas assim que a página abre
document.addEventListener('DOMContentLoaded', carregarTarefas);

// Escuta o envio do formulário (criar ou editar)
form.addEventListener('submit', function (event) {
    event.preventDefault(); // evita que a página recarregue

    const tarefa = {
        titulo: inputTitulo.value,
        descricao: inputDescricao.value,
        concluida: false
    };

    const id = inputId.value;

    if (id) {
        atualizarTarefa(id, tarefa);
    } else {
        criarTarefa(tarefa);
    }
});

btnCancelar.addEventListener('click', limparFormulario);

// ---------- Funções de API ----------

function carregarTarefas() {
    fetch(API_URL)
        .then(response => response.json())
        .then(tarefas => renderizarTarefas(tarefas))
        .catch(error => console.error('Erro ao carregar tarefas:', error));
}

function criarTarefa(tarefa) {
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefa)
    })
        .then(response => response.json())
        .then(() => {
            limparFormulario();
            carregarTarefas();
        })
        .catch(error => console.error('Erro ao criar tarefa:', error));
}

function atualizarTarefa(id, tarefa) {
    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefa)
    })
        .then(response => response.json())
        .then(() => {
            limparFormulario();
            carregarTarefas();
        })
        .catch(error => console.error('Erro ao atualizar tarefa:', error));
}

function excluirTarefa(id) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => carregarTarefas())
        .catch(error => console.error('Erro ao excluir tarefa:', error));
}

function marcarConcluida(tarefa) {
    const atualizada = { ...tarefa, concluida: !tarefa.concluida };
    atualizarTarefa(tarefa.id, atualizada);
}

// ---------- Funções de interface ----------

function renderizarTarefas(tarefas) {
    listaTarefas.innerHTML = '';

    if (tarefas.length === 0) {
        listaTarefas.innerHTML = `
            <li class="vazio">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Nenhuma tarefa ainda.<br>Adicione a primeira acima.</span>
            </li>`;
        atualizarProgresso(tarefas);
        return;
    }

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');

        li.innerHTML = `
            <div class="checkbox-tarefa ${tarefa.concluida ? 'marcado' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <div class="tarefa-info ${tarefa.concluida ? 'tarefa-concluida' : ''}">
                <h3>${tarefa.titulo}</h3>
                <p>${tarefa.descricao || ''}</p>
            </div>
            <div class="tarefa-acoes">
                <button class="btn-editar" title="Editar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                </button>
                <button class="btn-excluir" title="Excluir">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;

        li.querySelector('.checkbox-tarefa').addEventListener('click', () => marcarConcluida(tarefa));
        li.querySelector('.btn-editar').addEventListener('click', () => editarTarefa(tarefa));
        li.querySelector('.btn-excluir').addEventListener('click', () => excluirTarefa(tarefa.id));

        listaTarefas.appendChild(li);
    });

    atualizarProgresso(tarefas);
}

function atualizarProgresso(tarefas) {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    const percentual = total === 0 ? 0 : Math.round((concluidas / total) * 100);

    document.getElementById('progresso-texto').textContent =
        total === 0 ? 'Nenhuma tarefa' : `${concluidas} de ${total} concluídas`;
    document.getElementById('barra-preenchida').style.width = `${percentual}%`;
}

function editarTarefa(tarefa) {
    inputId.value = tarefa.id;
    inputTitulo.value = tarefa.titulo;
    inputDescricao.value = tarefa.descricao;

    btnSalvar.textContent = 'Salvar Alteração';
    btnCancelar.style.display = 'inline-block';
}

function limparFormulario() {
    inputId.value = '';
    inputTitulo.value = '';
    inputDescricao.value = '';

    btnSalvar.textContent = 'Adicionar Tarefa';
    btnCancelar.style.display = 'none';
}