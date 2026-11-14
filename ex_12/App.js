import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import FormularioScreen from './components/FormularioScreen';
import DadosScreen from './components/DadosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Formulario">
        <Stack.Screen
          name="Formulario"
          component={FormularioScreen}
          options={{
            title: 'Abertura de Conta',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: '#d32f2f' },
          }}
        />
        <Stack.Screen
          name="Dados"
          component={DadosScreen}
          options={({ navigation }) => ({
            title: 'Dados informados:',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: '#1e40af' },
            headerBackVisible: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color="#000" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
