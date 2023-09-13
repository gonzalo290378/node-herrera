const { request, response } = require("express");
const Producto = require("../models/producto");

//ObtenerProducto
const obtenerProductos = async (req = request, res= response) => {
    const {limite = 5, desde = 0} = req.query;
    const productos = await Producto.find({estado: true})
        .populate('producto' , 'nombre')
        .populate('categoria' , 'nombre')
        .skip(Number(desde))
        .limit(Number(limite));

    const productosTotales = await Producto.countDocuments({estado: true});

    //Aca realizo un Promise.all es útil cuando necesitas esperar a que múltiples promesas 
    //finalicen antes de continuar con la lógica
    const [total, listaDeProductos] = await Promise.all([
        productosTotales,
        productos
    ])

    return res.json({
        total,
        listaDeProductos,
    })

}


//ObtenerProductos
const obtenerProducto = async (req = request, res= response) => {
    const { id, ...data } = req.params;
    const producto = await Producto.findById(id, data, {estado :true})
        .populate('producto', 'nombre')
        .populate('categoria', 'nombre');

    return res.json({
        producto,
    })

}

//CrearProducto
const crearProducto = async (req = request, res= response) => {
    const {estado, usuario, ...body} = req.body;
    const productoDB = await Producto.findOne({nombre: body.nombre});

    if( productoDB ){
        return res.status(400).json({
            "msg": "El producto ya existe",
        })
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
    }
    //Generar la data en la DB 
    const producto = new Producto(data);
    await producto.save();

    return res.status(201).json({
        producto,
    })
}

//ActualizarProducto
const actualizarProducto = async (req = request, res= response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    //Ahora seteo al usuario que realizo la ultima modificacion en la categoria
    data.usuario = req.usuario._id;

    //Ahora seteo el nombre en mayusculas de la categoria

    //El { new: true} me ofrece la posibilidad de que la informacion actualiza postman la devuelva
    const producto = await Producto.findByIdAndUpdate( id, data , {new: true});

    return res.json({
        producto,
    })
}

//EliminarProducto
const borrarProducto = async (req = request, res= response) => {
    const { id } = req.params;

    //El { new: true} me ofrece la posibilidad de que la informacion actualiza postman la devuelva
    const producto = await Producto.findByIdAndUpdate(id, {estado: false},{ new: true});

    return res.json({
        producto,
    })
}



module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto,
}