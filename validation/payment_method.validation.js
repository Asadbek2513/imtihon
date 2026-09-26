const Joi = require('joi');

const paymentMethodValidation = Joi.object({
	name: Joi.string().trim().required()
});

module.exports = { paymentMethodValidation };