const Joi = require('joi');

const typeValidation = Joi.object({
	name: Joi.string().trim().required()
});

module.exports = { typeValidation };