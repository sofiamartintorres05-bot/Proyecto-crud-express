const {router, Router} = require("express");

const enrutadorPrueba = Router();

enrutadorPrueba.get("/rutaPersonal", (req, res) => {
    res.json({mensaje: "Ruta de prueba, personal" });
});

//Se realiza todas las rutas, con ( POST,PUT, DELETE)
module.exports = enrutadorPrueba;