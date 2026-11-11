import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * Punto de Entrada Principal (Root Component) de SentinelPass
 * Configura la barra de estado del dispositivo y delega la navegación a AppNavigator.
 */
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AppNavigator />
    </>
  );
}
