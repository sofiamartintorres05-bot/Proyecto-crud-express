const express = require("express");
const app = express();
const MIPUERTO = process.env.MIPUERTO || 3003;
//middlevare body-paise
app.use(express.json())


app.get("/", (req, res) => {
    res.send("API Rest Full con express");
});


app.get("/api/aprendices", (req, res) => {
    res.status(200).json({'Mensaje': 'Lista Aprendices'})
})

app.post("/api/aprendices", (req, res) => {
    const datosAprendiz=req.body
    const edad =req.body.edad
    if (edad >= 18) {
        return res.status(200).json({ Mensaje: 'Eres mayor de edad','Datos':datosAprendiz });
    }
    
    // Si no es mayor de edad, continúa con la creación
    return res.status(201).json({ Mensaje: 'Crear Aprendiz', datos: datosAprendiz });
});

app.put("/api/aprendices/:id", (req, res) => {
    res.status(200).json({'Mensaje': 'Actualizar Aprendiz'})
})

app.delete("/api/aprendices", (req, res) => {
    res.status(200).json({'Mensaje': 'Eliminado'})
})


app.listen(MIPUERTO, () => {
    console.log(`Servidor ejecutándose en http://localhost:${MIPUERTO}`);
});