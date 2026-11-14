import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import { listarTarefas, excluirTarefa, alterarStatus } from '../api';
import { cores } from '../tema';

export default function ListaTarefas({ navigation }) {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  async function carregar() {
    try {
      const dados = await listarTarefas();
      // pendentes primeiro, depois as mais recentes
      dados.sort((a, b) => a.finished - b.finished || b.id - a.id);
      setTarefas(dados);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar as tarefas.');
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }

  // Recarrega a lista sempre que a tela volta a ficar visível
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  async function alternarStatus(tarefa) {
    const novo = !tarefa.finished;
    // atualiza na tela antes da resposta da API
    setTarefas((lista) =>
      lista.map((t) => (t.id === tarefa.id ? { ...t, finished: novo } : t))
    );
    try {
      await alterarStatus(tarefa.id, novo);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível alterar o status.');
      carregar();
    }
  }

  async function excluir(id) {
    try {
      await excluirTarefa(id);
      setTarefas((lista) => lista.filter((t) => t.id !== id));
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
    }
  }

  function confirmarExclusao(tarefa) {
    const mensagem = `Deseja excluir "${tarefa.title}"?`;
    if (Platform.OS === 'web') {
      if (window.confirm(mensagem)) excluir(tarefa.id);
      return;
    }
    Alert.alert('Excluir tarefa', mensagem, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => excluir(tarefa.id) },
    ]);
  }

  const concluidas = tarefas.filter((t) => t.finished).length;

  function renderItem({ item }) {
    return (
      <View style={[styles.card, item.finished && styles.cardConcluido]}>
        <TouchableOpacity onPress={() => alternarStatus(item)} style={styles.check}>
          <MaterialIcons
            name={item.finished ? 'check-circle' : 'radio-button-unchecked'}
            size={28}
            color={item.finished ? cores.sucesso : cores.textoClaro}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.info}
          onPress={() => navigation.navigate('FormTarefa', { id: item.id })}>
          <Text
            style={[styles.titulo, item.finished && styles.tituloConcluido]}
            numberOfLines={1}>
            {item.title}
          </Text>
          {!!item.description && (
            <Text style={styles.descricao} numberOfLines={2}>
              {item.description}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icone}
          onPress={() => navigation.navigate('FormTarefa', { id: item.id })}>
          <MaterialIcons name="edit" size={22} color={cores.primaria} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icone} onPress={() => confirmarExclusao(item)}>
          <MaterialIcons name="delete-outline" size={22} color={cores.perigo} />
        </TouchableOpacity>
      </View>
    );
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={cores.primaria} />
        <Text style={styles.textoCarregando}>Carregando tarefas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.resumo}>
        <View style={styles.resumoItem}>
          <Text style={styles.resumoNumero}>{tarefas.length}</Text>
          <Text style={styles.resumoLabel}>Total</Text>
        </View>
        <View style={styles.resumoItem}>
          <Text style={styles.resumoNumero}>{tarefas.length - concluidas}</Text>
          <Text style={styles.resumoLabel}>Pendentes</Text>
        </View>
        <View style={styles.resumoItem}>
          <Text style={styles.resumoNumero}>{concluidas}</Text>
          <Text style={styles.resumoLabel}>Concluídas</Text>
        </View>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        refreshing={atualizando}
        onRefresh={() => {
          setAtualizando(true);
          carregar();
        }}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <MaterialIcons name="assignment" size={64} color={cores.borda} />
            <Text style={styles.textoVazio}>Nenhuma tarefa cadastrada.</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('FormTarefa')}>
        <MaterialIcons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.fundo,
  },
  textoCarregando: {
    marginTop: 12,
    color: cores.textoClaro,
  },
  resumo: {
    flexDirection: 'row',
    backgroundColor: cores.primaria,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  resumoItem: {
    flex: 1,
    alignItems: 'center',
  },
  resumoNumero: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  resumoLabel: {
    fontSize: 13,
    color: '#e0e0ff',
  },
  lista: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: cores.primaria,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardConcluido: {
    borderLeftColor: cores.sucesso,
    opacity: 0.75,
  },
  check: {
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '600',
    color: cores.texto,
  },
  tituloConcluido: {
    textDecorationLine: 'line-through',
    color: cores.textoClaro,
  },
  descricao: {
    fontSize: 14,
    color: cores.textoClaro,
    marginTop: 2,
  },
  icone: {
    marginLeft: 12,
    padding: 2,
  },
  vazio: {
    alignItems: 'center',
    marginTop: 64,
  },
  textoVazio: {
    color: cores.textoClaro,
    marginTop: 8,
    fontSize: 16,
  },
  botaoAdicionar: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: cores.primaria,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
