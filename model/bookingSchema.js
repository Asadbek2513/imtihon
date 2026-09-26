const { Schema, model } = require('mongoose');

const bookingSchema = new Schema({
    card_id: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    finished: { type: Date, default: null },
    payment_methood_id: { type: String, required: true },
    delivery_method_id: { type: String, required: true },
    discount_coupon_id: { type: String, default: null },
    status_id: { type: String, default: 'pending' },
});

const Booking = model('Booking', bookingSchema);

module.exports = { Booking };