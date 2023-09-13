const { response } = require('express');

const esAdminRole = (req, res = response, next) => {

    if( !req.usuario ){
        return res.status(500).json({
            "msg": "Usuario no existe en base de datos",
        })
    }

    const { rol } = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            "msn": "El usuario no es administrador",
        })
    }

    next();
}


const tieneRole = (...resto) =>{
        console.log(resto);
       
    
}


module.exports = {
    esAdminRole,
    tieneRole
}