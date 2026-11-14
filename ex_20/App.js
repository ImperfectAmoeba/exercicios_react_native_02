import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_DIA = '@frases:dia';
const CHAVE_PEQUENO = '@frases:pequeno';

export default function App() {
  const [dia, setDia] = useState(true);
  const [pequeno, setPequeno] = useState(true);

  // Carrega as preferências salvas ao abrir o app
  useEffect(() => {
    async function carregarPreferencias() {
      try {
        const diaSalvo = await AsyncStorage.getItem(CHAVE_DIA);
        const pequenoSalvo = await AsyncStorage.getItem(CHAVE_PEQUENO);

        if (diaSalvo !== null) setDia(JSON.parse(diaSalvo));
        if (pequenoSalvo !== null) setPequeno(JSON.parse(pequenoSalvo));
      } catch (erro) {
        console.log('Erro ao carregar preferências:', erro);
      }
    }
    carregarPreferencias();
  }, []);

  async function alterarDia(valor) {
    setDia(valor);
    try {
      await AsyncStorage.setItem(CHAVE_DIA, JSON.stringify(valor));
    } catch (erro) {
      console.log('Erro ao salvar preferência Dia:', erro);
    }
  }

  async function alterarPequeno(valor) {
    setPequeno(valor);
    try {
      await AsyncStorage.setItem(CHAVE_PEQUENO, JSON.stringify(valor));
    } catch (erro) {
      console.log('Erro ao salvar preferência Pequeno:', erro);
    }
  }

  const corFundo = dia ? '#ffffff' : '#222222';
  const corTexto = dia ? '#000000' : '#ffffff';
  const tamanhoFonte = pequeno ? 14 : 28;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Frases</Text>

      <View style={styles.linhaSwitches}>
        <View style={styles.opcao}>
          <Text style={styles.rotulo}>Dia</Text>
          <Switch value={dia} onValueChange={alterarDia} />
        </View>

        <View style={styles.opcao}>
          <Text style={styles.rotulo}>Pequeno</Text>
          <Switch value={pequeno} onValueChange={alterarPequeno} />
        </View>
      </View>

      <View style={[styles.caixaFrase, { backgroundColor: corFundo }]}>
        <Text style={{ color: corTexto, fontSize: tamanhoFonte }}>
          "A vingança nunca é plena, mata a alma e envenena"
          {'\n'}(Seu Madruga)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  titulo: {
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#999',
  },
  linhaSwitches: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rotulo: {
    fontSize: 18,
    marginRight: 6,
  },
  caixaFrase: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#555',
    padding: 16,
  },
});
