import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from '../styles/styles';
import BotonPrincipal from '../components/BotonPrincipal';

/**
 * Pantalla de Reporte de Novedades
 * Permite al empleado redactar y registrar incidentes o justificaciones
 * cuando no es posible completar el marcaje regular.
 */
export default function NovedadesScreen() {
  const [novedad, setNovedad] = useState('');

  const registrarNovedad = () => {
    Keyboard.dismiss();
    setNovedad('');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.pantalla}>
        <ScrollView
          contentContainerStyle={styles.pantallaContenido}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.detalleIcono}>
            <Text style={styles.detalleEmoji}>⚠️</Text>
          </View>

          <Text style={styles.detalleTitulo}>Novedades</Text>

          <Text style={styles.detalleDescripcion}>
            Registra una novedad cuando no sea posible completar el proceso
            de marcaje.
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
            texto="Registrar novedad"
            icono="⚠️"
            onPress={registrarNovedad}
          />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
