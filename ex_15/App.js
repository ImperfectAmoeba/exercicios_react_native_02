import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import ListaVagas from './screens/ListaVagas';
import DetalhesVaga from './screens/DetalhesVaga';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator initialRouteName="ListaVagas">
        <Stack.Screen
          name="ListaVagas"
          component={ListaVagas}
          options={{ title: 'Vagas de TI' }}
        />
        <Stack.Screen
          name="DetalhesVaga"
          component={DetalhesVaga}
          options={{ title: 'Detalhes da vaga' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
