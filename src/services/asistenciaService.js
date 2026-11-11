import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const COLECCION = 'marcajes';

/**
 * Función auxiliar para limitar el tiempo de espera (timeout)
 */
const conTimeout = (promesa, ms = 7000) => {
  return Promise.race([
    promesa,
    new Promise((_, reject) =>
      setTimeout(
        () =>
          reject(
            new Error(
              'Tiempo de espera agotado (Timeout). Verifica que la base de datos Firestore esté creada en la consola de Firebase.'
            )
          ),
        ms
      )
    ),
  ]);
};

/**
 * Guarda un nuevo marcaje de asistencia en la base de datos en la nube (Firestore)
 * @param {Object} params - Datos del marcaje
 * @param {string} params.tipo - 'Entrada' o 'Salida'
 * @param {Object} params.ubicacion - { latitude, longitude }
 * @param {Date} params.horaVerificacion - Fecha/hora de la captura GPS
 */
export async function registrarMarcaje({ tipo = 'Entrada', ubicacion, horaVerificacion }) {
  try {
    const ahora = horaVerificacion instanceof Date ? horaVerificacion : new Date();

    const nuevoRegistro = {
      tipo,
      fecha: ahora.toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      hora: ahora.toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      estado: 'A tiempo',
      latitud: ubicacion ? ubicacion.latitude : null,
      longitud: ubicacion ? ubicacion.longitude : null,
      creadoEn: serverTimestamp(),
    };

    // Intentar guardar con un límite de 7 segundos para no congelar la pantalla
    const docRef = await conTimeout(
      addDoc(collection(db, COLECCION), nuevoRegistro),
      7000
    );

    console.log('Marcaje guardado exitosamente en Firestore con ID:', docRef.id);
    return { exito: true, id: docRef.id };
  } catch (error) {
    console.error('Error al guardar el marcaje en Firebase:', error.message);
    return { exito: false, error: error.message };
  }
}

/**
 * Obtiene la lista de marcajes reales guardados en la nube
 */
export async function obtenerHistorialMarcajes() {
  try {
    const snapshot = await conTimeout(getDocs(collection(db, COLECCION)), 6000);
    const registros = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Ordenar del más reciente al más antiguo
    registros.sort((a, b) => {
      const tiempoA = a.creadoEn?.seconds || 0;
      const tiempoB = b.creadoEn?.seconds || 0;
      return tiempoB - tiempoA;
    });

    return registros;
  } catch (error) {
    console.warn('Aviso al obtener historial de Firebase:', error.message);
    return [];
  }
}
