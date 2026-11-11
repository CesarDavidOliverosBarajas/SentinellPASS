/**
 * Datos y Modelos Iniciales del Sistema SentinelPass
 * Contiene las opciones del menú principal y los registros históricos de ejemplo.
 */

export const OPCIONES = [
  {
    id: '1',
    title: 'Marcaje de asistencia',
    detalle:
      'Permite registrar la entrada o salida del empleado mediante SentinelPass.',
    icono: '🕐',
    pantalla: 'Marcaje',
  },
  {
    id: '2',
    title: 'Validación NFC',
    detalle:
      'Utiliza una tarjeta NFC para validar el proceso de marcación.',
    icono: '📲',
    pantalla: 'NFC',
  },
  {
    id: '3',
    title: 'Geolocalización',
    detalle:
      'Verifica la ubicación del empleado durante el proceso de asistencia.',
    icono: '📍',
    pantalla: 'Ubicacion',
  },
  {
    id: '4',
    title: 'Historial',
    detalle:
      'Consulta los registros anteriores de asistencia.',
    icono: '📋',
    pantalla: 'Historial',
  },
  {
    id: '5',
    title: 'Novedades',
    detalle:
      'Permite registrar una novedad cuando no es posible realizar la validación NFC.',
    icono: '⚠️',
    pantalla: 'Novedades',
  },
];

export const HISTORIAL = [
  {
    id: '1',
    fecha: '22/09/2026',
    hora: '07:02 AM',
    tipo: 'Entrada',
    estado: 'Correcto',
  },
  {
    id: '2',
    fecha: '21/09/2026',
    hora: '05:58 PM',
    tipo: 'Salida',
    estado: 'Correcto',
  },
  {
    id: '3',
    fecha: '21/09/2026',
    hora: '07:05 AM',
    tipo: 'Entrada',
    estado: 'Correcto',
  },
];
