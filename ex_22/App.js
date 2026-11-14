import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import ListaScreen from './components/ListaScreen';
import FormScreen from './components/FormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen
          name="Lista"
          component={ListaScreen}
          options={{ title: 'Lista de Compras' }}
        />
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={({ route }) => ({
            title: route.params?.item ? 'Editar Item' : 'Novo Item',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
