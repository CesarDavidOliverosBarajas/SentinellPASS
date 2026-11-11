import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '../styles/styles';

/**
 * Pantalla de Validación NFC
 * Simula la lectura por proximidad de la credencial o tarjeta física del empleado.
 * Tras la validación, navega a la pantalla de verificación de Ubicación.
 */
export default function NFCScreen({ navigation }) {
  const [validado, setValidado] = useState(false);

  const validarNFC = () => {
    setValidado(true);
    setTimeout(() => {
      navigation.navigate('Ubicacion');
    }, 700);
  };

  return (
    <View style={styles.pantalla}>
      <View style={styles.pantallaContenido}>
        <View style={styles.detalleIcono}>
          <Text style={styles.detalleEmoji}>📲</Text>
        </View>

        <Text style={styles.detalleTitulo}>Validación NFC</Text>

        <Text style={styles.detalleDescripcion}>
          {validado
            ? 'Tarjeta NFC validada correctamente.'
            : 'Acerca tu tarjeta NFC al dispositivo para continuar.'}
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.botonPrincipal,
            pressed && styles.botonPresionado,
          ]}
          onPress={validarNFC}
        >
          <Text style={styles.botonIcono}>📲</Text>
          <Text style={styles.botonPrincipalTexto}>
            {validado ? 'NFC VALIDADO' : 'VALIDAR NFC'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
