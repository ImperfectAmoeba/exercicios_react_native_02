import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import Conversor from './components/Conversor';

const Tab = createBottomTabNavigator();

function Dolar() {
  return <Conversor moeda="USD" simbolo="US$" casasDecimais={2} />;
}

function Euro() {
  return <Conversor moeda="EUR" simbolo="€" casasDecimais={2} />;
}

function BitCoin() {
  return <Conversor moeda="BTC" simbolo="₿" casasDecimais={8} />;
}

const icones = {
  Dólar: 'currency-usd',
  Euro: 'currency-eur',
  BitCoin: 'bitcoin',
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#2f9e44',
          tabBarInactiveTintColor: '#868e96',
          tabBarStyle: {
            borderTopWidth: 2,
            borderTopColor: '#2f9e44',
            height: 70,
            paddingTop: 6,
          },
          tabBarLabelStyle: { fontSize: 13 },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name={icones[route.name]} size={size} color={color} />
          ),
        })}
      >
        <Tab.Screen name="Dólar" component={Dolar} />
        <Tab.Screen name="Euro" component={Euro} />
        <Tab.Screen name="BitCoin" component={BitCoin} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
