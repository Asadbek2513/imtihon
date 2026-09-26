const { Schema, model } = require('mongoose');

const paymentMethodSchema = new Schema({
    name: { type: String, required: true }
});

const PaymentMethod = model('PaymentMethod', paymentMethodSchema);

module.exports = { PaymentMethod };