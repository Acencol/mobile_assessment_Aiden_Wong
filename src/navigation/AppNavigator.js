/**
 * Navigation configuration for the EcoRoute application
 * Sets up the main navigation stack and screen transitions
 * Configures consistent header styling across screens
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InputScreen from '../screens/InputScreen';
import ResultsScreen from '../screens/ResultsScreen';
import MapScreen from '../screens/MapScreen';

/**
 * Create native stack navigator instance
 * @constant {NavigatorScreenParams}
 */
const Stack = createNativeStackNavigator();

/**
 * Main navigation component
 * @returns {JSX.Element} Navigation container with configured stack
 * @description
 * Defines the navigation flow:
 * 1. Input Screen (initial) - Address entry
 * 2. Results Screen - Route options list
 * 3. Map Screen - Route visualization
 * 
 * Global screen options:
 * - Blue header background
 * - White text and icons
 * - Bold header titles
 */
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
        {/* Address input screen */}
        <Stack.Screen 
          name="Input" 
          component={InputScreen} 
          options={{ 
            title: 'EcoRoute Planner'
          }}
        />
        
        {/* Route options list screen */}
        <Stack.Screen 
          name="Results" 
          component={ResultsScreen} 
          options={{ 
            title: 'Route Options'
          }}
        />
        
        {/* Route map preview screen */}
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