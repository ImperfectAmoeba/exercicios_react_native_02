import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const [login, setLogin] = useState('');
  const [dev, setDev] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function buscarDev() {
    const usuario = login.trim();
    if (!usuario) {
      setErro('Digite um login do GitHub.');
      return;
    }

    Keyboard.dismiss();
    setCarregando(true);
    setErro('');

    try {
      const resposta = await fetch(`https://api.github.com/users/${usuario}`);
      if (resposta.status === 404) {
        throw new Error('Usuário não encontrado.');
      }
      if (!resposta.ok) {
        throw new Error('Erro ao consultar a API do GitHub.');
      }
      const dados = await resposta.json();
      setDev(dados);
    } catch (e) {
      setDev(null);
      setErro(e.message || 'Erro de conexão.');
    } finally {
      setCarregando(false);
    }
  }

  function formatarData(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}/${d.getFullYear()}`;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.titulo}>Perfil dos Devs</Text>
      <View style={styles.linha} />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled">
        <View style={styles.fotoBox}>
          {dev ? (
            <Image source={{ uri: dev.avatar_url }} style={styles.foto} />
          ) : (
            <FontAwesome name="github" size={150} color="#5f6368" />
          )}
        </View>

        <View style={styles.busca}>
          <TextInput
            style={styles.input}
            placeholder="Digite o login git..."
            value={login}
            onChangeText={setLogin}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            onSubmitEditing={buscarDev}
          />
          <TouchableOpacity style={styles.botao} onPress={buscarDev}>
            {carregando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <FontAwesome name="check" size={26} color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <View style={styles.info}>
          <Campo rotulo="Id" valor={dev?.id} />
          <Campo rotulo="Nome" valor={dev?.name || dev?.login} />
          <Campo rotulo="Repositórios" valor={dev?.public_repos} />
          <Campo rotulo="Criado em" valor={formatarData(dev?.created_at)} />
          <Campo rotulo="Seguidores" valor={dev?.followers} />
          <Campo rotulo="Seguindo" valor={dev?.following} />
        </View>
      </ScrollView>
    </View>
  );
}

function Campo({ rotulo, valor }) {
  const temValor = valor !== undefined && valor !== null && valor !== '';
  return (
    <View style={styles.campo}>
      <Text style={styles.rotulo}>{rotulo}: </Text>
      <Text style={[styles.valor, !temValor && styles.vazio]}>
        {temValor ? String(valor) : '________'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  titulo: {
    fontSize: 26,
    textAlign: 'center',
    color: '#222',
  },
  linha: {
    height: 3,
    backgroundColor: '#333',
    marginHorizontal: 20,
    marginTop: 8,
  },
  conteudo: {
    padding: 20,
  },
  fotoBox: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    overflow: 'hidden',
  },
  foto: {
    width: '100%',
    height: '100%',
  },
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: '#333',
    paddingHorizontal: 10,
    fontSize: 16,
    marginRight: 10,
  },
  botao: {
    width: 50,
    height: 50,
    backgroundColor: '#7cb342',
    borderWidth: 2,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  erro: {
    color: '#c62828',
    marginBottom: 10,
  },
  info: {
    marginTop: 20,
  },
  campo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  rotulo: {
    fontSize: 20,
    color: '#333',
  },
  valor: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    flexShrink: 1,
  },
  vazio: {
    color: '#999',
    fontWeight: 'normal',
  },
});
