import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { styles } from '../styles/styles';
import BotonPrincipal from '../components/BotonPrincipal';

/**
 * Pantalla de Marcaje de Asistencia
 * Explica los pasos requeridos y guía al usuario hacia la validación NFC.
 */
export default function MarcajeScreen({ navigation }) {
  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.pantallaContenido}
    >
      <View style={styles.detalleIcono}>
        <Text style={styles.detalleEmoji}>🕐</Text>
      </View>

      <Text style={styles.detalleTitulo}>Marcaje de asistencia</Text>

      <Text style={styles.detalleDescripcion}>
        Realiza tu registro de entrada o salida mediante el sistema
        SentinelPass.
      </Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitulo}>Proceso de marcaje</Text>
        <Text style={styles.infoTexto}>1. Validar tarjeta NFC</Text>
        <Text style={styles.infoTexto}>2. Verificar ubicación</Text>
        <Text style={styles.infoTexto}>3. Registrar asistencia</Text>
      </View>

      <BotonPrincipal
        texto="Validar NFC"
        icono="📲"
        onPress={() => navigation.navigate('NFC')}
      />
    </ScrollView>
  );
}
