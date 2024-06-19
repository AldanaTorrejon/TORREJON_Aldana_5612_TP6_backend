const mongoose = require('mongoose');
const Producto = require('../models/punto1');
const productoCtrl = {}

//GET-Todos los productos
productoCtrl.getProductos = async (req, res) => {
var producto = await Producto.find();
res.status(200).json(producto);
}

//POST- Crear un nuevo Producto
productoCtrl.createProducto = async (req, res) => {
  var producto = new Producto(req.body);
  try {
    await producto.save();
    res.status(200).json({
      'status': '1',
      'msg': 'Producto guardado.'})
    } catch (error) {
      res.status(400).json({
        'status': '0',
        'msg': 'Error procesando operacion.'})
      }
}

//GET- un solo producto por su ID
productoCtrl.getProducto = async (req, res) => {
const producto = await Producto.findById(req.params.id);
res.json(producto);
}

productoCtrl.editProducto = async (req, res) => {
  try {
      const productoId = req.body._id;
      // Validar si el productoId no está definido o no es un ObjectId válido
      if (!productoId || !mongoose.isValidObjectId(productoId)) {
          return res.status(400).json({ status: '0', msg: 'ID de producto no válido' });
      }
      const vproducto = req.body;
      // Actualizar el producto por su ID
      const productoActualizado = await Producto.findByIdAndUpdate(productoId, vproducto, { new: true });
      // Verificar si se encontró y actualizó el producto
      if (!productoActualizado) {
          return res.status(404).json({ status: '0', msg: 'Producto no encontrado' });
      }
      res.status(200).json({ status: '1', msg: 'Producto actualizado' });
  } catch (error) {
      console.error('Error al editar el producto:', error);
      res.status(500).json({ status: '0', msg: 'Error interno del servidor' });
  }
};

//delete-borrar
productoCtrl.deleteProducto = async (req, res)=>{
  try {
    await Producto.deleteOne({_id: req.params.id});
    res.json({
      status: '1',
      msg: 'Producto removed'
    })
  } catch (error) {
    res.status(400).json({
      'status': '0',
      'msg': 'Error procesando la operacion'
    });
  }
}
//GET-destacados
  productoCtrl.getProductosDestacados = async (req, res) => {
    try {
      const productosDestacados = await Producto.find({ destacado: true });//solo aquellos que tengan destacado == true
      res.json(productosDestacados);
    } catch (error) {
      res.status(400).json({
        'status': '0',
        'msg': 'Error procesando la operación.'
      });
    }
  }

module.exports = productoCtrl;