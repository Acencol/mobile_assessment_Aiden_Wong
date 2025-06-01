import React from 'react';
import { RouteProvider } from './src/context/RouteContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <RouteProvider>
      <AppNavigator />
    </RouteProvider>
  );
}