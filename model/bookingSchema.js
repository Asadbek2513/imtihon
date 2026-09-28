const { Schema, model } = require('mongoose');

const bookingSchema = new Schema({
    card_id: { type: Schema.Types.ObjectId, ref: 'CustomerCard', required: true },
    createdAt: { type: Date, default: Date.now },
    finished: { type: Date, default: null },
    payment_methood_id: { type: Schema.Types.ObjectId, ref: 'PaymentMethod', required: true },
    delivery_method_id: { type: Schema.Types.ObjectId, ref: 'DeliveryMethod', required: true },
    discount_coupon_id: { type: String, default: null },
    status_id: { type: String, default: 'pending' },
});

const Booking = model('Booking', bookingSchema);

module.exports = { Booking };