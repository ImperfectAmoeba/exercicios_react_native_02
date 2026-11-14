import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import ListaTarefas from './screens/ListaTarefas';
import FormTarefa from './screens/FormTarefa';
import { cores } from './tema';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: cores.primaria, elevation: 0, shadowOpacity: 0 },
          headerTintColor: '#fff',
          headerTitleStyle: { fontSize: 22, fontWeight: 'bold' },
        }}>
        <Stack.Screen
          name="Tarefas"
          component={ListaTarefas}
          options={{ title: 'Tarefas' }}
        />
        <Stack.Screen
          name="FormTarefa"
          component={FormTarefa}
          options={({ route }) => ({
            title: route.params?.id ? 'Editar Tarefa' : 'Nova Tarefa',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
