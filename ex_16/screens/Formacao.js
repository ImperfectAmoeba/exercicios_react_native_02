import { ScrollView, View, Text } from 'react-native';
import estilos from './styles';

const formacoes = [
  {
    curso: 'Análise e Desenvolvimento de Sistemas',
    instituicao: 'Faculdade de Tecnologia',
    periodo: '2024 - 2026 (cursando)',
  },
  {
    curso: 'Ensino Médio',
    instituicao: 'Escola Estadual',
    periodo: '2020 - 2022',
  },
  {
    curso: 'Inglês Intermediário',
    instituicao: 'Escola de Idiomas',
    periodo: '2021 - 2023',
  },
];

export default function Formacao() {
  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>
      {formacoes.map((item) => (
        <View key={item.curso} style={estilos.card}>
          <Text style={estilos.cardTitulo}>{item.curso}</Text>
          <Text style={estilos.cardSub}>{item.instituicao}</Text>
          <Text style={estilos.cardPeriodo}>{item.periodo}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
