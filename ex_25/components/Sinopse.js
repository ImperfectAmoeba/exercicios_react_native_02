import { ScrollView, Text, View, StyleSheet } from 'react-native';

export default function Sinopse({ route }) {
  const { filme } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>{filme.nome} - Sinopse</Text>
      <View style={styles.caixa}>
        <Text style={styles.texto}>{filme.sinopse}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  conteudo: {
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    marginBottom: 16,
  },
  caixa: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 4,
    padding: 16,
  },
  texto: {
    fontSize: 15,
    lineHeight: 22,
    color: '#2e7d32',
  },
});
