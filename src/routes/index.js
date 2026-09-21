//consolida o agrupa todos los enrutadores
const {Router} = require ("express")
const enrutadorGeneral = Router()
const enrutadorPrueba = require("./pruebaRouter");

enrutadorGeneral.use("/rutaprueba", enrutadorPrueba);

module.exports = enrutadorGeneral;
