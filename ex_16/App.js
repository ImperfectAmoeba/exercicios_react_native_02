import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Pessoal from './screens/Pessoal';
import Formacao from './screens/Formacao';
import Experiencia from './screens/Experiencia';

const Tab = createBottomTabNavigator();

const icones = {
  Pessoal: 'person',
  Formação: 'school',
  Experiência: 'briefcase',
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? icones[route.name] : `${icones[route.name]}-outline`}
              size={size}
              color={color}
            />
          ),
          tabBarActiveTintColor: '#4caf50',
          tabBarInactiveTintColor: 'gray',
          headerTitleAlign: 'center',
        })}>
        <Tab.Screen name="Pessoal" component={Pessoal} />
        <Tab.Screen name="Formação" component={Formacao} />
        <Tab.Screen name="Experiência" component={Experiencia} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
