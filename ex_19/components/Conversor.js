import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

// API pública de cotações (lista public-apis): AwesomeAPI
const API_URL = 'https://economia.awesomeapi.com.br/json/last/';

export default function Conversor({ moeda, simbolo, casasDecimais }) {
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState('Resultado');
  const [carregando, setCarregando] = useState(false);

  async function converter() {
    Keyboard.dismiss();
    const reais = parseFloat(valor.replace(',', '.'));

    if (isNaN(reais) || reais <= 0) {
      setResultado('Digite um valor válido');
      return;
    }

    setCarregando(true);
    try {
      // GET da cotação atual da moeda em relação ao Real
      const resposta = await fetch(`${API_URL}${moeda}-BRL`);
      const dados = await resposta.json();
      const cotacao = parseFloat(dados[`${moeda}BRL`].bid);

      const convertido = reais / cotacao;
      setResultado(`${simbolo} ${convertido.toFixed(casasDecimais).replace('.', ',')}`);
    } catch (erro) {
      setResultado('Erro ao buscar cotação');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o valor em R$"
        placeholderTextColor="#F5900B"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

      <TouchableOpacity style={styles.botao} onPress={converter}>
        <Text style={styles.textoBotao}>Converter</Text>
      </TouchableOpacity>

      <View style={styles.areaResultado}>
        {carregando ? (
          <ActivityIndicator size="large" color="#1971C2" />
        ) : (
          <Text style={styles.resultado}>{resultado}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  input: {
    borderWidth: 2,
    borderColor: '#1E1E1E',
    borderRadius: 10,
    height: 55,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  botao: {
    marginTop: 35,
    backgroundColor: '#A5D8FF',
    borderWidth: 2,
    borderColor: '#1971C2',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotao: {
    color: '#1971C2',
    fontSize: 22,
  },
  areaResultado: {
    marginTop: 45,
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#1971C2',
  },
  resultado: {
    color: '#1971C2',
    fontSize: 26,
  },
});
