import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import vagas from '../data/vagas';

export default function VagasScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Vagas</Text>

      {vagas.map((vaga) => (
        <View key={vaga.id} style={styles.card}>
          <Text style={styles.tituloVaga}>{vaga.titulo}</Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate('Detalhes', { vaga })}>
            <Text style={styles.textoBotao}>Saiba mais</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  content: {
    padding: 16,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  tituloVaga: {
    fontSize: 20,
    color: '#1e40af',
    marginBottom: 12,
  },
  botao: {
    backgroundColor: '#1e40af',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
