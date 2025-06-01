import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InputScreen from '../screens/InputScreen';
import ResultsScreen from '../screens/ResultsScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Input"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Input" 
          component={InputScreen} 
          options={{ 
            title: 'EcoRoute Planner'
          }}
        />
        <Stack.Screen 
          name="Results" 
          component={ResultsScreen} 
          options={{ 
            title: 'Route Options'
          }}
        />
        <Stack.Screen 
          name="Map" 
          component={MapScreen} 
          options={{ 
            title: 'Route Preview'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}