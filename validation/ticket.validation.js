const Joi = require('joi');

const ticketValidation = Joi.object({
	event_id: Joi.string().hex().length(24).required(),
	seat_id: Joi.string().hex().length(24).required(),
	price: Joi.number().required(),
	service_fee: Joi.number().required(),
	status_id: Joi.string().hex().length(24).required(),
	ticket_type: Joi.string().trim().required()
});

module.exports = { ticketValidation };