import { ScrollView, View, Text } from 'react-native';
import estilos from './styles';

const experiencias = [
  {
    cargo: 'Estagiária de Desenvolvimento',
    empresa: 'Empresa de Tecnologia',
    periodo: '2025 - atual',
    descricao: 'Desenvolvimento de aplicativos mobile com React Native e Expo.',
  },
  {
    cargo: 'Monitora de Programação',
    empresa: 'Faculdade de Tecnologia',
    periodo: '2024 - 2025',
    descricao: 'Apoio aos alunos nas disciplinas de lógica e programação.',
  },
];

export default function Experiencia() {
  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>
      {experiencias.map((item) => (
        <View key={item.cargo} style={estilos.card}>
          <Text style={estilos.cardTitulo}>{item.cargo}</Text>
          <Text style={estilos.cardSub}>{item.empresa}</Text>
          <Text style={estilos.cardPeriodo}>{item.periodo}</Text>
          <Text style={estilos.cardTexto}>{item.descricao}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
