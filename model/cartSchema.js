const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    createdAt: { type: Date, default: Date.now },
    finishedAt: { type: Date, default: null },
    status_id: { type: String, default: 'pending' },
});

const Cart = model('Cart', cartSchema);

module.exports = { Cart };