import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

export default function FormularioScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('Masculino');
  const [escolaridade, setEscolaridade] = useState('Ensino Médio');
  const [limite, setLimite] = useState(200);
  const [brasileiro, setBrasileiro] = useState(true);

  function confirmar() {
    if (nome.trim() === '' || idade.trim() === '') {
      Alert.alert('Atenção', 'Preencha o nome e a idade.');
      return;
    }
    navigation.navigate('Dados', {
      nome,
      idade,
      sexo,
      escolaridade,
      limite,
      brasileiro,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.linha}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Seu nome"
        />
      </View>

      <View style={styles.linha}>
        <Text style={styles.label}>Idade:</Text>
        <TextInput
          style={[styles.input, { flex: 0, width: 70 }]}
          value={idade}
          onChangeText={(t) => setIdade(t.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          maxLength={3}
        />
      </View>

      <View style={styles.linha}>
        <Text style={styles.label}>Sexo:</Text>
        <View style={styles.pickerBox}>
          <Picker selectedValue={sexo} onValueChange={setSexo}>
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Feminino" value="Feminino" />
            <Picker.Item label="Outro" value="Outro" />
          </Picker>
        </View>
      </View>

      <View style={styles.linha}>
        <Text style={styles.label}>Escolaridade:</Text>
        <View style={styles.pickerBox}>
          <Picker selectedValue={escolaridade} onValueChange={setEscolaridade}>
            <Picker.Item label="Ensino Fundamental" value="Ensino Fundamental" />
            <Picker.Item label="Ensino Médio" value="Ensino Médio" />
            <Picker.Item label="Ensino Superior" value="Ensino Superior" />
            <Picker.Item label="Pós-graduação" value="Pós-graduação" />
          </Picker>
        </View>
      </View>

      <View style={styles.linha}>
        <Text style={styles.label}>Limite:</Text>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={1000}
            step={50}
            value={limite}
            onValueChange={setLimite}
          />
          <Text>{limite}</Text>
        </View>
      </View>

      <View style={styles.linha}>
        <Text style={styles.label}>Brasileiro:</Text>
        <Switch value={brasileiro} onValueChange={setBrasileiro} />
      </View>

      <TouchableOpacity style={styles.botao} onPress={confirmar}>
        <Text style={styles.botaoTexto}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#555',
    paddingVertical: 4,
    fontSize: 16,
  },
  pickerBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#555',
    justifyContent: 'center',
  },
  botao: {
    marginTop: 12,
    backgroundColor: '#90caf9',
    borderWidth: 1,
    borderColor: '#1e40af',
    padding: 14,
    alignItems: 'center',
  },
  botaoTexto: {
    fontSize: 16,
  },
});
