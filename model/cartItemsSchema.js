const { Schema, model } = require('mongoose');

const cartItemsSchema = new Schema({
    ticket_id: { type: String, required: true },
    cart_id: { type: String, required: true },
});

const CartItems = model('CartItems', cartItemsSchema);

module.exports = { CartItems };