const mongoose = require('mongoose');
const {Schema} = mongoose;
const ProductoSchema = new Schema({
 nombre:{type:String, required:true},
 imagen: {type: String, required: true},
 precio: {type:Number, required:true},
 stock: {type:Number, required:true},
 descripcion: {type: String, required: true},
 destacado: {type:Boolean, required: true}
})
module.exports = mongoose.models.punto1 || mongoose.model('Producto', ProductoSchema);
