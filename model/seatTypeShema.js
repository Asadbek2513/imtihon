const { Schema, model } = require('mongoose');

const seatTypeSchema = new Schema({
    name: { type: String, required: true }
});

const SeatType = model('SeatType', seatTypeSchema);

module.exports = { SeatType };