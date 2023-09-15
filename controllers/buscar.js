const { request, response } = require("express");
const { ObjectId } = require("mongodb");
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");



const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles',
]

const buscarUsuarios = async (termino = "", res = response) => {

    //Busca mediante ObjectId si es un id valido de Mongo. La función ObjectId.isValid() en MongoDB 
    //se utiliza para verificar si una cadena de caracteres cumple con el formato de un ObjectId 
    //válido en MongoDB. Un ObjectId es un tipo de dato único y estándar utilizado en MongoDB para 
    //identificar de manera única documentos en una colección.
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        if(usuario){
            return res.json({
                "results": [usuario]
            })
        }

        else{
            return res.json({
                "results": []
            })
        }
    }
    
    //Expresion regular que me permite buscar siendo insensible a las mayusculas
    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });

    res.json({
        results:usuarios
    })


}

const buscar = (req = request, res = response) => {
    const { coleccion, termino } = req.params;

    if( !coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            "msg": `Las colecciones permitidas son ${coleccionesPermitidas}`,
        })
    }

    switch(coleccion){
        case 'usuarios':
        buscarUsuarios(termino, res);
        break;

        case 'categoria':

        break;

        case 'productos': 

        break;

        default: res.status(500).json({
            "msg": "Se le olvido de hacer esta busqueda",
        })
    }

}



module.exports = {
    buscar,
}