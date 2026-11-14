import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

function Item({ titulo, texto }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemTitulo}>{titulo}</Text>
      <Text style={styles.itemTexto}>{texto}</Text>
    </View>
  );
}

function Pessoal() {
  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Pessoal</Text>
      <Item titulo="Nome" texto="Maria Silva" />
      <Item titulo="Idade" texto="22 anos" />
      <Item titulo="Cidade" texto="São Paulo - SP" />
      <Item titulo="E-mail" texto="maria@email.com" />
    </View>
  );
}

function Formacao() {
  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Formação</Text>
      <Item titulo="Ensino Superior" texto="Análise e Desenvolvimento de Sistemas (em andamento)" />
      <Item titulo="Ensino Médio" texto="Escola Estadual - Concluído em 2021" />
      <Item titulo="Idiomas" texto="Inglês intermediário" />
    </View>
  );
}

function Experiencia() {
  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>Experiência</Text>
      <Item titulo="Estágio em Desenvolvimento" texto="Empresa X - 2025 até o momento" />
      <Item titulo="Suporte Técnico" texto="Empresa Y - 2023 a 2024" />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#000',
              tabBarInactiveTintColor: '#777',
              tabBarIndicatorStyle: { backgroundColor: '#000', height: 3 },
              tabBarLabelStyle: { fontSize: 13, textTransform: 'none' },
              tabBarStyle: { backgroundColor: '#fff' },
            }}>
            <Tab.Screen name="Pessoal" component={Pessoal} />
            <Tab.Screen name="Formação" component={Formacao} />
            <Tab.Screen name="Experiência" component={Experiencia} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tela: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    marginBottom: 16,
  },
  itemTitulo: {
    fontSize: 14,
    color: '#777',
  },
  itemTexto: {
    fontSize: 16,
    color: '#000',
  },
});
