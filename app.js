import express from "express";

const app = express();
const MIPUERTO = process.env.MIPUERTO || 3003;

app.get("/", (req, res) => {
  res.send("API Rest Full con express");
});

app.listen(MIPUERTO, () => {
  console.log(`Servidor ejecutándose en http://localhost:${MIPUERTO}`);
});