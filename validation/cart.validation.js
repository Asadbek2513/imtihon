const Joi = require('joi');

const cartValidation = Joi.object({
	customer_id: Joi.string().hex().length(24).required(),
	createdAt: Joi.date(),
	finishedAt: Joi.date().allow(null),
	status_id: Joi.string().default('pending')
});

module.exports = { cartValidation };