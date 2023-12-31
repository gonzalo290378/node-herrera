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
    
    return (req, res = response, next) => {
        
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }
        next();
    }
}


module.exports = {
    esAdminRole,
    tieneRole
}