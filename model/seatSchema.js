const { Schema, model } = require('mongoose');

const seatSchema = new Schema({
    sector: { type: String, required: true },
    row_number: { type: Number, required: true },
    number: { type: Number, required: true },
    venue_id: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    seat_type_id: { type: Schema.Types.ObjectId, ref: 'SeatType', required: true },
    location_in_schema: { type: String, required: true },
});

const Seat = model('Seat', seatSchema);

module.exports = { Seat };