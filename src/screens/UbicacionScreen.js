import React, { useState } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import { styles } from '../styles/styles';
import RelojTiempoReal from '../components/RelojTiempoReal';
import BotonPrincipal from '../components/BotonPrincipal';
import { registrarMarcaje } from '../services/asistenciaService';

/**
 * Pantalla de Geolocalización
 * Solicita permisos de ubicación GPS, obtiene coordenadas precisas
 * y asocia la hora de captura antes de formalizar el registro.
 */
export default function UbicacionScreen({ navigation }) {
  const [ubicacion, setUbicacion] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [horaVerificacion, setHoraVerificacion] = useState(null);

  // ====================================================
  // GUARDAR MARCAJE EN FIREBASE Y CONTINUAR
  // ====================================================
  const confirmarMarcaje = async () => {
    try {
      setGuardando(true);
      const resultado = await registrarMarcaje({
        tipo: 'Entrada',
        ubicacion,
        horaVerificacion,
      });

      setGuardando(false);

      if (resultado.exito) {
        Alert.alert(
          '¡Conexión Exitosa!',
          'El marcaje fue enviado y guardado correctamente en Firebase Cloud Firestore.',
          [
            {
              text: 'Ver comprobante',
              onPress: () => {
                navigation.navigate('RegistroExitoso', {
                  ubicacion,
                  horaVerificacion: horaVerificacion
                    ? horaVerificacion.toISOString()
                    : new Date().toISOString(),
                  idMarcaje: resultado.id,
                  sincronizado: true,
                });
              },
            },
          ]
        );
      } else {
        Alert.alert(
          'Aviso de Conexión a Firebase',
          resultado.error ||
            'No fue posible conectar con Firestore. Revisa que la base de datos esté creada en la consola.',
          [
            {
              text: 'Continuar sin sincronizar',
              onPress: () => {
                navigation.navigate('RegistroExitoso', {
                  ubicacion,
                  horaVerificacion: horaVerificacion
                    ? horaVerificacion.toISOString()
                    : new Date().toISOString(),
                  sincronizado: false,
                });
              },
            },
            {
              text: 'Reintentar',
              style: 'cancel',
            },
          ]
        );
      }
    } catch (e) {
      setGuardando(false);
      Alert.alert('Error inesperado', e.message);
    }
  };

  // ====================================================
  // OBTENER UBICACIÓN REAL
  // ====================================================
  const verificarUbicacion = async () => {
    try {
      setCargando(true);
      setError('');

      // Solicitar permiso de ubicación
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setError(
          'No se concedió permiso para acceder a la ubicación.'
        );
        setCargando(false);
        return;
      }

      // Obtener ubicación actual
      const posicion = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coordenadas = {
        latitude: posicion.coords.latitude,
        longitude: posicion.coords.longitude,
      };

      setUbicacion(coordenadas);

      // Registrar hora exacta de verificación
      const ahora = new Date();
      setHoraVerificacion(ahora);

      setCargando(false);
    } catch (e) {
      setError('No fue posible obtener la ubicación.');
      setCargando(false);
    }
  };

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.pantallaContenido}
    >
      <View style={styles.detalleIcono}>
        <Text style={styles.detalleEmoji}>📍</Text>
      </View>

      <Text style={styles.detalleTitulo}>Geolocalización</Text>

      <Text style={styles.detalleDescripcion}>
        Verifica la ubicación actual del dispositivo para registrar
        correctamente la asistencia.
      </Text>

      {/* ==================================================
          RELOJ EN TIEMPO REAL
      ================================================== */}
      <RelojTiempoReal />

      {/* ==================================================
          BOTÓN DE VERIFICACIÓN
      ================================================== */}
      <BotonPrincipal
        texto={cargando ? 'Obteniendo ubicación...' : 'Verificar ubicación'}
        icono="📍"
        onPress={verificarUbicacion}
      />

      {/* ==================================================
          ERROR
      ================================================== */}
      {error !== '' && (
        <View style={styles.errorCard}>
          <Text style={styles.errorTexto}>⚠️ {error}</Text>
        </View>
      )}

      {/* ==================================================
          UBICACIÓN OBTENIDA
      ================================================== */}
      {ubicacion && (
        <View style={styles.ubicacionCard}>
          <Text style={styles.ubicacionTitulo}>✓ Ubicación verificada</Text>

          <View style={styles.ubicacionLinea}>
            <Text style={styles.ubicacionEtiqueta}>Latitud</Text>
            <Text style={styles.ubicacionValor}>
              {ubicacion.latitude.toFixed(6)}
            </Text>
          </View>

          <View style={styles.ubicacionLinea}>
            <Text style={styles.ubicacionEtiqueta}>Longitud</Text>
            <Text style={styles.ubicacionValor}>
              {ubicacion.longitude.toFixed(6)}
            </Text>
          </View>

          {horaVerificacion && (
            <View style={styles.ubicacionLinea}>
              <Text style={styles.ubicacionEtiqueta}>
                Hora de verificación
              </Text>
              <Text style={styles.ubicacionValor}>
                {horaVerificacion.toLocaleTimeString('es-CO', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </Text>
            </View>
          )}

          <View style={styles.estadoUbicacion}>
            <Text style={styles.estadoUbicacionTexto}>
              ✓ Ubicación disponible para el registro
            </Text>
          </View>

          <BotonPrincipal
            texto={guardando ? 'Guardando en la nube...' : 'Confirmar y registrar'}
            icono="☁️"
            onPress={confirmarMarcaje}
          />
        </View>
      )}
    </ScrollView>
  );
}
