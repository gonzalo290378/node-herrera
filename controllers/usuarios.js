const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = async ( req = request, res = response) => {

  //Paginacion con Node
  const { limite = 5, desde = 0} = req.query;
  const usuarios = await Usuario.find({estado: true}).skip(Number(desde)).limit(Number(limite));
  const usuariosTotales = await Usuario.countDocuments({estado: true});
  
  //Aca realizo un Promise.all es útil cuando necesitas esperar a que múltiples promesas 
  //finalicen antes de continuar con la lógica
  const [total, listaDeUsuarios] = await Promise.all([
    usuariosTotales,
    usuarios,
  ])

  //Aca puedo enviar la respuesta como res.json (para que devuelve un json)
  return res.json({
    total,
    listaDeUsuarios
  });
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { password, ... resto } = req.body;

  //Valida contra base de datos si viene el password para actualizar
  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password, salt);
  }

  //Busca el id en el que debe realizar el update
  //El { new: true} me ofrece la posibilidad de que la informacion actualiza postman la devuelva
  const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

  return res.json({
    usuario,
  });
};

const usuariosPost = async (req, res) => {
  //Aca desde la request recibo los datos de postman
  const { nombre, correo, password, rol } = req.body;

  //Instanciacion de la entidad o documento usuario (dentro de models)
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en base de datos
  await usuario.save();

  //Aca puedo enviar la respuesta como res.json (para que devuelve un json)
  return res.json({
    usuario,
  });
};

const usuariosDelete = async (req, res) => {
  //Aca puedo enviar la respuesta como res.json (para que devuelve un json)
  const { id } = req.params;

  //Eliminacion de id (no lo elimino, solo lo pongo en estado false)
  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true})
  const usuarioAutenticado = req.usuario;

  return res.json({
    usuario,
    usuarioAutenticado
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
