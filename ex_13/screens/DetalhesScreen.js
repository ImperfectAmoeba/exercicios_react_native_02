import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DetalhesScreen({ route }) {
  const { produto } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <Image source={{ uri: produto.thumbnail }} style={styles.foto} />

      <Text style={styles.nome}>{produto.title}</Text>
      <Text style={styles.preco}>US$ {produto.price.toFixed(2)}</Text>

      <Text style={styles.descricao}>{produto.description}</Text>

      <View style={styles.info}>
        <Linha icone="pricetag-outline" rotulo="Categoria" valor={produto.category} />
        {produto.brand && (
          <Linha icone="business-outline" rotulo="Marca" valor={produto.brand} />
        )}
        <Linha icone="star-outline" rotulo="Avaliação" valor={`${produto.rating} / 5`} />
        <Linha icone="cube-outline" rotulo="Estoque" valor={`${produto.stock} unidades`} />
      </View>
    </ScrollView>
  );
}

function Linha({ icone, rotulo, valor }) {
  return (
    <View style={styles.linha}>
      <Ionicons name={icone} size={20} color="#d32f2f" />
      <Text style={styles.rotulo}>{rotulo}:</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  conteudo: {
    padding: 20,
    alignItems: 'center',
  },
  foto: {
    width: 260,
    height: 260,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  preco: {
    fontSize: 20,
    color: '#558b2f',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  descricao: {
    fontSize: 15,
    color: '#444',
    textAlign: 'justify',
    marginBottom: 16,
  },
  info: {
    alignSelf: 'stretch',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 12,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  rotulo: {
    fontWeight: 'bold',
  },
  valor: {
    flexShrink: 1,
    color: '#333',
  },
});
