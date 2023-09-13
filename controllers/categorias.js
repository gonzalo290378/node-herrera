const { response, request } = require('express');
const Categoria = require("../models/categoria");

//obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const categorias = await Categoria.find({estado: true})
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite));
    const categoriasTotales = await Categoria.countDocuments({estado: true});

    //Aca realizo un Promise.all es útil cuando necesitas esperar a que múltiples promesas 
    //finalicen antes de continuar con la lógica
    const [total, listaDeCategorias] = await Promise.all([
        categoriasTotales,
        categorias
    ])

    return res.json({
        total,
        listaDeCategorias,
    })

}

//obtenerCategoria - populate {}
const obtenerCategoria = async (req =request, res= response) =>{
    const {id, ...data} = req.params;
    const categoria = await Categoria.findById(id, data, {estado: true})
        .populate('usuario', 'nombre');

    return res.json({
        categoria,
    })

}

//actualizarCategoria
const actualizarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const { ...data } = req.body;

    //Ahora seteo al usuario que realizo la ultima modificacion en la categoria
    data.usuario = req.usuario._id;

    //Ahora seteo el nombre en mayusculas de la categoria
    data.nombre = data.nombre.toUpperCase();

    //El { new: true} me ofrece la posibilidad de que la informacion actualiza postman la devuelva
    const categoria = await Categoria.findByIdAndUpdate( id, data , {new: true});

    return res.json({
        categoria,
    })
}

//borrarCategoria - estado: false
const borrarCategoria = async (req = request, res = response) => {
    const { id } = req.params;

    //El { new: true} me ofrece la posibilidad de que la informacion actualiza postman la devuelva
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false},{ new: true});

    return res.json({
        categoria,
    })

}


const crearCategoria = async (req = request, res = response) =>{
    const nombre = req.body.nombre.toUpperCase();
    const usuario = req.usuario._id;
    const categoriaDB = await Categoria.findOne( {nombre} );

    if( categoriaDB ){
        return res.status(400).json({
            "msg": "La categoria ya existe",
        })
    }

    //Generar la data en la DB 
    const categoria = new Categoria({ nombre, usuario });
    await categoria.save();

    return res.status(201).json({
        categoria,
    })


}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
}