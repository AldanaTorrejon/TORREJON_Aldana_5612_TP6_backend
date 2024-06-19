//defino controlador para el manejo de CRUD
const punto2Ctrl = require('../controllers/punto2.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de producto
router.get('/', punto2Ctrl.getTransacciones);
router.post('/', punto2Ctrl.createTransaccion);
router.get('/:id', punto2Ctrl.getTransaccion);
router.put('/:id', punto2Ctrl.editTransaccion);
router.delete('/:id', punto2Ctrl.deleteTransaccion);
router.get('/transacciones/historial/:emailCliente', punto2Ctrl.getHistorialTransaccion);
router.get('/:monedaOrigen/:monedaDestino', punto2Ctrl.getTransaccionSourceTarget);

//exportamos el modulo de rutas
module.exports = router;
