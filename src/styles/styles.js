import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

/**
 * Estilos globales y compartidos para el diseño de SentinelPass
 */
export const styles = StyleSheet.create({
  // ====================================================
  // CONTENEDORES
  // ====================================================
  lista: {
    flex: 1,
    backgroundColor: COLORS.azulFondo,
  },

  listaContenido: {
    padding: 16,
    paddingBottom: 35,
  },

  pantalla: {
    flex: 1,
    backgroundColor: COLORS.azulFondo,
  },

  pantallaContenido: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },

  // ====================================================
  // LOGO
  // ====================================================
  logo: {
    width: 180,
    height: 180,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 18,
  },

  // ====================================================
  // HEADER
  // ====================================================
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  saludo: {
    color: COLORS.gris,
    fontSize: 14,
  },

  nombreUsuario: {
    color: COLORS.azulOscuro,
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 3,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.azulTarjeta,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarTexto: {
    fontSize: 23,
  },

  // ====================================================
  // RELOJ
  // ====================================================
  relojCard: {
    backgroundColor: COLORS.blanco,
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C5D9ED',
  },

  relojIcono: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: '#D6E8FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  relojIconoTexto: {
    fontSize: 22,
  },

  relojContenido: {
    flex: 1,
  },

  relojHora: {
    color: COLORS.azulOscuro,
    fontSize: 22,
    fontWeight: 'bold',
  },

  relojFecha: {
    color: COLORS.gris,
    fontSize: 12,
    marginTop: 3,
    textTransform: 'capitalize',
  },

  // ====================================================
  // TARJETA PRINCIPAL
  // ====================================================
  card: {
    backgroundColor: COLORS.azulPrincipal,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    width: '100%',
    marginBottom: 18,
  },

  emoji: {
    fontSize: 48,
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.blanco,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.blanco,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 18,
  },

  // ====================================================
  // ESTADO
  // ====================================================
  estadoBoton: {
    backgroundColor: COLORS.azulOscuro,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
  },

  estadoPresionado: {
    opacity: 0.6,
  },

  estadoTexto: {
    color: COLORS.blanco,
    fontWeight: '600',
  },

  // ====================================================
  // FAVORITOS
  // ====================================================
  botonFiltroFavoritos: {
    backgroundColor: COLORS.blanco,
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#C5D9ED',
  },

  botonFiltroFavoritosActivo: {
    backgroundColor: COLORS.azulTarjeta,
    borderColor: COLORS.azulPrincipal,
  },

  botonFiltroTexto: {
    color: COLORS.azulOscuro,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  favoritosSeccion: {
    marginBottom: 10,
  },

  favoritosDescripcion: {
    color: COLORS.gris,
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
  },

  botonFavorito: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF5FC',
    marginLeft: 8,
  },

  favoritoTexto: {
    fontSize: 27,
    color: COLORS.dorado,
  },

  favoritoPresionado: {
    opacity: 0.5,
    transform: [{ scale: 0.9 }],
  },

  tarjetaPrincipal: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  sinFavoritos: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: COLORS.blanco,
    borderRadius: 16,
  },

  sinFavoritosIcono: {
    fontSize: 50,
    color: COLORS.dorado,
    marginBottom: 10,
  },

  sinFavoritosTitulo: {
    color: COLORS.azulOscuro,
    fontWeight: 'bold',
    fontSize: 17,
  },

  sinFavoritosTexto: {
    color: COLORS.gris,
    textAlign: 'center',
    marginTop: 7,
    lineHeight: 19,
  },

  // ====================================================
  // BUSCADOR
  // ====================================================
  buscador: {
    width: '100%',
    backgroundColor: COLORS.blanco,
    color: COLORS.textoOscuro,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#C5D9ED',
  },

  seccionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.azulOscuro,
    marginBottom: 10,
  },

  // ====================================================
  // TARJETAS
  // ====================================================
  tarjeta: {
    padding: 14,
    marginBottom: 12,
    backgroundColor: COLORS.blanco,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  tarjetaIcono: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#D6E8FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  iconoTexto: {
    fontSize: 22,
  },

  tarjetaContenido: {
    flex: 1,
  },

  texto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textoOscuro,
    marginBottom: 4,
  },

  descripcion: {
    fontSize: 12,
    color: COLORS.gris,
    lineHeight: 17,
  },

  flecha: {
    fontSize: 28,
    color: COLORS.azulPrincipal,
    marginLeft: 8,
  },

  // ====================================================
  // DETALLE
  // ====================================================
  detalleIcono: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: COLORS.azulPrincipal,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },

  detalleEmoji: {
    fontSize: 45,
  },

  detalleTitulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.azulOscuro,
    textAlign: 'center',
    marginBottom: 15,
  },

  detalleDescripcion: {
    fontSize: 15,
    color: COLORS.gris,
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: 25,
  },

  // ====================================================
  // INFORMACIÓN
  // ====================================================
  infoCard: {
    backgroundColor: COLORS.blanco,
    borderRadius: 18,
    padding: 20,
    width: '100%',
    marginBottom: 25,
  },

  infoTitulo: {
    color: COLORS.azulOscuro,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 13,
  },

  infoTexto: {
    color: COLORS.gris,
    fontSize: 14,
    marginBottom: 9,
  },

  // ====================================================
  // BOTONES
  // ====================================================
  botonPrincipal: {
    backgroundColor: COLORS.azulPrincipal,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 230,
  },

  botonIcono: {
    fontSize: 19,
    marginRight: 9,
  },

  botonPrincipalTexto: {
    color: COLORS.blanco,
    fontWeight: 'bold',
    fontSize: 15,
  },

  botonPresionado: {
    opacity: 0.65,
  },

  // ====================================================
  // UBICACIÓN
  // ====================================================
  ubicacionCard: {
    backgroundColor: COLORS.blanco,
    borderRadius: 18,
    padding: 20,
    width: '100%',
    marginTop: 25,
  },

  ubicacionTitulo: {
    color: COLORS.verde,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
  },

  ubicacionLinea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E1EAF3',
    paddingVertical: 10,
  },

  ubicacionEtiqueta: {
    color: COLORS.gris,
    fontSize: 13,
  },

  ubicacionValor: {
    color: COLORS.azulOscuro,
    fontSize: 13,
    fontWeight: 'bold',
  },

  estadoUbicacion: {
    backgroundColor: '#E4F8EB',
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    marginBottom: 20,
  },

  estadoUbicacionTexto: {
    color: '#15803D',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },

  errorCard: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 14,
    width: '100%',
    marginTop: 18,
  },

  errorTexto: {
    color: '#B91C1C',
    textAlign: 'center',
    fontSize: 13,
  },

  // ====================================================
  // REGISTRO EXITOSO
  // ====================================================
  exitoCirculo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.verde,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },

  exitoTexto: {
    color: COLORS.blanco,
    fontSize: 65,
    fontWeight: 'bold',
  },

  registroCard: {
    backgroundColor: COLORS.blanco,
    borderRadius: 18,
    padding: 20,
    width: '100%',
    marginBottom: 25,
  },

  registroTitulo: {
    color: COLORS.gris,
    textAlign: 'center',
  },

  registroHora: {
    color: COLORS.azulOscuro,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },

  registroEstado: {
    color: COLORS.verde,
    fontSize: 13,
    marginTop: 5,
    textAlign: 'center',
  },

  registroCoordenadas: {
    color: COLORS.gris,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 12,
  },

  // ====================================================
  // HISTORIAL
  // ====================================================
  tituloLista: {
    color: COLORS.azulOscuro,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
  },

  historialCard: {
    backgroundColor: COLORS.blanco,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  historialIcono: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: '#D6E8FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  historialEmoji: {
    fontSize: 20,
  },

  historialTipo: {
    color: COLORS.textoOscuro,
    fontWeight: 'bold',
    fontSize: 14,
  },

  historialFecha: {
    color: COLORS.gris,
    fontSize: 12,
    marginTop: 3,
  },

  historialDerecha: {
    alignItems: 'flex-end',
  },

  historialHora: {
    color: COLORS.textoOscuro,
    fontWeight: 'bold',
  },

  historialEstado: {
    color: COLORS.verde,
    fontSize: 11,
    marginTop: 4,
  },

  // ====================================================
  // NOVEDADES
  // ====================================================
  textArea: {
    width: '100%',
    minHeight: 130,
    backgroundColor: COLORS.blanco,
    borderRadius: 16,
    padding: 16,
    color: COLORS.textoOscuro,
    textAlignVertical: 'top',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#C5D9ED',
  },
});

export default styles;
