import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

/**
 * Banner de notificación visual multiplataforma (Web, Android e iOS).
 * Reemplaza a Alert.alert para confirmaciones inmediatas de operaciones CRUD.
 */
export default function ToastBanner({ visible, tipo = 'exito', titulo, mensaje, onCerrar }) {
  if (!visible) return null;

  const esError = tipo === 'error';
  const esInfo = tipo === 'info';

  const colores = esError
    ? { fondo: '#FEE2E2', borde: '#F87171', texto: '#991B1B', icono: '⚠️' }
    : esInfo
      ? { fondo: '#DBEAFE', borde: '#60A5FA', texto: '#1E40AF', icono: 'ℹ️' }
      : { fondo: '#DCFCE7', borde: '#4ADE80', texto: '#166534', icono: '✅' };

  return (
    <View
      style={[
        localStyles.contenedor,
        {
          backgroundColor: colores.fondo,
          borderColor: colores.borde,
        },
      ]}
    >
      <Text style={localStyles.icono}>{colores.icono}</Text>
      <View style={localStyles.textos}>
        {!!titulo && (
          <Text style={[localStyles.titulo, { color: colores.texto }]}>{titulo}</Text>
        )}
        {!!mensaje && (
          <Text style={[localStyles.mensaje, { color: colores.texto }]}>{mensaje}</Text>
        )}
      </View>
      {onCerrar && (
        <Pressable
          onPress={onCerrar}
          style={localStyles.botonCerrar}
          accessibilityLabel="Cerrar aviso"
        >
          <Text style={[localStyles.cerrarTexto, { color: colores.texto }]}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  contenedor: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 14,
  },
  icono: {
    fontSize: 18,
    marginRight: 10,
  },
  textos: {
    flex: 1,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  mensaje: {
    fontSize: 12,
    marginTop: 2,
  },
  botonCerrar: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cerrarTexto: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
