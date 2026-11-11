import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { HISTORIAL } from '../constants/data';
import { styles } from '../styles/styles';
import { obtenerHistorialMarcajes } from '../services/asistenciaService';

/**
 * Pantalla de Historial de Asistencia
 * Consulta marcajes en tiempo real desde Firebase Cloud Firestore.
 * Si aún no hay registros en la nube, muestra los datos base de prueba con indicador.
 */
export default function HistorialScreen() {
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [esDesdeNube, setEsDesdeNube] = useState(false);

  const cargarHistorial = async () => {
    setCargando(true);
    const datosNube = await obtenerHistorialMarcajes();

    if (datosNube && datosNube.length > 0) {
      setRegistros(datosNube);
      setEsDesdeNube(true);
    } else {
      // Si la base de datos está vacía, mostramos los datos mock como referencia
      setRegistros(HISTORIAL);
      setEsDesdeNube(false);
    }
    setCargando(false);
  };

  useEffect(() => {
    cargarHistorial();
  }, []);

  return (
    <View style={styles.lista}>
      <FlatList
        data={registros}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={cargando} onRefresh={cargarHistorial} colors={['#1565C0']} />
        }
        ListHeaderComponent={
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.tituloLista}>Historial de asistencia</Text>
            <Text style={{ color: esDesdeNube ? '#2E7D32' : '#607D9B', fontSize: 13, marginTop: 4 }}>
              {esDesdeNube
                ? '☁️ Conectado a Firebase Firestore (registros en vivo)'
                : '📋 Datos de demostración (desliza para actualizar)'}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.historialCard}>
            <View style={styles.historialIcono}>
              <Text style={styles.historialEmoji}>{esDesdeNube ? '☁️' : '🕐'}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.historialTipo}>{item.tipo}</Text>
              <Text style={styles.historialFecha}>{item.fecha}</Text>
            </View>

            <View style={styles.historialDerecha}>
              <Text style={styles.historialHora}>{item.hora}</Text>
              <Text style={styles.historialEstado}>✓ {item.estado}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
