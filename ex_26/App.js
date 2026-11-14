import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Moedas suportadas pelo conversor
const MOEDAS = [
  { codigo: 'BRL', nome: 'Real' },
  { codigo: 'USD', nome: 'Dólar' },
  { codigo: 'EUR', nome: 'Euro' },
  { codigo: 'BTC', nome: 'Bitcoin' },
];

// AwesomeAPI: cotação de cada moeda em Reais (BRL)
const API_URL =
  'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL';

export default function App() {
  const [valor, setValor] = useState('');
  const [de, setDe] = useState('BRL');
  const [para, setPara] = useState('USD');
  const [cotacoes, setCotacoes] = useState(null); // { BRL: 1, USD: x, EUR: y, BTC: z }
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // GET das cotações ao abrir o app
  useEffect(() => {
    fetch(API_URL)
      .then((resposta) => {
        if (!resposta.ok) throw new Error('Falha na requisição');
        return resposta.json();
      })
      .then((dados) => {
        setCotacoes({
          BRL: 1,
          USD: parseFloat(dados.USDBRL.bid),
          EUR: parseFloat(dados.EURBRL.bid),
          BTC: parseFloat(dados.BTCBRL.bid),
        });
      })
      .catch(() => setErro('Não foi possível obter as cotações.'))
      .finally(() => setCarregando(false));
  }, []);

  // Converte usando o Real como moeda intermediária
  function calcularConversao() {
    const numero = parseFloat(valor.replace(',', '.'));
    if (!cotacoes || isNaN(numero)) return '';

    const resultado = (numero * cotacoes[de]) / cotacoes[para];
    const casas = para === 'BTC' ? 8 : 2;
    return resultado.toFixed(casas).replace('.', ',') + ' ' + para;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Conversor de Moedas</Text>
        <View style={styles.linhaTitulo} />

        <View style={styles.linha}>
          <Text style={styles.rotulo}>Valor:</Text>
          <TextInput
            style={styles.campo}
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
            placeholder="0,00"
          />
        </View>

        <View style={styles.linha}>
          <Text style={styles.rotulo}>De:</Text>
          <View style={styles.campo}>
            <Picker selectedValue={de} onValueChange={setDe}>
              {MOEDAS.map((m) => (
                <Picker.Item key={m.codigo} label={m.nome} value={m.codigo} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.linha}>
          <Text style={styles.rotulo}>Para:</Text>
          <View style={styles.campo}>
            <Picker selectedValue={para} onValueChange={setPara}>
              {MOEDAS.map((m) => (
                <Picker.Item key={m.codigo} label={m.nome} value={m.codigo} />
              ))}
            </Picker>
          </View>
        </View>

        <Text style={styles.tituloResultado}>Valor convertido</Text>
        <View style={styles.resultado}>
          {carregando ? (
            <ActivityIndicator color="#3355cc" />
          ) : (
            <Text style={erro ? styles.textoErro : styles.textoResultado}>
              {erro || calcularConversao()}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#222',
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 6,
  },
  linhaTitulo: {
    borderBottomWidth: 2,
    borderColor: '#222',
    marginBottom: 20,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rotulo: {
    width: 60,
    fontSize: 18,
    textAlign: 'right',
    marginRight: 8,
  },
  campo: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: '#222',
    justifyContent: 'center',
    paddingHorizontal: 8,
    fontSize: 18,
  },
  tituloResultado: {
    color: '#3355cc',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  resultado: {
    height: 60,
    borderWidth: 2,
    borderColor: '#3355cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoResultado: {
    fontSize: 22,
    color: '#3355cc',
    fontWeight: 'bold',
  },
  textoErro: {
    fontSize: 14,
    color: '#cc3333',
  },
});
