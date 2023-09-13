const Role = require("../models/role");
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error("El rol no esta registrado en la base de datos");
  }
};

const existeEmail = async (correo = "") => {
    const email = await Usuario.findOne({ correo });
    if (email) {
      throw new Error("El correo electronico ya esta registrado");
    }
  };

  const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
      throw new Error("El id no existe");
    }
  };

  const existeCategoria = async ( id ) => {
    const existe = await Categoria.findById(id);
    if( !existe ){
      throw new Error("La categoria no existe");
    }
  }

  const existeProducto = async ( id ) => {
    const existe = await Producto.findById(id);
    if( !existe ){
      throw new Error("El producto no existe");
    }
  }

module.exports = {
  esRolValido,
  existeEmail,
  existeUsuarioPorId,
  existeCategoria,
  existeProducto,
};
