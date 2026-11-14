import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import VagasScreen from './screens/VagasScreen';
import DetalhesScreen from './screens/DetalhesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Vagas">
        <Stack.Screen
          name="Vagas"
          component={VagasScreen}
          options={{ title: 'Vagas de TI' }}
        />
        <Stack.Screen
          name="Detalhes"
          component={DetalhesScreen}
          options={{ title: 'Detalhes da vaga' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
