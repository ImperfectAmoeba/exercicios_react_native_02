import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { adicionarTarefa, editarTarefa } from '../storage';

export default function FormTarefa({ navigation, route }) {
  const tarefa = route.params?.tarefa; // existe apenas no modo de edição
  const [nome, setNome] = useState(tarefa ? tarefa.nome : '');

  async function salvar() {
    const texto = nome.trim();
    if (!texto) {
      Alert.alert('Atenção', 'Informe o nome da tarefa.');
      return;
    }

    if (tarefa) {
      await editarTarefa(tarefa.id, texto);
    } else {
      await adicionarTarefa(texto);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome da Tarefa</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Ex.: Estudar React Native"
        autoFocus
        onSubmitEditing={salvar}
      />

      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={salvar}>
          <Text style={[styles.textoBotao, styles.salvar]}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    fontSize: 18,
    paddingVertical: 8,
    marginBottom: 24,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  botao: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  textoBotao: {
    fontSize: 16,
    color: '#333',
  },
  salvar: {
    fontWeight: 'bold',
  },
});
