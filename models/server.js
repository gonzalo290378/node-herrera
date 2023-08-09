const express = require("express");
const cors = require("cors");

class Server {

  //Inicializador de propiedades y metodos de la aplicacion
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    //Middlewares: Funciones que adhieren otra funcionalidad a mi Server
    this.middlewares();

    //Rutas de mi aplicacion
    this.routes();
  }

  middlewares() {
    //Directorio publico
    //use es un método proporcionado por Express que se utiliza para configurar middleware's.
    //En este caso, el middleware se utiliza para manejar archivos estáticos.

    //En resumen, la línea de código que se proporciona configura el servidor para servir archivos
    //estáticos desde el directorio "public", lo que permite que estos archivos sean accesibles a
    //través de rutas relativas al dominio, como http://tudominio.com/imagen.png, siempre y cuando
    //la imagen esté ubicada dentro de la carpeta "public" del proyecto.
    this.app.use(express.static("public"));

    this.app.use(cors());

    //Lectura y parse de una peticion tipo POST que viene con body, serializando
    //lo que pueda venir de POSTMAN
    this.app.use( express.json())
  }

  //Rutas de mi aplicacion y CRUD
  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(this.port, () => {
      return console.log("Servidor corriendo en puerto " + this.port);
    });
  }
}

module.exports = Server;
