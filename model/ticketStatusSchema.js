const { Schema, model } = require('mongoose');

const ticketStatusSchema = new Schema({
    name: { type: String, required: true }
});

const TicketStatus = model('TicketStatus', ticketStatusSchema);

module.exports = { TicketStatus };