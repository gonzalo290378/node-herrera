const { response } = require('express');
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require('../helpers/generar-jwt')

const login = async (req, res = response) => {
    const {correo, password} = req.body;
    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if(!usuario) {
            return res.status(400).json({
                "msg": "Usuario / Password no son correctos",
            })
        }

        //Verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                "msg": "Usuario no esta habilitado",
            })
        }

        //Verificar la contraseña (password que recibo, password de la base de datos)
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                "msg": "Usuario / Password no son correctos",
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        return res.json({
            usuario,
            token
        })

    } catch (error) {
        return res.status(500).json({
            "msg":"Hable con el administrador",
        })
    }

}

module.exports = {
    login,
    
}