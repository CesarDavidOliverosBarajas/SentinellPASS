import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/**
 * Configuración oficial de Firebase para SentinelPass
 * Obtenida de la consola de Google Firebase para el proyecto "sentinellPass"
 */
const firebaseConfig = {
  apiKey: "AIzaSyAARQjzeLSgLarIwqFJBaAxHk_bRzXg0e4",
  authDomain: "sentinellpass.firebaseapp.com",
  projectId: "sentinellpass",
  storageBucket: "sentinellpass.firebasestorage.app",
  messagingSenderId: "464936443969",
  appId: "1:464936443969:web:a772daccc180722c1226c0",
  measurementId: "G-NHTFRKCHBM"
};

// Inicializar la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Inicializar y exportar la base de datos Cloud Firestore
export const db = getFirestore(app);

export default app;
