const Joi = require('joi');

const districtValidation = Joi.object({
	name: Joi.string().trim().required(),
	region_id: Joi.string().hex().length(24).required()
});

module.exports = { districtValidation };