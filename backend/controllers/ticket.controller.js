const Ticket = require('../models/ticket');

//get - recuperar todos los ticket
const ticketCtrl = {}
ticketCtrl.getTickets = async (req, res) => {    //req= es la solcitud q viene del fronted(parametros ,header,body)
    var tickets = await Ticket.find().populate("espectador");
    res.json(tickets);
}

//post- dar de alta un ticket
ticketCtrl.createTicket = async (req, res) => {
    var ticket = new Ticket(req.body);
    try {
        await ticket.save();
        res.status(200).json({// status(200) para q sea explicito,aunq si no lo pongo ya de por si toma el 200
            'status': '1',
            'msg': 'Ticket guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    } 
}

// get- recuperar los ticket segun sea espectadores o locales
ticketCtrl.getEspectadorTicket = async (req, res) => {
    let criteria ={}
    if (req.query.categoriaE != null && req.query.categoriaE!=""){
        criteria.categoriaEspectador = req.query.categoriaE;
    }
    var ticket = await Ticket.find(criteria).populate("espectador");
    res.json(ticket);
}

//put-modificar
ticketCtrl.editTicket = async (req, res) => {
    const vticket = new Ticket(req.body);
    try {
        await Ticket.updateOne({ _id: req.body._id }, vticket);
        res.json({
            'status': '1',
            'msg': 'Ticket updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

//delete-borrar
ticketCtrl.deleteTicket = async (req, res) => {
    try {
        await Ticket.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Ticket removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

ticketCtrl.getTicket = async (req, res) => {    //req= es la solcitud q viene del fronted(parametros ,header,body)
    var ticket = await Ticket.findById(req.params.id).populate("espectador");
    res.json(ticket);
 
}
module.exports = ticketCtrl;