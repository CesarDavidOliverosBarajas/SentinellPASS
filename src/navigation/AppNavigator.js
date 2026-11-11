import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from '../constants/colors';

// Pantallas del Sistema
import InicioScreen from '../screens/InicioScreen';
import MarcajeScreen from '../screens/MarcajeScreen';
import NFCScreen from '../screens/NFCScreen';
import UbicacionScreen from '../screens/UbicacionScreen';
import RegistroExitosoScreen from '../screens/RegistroExitosoScreen';
import HistorialScreen from '../screens/HistorialScreen';
import NovedadesScreen from '../screens/NovedadesScreen';

const Stack = createNativeStackNavigator();

/**
 * Navegador Principal de la Aplicación SentinelPass
 * Define la jerarquía de pantallas y la configuración de encabezado compartido.
 */
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.azulOscuro,
          },
          headerTintColor: COLORS.blanco,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
        }}
      >
        {/* PANTALLA PRINCIPAL */}
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{ title: 'SentinelPass' }}
        />

        {/* FLUJO DE ASISTENCIA: PASO 1 - INFORMACIÓN */}
        <Stack.Screen
          name="Marcaje"
          component={MarcajeScreen}
          options={{ title: 'Marcaje de asistencia' }}
        />

        {/* FLUJO DE ASISTENCIA: PASO 2 - VALIDACIÓN NFC */}
        <Stack.Screen
          name="NFC"
          component={NFCScreen}
          options={{ title: 'Validación NFC' }}
        />

        {/* FLUJO DE ASISTENCIA: PASO 3 - GEOLOCALIZACIÓN GPS */}
        <Stack.Screen
          name="Ubicacion"
          component={UbicacionScreen}
          options={{ title: 'Geolocalización' }}
        />

        {/* FLUJO DE ASISTENCIA: CONFIRMACIÓN Y COMPROBANTE */}
        <Stack.Screen
          name="RegistroExitoso"
          component={RegistroExitosoScreen}
          options={{ title: 'Registro exitoso' }}
        />

        {/* CONSULTA: HISTORIAL DE MARCAJES */}
        <Stack.Screen
          name="Historial"
          component={HistorialScreen}
          options={{ title: 'Historial' }}
        />

        {/* GESTIÓN: REGISTRO DE NOVEDADES */}
        <Stack.Screen
          name="Novedades"
          component={NovedadesScreen}
          options={{ title: 'Novedades' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
