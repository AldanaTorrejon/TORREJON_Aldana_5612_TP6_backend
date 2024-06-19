//defino controlador para el manejo de CRUD
const punto1Ctrl = require('../controllers/punto1.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de producto
router.get('/destacados', punto1Ctrl.getProductosDestacados);
router.get('/', punto1Ctrl.getProductos);
router.post('/', punto1Ctrl.createProducto);
router.get('/:id', punto1Ctrl.getProducto);
router.put('/:id', punto1Ctrl.editProducto);
router.delete('/:id', punto1Ctrl.deleteProducto);
//exportamos el modulo de rutas
module.exports = router;