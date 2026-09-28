const Joi = require('joi');

const venueValidation = Joi.object({
	name: Joi.string().trim().required(),
	address: Joi.string().trim().required(),
	location: Joi.string().trim().required(),
	site: Joi.string().trim().required(),
	phone: Joi.string().trim().required(),
	schema: Joi.string().trim().required(),
	regionId: Joi.string().hex().length(24).required(),
	districtId: Joi.string().hex().length(24).required()
});

module.exports = { venueValidation };