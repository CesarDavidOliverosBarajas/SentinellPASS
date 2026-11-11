import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

/**
 * Componente RelojTiempoReal
 * Se actualiza cada segundo y muestra la hora y fecha formateadas en español (Colombia).
 */
export default function RelojTiempoReal() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalo);
    };
  }, []);

  const horaFormateada = hora.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const fechaFormateada = hora.toLocaleDateString('es-CO', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={styles.relojCard}>
      <View style={styles.relojIcono}>
        <Text style={styles.relojIconoTexto}>🕐</Text>
      </View>

      <View style={styles.relojContenido}>
        <Text style={styles.relojHora}>{horaFormateada}</Text>
        <Text style={styles.relojFecha}>{fechaFormateada}</Text>
      </View>
    </View>
  );
}
