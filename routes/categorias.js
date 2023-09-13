const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/validators');
const router = Router();

//Obtener todas las categorias
router.get("/", obtenerCategorias)

//Obtener una cateforia por id - publico
router.get("/:id",  [
    check("id", "No es un id valido").isMongoId(),
    check('id').custom( (id ) => existeCategoria(id) ),
    validarCampos,
],
obtenerCategoria,
)

//Crear categoria - privado (cualquier persona con token valido)
router.post("/", [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], 
crearCategoria,
);

//Actualizar categoria - privado una categoria por id
router.put("/:id", [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( (id ) => existeCategoria(id) ),
    validarCampos,
],
actualizarCategoria,
)

//Borrar categoria - Admin
router.delete("/:id",  [
    validarJWT,
    check("id", "No es un id valido").isMongoId(),
    check('id').custom( (id ) => existeCategoria(id) ),
    validarCampos,
],
borrarCategoria,
)


module.exports = router;