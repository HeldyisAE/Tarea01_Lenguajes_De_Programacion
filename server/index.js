// server/index.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});