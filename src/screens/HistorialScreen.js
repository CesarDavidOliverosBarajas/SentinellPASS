import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Pressable,
  Modal,
  StyleSheet,
} from 'react-native';

import { HISTORIAL } from '../constants/data';
import { COLORS } from '../constants/colors';
import { styles } from '../styles/styles';
import ToastBanner from '../components/ToastBanner';
import {
  obtenerHistorialMarcajes,
  actualizarMarcaje,
  eliminarMarcaje,
} from '../services/asistenciaService';

const TIPOS_OPCIONES = ['Entrada', 'Salida'];
const ESTADOS_OPCIONES = ['A tiempo', 'Retardo', 'Justificado'];

export default function HistorialScreen() {
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [actualizando, setActualizando] = useState(false);
  const [esDesdeNube, setEsDesdeNube] = useState(false);

  // Avisos visuales multiplataforma
  const [aviso, setAviso] = useState(null);

  // Estado para modal de edición (UPDATE)
  const [registroEditando, setRegistroEditando] = useState(null);
  const [tipoEditado, setTipoEditado] = useState('Entrada');
  const [estadoEditado, setEstadoEditado] = useState('A tiempo');
  const [procesandoAccion, setProcesandoAccion] = useState(false);

  // Estado para modal de confirmación de borrado (DELETE)
  const [registroAEliminar, setRegistroAEliminar] = useState(null);

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

  // ====================================================
  // ABRIR Y GUARDAR EDICIÓN (UPDATE)
  // ====================================================
  const abrirEdicion = (item) => {
    setRegistroEditando(item);
    setTipoEditado(item.tipo || 'Entrada');
    setEstadoEditado(item.estado || 'A tiempo');
  };

  const guardarEdicion = async () => {
    if (!registroEditando || procesandoAccion) return;

    setProcesandoAccion(true);
    const resultado = await actualizarMarcaje(registroEditando.id, {
      tipo: tipoEditado,
      estado: estadoEditado,
    });
    setProcesandoAccion(false);

    if (resultado.exito) {
      setRegistros((prev) =>
        prev.map((r) =>
          r.id === registroEditando.id
            ? { ...r, tipo: tipoEditado, estado: estadoEditado }
            : r
        )
      );
      setAviso({
        tipo: 'exito',
        titulo: 'Registro actualizado en Firestore',
        mensaje: `ID ${registroEditando.id.substring(0, 8)}... → ${tipoEditado} (${estadoEditado})`,
      });
      setRegistroEditando(null);
    } else {
      setAviso({
        tipo: 'error',
        titulo: 'Error al actualizar registro',
        mensaje: resultado.error,
      });
    }
  };

  // ====================================================
  // CONFIRMAR Y EJECUTAR ELIMINACIÓN (DELETE)
  // ====================================================
  const confirmarEliminacion = async () => {
    if (!registroAEliminar || procesandoAccion) return;

    setProcesandoAccion(true);
    const idObjetivo = registroAEliminar.id;
    const resultado = await eliminarMarcaje(idObjetivo);
    setProcesandoAccion(false);

    if (resultado.exito) {
      setRegistros((prev) => prev.filter((r) => r.id !== idObjetivo));
      setAviso({
        tipo: 'exito',
        titulo: 'Registro eliminado de Firestore',
        mensaje: `El documento ${idObjetivo.substring(0, 8)}... fue eliminado permanentemente.`,
      });
      setRegistroAEliminar(null);
    } else {
      setAviso({
        tipo: 'error',
        titulo: 'Error al eliminar registro',
        mensaje: resultado.error,
      });
    }
  };

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
        <View style={localStyles.headerFila}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.tituloLista, { marginBottom: 4 }]}>
              Historial de asistencia
            </Text>
            <Text
              style={{
                color: esDesdeNube ? '#2E7D32' : '#607D9B',
                fontSize: 13,
              }}
            >
              {esDesdeNube
                ? '☁️ Conectado a Firebase Firestore (CRUD en vivo)'
                : '📋 Datos de demostración (sin registros en la nube)'}
            </Text>
          </View>

          <Pressable
            onPress={() => cargarHistorial(true)}
            style={localStyles.botonRefrescar}
          >
            <Text style={localStyles.botonRefrescarTexto}>
              {actualizando ? '⏳' : '🔄'} Actualizar
            </Text>
          </Pressable>
        </View>

        <ToastBanner
          visible={!!aviso}
          tipo={aviso?.tipo}
          titulo={aviso?.titulo}
          mensaje={aviso?.mensaje}
          onCerrar={() => setAviso(null)}
        />
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
            <Text style={{ color: '#607D9B', textAlign: 'center', marginTop: 20 }}>
              No hay registros de asistencia en Firestore.
            </Text>
          }
          renderItem={({ item }) => (
            <View style={localStyles.tarjetaWrapper}>
              <View style={localStyles.tarjetaSuperior}>
                <View style={styles.historialIcono}>
                  <Text style={styles.historialEmoji}>
                    {esDesdeNube ? '☁️' : '🕐'}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.historialTipo}>{item.tipo}</Text>
                  <Text style={styles.historialFecha}>{item.fecha}</Text>
                  {esDesdeNube && (
                    <Text style={localStyles.idTexto}>
                      ID: {String(item.id).substring(0, 10)}...
                    </Text>
                  )}
                </View>

                <View style={styles.historialDerecha}>
                  <Text style={styles.historialHora}>{item.hora}</Text>
                  <Text
                    style={[
                      styles.historialEstado,
                      item.estado === 'Retardo' && { color: '#D97706' },
                      item.estado === 'Justificado' && { color: '#2563EB' },
                    ]}
                  >
                    ✓ {item.estado}
                  </Text>
                </View>
              </View>

              {/* ACCIONES CRUD SOLO PARA REGISTROS REALES EN FIRESTORE */}
              {esDesdeNube && (
                <View style={localStyles.accionesFila}>
                  <Pressable
                    onPress={() => abrirEdicion(item)}
                    style={[localStyles.accionBtn, localStyles.editarBtn]}
                  >
                    <Text style={localStyles.editarTexto}>✏️ Editar</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setRegistroAEliminar(item)}
                    style={[localStyles.accionBtn, localStyles.eliminarBtn]}
                  >
                    <Text style={localStyles.eliminarTexto}>🗑️ Eliminar</Text>
                  </Pressable>
                </View>
              )}
            </View>
          )}
        />
      )}

      {/* MODAL DE EDICIÓN (UPDATE) */}
      <Modal
        visible={!!registroEditando}
        transparent
        animationType="fade"
        onRequestClose={() => setRegistroEditando(null)}
      >
        <View style={localStyles.modalFondo}>
          <View style={localStyles.modalCaja}>
            <Text style={localStyles.modalTitulo}>✏️ Editar marcaje</Text>
            <Text style={localStyles.modalSubtitulo}>
              ID: {registroEditando?.id}
            </Text>

            <Text style={localStyles.campoEtiqueta}>Tipo de marcaje</Text>
            <View style={localStyles.opcionesFila}>
              {TIPOS_OPCIONES.map((op) => {
                const activo = tipoEditado === op;
                return (
                  <Pressable
                    key={op}
                    onPress={() => setTipoEditado(op)}
                    style={[
                      localStyles.opcionChip,
                      activo && localStyles.opcionChipActivo,
                    ]}
                  >
                    <Text
                      style={[
                        localStyles.opcionTexto,
                        activo && localStyles.opcionTextoActivo,
                      ]}
                    >
                      {op}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={localStyles.campoEtiqueta}>Estado</Text>
            <View style={localStyles.opcionesFila}>
              {ESTADOS_OPCIONES.map((op) => {
                const activo = estadoEditado === op;
                return (
                  <Pressable
                    key={op}
                    onPress={() => setEstadoEditado(op)}
                    style={[
                      localStyles.opcionChip,
                      activo && localStyles.opcionChipActivo,
                    ]}
                  >
                    <Text
                      style={[
                        localStyles.opcionTexto,
                        activo && localStyles.opcionTextoActivo,
                      ]}
                    >
                      {op}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={localStyles.modalBotones}>
              <Pressable
                style={[localStyles.modalBtn, localStyles.btnCancelar]}
                onPress={() => setRegistroEditando(null)}
                disabled={procesandoAccion}
              >
                <Text style={localStyles.btnCancelarTexto}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[localStyles.modalBtn, localStyles.btnGuardar]}
                onPress={guardarEdicion}
                disabled={procesandoAccion}
              >
                <Text style={localStyles.btnGuardarTexto}>
                  {procesandoAccion ? 'Guardando...' : 'Guardar cambios'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN (DELETE) */}
      <Modal
        visible={!!registroAEliminar}
        transparent
        animationType="fade"
        onRequestClose={() => setRegistroAEliminar(null)}
      >
        <View style={localStyles.modalFondo}>
          <View style={localStyles.modalCaja}>
            <Text style={localStyles.modalTitulo}>🗑️ ¿Eliminar registro?</Text>
            <Text style={localStyles.modalDescripcion}>
              Se eliminará permanentemente de Firebase Firestore el marcaje de{' '}
              <Text style={{ fontWeight: 'bold' }}>
                {registroAEliminar?.tipo}
              </Text>{' '}
              ({registroAEliminar?.fecha} - {registroAEliminar?.hora}).
            </Text>

            <View style={localStyles.modalBotones}>
              <Pressable
                style={[localStyles.modalBtn, localStyles.btnCancelar]}
                onPress={() => setRegistroAEliminar(null)}
                disabled={procesandoAccion}
              >
                <Text style={localStyles.btnCancelarTexto}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[localStyles.modalBtn, localStyles.btnEliminarConfirm]}
                onPress={confirmarEliminacion}
                disabled={procesandoAccion}
              >
                <Text style={localStyles.btnGuardarTexto}>
                  {procesandoAccion ? 'Eliminando...' : 'Sí, eliminar'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const localStyles = StyleSheet.create({
  headerFila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 8,
  },
  botonRefrescar: {
    backgroundColor: COLORS.blanco,
    borderWidth: 1,
    borderColor: '#C5D9ED',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  botonRefrescarTexto: {
    color: COLORS.azulPrincipal,
    fontWeight: '600',
    fontSize: 12,
  },
  tarjetaWrapper: {
    backgroundColor: COLORS.blanco,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  tarjetaSuperior: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  idTexto: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  accionesFila: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
  },
  accionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editarBtn: {
    backgroundColor: '#EFF6FF',
  },
  editarTexto: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '600',
  },
  eliminarBtn: {
    backgroundColor: '#FEF2F2',
  },
  eliminarTexto: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
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
    padding: 22,
    width: '100%',
    maxWidth: 400,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.azulOscuro,
    marginBottom: 4,
  },
  modalSubtitulo: {
    fontSize: 11,
    color: COLORS.gris,
    marginBottom: 16,
  },
  modalDescripcion: {
    fontSize: 14,
    color: COLORS.gris,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 20,
  },
  campoEtiqueta: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.azulOscuro,
    marginBottom: 8,
    marginTop: 6,
  },
  opcionesFila: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  opcionChip: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F8FAFC',
  },
  opcionChipActivo: {
    backgroundColor: COLORS.azulPrincipal,
    borderColor: COLORS.azulPrincipal,
  },
  opcionTexto: {
    fontSize: 13,
    color: COLORS.azulOscuro,
    fontWeight: '500',
  },
  opcionTextoActivo: {
    color: COLORS.blanco,
    fontWeight: 'bold',
  },
  modalBotones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnCancelar: {
    backgroundColor: '#E2E8F0',
  },
  btnCancelarTexto: {
    color: COLORS.azulOscuro,
    fontWeight: '600',
    fontSize: 14,
  },
  btnGuardar: {
    backgroundColor: COLORS.azulPrincipal,
  },
  btnEliminarConfirm: {
    backgroundColor: '#DC2626',
  },
  btnGuardarTexto: {
    color: COLORS.blanco,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
