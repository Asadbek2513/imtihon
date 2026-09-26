const Joi = require('joi');

const ticketStatusValidation = Joi.object({
	name: Joi.string().trim().required()
});

module.exports = { ticketStatusValidation };