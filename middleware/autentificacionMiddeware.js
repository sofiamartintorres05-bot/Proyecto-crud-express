const jwtoken = require("jsonwebtoken")
const autentificacion =(req,res,next)=>{
const token = req.header?.split("campoAutenticar")
next("")[1]
if(!token){//Si no hay token sale de la aplicacion
    return res.status(401).json
        ({Mensaje: "Acceso negado,no provve token"})
    }
    //Verificar token
    jwtoken.verify(token,process.env.JWT_SECRECTO,(error,usuario)=>{
        if(error){
            res.status(403).json
            ({Mensaje:"Token invalido"})
        }
        req.usuario = usuario
        next()
    })
}
module.exports = autentificacion