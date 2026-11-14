import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = '@tarefas';

export async function listarTarefas() {
  const json = await AsyncStorage.getItem(CHAVE);
  return json ? JSON.parse(json) : [];
}

async function gravar(tarefas) {
  await AsyncStorage.setItem(CHAVE, JSON.stringify(tarefas));
}

export async function adicionarTarefa(nome) {
  const tarefas = await listarTarefas();
  tarefas.push({ id: Date.now().toString(), nome });
  await gravar(tarefas);
}

export async function editarTarefa(id, nome) {
  const tarefas = await listarTarefas();
  await gravar(tarefas.map((t) => (t.id === id ? { ...t, nome } : t)));
}

export async function excluirTarefa(id) {
  const tarefas = await listarTarefas();
  await gravar(tarefas.filter((t) => t.id !== id));
}
