import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { styles } from '../styles/styles';

/**
 * Componente TarjetaOpcion
 * Renderiza una opción de servicio con acceso directo y selección de favoritos.
 */
export default function TarjetaOpcion({ item, onPress, favorito, onFavorito }) {
  return (
    <View style={styles.tarjeta}>
      {/* BOTÓN DE LA OPCIÓN */}
      <TouchableOpacity
        style={styles.tarjetaPrincipal}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.tarjetaIcono}>
          <Text style={styles.iconoTexto}>{item.icono}</Text>
        </View>

        <View style={styles.tarjetaContenido}>
          <Text style={styles.texto}>{item.title}</Text>
          <Text style={styles.descripcion}>{item.detalle}</Text>
        </View>

        <Text style={styles.flecha}>›</Text>
      </TouchableOpacity>

      {/* BOTÓN FAVORITO */}
      <Pressable
        style={({ pressed }) => [
          styles.botonFavorito,
          pressed && styles.favoritoPresionado,
        ]}
        onPress={onFavorito}
      >
        <Text style={styles.favoritoTexto}>{favorito ? '★' : '☆'}</Text>
      </Pressable>
    </View>
  );
}
