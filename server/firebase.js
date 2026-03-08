/**
 * Configuración de firebase fdmin para conectarse a firestore
 *
 * En este módulo:
 * - Inicializa la app de firebase usando la clave de servicio 'firebaseKey.json'
 * - Exporta la instancia de firestore para usar en otras partes del servidor
 *
 * @module server/firebase
 */

const admin = require("firebase-admin");
const serviceAccount = require("./firebaseKey.json");

//Inicializa firebase admin con la clave
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

/**
 * Instancia de firestore para consultas y operaciones en la base de datos
 * @type {import('firebase-admin').firestore.Firestore}
 */
const db = admin.firestore();

module.exports = db;