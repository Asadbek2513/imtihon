const Joi = require('joi');

const deliveryMethodValidation = Joi.object({
	name: Joi.string().trim().required()
});

module.exports = { deliveryMethodValidation };