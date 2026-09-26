const Joi = require('joi');

const adminValidation = Joi.object({
	name: Joi.string().trim().required(),
	login: Joi.string().trim().required(),
	hashed_password: Joi.string().required(),
	is_active: Joi.boolean(),
	is_creator: Joi.boolean(),
	hashed_refresh_token: Joi.string().allow(null, '')
});

module.exports = { adminValidation };