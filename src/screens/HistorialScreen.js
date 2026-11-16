
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { HISTORIAL } from '../constants/data';
import { styles } from '../styles/styles';
import { obtenerHistorialMarcajes } from '../services/asistenciaService';

export default function HistorialScreen() {
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [actualizando, setActualizando] = useState(false);
  const [esDesdeNube, setEsDesdeNube] = useState(false);

  const cargarHistorial = async (esActualizacion = false) => {
    if (esActualizacion) {
      setActualizando(true);
    } else {
      setCargando(true);
    }

    try {
      const datosNube = await obtenerHistorialMarcajes();

      if (datosNube && datosNube.length > 0) {
        setRegistros(datosNube);
        setEsDesdeNube(true);
      } else {
        setRegistros(HISTORIAL);
        setEsDesdeNube(false);
      }
    } catch (error) {
      console.warn('Error al cargar historial:', error);
      setRegistros(HISTORIAL);
      setEsDesdeNube(false);
    } finally {
      setCargando(false);
      setActualizando(false);
    }
  };

  useEffect(() => {
    cargarHistorial();
  }, []);

  return (
    <View style={styles.lista}>
      {/* ENCABEZADO FIJO */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 10,
        }}
      >
        <Text style={styles.tituloLista}>
          Historial de asistencia
        </Text>

        <Text
          style={{
            color: esDesdeNube ? '#2E7D32' : '#607D9B',
            fontSize: 13,
            marginTop: 4,
          }}
        >
          {esDesdeNube
            ? '☁️ Conectado a Firebase Firestore (registros en vivo)'
            : '📋 Datos de demostración (desliza para actualizar)'}
        </Text>
      </View>

      {/* CARGA INICIAL */}
      {cargando && registros.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
          }}
        >
          <ActivityIndicator size="large" color="#1565C0" />
          <Text style={{ marginTop: 12, color: '#607D9B' }}>
            Cargando historial...
          </Text>
        </View>
      ) : (
        /* LISTA DE REGISTROS */
        <FlatList
    contentInsetAdjustmentBehavior="automatic"
          data={registros}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 4,
            paddingBottom: 35,
            flexGrow: 1,
          }}
          refreshControl={
            <RefreshControl
              refreshing={actualizando}
              onRefresh={() => cargarHistorial(true)}
              colors={['#1565C0']}
              tintColor="#1565C0"
            />
          }
          ListEmptyComponent={
            <Text style={{ color: '#607D9B', textAlign: 'center' }}>
              No hay registros de asistencia.
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.historialCard}>
              <View style={styles.historialIcono}>
                <Text style={styles.historialEmoji}>
                  {esDesdeNube ? '☁️' : '🕐'}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.historialTipo}>
                  {item.tipo}
                </Text>
                <Text style={styles.historialFecha}>
                  {item.fecha}
                </Text>
              </View>

              <View style={styles.historialDerecha}>
                <Text style={styles.historialHora}>
                  {item.hora}
                </Text>
                <Text style={styles.historialEstado}>
                  ✓ {item.estado}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
