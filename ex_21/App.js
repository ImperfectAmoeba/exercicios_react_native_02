import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import ListaTarefas from './screens/ListaTarefas';
import FormTarefa from './screens/FormTarefa';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 24 },
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
            title: route.params?.tarefa ? 'Editar Tarefa' : 'Nova Tarefa',
            presentation: 'modal',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
