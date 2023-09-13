const { Schema, model } = require('mongoose');

const Categoria = Schema({
    
    nombre: {
        type: String,
        required:[true, 'El nombre es obligatorio'],
        unique: true
    },

    estado: {
        type: Boolean,
        default: true,
        required:true,
    },

    //Aqui agregamos un atributo que no es primitivo y ya existe en la base de Mongo
    usuario: {
        //El tipo es por defecto
        type: Schema.Types.ObjectId,
        //La referencia debe ser igual a la que es exportada en el modelo Usuario
        ref: 'Usuario',
        required: true,
    },
})

Categoria.methods.toJSON = function(){
    const {__v , ...data} = this.toObject();
    return data;
}

module.exports = model('Categoria', Categoria);