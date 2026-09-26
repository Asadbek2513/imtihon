const Joi = require('joi');

const langValidation = Joi.object({
	name: Joi.string().trim().required()
});

module.exports = { langValidation };