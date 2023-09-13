const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require("../models/usuario");

//Creacion de Middleware para proteger las rutas
const validarJWT = async (req = request, res = response, next) =>{

    
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            "msg": "No hay token en la peticion",
        })
    }
    
    try {
         const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        //Leo el usuario que realiza la autenticacion
        const usuario = await Usuario.findOne({uid});
        
        //Validacion que el usuario sea encontrado
        if(!usuario){
            return res.status(401).json({
                "msg": "Usuario no existe en base de datos",
            })
        }
        
        //Validacion que el usuario autenticado tenga estado en true
        if(!usuario.estado){
            return res.status(401).json({
                "msg": "Usuario con estado false",
            })
        }
        
        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            "msg": "Token invalido",
        })
    }
}


module.exports = {
    validarJWT,
}