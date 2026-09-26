const Joi = require('joi');

const cartItemsValidation = Joi.object({
	ticket_id: Joi.string().trim().required(),
	cart_id: Joi.string().trim().required()
});

module.exports = { cartItemsValidation };