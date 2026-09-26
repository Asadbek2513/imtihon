const Joi = require('joi');

const regionValidation = Joi.object({
	name: Joi.string().trim().required()
});

module.exports = { regionValidation };