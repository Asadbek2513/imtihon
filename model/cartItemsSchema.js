const { Schema, model } = require('mongoose');

const cartItemsSchema = new Schema({
    ticket_id: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true },
    cart_id: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
});

const CartItems = model('CartItems', cartItemsSchema);

module.exports = { CartItems };