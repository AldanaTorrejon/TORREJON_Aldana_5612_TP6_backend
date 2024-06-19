//defino controlador para el manejo de CRUD
const categoriaCtrl = require('../controllers/categoria.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion 
router.get('/', categoriaCtrl.getCategoria); // http://localhost:3000/api/espectador/
router.post('/', categoriaCtrl.createCategoria);
router.get('/:dni', categoriaCtrl.getCategoria);

//exportamos el modulo de rutas
module.exports = router;