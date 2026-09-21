const manejadorErrores = (error,req,res,next)=>{
    
    const codigoError = error.statusCode || 500
    const mensajeError = error.message || "Error inesperado"
    console.error(`[Error] ${new Date ().toISOString()} - ${req.method}- ${req.url}- ${req.ip}`)
    //validar si hay mas informacion
    if (error.stack){
        console.error(error.stack)
    }
        res.json({ERROR:"Error",codigoError, mensajeError,
        //configurar .env .para mostrar errores solo en modo development    
        ...(process.env.NODE_ENV==="development" &&{stack:error.stack})
    })
    next()
}

module.exports = manejadorErrores