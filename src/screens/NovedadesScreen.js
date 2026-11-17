import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Keyboard,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { styles } from '../styles/styles';
import { COLORS } from '../constants/colors';
import BotonPrincipal from '../components/BotonPrincipal';
import ToastBanner from '../components/ToastBanner';
import {
  registrarNovedad as guardarNovedadFirestore,
  obtenerNovedades,
  eliminarNovedad,
} from '../services/asistenciaService';

/**
 * Pantalla de Reporte de Novedades
 * Permite al empleado redactar, guardar y consultar incidentes o justificaciones
 * directamente en Firebase Cloud Firestore con confirmación visual multiplataforma.
 */
export default function NovedadesScreen() {
  const [novedad, setNovedad] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [cargandoLista, setCargandoLista] = useState(true);
  const [listaNovedades, setListaNovedades] = useState([]);
  const [aviso, setAviso] = useState(null);

  const cargarNovedades = async () => {
    setCargandoLista(true);
    const datos = await obtenerNovedades();
    setListaNovedades(datos);
    setCargandoLista(false);
  };

  useEffect(() => {
    cargarNovedades();
  }, []);

  const registrarNovedad = async () => {
    if (guardando) return;
    Keyboard.dismiss();

    const textoLimpio = novedad.trim();
    if (!textoLimpio) {
      setAviso({
        tipo: 'error',
        titulo: 'Campo vacío',
        mensaje: 'Por favor describe la novedad antes de enviarla.',
      });
      return;
    }

    setGuardando(true);
    setAviso(null);

    const resultado = await guardarNovedadFirestore(textoLimpio);
    setGuardando(false);

    if (resultado.exito) {
      setNovedad('');
      setAviso({
        tipo: 'exito',
        titulo: 'Novedad guardada en Firebase Firestore',
        mensaje: `ID del documento: ${resultado.id}`,
      });
      await cargarNovedades();
    } else {
      setAviso({
        tipo: 'error',
        titulo: 'No se pudo guardar la novedad',
        mensaje: resultado.error,
      });
    }
  };

  const borrarNovedad = async (id) => {
    const res = await eliminarNovedad(id);
    if (res.exito) {
      setListaNovedades((prev) => prev.filter((item) => item.id !== id));
      setAviso({
        tipo: 'exito',
        titulo: 'Novedad eliminada de Firestore',
        mensaje: `Documento ${id.substring(0, 8)}... eliminado.`,
      });
    } else {
      setAviso({
        tipo: 'error',
        titulo: 'Error al eliminar novedad',
        mensaje: res.error,
      });
    }
  };

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.pantallaContenido}
      keyboardShouldPersistTaps="handled"
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
        <Text style={styles.detalleEmoji}>⚠️</Text>
      </View>

      <Text style={styles.detalleTitulo}>Novedades</Text>

      <Text style={styles.detalleDescripcion}>
        Registra una novedad en Firebase Firestore cuando no sea posible
        completar el proceso de marcaje.
      </Text>

      <TextInput
        style={styles.textArea}
        value={novedad}
        onChangeText={setNovedad}
        placeholder="Describe la novedad..."
        placeholderTextColor="#8AA4BF"
        multiline
        numberOfLines={5}
        returnKeyType="done"
        blurOnSubmit={true}
        onSubmitEditing={() => Keyboard.dismiss()}
      />

      <BotonPrincipal
        texto={guardando ? 'Guardando en la nube...' : 'Registrar novedad'}
        icono="☁️"
        onPress={registrarNovedad}
      />

      {/* LISTADO DE NOVEDADES GUARDADAS EN FIRESTORE */}
      <View style={localStyles.seccionLista}>
        <Text style={localStyles.subtituloLista}>
          ☁️ Novedades registradas ({listaNovedades.length})
        </Text>

        {cargandoLista ? (
          <ActivityIndicator size="small" color={COLORS.azulPrincipal} />
        ) : listaNovedades.length === 0 ? (
          <Text style={localStyles.vacioTexto}>
            Aún no hay novedades registradas en Firestore.
          </Text>
        ) : (
          listaNovedades.map((item) => (
            <View key={item.id} style={localStyles.novedadCard}>
              <View style={{ flex: 1 }}>
                <Text style={localStyles.novedadDescripcion}>
                  {item.descripcion}
                </Text>
                <Text style={localStyles.novedadMeta}>
                  {item.fecha} • {item.hora} • ID: {item.id.substring(0, 8)}...
                </Text>
              </View>
              <Pressable
                onPress={() => borrarNovedad(item.id)}
                style={localStyles.btnBorrar}
              >
                <Text style={localStyles.btnBorrarTexto}>🗑️</Text>
              </Pressable>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  seccionLista: {
    width: '100%',
    marginTop: 28,
  },
  subtituloLista: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.azulOscuro,
    marginBottom: 12,
  },
  vacioTexto: {
    color: COLORS.gris,
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 12,
  },
  novedadCard: {
    backgroundColor: COLORS.blanco,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  novedadDescripcion: {
    color: COLORS.textoOscuro,
    fontSize: 14,
    fontWeight: '500',
  },
  novedadMeta: {
    color: COLORS.gris,
    fontSize: 11,
    marginTop: 4,
  },
  btnBorrar: {
    backgroundColor: '#FEF2F2',
    padding: 8,
    borderRadius: 8,
  },
  btnBorrarTexto: {
    fontSize: 14,
  },
});
