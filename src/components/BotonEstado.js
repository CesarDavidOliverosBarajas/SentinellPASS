import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from '../styles/styles';

/**
 * Componente BotonEstado
 * Permite alternar el estado del sistema entre activo e inactivo con feedback táctil.
 */
export default function BotonEstado() {
  const [activo, setActivo] = useState(false);

  return (
    <Pressable
      onPress={() => setActivo((prev) => !prev)}
      style={({ pressed }) => [
        styles.estadoBoton,
        pressed && styles.estadoPresionado,
      ]}
    >
      <Text style={styles.estadoTexto}>
        {activo ? '🟢 Sistema activo' : '⚪ Sistema inactivo'}
      </Text>
    </Pressable>
  );
}
