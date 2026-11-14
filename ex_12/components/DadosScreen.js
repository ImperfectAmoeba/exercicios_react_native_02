import { View, Text, StyleSheet } from 'react-native';

export default function DadosScreen({ route }) {
  const { nome, idade, sexo, escolaridade, limite, brasileiro } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.item}>Nome: {nome}</Text>
      <Text style={styles.item}>Idade: {idade}</Text>
      <Text style={styles.item}>Sexo: {sexo}</Text>
      <Text style={styles.item}>Escolaridade: {escolaridade}</Text>
      <Text style={styles.item}>Limite: {limite}</Text>
      <Text style={styles.item}>Brasileiro: {brasileiro ? 'Sim' : 'Não'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    fontSize: 16,
    marginBottom: 16,
  },
});
