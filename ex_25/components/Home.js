import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const API_URL = 'https://sujeitoprogramador.com/r-api/?api=filmes';

export default function Home({ navigation }) {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarFilmes() {
      try {
        const response = await fetch(API_URL); // GET
        const data = await response.json();
        setFilmes(data);
      } catch (e) {
        setErro('Não foi possível carregar os filmes.');
      } finally {
        setLoading(false);
      }
    }
    carregarFilmes();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.center}>
        <Text>{erro}</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.lista}
      data={filmes}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.cabecalho}>
            <Text style={styles.nome}>{item.nome}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sinopse', { filme: item })}>
              <Text style={styles.leiaMais}>Leia mais</Text>
            </TouchableOpacity>
          </View>
          <Image source={{ uri: item.foto }} style={styles.foto} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  lista: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 24,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nome: {
    fontSize: 20,
    flexShrink: 1,
  },
  leiaMais: {
    fontSize: 16,
    color: '#2e7d32',
    marginLeft: 8,
  },
  foto: {
    width: '100%',
    height: 180,
    borderWidth: 1,
    borderColor: '#1a3fb3',
    borderRadius: 4,
    resizeMode: 'cover',
  },
});
