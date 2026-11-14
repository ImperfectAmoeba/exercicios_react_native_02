import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// API pública de produtos fictícios (GET)
const API_URL = 'https://dummyjson.com/products?limit=10';

export default function AnunciosScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((resposta) => resposta.json())
      .then((dados) => setProdutos(dados.products))
      .catch(() => setErro('Não foi possível carregar os anúncios.'))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Anúncios</Text>

      {carregando && <ActivityIndicator size="large" color="#d32f2f" />}
      {erro && <Text style={styles.erro}>{erro}</Text>}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.lista}
        style={styles.scroll}
      >
        {produtos.map((produto) => (
          <View key={produto.id} style={styles.card}>
            <Image source={{ uri: produto.thumbnail }} style={styles.foto} />
            <Text style={styles.nome} numberOfLines={2}>
              {produto.title}
            </Text>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.navigate('Detalhes', { produto })}
            >
              <Text style={styles.textoBotao}>Ver detalhes</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {!carregando && !erro && (
        <View style={styles.dica}>
          <Ionicons name="arrow-back" size={22} color="#333" />
          <Text style={styles.textoDica}>Scroll</Text>
          <Ionicons name="arrow-forward" size={22} color="#333" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginVertical: 32,
  },
  scroll: {
    flexGrow: 0,
  },
  lista: {
    paddingHorizontal: 12,
  },
  card: {
    width: 160,
    marginHorizontal: 6,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
  foto: {
    width: 130,
    height: 130,
    borderRadius: 6,
    backgroundColor: '#eee',
    marginBottom: 8,
  },
  nome: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    minHeight: 40,
    marginBottom: 8,
  },
  botao: {
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dica: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
  },
  textoDica: {
    fontSize: 16,
    color: '#558b2f',
    fontWeight: '600',
  },
  erro: {
    color: '#d32f2f',
    textAlign: 'center',
    margin: 16,
  },
});
