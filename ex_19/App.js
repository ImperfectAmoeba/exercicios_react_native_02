import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import Conversor from './components/Conversor';

const Tab = createMaterialTopTabNavigator();

function Dolar() {
  return <Conversor moeda="USD" simbolo="US$" casasDecimais={2} />;
}

function Euro() {
  return <Conversor moeda="EUR" simbolo="€" casasDecimais={2} />;
}

function Bitcoin() {
  return <Conversor moeda="BTC" simbolo="₿" casasDecimais={8} />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <Text style={styles.titulo}>Conversor de Moedas</Text>

        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#2F9E44',
              tabBarInactiveTintColor: '#2F9E44',
              tabBarIndicatorStyle: { backgroundColor: '#2F9E44', height: 3 },
              tabBarLabelStyle: { fontSize: 16, textTransform: 'none' },
              tabBarStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0 },
            }}
          >
            <Tab.Screen name="Dolar" component={Dolar} options={{ title: 'Dólar' }} />
            <Tab.Screen name="Euro" component={Euro} />
            <Tab.Screen name="Bitcoin" component={Bitcoin} options={{ title: 'BitCoin' }} />
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
  titulo: {
    color: '#E03131',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
});
