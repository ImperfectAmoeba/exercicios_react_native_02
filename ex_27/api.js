const BASE_URL = 'https://tarefa-backend.onrender.com/tasks';

async function requisicao(url, opcoes = {}) {
  const resposta = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes,
  });
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao acessar a API`);
  }
  return resposta.json();
}

// GET /tasks
export function listarTarefas() {
  return requisicao(BASE_URL);
}

// GET /tasks/{id}
export function buscarTarefa(id) {
  return requisicao(`${BASE_URL}/${id}`);
}

// POST /tasks
export function adicionarTarefa(tarefa) {
  return requisicao(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(tarefa),
  });
}

// PUT /tasks/{id}
export function editarTarefa(id, tarefa) {
  return requisicao(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(tarefa),
  });
}

// PATCH /tasks/{id} - altera apenas o status de concluída
export function alterarStatus(id, finished) {
  return requisicao(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ finished }),
  });
}

// DELETE /tasks/{id}
export function excluirTarefa(id) {
  return requisicao(`${BASE_URL}/${id}`, { method: 'DELETE' });
}
