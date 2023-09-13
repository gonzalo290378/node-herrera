const {Schema, model} = require ('mongoose');

const Producto = Schema({
    
    nombre: {
        type: String,
        required: true,
        unique: true,
    },

    estado: {
        type: Boolean,
        default: true,
        required: true,
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }, 

    precio: {
        type: Number,
        default: 0,
    }, 

    categoria: {
        type: Schema.Types.ObjectId,
        //La referencia debe ser igual a la que es exportada en el modelo Usuario
        ref: 'Categoria',
        required: true,
    },

    descripcion: {
        type: String,
    },

    disponible: {
        type: Boolean,
        default: true,
    },

});

Producto.methods.toJSON = function(){
    const {__v, estado, ...data } = this.Object();
    return data;
}

module.exports = model('Producto', Producto);