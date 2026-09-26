const Joi = require('joi');

const districtValidation = Joi.object({
	name: Joi.string().trim().required(),
	region_id: Joi.string().trim().required()
});

module.exports = { districtValidation };