const Joi = require('joi');

const customerAddressValidation = Joi.object({
	customer_id: Joi.string().hex().length(24).required(),
	name: Joi.string().trim().required(),
	region_id: Joi.string().hex().length(24).required(),
	district_id: Joi.string().hex().length(24).required(),
	street: Joi.string().trim().required(),
	house: Joi.string().trim().required(),
	flat: Joi.string().trim().required(),
	location: Joi.string().trim().required(),
	post_index: Joi.string().trim().required(),
	info: Joi.string().allow(null, '')
});

module.exports = { customerAddressValidation };