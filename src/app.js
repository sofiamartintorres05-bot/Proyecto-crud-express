require("dotenv").config();
const express = require("express");
const enrutadorGeneral = require("./routes");

const app = express()

//importar los middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Debemos importar los enrutadores de la carpeta routers
app.use("/api", enrutadorGeneral)

//enpoint de la ruta raiz, de bienvenida a la API
app.get("/", (req, res) => {
    res.send("API Rest 3407182 en funcionamiento");
});

module.exports = app;