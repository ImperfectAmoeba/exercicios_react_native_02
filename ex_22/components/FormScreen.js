import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { carregarItens, salvarItens } from './storage';

export default function FormScreen({ navigation, route }) {
  const itemEditado = route.params?.item;

  const [mercadoria, setMercadoria] = useState(itemEditado?.mercadoria ?? '');
  const [quantidade, setQuantidade] = useState(itemEditado?.quantidade ?? '');

  const salvar = async () => {
    if (!mercadoria.trim() || !quantidade.trim()) {
      Alert.alert('Atenção', 'Preencha a mercadoria e a quantidade.');
      return;
    }

    const itens = await carregarItens();
    let novos;

    if (itemEditado) {
      novos = itens.map((i) =>
        i.id === itemEditado.id
          ? { ...i, mercadoria: mercadoria.trim(), quantidade: quantidade.trim() }
          : i
      );
    } else {
      novos = [
        ...itens,
        {
          id: Date.now().toString(),
          mercadoria: mercadoria.trim(),
          quantidade: quantidade.trim(),
        },
      ];
    }

    await salvarItens(novos);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Mercadoria</Text>
        <TextInput
          style={styles.input}
          value={mercadoria}
          onChangeText={setMercadoria}
          placeholder="Ex.: Tomate"
        />

        <Text style={styles.label}>Quantidade</Text>
        <TextInput
          style={styles.input}
          value={quantidade}
          onChangeText={setQuantidade}
          placeholder="Ex.: 2 ou 5kg"
        />

        <View style={styles.botoes}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.botaoTexto}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={salvar}>
            <Text style={[styles.botaoTexto, styles.salvar]}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    padding: 20,
  },
  label: {
    fontSize: 13,
    color: '#555',
    marginTop: 8,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    paddingVertical: 6,
    fontSize: 16,
    marginBottom: 16,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  botaoTexto: {
    fontSize: 16,
    marginHorizontal: 16,
    color: '#333',
  },
  salvar: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
});
