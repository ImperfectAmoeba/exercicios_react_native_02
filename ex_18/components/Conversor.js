import { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// API pública de cotações (listada em github.com/public-apis/public-apis)
const API_URL = 'https://economia.awesomeapi.com.br/json/last/';

export default function Conversor({ moeda, simbolo, casasDecimais }) {
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState(null);
  const [cotacao, setCotacao] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function converter() {
    Keyboard.dismiss();
    setErro('');
    setResultado(null);

    const reais = parseFloat(valor.replace(',', '.'));
    if (isNaN(reais) || reais <= 0) {
      setErro('Digite um valor válido em R$');
      return;
    }

    setCarregando(true);
    try {
      // GET da cotação atual: ex. USD-BRL
      const resposta = await fetch(`${API_URL}${moeda}-BRL`);
      const dados = await resposta.json();
      const preco = parseFloat(dados[`${moeda}BRL`].bid);

      setCotacao(preco);
      setResultado(reais / preco);
    } catch (e) {
      setErro('Não foi possível obter a cotação. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Conversor de Moedas</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o valor em R$"
        placeholderTextColor="#f08c00"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <TouchableOpacity style={styles.botao} onPress={converter}>
        <Text style={styles.textoBotao}>Converter</Text>
      </TouchableOpacity>

      <View style={styles.resultadoArea}>
        {carregando ? (
          <ActivityIndicator size="large" color="#1971c2" />
        ) : erro ? (
          <Text style={styles.erro}>{erro}</Text>
        ) : resultado !== null ? (
          <>
            <Text style={styles.resultado}>
              {simbolo} {resultado.toFixed(casasDecimais)}
            </Text>
            <Text style={styles.cotacao}>
              1 {moeda} = R$ {cotacao.toFixed(2)}
            </Text>
          </>
        ) : (
          <Text style={styles.resultado}>Resultado</Text>
        )}
        <View style={styles.linha} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 28,
    color: '#e03131',
    marginBottom: 48,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#1e1e1e',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 32,
  },
  botao: {
    width: '100%',
    backgroundColor: '#a5d8ff',
    borderWidth: 2,
    borderColor: '#1971c2',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 48,
  },
  textoBotao: {
    fontSize: 24,
    color: '#1971c2',
  },
  resultadoArea: {
    width: '100%',
    alignItems: 'center',
  },
  resultado: {
    fontSize: 28,
    color: '#1971c2',
    marginBottom: 4,
  },
  cotacao: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
  },
  erro: {
    fontSize: 16,
    color: '#e03131',
    textAlign: 'center',
    marginBottom: 4,
  },
  linha: {
    width: '100%',
    height: 2,
    backgroundColor: '#1971c2',
    marginTop: 4,
  },
});
