# 📋 Lista de Tarefas — CRUD Full Stack

Aplicação de gerenciamento de tarefas (To-Do List) com CRUD completo, desenvolvida como projeto de portfólio. Back-end em **Java com Spring Boot** expondo uma API REST, e front-end em **HTML, CSS e JavaScript puro** consumindo essa API.

## 🚀 Funcionalidades

- ✅ Criar novas tarefas com título e descrição
- ✅ Listar todas as tarefas cadastradas
- ✅ Marcar/desmarcar tarefas como concluídas
- ✅ Editar tarefas existentes
- ✅ Excluir tarefas

## 🛠️ Tecnologias utilizadas

**Back-end**
- Java 17
- Spring Boot
- Spring Data JPA
- H2 Database (banco de dados em memória)
- Maven

**Front-end**
- HTML5
- CSS3
- JavaScript (Fetch API, sem frameworks)

## 📁 Estrutura do projeto

```
lista-tarefas-crud/
├── backend/          # API REST em Spring Boot
│   └── src/
└── frontend/         # Interface web (HTML/CSS/JS)
    ├── index.html
    ├── style.css
    └── script.js
```

## ▶️ Como rodar o projeto localmente

### Pré-requisitos
- JDK 17 ou superior instalado
- Extensão **Live Server** no VS Code (ou qualquer servidor local para arquivos estáticos)

### 1. Clonar o repositório
```bash
git clone https://github.com/lucassilvasantos2207-svg/lista-tarefas-crud.git
```

### 2. Rodar o back-end
```bash
cd lista-tarefas-crud/backend
./mvnw spring-boot:run
```
A API estará disponível em `http://localhost:8080`.

### 3. Rodar o front-end
Abra a pasta `frontend` no VS Code e clique com o botão direito em `index.html` → **"Open with Live Server"**.

## 🔗 Endpoints da API

| Método | Rota            | Descrição                    |
|--------|-----------------|-------------------------------|
| GET    | `/tarefas`      | Lista todas as tarefas        |
| GET    | `/tarefas/{id}` | Busca uma tarefa por ID       |
| POST   | `/tarefas`      | Cria uma nova tarefa          |
| PUT    | `/tarefas/{id}` | Atualiza uma tarefa existente |
| DELETE | `/tarefas/{id}` | Remove uma tarefa             |

## 👤 Autor

**Lucas Silva Santos**
