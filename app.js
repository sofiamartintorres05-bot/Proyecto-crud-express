const { error } = require('console');
const express = require('express');
const app = express();
const port = process.env.MIPUERTO || 3003; 
//libreria fs.path
const sistemaArchivo = require("fs")
const ruta = require("path")
const rutaMiArchivo = ruta.join(__dirname,"datos.json")


//importar multer
const multer =require ("multer")
//Almacenamiento
const almacen = multer.diskStorage({
    destination:(req,file,cb )=> {
        cb(null,"misImagenes/")
    },
    filename : (rey,file,cb )=>{ 
        const extension = ruta.extname(file.originalname)
        cb(null,`${Date.now()}${extension}`)
    }  /*cb= call back */
})

const subir = multer ({storage : almacen})

//middlewarc formateo body
app.use(express.json())
app.use(express.urlencoded({extended :true}))


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


app.post('/api/aprendices', subir.single("imagen"),(req, res) => {
  const datosAprendiz = req.body
  datosAprendiz.imagen = req.file?`/misImagenes/${req.file.filename}`:"Sin Imagen"

 sistemaArchivo.readFile(rutaMiArchivo, "utf-8", (error, Datos)=>{
    if (error) res.status(500).json({error : "No se puede leer el archivo"})
    const listaAprendices = JSON.parse (Datos)
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

app.listen(port, () => {
console.log( `Servidor en funcionamiento en el puerto: http://localhost:${port}`);
});