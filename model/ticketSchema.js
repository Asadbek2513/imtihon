const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({
    event_id: { type: String, required: true },
    seat_id: { type: String, required: true },
    price: { type: Number, required: true },
    service_fee: { type: Number, required: true },
    status_id: { type: String, required: true },
    ticket_type: { type: String, required: true },
});

const Ticket = model('Ticket', ticketSchema);

module.exports = { Ticket };