const mongoose = require('mongoose');
const Espectador = require('./espectador');
const { Schema } = mongoose;
const TicketSchema = new Schema({
    precioTicket: {type: Number, required: true},
    categoriaEspectador: {type: String, required: true},
    fechaCompra: {type: String, required: true},
    espectador: {type: Schema.Types.ObjectId, ref: Espectador, required: true}
})
module.exports = mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);