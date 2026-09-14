const { error } = require('console');
const express = require('express');
const app = express();
const port = process.env.MIPUERTO || 3003

//Importar mis Middleware

const registroMiddleware = require("./middleware/registroMiddleware")
const manejadorErrores = require("./middleware/manejadorErrores")

//libreria fs.path
const sistemaArchivo = require("fs")
const ruta = require("path")
const rutaMiArchivo = ruta.join(__dirname,"datos.json")

//importar validacion
const { validarAprendiz } = require("./validaciones/validaciones")

//importar multer
const multer =require("multer");


//almacenamiento
const almacen = multer.diskStorage({

  destination: (req, file, cb)=>{cb(null, "misImagenes/")},
  filename: (req, file, cb)=>{
    const extension = ruta.extname(file.originalname)
    cb(null, `${Date.now()}${extension}`)
  },

})
const subir = multer({storage: almacen})

//middlewarc body-parse
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//usar nuestro middleware
app.use(registroMiddleware)


app.get('/', (req, res) => {
  res.send('API Rest Full con express');
});

app.get('/api/aprendices', (req, res) => {
  sistemaArchivo.readFile(rutaMiArchivo, "utf-8", (error, Datos)=>{
    if (error) res.status(500).json({error : "No se puede leer el archivo"})
    const listaAprendices = JSON.parse (Datos)
    res.status(200).json({ Listado : listaAprendices})
  })
});


app.post('/api/aprendices', subir.single("imagen"), validarAprendiz, (req, res) => {
  sistemaArchivo.readFile(rutaMiArchivo, "utf-8", (error, Datos)=>{
    if (error) res.status(500).json({error : "No se puede leer el archivo"})
    const listaAprendices = JSON.parse (Datos)

    // Generar el ID empezando desde 1
    const nuevoId = listaAprendices.length > 0 
      ? Number(listaAprendices[listaAprendices.length - 1].id || 0) + 1 
      : 1;

    const datosAprendiz = {
      id: nuevoId,
      ...req.body,
      imagen: req.file ? `/misImagenes/${req.file.filename}` : "sin Imagen"
    }

    listaAprendices.push(datosAprendiz)
    sistemaArchivo.writeFile(rutaMiArchivo, JSON.stringify(listaAprendices, null, 2), (error)=>{
      if (error) res.status(500).json({error : "No se puede escribir en el archivo"})
      res.status(200).json({Mensaje : "Creado", Datos: datosAprendiz})
    })
  
  })
});

app.put('/api/aprendices/:id', (req, res) => {
res.status(200).json({Mensaje:"actualiza aprendices"})
});

app.delete('/api/aprendices', (req, res) => {
res.status(200).json({Mensaje:"eliminado"})
});


//provocando error
app.get("/api/error", (req,res, next)=>{
  next(new Error("Este es un error provocado"))
})
//Tiene que ir el Error abajo, para que funcione
app.use(manejadorErrores)

app.listen(port, () => {
console.log( `Servidor en funcionamiento en el puerto: http://localhost:${port}`);
});
