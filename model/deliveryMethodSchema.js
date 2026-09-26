const { Schema, model } = require('mongoose');

const deliveryMethodSchema = new Schema({
    name: { type: String, required: true },
});

const DeliveryMethod = model('DeliveryMethod', deliveryMethodSchema);

module.exports = { DeliveryMethod };