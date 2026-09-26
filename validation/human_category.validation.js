const Joi = require('joi');

const humanCategoryValidation = Joi.object({
	name: Joi.string().trim().required(),
	start_age: Joi.number().required(),
	finish_age: Joi.number().required(),
	gender: Joi.string().valid('male', 'female').required()
});

module.exports = { humanCategoryValidation };