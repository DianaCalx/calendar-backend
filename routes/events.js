/*
  Rutas de Events 
  host + /api/events
*/
const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validar-campos')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

const router = Router()

//Todas las peticiones deben usar el middleware
router.use(validarJWT)

//Obtener eventos
router.get('/', getEventos)

//Crear evento
router.post('/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicia es obligatoria').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
  ],
  crearEvento)

//Actualizar evento
router.put('/:id', validarCampos, actualizarEvento)

//Borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router