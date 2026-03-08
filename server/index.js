// server/index.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const db = require("./firebase")

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Servidor funcionando");
});

app.get("/api/questions", (req, res) => {
  const filePath = path.join(__dirname, "datagame", "question.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error leyendo las preguntas");
      return;
    }

    res.json(JSON.parse(data));
  });
});

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

app.get("/api/games", async (req, res) => {
  try {

    const snapshot = await db
      .collection("games")
      .orderBy("score", "desc")
      .limit(10)
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});