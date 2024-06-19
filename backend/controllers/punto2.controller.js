const mongoose = require('mongoose');
const Transaccion = require('../models/punto2');
const transaccionesCtrl = {}

// GET - Todas las transacciones
transaccionesCtrl.getTransacciones = async (req, res) => {
  try {
    const transacciones = await Transaccion.find();
    res.status(200).json(transacciones);
  } catch (error) {
    res.status(400).json({
      'status': '0',
      'msg': 'Error procesando operación.'
    });
  }
};

// POST - Crear nueva transacción
transaccionesCtrl.createTransaccion = async (req, res) => {
  var transaccion = new Transaccion(req.body);
  try {
    await transaccion.save();
    res.status(200).json({
      'status': '1',
      'msg': 'Transacción guardada.'
    });
  } catch (error) {
    res.status(400).json({
      'status': '0',
      'msg': 'Error procesando operación.'
    });
  }
};

// GET - Una sola transacción por su ID
transaccionesCtrl.getTransaccion = async (req, res) => {
  try {
    const transaccion = await Transaccion.findById(req.params.id);
    res.status(200).json(transaccion);
  } catch (error) {
    res.status(400).json({
      'status': '0',
      'msg': 'Error procesando operación.'
    });
  }
};

// PUT - Editar transacción
transaccionesCtrl.editTransaccion = async (req, res) => {
  try {
    const transaccionId = req.body._id;
    // Validar si el transaccionId no está definido o no es un ObjectId válido
    if (!transaccionId || !mongoose.isValidObjectId(transaccionId)) {
      return res.status(400).json({ status: '0', msg: 'ID de transacción no válido' });
    }
    const vtransaccion = req.body;
    // Actualizar la transacción por su ID
    const transaccionActualizada = await Transaccion.findByIdAndUpdate(transaccionId, vtransaccion, { new: true });
    // Verificar si se encontró y actualizó la transacción
    if (!transaccionActualizada) {
      return res.status(404).json({ status: '0', msg: 'Transacción no encontrada' });
    }
    res.status(200).json({ status: '1', msg: 'Transacción actualizada' });
  } catch (error) {
    console.error('Error al editar la transacción:', error);
    res.status(500).json({ status: '0', msg: 'Error interno del servidor' });
  }
};

// DELETE - Borrar transacción
transaccionesCtrl.deleteTransaccion = async (req, res) => {
  try {
    await Transaccion.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: '1',
      msg: 'Transacción eliminada'
    });
  } catch (error) {
    res.status(400).json({
      'status': '0',
      'msg': 'Error procesando la operación'
    });
  }
};

// GET - Recuperar el histórico de transacciones de un determinado cliente, utilizando email como clave
transaccionesCtrl.getHistorialTransaccion = async (req, res) => {
  try {
    const historial = await Transaccion.find({ emailCliente: req.params.emailCliente });
    res.status(200).json(historial);
  } catch (error) {
    res.status(400).json({
      'status': '0',
      'msg': 'Error procesando operación.'
    });
  }
};

// GET - Obtener transacciones por moneda de origen y destino
transaccionesCtrl.getTransaccionSourceTarget = async (req, res) => {
  try {
    const { monedaOrigen, monedaDestino } = req.params; // Obtener los valores de monedaOrigen y monedaDestino de los parámetros de ruta

    // Buscar todas las transacciones que coincidan con las divisas de origen y destino proporcionadas
    const transacciones = await Transaccion.find({ monedaOrigen: monedaOrigen, monedaDestino: monedaDestino });

    res.status(200).json(transacciones);
  } catch (error) {
    res.status(400).json({
      'status': '0',
      'msg': 'Error procesando operación.'
    });
  }
};

module.exports = transaccionesCtrl;
