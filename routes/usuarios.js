const { Router } = require("express");
const {  usuariosGet,  usuariosPut,  usuariosPost,  usuariosDelete } = require("../controllers/usuarios");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRolValido, existeEmail, existeUsuarioPorId } = require("../helpers/validators");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole, tieneRole } = require("../middlewares/validar-roles");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", [
    check("id", "No es un id valido").isMongoId(), 
    //Valido por Mongoose si el id del usuario existe
    check("id").custom( (id ) => existeUsuarioPorId(id)),
    check("rol").custom((rol) => esRolValido(rol)),
    validarCampos
    ],
    usuariosPut
    );

//El primer argumento es el endpoint, el segundo es la validacion del middleware y el tercero es
//la logica del controller que realiza la accion del verbo POST
router.post("/", [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mayor a 6 caracteres").isLength({
      min: 6,
    }),
    //Valido por Mongoose si el email existe
    check("correo").custom((correo) => existeEmail(correo)),

    //Guardo los roles en una DB para recorrerlo y que no esten harcodeados como la linea de arriba
    check("rol").custom((rol) => esRolValido(rol)),
    validarCampos,
  ],
  usuariosPost
);

router.delete("/:id", [
  
  //Validacion de JWT
  validarJWT,

  //Validacion si el rol es ADMIN
  //esAdminRole,

  //Explicacion en la carpeta
  tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),

  check("id", "No es un id valido").isMongoId(), 
  check("id").custom( (id ) => existeUsuarioPorId(id)),
  validarCampos,
  ],

  usuariosDelete);

module.exports = router;
