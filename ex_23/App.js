import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function buscarCep() {
    const cepLimpo = cep.replace(/\D/g, '');
    Keyboard.dismiss();

    if (cepLimpo.length !== 8) {
      setErro('Digite um CEP válido com 8 números.');
      setEndereco(null);
      return;
    }

    setCarregando(true);
    setErro('');
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const dados = await resposta.json();

      if (dados.erro) {
        setErro('CEP não encontrado.');
        setEndereco(null);
      } else {
        setEndereco(dados);
      }
    } catch (e) {
      setErro('Erro ao consultar o CEP. Verifique sua conexão.');
      setEndereco(null);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.titulo}>Cep x Endereço</Text>
      <View style={styles.linha} />

      <View style={styles.busca}>
        <TextInput
          style={styles.input}
          placeholder="Digite o CEP..."
          keyboardType="numeric"
          maxLength={9}
          value={cep}
          onChangeText={setCep}
          onSubmitEditing={buscarCep}
        />
        <TouchableOpacity style={styles.botao} onPress={buscarCep}>
          <MaterialIcons name="check" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {carregando && <ActivityIndicator size="large" color="#6aa84f" />}
      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <View style={styles.resultado}>
        <Campo label="Cep" valor={endereco?.cep} />
        <Campo label="Logradouro" valor={endereco?.logradouro} />
        <Campo label="Bairro" valor={endereco?.bairro} />
        <Campo label="Cidade" valor={endereco?.localidade} />
        <Campo label="Estado" valor={endereco?.uf} />
      </View>
    </View>
  );
}

function Campo({ label, valor }) {
  return (
    <Text style={styles.campo}>
      <Text style={styles.label}>{label}: </Text>
      {valor ? valor : '______'}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
  },
  linha: {
    height: 2,
    backgroundColor: '#000',
    marginBottom: 30,
  },
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: '#000',
    paddingHorizontal: 10,
    fontSize: 16,
    marginRight: 12,
  },
  botao: {
    width: 50,
    height: 50,
    backgroundColor: '#6aa84f',
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  erro: {
    color: '#c0392b',
    fontSize: 15,
    marginBottom: 15,
  },
  resultado: {
    marginTop: 10,
  },
  campo: {
    fontSize: 20,
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
  },
});
