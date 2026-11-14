import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import estilos from './styles';

const dados = [
  { icone: 'person-outline', rotulo: 'Nome', valor: 'Seu Nome Completo' },
  { icone: 'calendar-outline', rotulo: 'Idade', valor: '21 anos' },
  { icone: 'location-outline', rotulo: 'Cidade', valor: 'São Paulo - SP' },
  { icone: 'call-outline', rotulo: 'Telefone', valor: '(11) 99999-9999' },
];

export default function Pessoal() {
  return (
    <View style={[estilos.container, estilos.conteudo]}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={64} color="#fff" />
      </View>

      {dados.map((item) => (
        <View key={item.rotulo} style={styles.linha}>
          <Ionicons name={item.icone} size={22} color="#4caf50" />
          <View style={styles.textos}>
            <Text style={styles.rotulo}>{item.rotulo}</Text>
            <Text style={styles.valor}>{item.valor}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#4caf50',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  textos: {
    marginLeft: 12,
  },
  rotulo: {
    fontSize: 12,
    color: '#888',
  },
  valor: {
    fontSize: 16,
  },
});
