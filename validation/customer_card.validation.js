const Joi = require('joi');

const customerCardValidation = Joi.object({
	customer_id: Joi.string().trim().required(),
	name: Joi.string().trim().required(),
	phone: Joi.string().trim().required(),
	number: Joi.string().trim().required(),
	year: Joi.string().trim().required(),
	month: Joi.string().trim().required(),
	is_active: Joi.boolean(),
	is_main: Joi.boolean()
});

module.exports = { customerCardValidation };