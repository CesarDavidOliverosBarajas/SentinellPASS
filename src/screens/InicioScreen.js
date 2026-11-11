import React, { useState } from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import { OPCIONES } from '../constants/data';
import { styles } from '../styles/styles';
import RelojTiempoReal from '../components/RelojTiempoReal';
import BotonEstado from '../components/BotonEstado';
import TarjetaOpcion from '../components/TarjetaOpcion';

/**
 * Pantalla Principal (Inicio)
 * Muestra el panel general de SentinelPass, buscador de servicios,
 * filtrado interactivo por favoritos, reloj en vivo y listado de módulos.
 */
export default function InicioScreen({ navigation }) {
  const [busqueda, setBusqueda] = useState('');
  const [favoritos, setFavoritos] = useState([]);
  const [mostrarSoloFavoritos, setMostrarSoloFavoritos] = useState(false);

  // ====================================================
  // CAMBIAR FAVORITO
  // ====================================================
  const cambiarFavorito = (id) => {
    setFavoritos((actuales) => {
      if (actuales.includes(id)) {
        return actuales.filter((favorito) => favorito !== id);
      }
      return [...actuales, id];
    });
  };

  // ====================================================
  // FILTRAR OPCIONES
  // ====================================================
  let opcionesFiltradas = OPCIONES.filter((item) =>
    item.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (mostrarSoloFavoritos) {
    opcionesFiltradas = opcionesFiltradas.filter((item) =>
      favoritos.includes(item.id)
    );
  }

  // ====================================================
  // OBTENER OBJETOS FAVORITOS
  // ====================================================
  const opcionesFavoritas = OPCIONES.filter((item) =>
    favoritos.includes(item.id)
  );

  return (
    <FlatList
      style={styles.lista}
      data={opcionesFiltradas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listaContenido}
      ListHeaderComponent={
        <View>
          {/* ==================================================
              LOGO
          ================================================== */}
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH6RJ7rz24uNjQ0-ybsoPsdRUk8vPITZ1ZOQgKgfayeA&s=10',
            }}
            style={styles.logo}
            resizeMode="cover"
          />

          {/* ==================================================
              ENCABEZADO
          ================================================== */}
          <View style={styles.header}>
            <View>
              <Text style={styles.saludo}>Bienvenido</Text>
              <Text style={styles.nombreUsuario}>Usuario SentinelPass</Text>
            </View>

            <View style={styles.avatar}>
              <Text style={styles.avatarTexto}>👤</Text>
            </View>
          </View>

          {/* ==================================================
              RELOJ
          ================================================== */}
          <RelojTiempoReal />

          {/* ==================================================
              TARJETA PRINCIPAL
          ================================================== */}
          <View style={styles.card}>
            <Text style={styles.emoji}>💳</Text>
            <Text style={styles.title}>SentinelPass</Text>
            <Text style={styles.subtitle}>
              Sistema inteligente de control de asistencia y seguridad para
              empleados.
            </Text>
            <BotonEstado />
          </View>

          {/* ==================================================
              BOTÓN FAVORITOS
          ================================================== */}
          <Pressable
            style={({ pressed }) => [
              styles.botonFiltroFavoritos,
              mostrarSoloFavoritos && styles.botonFiltroFavoritosActivo,
              pressed && styles.botonPresionado,
            ]}
            onPress={() => setMostrarSoloFavoritos((actual) => !actual)}
          >
            <Text style={styles.botonFiltroTexto}>
              {mostrarSoloFavoritos
                ? '★ Ver todos los servicios'
                : '☆ Mis servicios favoritos'}
            </Text>
          </Pressable>

          {/* ==================================================
              FAVORITOS
          ================================================== */}
          {!mostrarSoloFavoritos && opcionesFavoritas.length > 0 && (
            <View style={styles.favoritosSeccion}>
              <Text style={styles.seccionTitulo}>⭐ Mis favoritos</Text>
              <Text style={styles.favoritosDescripcion}>
                Accesos rápidos a tus servicios preferidos.
              </Text>
            </View>
          )}

          {/* ==================================================
              BUSCADOR
          ================================================== */}
          <TextInput
            style={styles.buscador}
            value={busqueda}
            onChangeText={setBusqueda}
            placeholder="Buscar opción..."
            placeholderTextColor="#8AA4BF"
          />

          <Text style={styles.seccionTitulo}>
            {mostrarSoloFavoritos
              ? 'Servicios favoritos'
              : 'Servicios disponibles'}
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <TarjetaOpcion
          item={item}
          favorito={favoritos.includes(item.id)}
          onFavorito={() => cambiarFavorito(item.id)}
          onPress={() =>
            navigation.navigate(item.pantalla, { opcion: item })
          }
        />
      )}
      ListEmptyComponent={
        <View style={styles.sinFavoritos}>
          <Text style={styles.sinFavoritosIcono}>☆</Text>
          <Text style={styles.sinFavoritosTitulo}>No tienes favoritos</Text>
          <Text style={styles.sinFavoritosTexto}>
            Pulsa la estrella de un servicio para agregarlo a tus favoritos.
          </Text>
        </View>
      }
    />
  );
}
