import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import vagas from '../data/vagas';

export default function ListaVagas({ navigation }) {
  function renderVaga({ item }) {
    return (
      <View style={styles.card}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('DetalhesVaga', { vaga: item })}
        >
          <Text style={styles.textoBotao}>Saiba mais</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cabecalho}>Vagas</Text>
      <FlatList
        data={vagas}
        keyExtractor={(item) => item.id}
        renderItem={renderVaga}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  cabecalho: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  lista: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 20,
    color: '#2945d6',
    marginBottom: 12,
  },
  botao: {
    alignSelf: 'flex-start',
    backgroundColor: '#2945d6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
