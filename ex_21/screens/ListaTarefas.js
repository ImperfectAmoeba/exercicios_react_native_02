import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import { listarTarefas, excluirTarefa } from '../storage';

export default function ListaTarefas({ navigation }) {
  const [tarefas, setTarefas] = useState([]);

  async function carregar() {
    setTarefas(await listarTarefas());
  }

  // Recarrega a lista sempre que a tela volta a ficar visível
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  async function excluir(id) {
    await excluirTarefa(id);
    carregar();
  }

  function renderItem({ item }) {
    return (
      <View style={styles.item}>
        <Text style={styles.nome}>{item.nome}</Text>
        <TouchableOpacity
          style={styles.icone}
          onPress={() => navigation.navigate('FormTarefa', { tarefa: item })}>
          <MaterialIcons name="edit" size={22} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icone} onPress={() => excluir(item.id)}>
          <MaterialIcons name="delete" size={22} color="#c0392b" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma tarefa cadastrada.</Text>
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
    backgroundColor: '#fff',
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    padding: 14,
    marginBottom: 12,
  },
  nome: {
    flex: 1,
    fontSize: 18,
  },
  icone: {
    marginLeft: 12,
  },
  vazio: {
    textAlign: 'center',
    color: '#888',
    marginTop: 32,
  },
  botaoAdicionar: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
