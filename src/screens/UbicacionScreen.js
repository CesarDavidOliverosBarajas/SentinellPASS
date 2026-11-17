import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { styles } from '../styles/styles';
import { COLORS } from '../constants/colors';
import RelojTiempoReal from '../components/RelojTiempoReal';
import BotonPrincipal from '../components/BotonPrincipal';
import ToastBanner from '../components/ToastBanner';
import { registrarMarcaje } from '../services/asistenciaService';

/**
 * Pantalla de Geolocalización
 * Solicita permisos de ubicación GPS, obtiene coordenadas precisas,
 * permite elegir Entrada/Salida y guarda el registro en Firebase Firestore
 * con confirmación visual multiplataforma (Web, Android e iOS).
 */
export default function UbicacionScreen({ navigation }) {
  const [ubicacion, setUbicacion] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [horaVerificacion, setHoraVerificacion] = useState(null);
  const [tipoMarcaje, setTipoMarcaje] = useState('Entrada');

  // Estado para aviso visual y modal de confirmación multiplataforma
  const [aviso, setAviso] = useState(null);
  const [modalConfirmacion, setModalConfirmacion] = useState(null);

  // ====================================================
  // GUARDAR MARCAJE EN FIREBASE Y MOSTRAR CONFIRMACIÓN
  // ====================================================
  const confirmarMarcaje = async () => {
    if (guardando) return;

    try {
      setGuardando(true);
      setAviso(null);

      const resultado = await registrarMarcaje({
        tipo: tipoMarcaje,
        ubicacion,
        horaVerificacion,
      });

      setGuardando(false);

      if (resultado.exito) {
        setAviso({
          tipo: 'exito',
          titulo: 'Registro guardado en Firebase Firestore',
          mensaje: `Documento ID: ${resultado.id}`,
        });

        setModalConfirmacion({
          exito: true,
          idMarcaje: resultado.id,
          titulo: '¡Guardado en Firebase Firestore!',
          mensaje: `Tu marcaje de ${tipoMarcaje} fue registrado correctamente en la nube.\n\nID del documento: ${resultado.id}`,
        });
      } else {
        setAviso({
          tipo: 'error',
          titulo: 'Error al conectar con Firebase',
          mensaje: resultado.error || 'No se pudo guardar en Firestore.',
        });

        setModalConfirmacion({
          exito: false,
          titulo: 'Aviso de Conexión a Firebase',
          mensaje:
            resultado.error ||
            'No fue posible conectar con Firestore. Puedes continuar sin sincronizar o reintentar.',
        });
      }
    } catch (e) {
      setGuardando(false);
      setAviso({
        tipo: 'error',
        titulo: 'Error inesperado',
        mensaje: e.message,
      });
    }
  };

  const irAComprobante = (sincronizado, idMarcaje) => {
    setModalConfirmacion(null);
    navigation.navigate('RegistroExitoso', {
      ubicacion,
      tipo: tipoMarcaje,
      horaVerificacion: horaVerificacion
        ? horaVerificacion.toISOString()
        : new Date().toISOString(),
      idMarcaje,
      sincronizado,
    });
  };

  // ====================================================
  // OBTENER UBICACIÓN REAL
  // ====================================================
  const verificarUbicacion = async () => {
    try {
      setCargando(true);
      setError('');
      setAviso(null);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setError('No se concedió permiso para acceder a la ubicación.');
        setCargando(false);
        return;
      }

      const posicion = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coordenadas = {
        latitude: posicion.coords.latitude,
        longitude: posicion.coords.longitude,
      };

      setUbicacion(coordenadas);
      setHoraVerificacion(new Date());
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
      contentInsetAdjustmentBehavior="automatic"
    >
      <ToastBanner
        visible={!!aviso}
        tipo={aviso?.tipo}
        titulo={aviso?.titulo}
        mensaje={aviso?.mensaje}
        onCerrar={() => setAviso(null)}
      />

      <View style={styles.detalleIcono}>
        <Text style={styles.detalleEmoji}>📍</Text>
      </View>

      <Text style={styles.detalleTitulo}>Geolocalización</Text>

      <Text style={styles.detalleDescripcion}>
        Verifica la ubicación actual del dispositivo para registrar
        correctamente la asistencia.
      </Text>

      {/* RELOJ EN TIEMPO REAL */}
      <RelojTiempoReal />

      {/* SELECTOR DE TIPO DE MARCAJE */}
      <View style={localStyles.selectorFila}>
        {['Entrada', 'Salida'].map((opcion) => {
          const activo = tipoMarcaje === opcion;
          return (
            <Pressable
              key={opcion}
              onPress={() => setTipoMarcaje(opcion)}
              style={[
                localStyles.selectorBoton,
                activo && localStyles.selectorBotonActivo,
              ]}
            >
              <Text
                style={[
                  localStyles.selectorTexto,
                  activo && localStyles.selectorTextoActivo,
                ]}
              >
                {opcion === 'Entrada' ? '🟢 Entrada' : '🔵 Salida'}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* BOTÓN DE VERIFICACIÓN */}
      <BotonPrincipal
        texto={cargando ? 'Obteniendo ubicación...' : 'Verificar ubicación'}
        icono="📍"
        onPress={verificarUbicacion}
      />

      {/* ERROR */}
      {error !== '' && (
        <View style={styles.errorCard}>
          <Text style={styles.errorTexto}>⚠️ {error}</Text>
        </View>
      )}

      {/* UBICACIÓN OBTENIDA */}
      {ubicacion && (
        <View style={styles.ubicacionCard}>
          <Text style={styles.ubicacionTitulo}>✓ Ubicación verificada</Text>

          <View style={styles.ubicacionLinea}>
            <Text style={styles.ubicacionEtiqueta}>Tipo</Text>
            <Text style={styles.ubicacionValor}>{tipoMarcaje}</Text>
          </View>

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

      {/* MODAL MULTIPLATAFORMA DE CONFIRMACIÓN */}
      <Modal
        visible={!!modalConfirmacion}
        transparent
        animationType="fade"
        onRequestClose={() => setModalConfirmacion(null)}
      >
        <View style={localStyles.modalFondo}>
          <View style={localStyles.modalCaja}>
            <Text style={localStyles.modalIcono}>
              {modalConfirmacion?.exito ? '☁️✅' : '⚠️'}
            </Text>
            <Text style={localStyles.modalTitulo}>
              {modalConfirmacion?.titulo}
            </Text>
            <Text style={localStyles.modalMensaje}>
              {modalConfirmacion?.mensaje}
            </Text>

            <View style={localStyles.modalAcciones}>
              {modalConfirmacion?.exito ? (
                <Pressable
                  style={[localStyles.modalBoton, localStyles.modalBotonPrimario]}
                  onPress={() => irAComprobante(true, modalConfirmacion.idMarcaje)}
                >
                  <Text style={localStyles.modalBotonPrimarioTexto}>
                    Ver comprobante
                  </Text>
                </Pressable>
              ) : (
                <>
                  <Pressable
                    style={[localStyles.modalBoton, localStyles.modalBotonSecundario]}
                    onPress={() => setModalConfirmacion(null)}
                  >
                    <Text style={localStyles.modalBotonSecundarioTexto}>
                      Reintentar
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[localStyles.modalBoton, localStyles.modalBotonPrimario]}
                    onPress={() => irAComprobante(false, null)}
                  >
                    <Text style={localStyles.modalBotonPrimarioTexto}>
                      Continuar sin conexión
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  selectorFila: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
    width: '100%',
    justifyContent: 'center',
  },
  selectorBoton: {
    flex: 1,
    maxWidth: 160,
    backgroundColor: COLORS.blanco,
    borderWidth: 1,
    borderColor: '#C5D9ED',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  selectorBotonActivo: {
    backgroundColor: COLORS.azulPrincipal,
    borderColor: COLORS.azulPrincipal,
  },
  selectorTexto: {
    color: COLORS.azulOscuro,
    fontWeight: '600',
    fontSize: 14,
  },
  selectorTextoActivo: {
    color: COLORS.blanco,
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCaja: {
    backgroundColor: COLORS.blanco,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
  },
  modalIcono: {
    fontSize: 38,
    marginBottom: 10,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.azulOscuro,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalMensaje: {
    fontSize: 14,
    color: COLORS.gris,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  modalAcciones: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  modalBoton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalBotonPrimario: {
    backgroundColor: COLORS.azulPrincipal,
  },
  modalBotonPrimarioTexto: {
    color: COLORS.blanco,
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalBotonSecundario: {
    backgroundColor: '#E2E8F0',
  },
  modalBotonSecundarioTexto: {
    color: COLORS.azulOscuro,
    fontWeight: '600',
    fontSize: 14,
  },
});
