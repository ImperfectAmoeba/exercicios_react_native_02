import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import AnunciosScreen from './screens/AnunciosScreen';
import DetalhesScreen from './screens/DetalhesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator initialRouteName="Anuncios">
        <Stack.Screen
          name="Anuncios"
          component={AnunciosScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detalhes"
          component={DetalhesScreen}
          options={{ title: 'Detalhes do produto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
