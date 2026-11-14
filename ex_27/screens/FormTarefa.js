import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { adicionarTarefa, buscarTarefa, editarTarefa } from '../api';
import { cores } from '../tema';

export default function FormTarefa({ navigation, route }) {
  const id = route.params?.id; // existe apenas no modo de edição
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [concluida, setConcluida] = useState(false);
  const [carregando, setCarregando] = useState(!!id);
  const [salvando, setSalvando] = useState(false);

  // No modo de edição, busca os dados atuais da tarefa (GET /tasks/{id})
  useEffect(() => {
    if (!id) return;
    buscarTarefa(id)
      .then((t) => {
        setTitulo(t.title ?? '');
        setDescricao(t.description ?? '');
        setConcluida(!!t.finished);
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível carregar a tarefa.');
        navigation.goBack();
      })
      .finally(() => setCarregando(false));
  }, [id]);

  async function salvar() {
    const texto = titulo.trim();
    if (!texto) {
      Alert.alert('Atenção', 'Informe o título da tarefa.');
      return;
    }

    const tarefa = {
      title: texto,
      description: descricao.trim(),
      finished: concluida,
    };

    setSalvando(true);
    try {
      if (id) {
        await editarTarefa(id, tarefa);
      } else {
        await adicionarTarefa(tarefa);
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={cores.primaria} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <View style={styles.card}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex.: Estudar React Native"
          placeholderTextColor={cores.textoClaro}
          autoFocus={!id}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.inputMultilinha]}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Detalhes da tarefa (opcional)"
          placeholderTextColor={cores.textoClaro}
          multiline
          textAlignVertical="top"
        />

        <View style={styles.linhaSwitch}>
          <Text style={styles.labelSwitch}>Concluída</Text>
          <Switch
            value={concluida}
            onValueChange={setConcluida}
            trackColor={{ true: cores.sucesso, false: cores.borda }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.botao, styles.botaoSalvar]}
        onPress={salvar}
        disabled={salvando}>
        {salvando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <MaterialIcons name="save" size={20} color="#fff" />
            <Text style={styles.textoSalvar}>Salvar</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, styles.botaoCancelar]}
        onPress={() => navigation.goBack()}
        disabled={salvando}>
        <Text style={styles.textoCancelar}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: 16,
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.fundo,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: cores.texto,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    color: cores.texto,
  },
  inputMultilinha: {
    minHeight: 100,
  },
  linhaSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelSwitch: {
    fontSize: 16,
    color: cores.texto,
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 12,
  },
  botaoSalvar: {
    backgroundColor: cores.primaria,
  },
  textoSalvar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  botaoCancelar: {
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: '#fff',
  },
  textoCancelar: {
    color: cores.texto,
    fontSize: 16,
  },
});
