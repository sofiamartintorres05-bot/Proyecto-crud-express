
const autentificacion = (req, res , next)=>{
    const token = req.header 
    ("campoautenticar")?.split("")[1]
    if (!token){
        return res.status(401).json
        ({Mensaje: "Acceso negado, no provee token"})
    }
    //verificar token
    jwtojen.verify(token, process.env.JWT_SECRETO,(error, usuario)=>{
        if(error){
            res.status(403).json
            ({Mensaje: "Token invalido"})
        }
        req.usuario = usuario
        next()
    })
}
module.exports = autentificacion