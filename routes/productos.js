const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProducto } = require('../helpers/validators');
const router = Router();

//ObtenerProductos
router.get("/", obtenerProductos)

//Obtener un producto
router.get("/:id", [
    check("id", "No es un id valido").isMongoId(),
    check('id').custom( (id ) => existeProducto(id) ),
    validarCampos,
],
obtenerProducto,
)

//Crear producto
router.post("/", [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    validarCampos,
],
crearProducto,
)

//Actualizar producto
router.put("/:id", [
    validarJWT,
    check('id').custom( (id ) => existeProducto(id) ),
    validarCampos,
],
actualizarProducto,
)


//Eliminar producto
router.delete("/:id", [
    validarJWT,
    check("id", "No es un id valido").isMongoId(),
    check('id').custom( (id ) => existeProducto(id) ),
    validarCampos,
],
borrarProducto,
)

module.exports = router;