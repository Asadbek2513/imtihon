const Joi = require('joi');

const customerValidation = Joi.object({
	first_name: Joi.string().trim().required(),
	last_name: Joi.string().trim().required(),
	phone: Joi.string().trim().required(),
	hashed_password: Joi.string().required(),
	email: Joi.string().email().required(),
	birth_date: Joi.date().required(),
	gender: Joi.string().required(),
	lang_id: Joi.string().trim().required(),
	hashed_refresh_token: Joi.string().allow(null, '')
});

module.exports = { customerValidation };