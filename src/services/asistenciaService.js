import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLECCION_MARCAJES = 'marcajes';
const COLECCION_NOVEDADES = 'novedades';

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
              'Tiempo de espera agotado (Timeout). Verifica tu conexión o que Firestore esté activo en Firebase.'
            )
          ),
        ms
      )
    ),
  ]);
};

// ====================================================
// CRUD DE MARCAJES DE ASISTENCIA
// ====================================================

/**
 * CREATE: Guarda un nuevo marcaje de asistencia en Firestore
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

    const docRef = await conTimeout(
      addDoc(collection(db, COLECCION_MARCAJES), nuevoRegistro),
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
 * READ: Obtiene la lista de marcajes reales guardados en Firestore
 */
export async function obtenerHistorialMarcajes() {
  try {
    const snapshot = await conTimeout(getDocs(collection(db, COLECCION_MARCAJES)), 6000);
    const registros = snapshot.docs.map((documento) => ({
      id: documento.id,
      ...documento.data(),
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

/**
 * UPDATE: Actualiza los campos de un marcaje existente en Firestore
 */
export async function actualizarMarcaje(id, { tipo, estado }) {
  try {
    if (!id) throw new Error('ID de documento inválido.');

    const refDoc = doc(db, COLECCION_MARCAJES, id);
    await conTimeout(
      updateDoc(refDoc, {
        tipo,
        estado,
        actualizadoEn: serverTimestamp(),
      }),
      7000
    );

    console.log('Marcaje actualizado en Firestore:', id);
    return { exito: true };
  } catch (error) {
    console.error('Error al actualizar marcaje:', error.message);
    return { exito: false, error: error.message };
  }
}

/**
 * DELETE: Elimina un marcaje existente de Firestore
 */
export async function eliminarMarcaje(id) {
  try {
    if (!id) throw new Error('ID de documento inválido.');

    const refDoc = doc(db, COLECCION_MARCAJES, id);
    await conTimeout(deleteDoc(refDoc), 7000);

    console.log('Marcaje eliminado de Firestore:', id);
    return { exito: true };
  } catch (error) {
    console.error('Error al eliminar marcaje:', error.message);
    return { exito: false, error: error.message };
  }
}

// ====================================================
// CRUD DE NOVEDADES
// ====================================================

/**
 * CREATE: Guarda una novedad o justificación en Firestore
 */
export async function registrarNovedad(descripcion) {
  try {
    const ahora = new Date();

    const nuevaNovedad = {
      descripcion: descripcion.trim(),
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
      estado: 'Reportada',
      creadoEn: serverTimestamp(),
    };

    const docRef = await conTimeout(
      addDoc(collection(db, COLECCION_NOVEDADES), nuevaNovedad),
      7000
    );

    console.log('Novedad guardada en Firestore con ID:', docRef.id);
    return { exito: true, id: docRef.id };
  } catch (error) {
    console.error('Error al guardar novedad en Firebase:', error.message);
    return { exito: false, error: error.message };
  }
}

/**
 * READ: Obtiene el listado de novedades registradas en Firestore
 */
export async function obtenerNovedades() {
  try {
    const snapshot = await conTimeout(getDocs(collection(db, COLECCION_NOVEDADES)), 6000);
    const lista = snapshot.docs.map((documento) => ({
      id: documento.id,
      ...documento.data(),
    }));

    lista.sort((a, b) => {
      const tiempoA = a.creadoEn?.seconds || 0;
      const tiempoB = b.creadoEn?.seconds || 0;
      return tiempoB - tiempoA;
    });

    return lista;
  } catch (error) {
    console.warn('Aviso al obtener novedades de Firebase:', error.message);
    return [];
  }
}

/**
 * DELETE: Elimina una novedad registrada en Firestore
 */
export async function eliminarNovedad(id) {
  try {
    if (!id) throw new Error('ID de novedad inválido.');

    await conTimeout(deleteDoc(doc(db, COLECCION_NOVEDADES, id)), 7000);
    return { exito: true };
  } catch (error) {
    console.error('Error al eliminar novedad:', error.message);
    return { exito: false, error: error.message };
  }
}
