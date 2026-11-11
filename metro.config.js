// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Desactivar Watchman en discos externos (/Volumes) para usar el watcher nativo de Node.js
config.resolver.useWatchman = false;

// Permitir resolución de archivos .cjs (necesario para el SDK modular de Firebase)
if (!config.resolver.sourceExts.includes('cjs')) {
  config.resolver.sourceExts.push('cjs');
}

module.exports = config;
