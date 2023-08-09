const {response, request} = require('express')

const usuariosGet = (req = request, res = response) => {

  //Los query params me permiten que en la reques se envien query params = ?q=hola&nombre=fernando
  const {q, nombre, apikey} = req.query;

    //Aca puedo enviar la respuesta como res.json (para que devuelve un json)
    res.json({
      msg: "GET API - CONTROLLER",
      q,
      nombre,
      apikey
    });
  }

  const usuariosPut = (req, res) => {

    const {id} = req.params;

    res.json({
      msg: "PUT API - CONTROLLER",
      id,
    });
  }

  const usuariosPost = (req, res) => {

    //Aca desde la request recibo los datos de postman
    const {nombre, edad} = req.body;

    //Aca puedo enviar la respuesta como res.json (para que devuelve un json)
    res.json({
      msg: "POST API- CONTROLLER",
      nombre,
      edad,
    });
  }

  const usuariosDelete = (req, res) => {
    //Aca puedo enviar la respuesta como res.json (para que devuelve un json)
    res.json({
      msg: "DELETE API - CONTROLLER",
    });
  }


  module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,

  }