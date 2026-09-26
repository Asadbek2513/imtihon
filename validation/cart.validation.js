const Joi = require('joi');

const cartValidation = Joi.object({
	customer_id: Joi.string().trim().required(),
	createdAt: Joi.date(),
	finishedAt: Joi.date().allow(null),
	status_id: Joi.string().default('pending')
});

module.exports = { cartValidation };