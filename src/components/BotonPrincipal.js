import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from '../styles/styles';

/**
 * Componente BotonPrincipal
 * Botón de acción principal con icono, texto y respuesta de presión.
 */
export default function BotonPrincipal({ texto, icono, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.botonPrincipal,
        pressed && styles.botonPresionado,
      ]}
    >
      {icono ? <Text style={styles.botonIcono}>{icono}</Text> : null}
      <Text style={styles.botonPrincipalTexto}>{texto}</Text>
    </Pressable>
  );
}
