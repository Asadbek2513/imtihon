const Joi = require('joi');

const cartItemsValidation = Joi.object({
	ticket_id: Joi.string().hex().length(24).required(),
	cart_id: Joi.string().hex().length(24).required()
});

module.exports = { cartItemsValidation };