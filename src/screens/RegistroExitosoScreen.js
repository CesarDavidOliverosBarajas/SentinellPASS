import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';
import BotonPrincipal from '../components/BotonPrincipal';

/**
 * Pantalla de Registro Exitoso
 * Presenta el comprobante visual del marcaje con hora de verificación,
 * validación NFC, coordenadas geográficas y regreso al inicio.
 */
export default function RegistroExitosoScreen({ navigation, route }) {
  const { ubicacion, horaVerificacion, idMarcaje, sincronizado } = route.params || {};

  return (
    <View style={styles.pantalla}>
      <View style={styles.pantallaContenido}>
        <View style={styles.exitoCirculo}>
          <Text style={styles.exitoTexto}>✓</Text>
        </View>

        <Text style={styles.detalleTitulo}>¡Marcaje exitoso!</Text>

        <Text style={styles.detalleDescripcion}>
          Tu asistencia ha sido registrada correctamente en SentinelPass.
        </Text>

        <View style={styles.registroCard}>
          <Text style={styles.registroTitulo}>Entrada registrada</Text>

          {horaVerificacion && (
            <Text style={styles.registroHora}>
              {new Date(horaVerificacion).toLocaleTimeString('es-CO', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </Text>
          )}

          <Text style={styles.registroEstado}>✓ NFC validado</Text>
          <Text style={styles.registroEstado}>✓ Ubicación verificada</Text>
          {sincronizado ? (
            <Text style={styles.registroEstado}>
              ☁️ Firebase Firestore: Conectado ({idMarcaje ? idMarcaje.substring(0, 8) + '...' : 'OK'})
            </Text>
          ) : (
            <Text style={styles.registroEstado}>
              💾 Modo sin conexión
            </Text>
          )}

          {ubicacion && (
            <Text style={styles.registroCoordenadas}>
              📍 {ubicacion.latitude.toFixed(6)},{' '}
              {ubicacion.longitude.toFixed(6)}
            </Text>
          )}
        </View>

        <BotonPrincipal
          texto="Volver al inicio"
          icono="⌂"
          onPress={() => navigation.popToTop()}
        />
      </View>
    </View>
  );
}
