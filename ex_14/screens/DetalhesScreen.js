import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DetalhesScreen({ route }) {
  const { vaga } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.tituloVaga}>{vaga.titulo}</Text>

        <Text style={styles.linha}>
          <Text style={styles.rotulo}>Salário: </Text>
          {vaga.salario}
        </Text>

        <Text style={styles.linha}>
          <Text style={styles.rotulo}>Descrição: </Text>
          {vaga.descricao}
        </Text>

        <Text style={styles.linha}>
          <Text style={styles.rotulo}>Contato: </Text>
          {vaga.contato}
        </Text>
      </View>
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
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    padding: 16,
  },
  tituloVaga: {
    fontSize: 22,
    color: '#1e40af',
    marginBottom: 12,
  },
  linha: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
  },
  rotulo: {
    fontWeight: 'bold',
  },
});
