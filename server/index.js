/**
 * Servidor Express para el juego de preguntas.
 * - Da endpoints para:
 *   - Verificar funcionamiento del servidor
 *   - Obtener preguntas
 *   - Guardar partidas
 *   - Obtener historial de partidas
 * 
 * @module server/index
 */

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const db = require("./firebase")

const app = express();
app.use(cors());
app.use(express.json());

/**
 * GET /api
 * Endpoint para verificar que el servidor funciona.
 * @param {import("express").Request} req - Objeto de solicitud
 * @param {import("express").Response} res - Objeto de respuesta
 */
app.get("/api", (req, res) => {
  res.send("Servidor funcionando");
});

/**
 * GET /api/questions
 * Devuelve el listado de preguntas desde un archivo JSON local.
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns {Object} JSON con todas las preguntas
 */
app.get("/api/questions", (req, res) => {
  const filePath = path.join(__dirname, "datagame", "question.json"); //Ubica el archivo

  //Lectura del archivo
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error leyendo las preguntas");
      return;
    }

    res.json(JSON.parse(data));
  });
});

/**
 * POST /api/games
 * Guarda una partida en la base de datos de firestore.
 * @param {import("express").Request} req - Debe contener un body con:
 *   @property {string} player - Nombre del jugador
 *   @property {number} score - Puntaje del jugador
 *   @property {string} result - "win" o "lose"
 * @param {import("express").Response} res
 * @returns {Object} JSON con mensaje de confirmación e ID de la partida
 */
app.post("/api/games", async (req, res) => {
  try {

    const { player, score, result } = req.body;

    const docRef = await db.collection("games").add({
      player,
      score,
      result,
      createdAt: new Date()
    });

    res.json({
      message: "Partida guardada",
      id: docRef.id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error guardando partida" });
  }
});

/**
 * GET /api/games
 * Obtiene las últimas 20 partidas ordenadas por puntaje descendente.
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns {Object[]} Array de objetos con las partidas:
 *   @property {string} id - ID del documento en Firestore
 *   @property {string} player - Nombre del jugador
 *   @property {number} score - Puntaje obtenido
 *   @property {string} result - "win" o "lose"
 *   @property {Date} createdAt - Fecha de creación
 */
app.get("/api/games", async (req, res) => {
  try {

    const snapshot = await db
      .collection("games")
      .orderBy("score", "desc")
      .limit(20)
      .get();

    const games = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(games);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo partidas" });
  }
});

//Inicia el server en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});