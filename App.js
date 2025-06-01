/**
 * Root component of the EcoRoute mobile application
 * Wraps the entire app with RouteProvider for global state management
 * Sets up the main navigation structure through AppNavigator
 */
import React from 'react';
import { RouteProvider } from './src/context/RouteContext';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * Main App component serving as the application root
 * @returns {JSX.Element} Root component wrapped with context provider and navigation
 * @description
 * - Initializes global route state management through RouteProvider
 * - Sets up the primary navigation container via AppNavigator
 * - Ensures consistent state access throughout the component tree
 */
export default function App() {
  return (
    <RouteProvider>
      <AppNavigator />
    </RouteProvider>
  );
}