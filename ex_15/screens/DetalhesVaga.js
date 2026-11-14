import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { formatarSalario } from '../data/vagas';

export default function DetalhesVaga({ route }) {
  const { vaga } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <View style={styles.card}>
        <Text style={styles.titulo}>{vaga.titulo}</Text>

        <Text style={styles.linha}>
          <Text style={styles.rotulo}>Salário: </Text>
          {formatarSalario(vaga.salario)}
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
  conteudo: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    color: '#2945d6',
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
