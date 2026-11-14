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
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';

// Moedas disponíveis no conversor
const MOEDAS = [
  { codigo: 'USD', nome: 'Dólar', simbolo: 'US$' },
  { codigo: 'BRL', nome: 'Real', simbolo: 'R$' },
  { codigo: 'EUR', nome: 'Euro', simbolo: '€' },
];

// API pública de câmbio (Frankfurter - lista public-apis, sem chave)
const API_URL = 'https://api.frankfurter.dev/v1/latest';

export default function App() {
  const [valor, setValor] = useState('');
  const [de, setDe] = useState('USD');
  const [para, setPara] = useState('BRL');
  const [resultado, setResultado] = useState('');
  const [carregando, setCarregando] = useState(false);

  const simbolo = (codigo) => MOEDAS.find((m) => m.codigo === codigo).simbolo;

  const converter = async () => {
    Keyboard.dismiss();
    const numero = parseFloat(valor.replace(',', '.'));

    if (isNaN(numero) || numero <= 0) {
      setResultado('Digite um valor válido');
      return;
    }

    // Mesma moeda: não precisa consultar a API
    if (de === para) {
      setResultado(`${simbolo(para)} ${numero.toFixed(2)}`);
      return;
    }

    setCarregando(true);
    try {
      // Requisição GET para obter a cotação
      const resposta = await fetch(`${API_URL}?base=${de}&symbols=${para}`);
      if (!resposta.ok) throw new Error('Falha na requisição');
      const dados = await resposta.json();
      const taxa = dados.rates[para];
      const convertido = numero * taxa;
      setResultado(`${simbolo(para)} ${convertido.toFixed(2)}`);
    } catch (erro) {
      setResultado('Erro ao buscar cotação');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.card}>
        <Text style={styles.titulo}>Conversor de Moedas</Text>
        <Text style={styles.titulo}>Dólar, Real e Euro</Text>

        <View style={styles.linha}>
          <Text style={styles.label}>Valor:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={valor}
            onChangeText={setValor}
            placeholder="0,00"
          />
        </View>

        <View style={styles.linha}>
          <Text style={styles.label}>De:</Text>
          <View style={styles.pickerBox}>
            <Picker selectedValue={de} onValueChange={setDe} style={styles.picker}>
              {MOEDAS.map((m) => (
                <Picker.Item key={m.codigo} label={m.nome} value={m.codigo} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.linha}>
          <Text style={styles.label}>Para:</Text>
          <View style={styles.pickerBox}>
            <Picker selectedValue={para} onValueChange={setPara} style={styles.picker}>
              {MOEDAS.map((m) => (
                <Picker.Item key={m.codigo} label={m.nome} value={m.codigo} />
              ))}
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.botao} onPress={converter} disabled={carregando}>
          <Text style={styles.botaoTexto}>Converter</Text>
        </TouchableOpacity>

        <Text style={styles.resultadoTitulo}>Resultado</Text>
        {carregando ? (
          <ActivityIndicator size="large" color="#5a9e2f" />
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
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 4,
    padding: 20,
  },
  titulo: {
    color: '#d63b3b',
    fontSize: 22,
    textAlign: 'center',
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  label: {
    width: 70,
    fontSize: 18,
    color: '#444',
    textAlign: 'right',
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#333',
    height: 44,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  pickerBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#333',
    height: 44,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
  },
  botao: {
    marginTop: 30,
    backgroundColor: '#a9c8ef',
    borderWidth: 2,
    borderColor: '#333',
    paddingVertical: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    fontSize: 20,
    color: '#222',
  },
  resultadoTitulo: {
    marginTop: 24,
    color: '#5a9e2f',
    fontSize: 20,
    textAlign: 'center',
  },
  resultado: {
    marginTop: 8,
    color: '#5a9e2f',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    minHeight: 32,
  },
});
